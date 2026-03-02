import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createClient } from '@/utils/supabase/server'
import { checkUsageLimit, incrementUsage } from '@/lib/usage'

// Initialize Gemini client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(req: Request) {
    try {
        const supabase = createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { resumeText } = await req.json()

        if (!resumeText) {
            return NextResponse.json({ error: 'Resume text is required' }, { status: 400 })
        }

        const canUse = await checkUsageLimit('analyzes')
        if (!canUse) {
            return NextResponse.json({ error: 'You have reached your free limit of 1 resume analysis. Please upgrade to Pro.' }, { status: 403 })
        }

        // Call Gemini
        const prompt = `
    Act as a strict, senior engineering manager and recruiter at a top-tier tech company.
    Review the following resume carefully. Evaluate it based on ATS compatibility, impact description (XYZ formula), technical depth, and overall presentation.

    Resume Text:
    """
    ${resumeText}
    """

    Provide a highly critical assessment in the following exact JSON structure. Do not include markdown formatting or backticks around the json, just the raw JSON:

    {
      "ats_score": <number 0-100>,
      "strengths": ["string", "string"],
      "weaknesses": ["string", "string"],
      "improved_bullets": ["Before: [bad bullet]\\nAfter: [action verb + task + quantifiable result]", "Before: ...\\nAfter: ..."],
      "missing_skills": ["keyword1", "keyword2"]
    }
    `

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
            }
        })

        const resultText = response.text || ""

        // Attempt to parse JSON
        try {
            // In case Gemini returns markdown formatted JSON (e.g. \`\`\`json ... \`\`\`)
            const cleanJson = resultText.replace(/```json/g, '').replace(/```/g, '').trim()
            const parsedResult = JSON.parse(cleanJson)

            await incrementUsage('analyzes')

            return NextResponse.json(parsedResult)
        } catch (parseError) {
            console.error("Failed to parse AI response as JSON:", resultText)
            return NextResponse.json({ error: 'AI returned an invalid format. Please try again.' }, { status: 500 })
        }

    } catch (error: any) {
        console.error("Resume analyze error:", error)
        return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 })
    }
}
