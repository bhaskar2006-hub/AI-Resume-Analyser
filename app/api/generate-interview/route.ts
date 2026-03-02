import { NextRequest, NextResponse } from 'next/server'
import { generateInterviewQuestions } from '@/lib/gemini'
import { createClient } from '@/lib/supabase/server'

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
      .select('is_pro, interview_generations_count')
      .eq('id', user.id)
      .single()

    const FREE_TIER_LIMIT = 3
    if (!profile?.is_pro && (profile?.interview_generations_count ?? 0) >= FREE_TIER_LIMIT) {
      return NextResponse.json(
        { error: 'Free tier limit reached. Upgrade to Pro Coach for unlimited generations.' },
        { status: 403 }
      )
    }

    const { role, experienceLevel } = await request.json()

    if (!role || !experienceLevel) {
      return NextResponse.json({ error: 'Role and experience level are required' }, { status: 400 })
    }

    const questions = await generateInterviewQuestions(role, experienceLevel)

    // Increment usage count
    await supabase
      .from('profiles')
      .update({ interview_generations_count: (profile?.interview_generations_count ?? 0) + 1 })
      .eq('id', user.id)

    return NextResponse.json({ questions: JSON.parse(questions) })
  } catch (error) {
    console.error('Error generating interview questions:', error)
    return NextResponse.json({ error: 'Failed to generate interview questions' }, { status: 500 })
  }
}
