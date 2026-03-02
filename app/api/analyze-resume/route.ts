import { NextRequest, NextResponse } from 'next/server'
import { analyzeResume } from '@/lib/gemini'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check usage limits
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro, resume_analyses_count')
      .eq('id', user.id)
      .single()

    const FREE_TIER_LIMIT = 3
    if (!profile?.is_pro && (profile?.resume_analyses_count ?? 0) >= FREE_TIER_LIMIT) {
      return NextResponse.json(
        { error: 'Free tier limit reached. Upgrade to Pro Coach for unlimited analyses.' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('resume') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    let resumeText = ''

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      resumeText = await parsePDF(buffer)
    } else {
      resumeText = await file.text()
    }

    if (!resumeText.trim()) {
      return NextResponse.json({ error: 'Could not extract text from file' }, { status: 400 })
    }

    const analysis = await analyzeResume(resumeText)

    // Increment usage count
    await supabase
      .from('profiles')
      .update({ resume_analyses_count: (profile?.resume_analyses_count ?? 0) + 1 })
      .eq('id', user.id)

    return NextResponse.json({ analysis: JSON.parse(analysis) })
  } catch (error) {
    console.error('Error analyzing resume:', error)
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 })
  }
}

async function parsePDF(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PDFParser = (await import('pdf2json')).default
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfParser = new (PDFParser as any)()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const text = pdfData.Pages?.map((page: any) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        page.Texts?.map((t: any) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          t.R?.map((r: any) => decodeURIComponent(r.T)).join('')
        ).join(' ')
      ).join('\n') ?? ''
      resolve(text)
    })
    pdfParser.on('pdfParser_dataError', reject)
    pdfParser.parseBuffer(buffer)
  })
}
