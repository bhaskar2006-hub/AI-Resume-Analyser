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

        const { role, experience } = await req.json()

        if (!role || !experience) {
            return NextResponse.json({ error: 'Role and Experience are required' }, { status: 400 })
        }

        const canUse = await checkUsageLimit('interviews')
        if (!canUse) {
            return NextResponse.json({ error: 'You have reached your free limit of 3 mock interviews. Please upgrade to Pro.' }, { status: 403 })
        }

        // Call Gemini
        const prompt = `
    Act as a strict, senior engineering manager conducting an interview for the role of ${role} with experience level: ${experience}.
    Compile a list of 3 highly-relevant technical interview questions and 2 behavioral questions tailored to exactly this profile.

    Provide the output in the exact JSON format below. Do not use markdown wrappers like \`\`\`json, return only the raw JSON.

    {
      "technical_questions": [
        {
          "question": "The specific technical question to ask",
          "ideal_answer": "A summary of what a great candidate would say (focus on architecture, trade-offs, scalability)",
          "what_interviewer_tests": "A brief sentence on why you are asking this and what red flags to look for"
        }
      ],
      "behavioral_questions": [
        {
          "question": "The specific behavioral/cultural question",
          "ideal_answer": "The core traits the candidate needs to demonstrate (STAR method focus)",
          "what_interviewer_tests": "The underlying trait you are assessing (e.g. conflict resolution, extreme ownership)"
        }
      ]
    }
    `

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.8,
            }
        })

        const resultText = response.text || ""

        // Attempt to parse JSON
        try {
            const cleanJson = resultText.replace(/```json/g, '').replace(/```/g, '').trim()
            const parsedResult = JSON.parse(cleanJson)

            await incrementUsage('interviews')

            return NextResponse.json(parsedResult)
        } catch (parseError) {
            console.error("Failed to parse AI response as JSON:", resultText)
            return NextResponse.json({ error: 'AI returned an invalid format. Please try again.' }, { status: 500 })
        }

    } catch (error: any) {
        console.error("Interview generation error:", error)
        return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 })
    }
}
