import { GoogleGenAI } from '@google/genai'

function getGenAI() {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
}

export async function analyzeResume(resumeText: string): Promise<string> {
  const model = 'gemini-2.5-flash'
  const prompt = `You are a brutally honest senior engineering manager with 20+ years of hiring experience. Analyze the following resume with extreme critical rigor.

Provide your analysis in the following structured JSON format:
{
  "overallScore": <number 0-100>,
  "atsCompatibility": {
    "score": <number 0-100>,
    "issues": [<string>],
    "recommendations": [<string>]
  },
  "missingKeywords": [<string>],
  "bulletPointCritique": [
    {
      "original": "<original bullet>",
      "issue": "<what is wrong>",
      "improved": "<XYZ format: Accomplished X by doing Y resulting in Z>"
    }
  ],
  "xyzImpactSuggestions": [<string>],
  "strengthsFound": [<string>],
  "criticalWeaknesses": [<string>],
  "overallVerdict": "<harsh but constructive overall assessment>",
  "topPriorityFixes": [<string>]
}

Resume to analyze:
${resumeText}

Remember: Be a strict, critical evaluator. Do not sugarcoat. Identify every weakness.`

  const response = await getGenAI().models.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { responseMimeType: 'application/json' }
  })

  return response.text ?? ''
}

export async function generateInterviewQuestions(role: string, experienceLevel: string): Promise<string> {
  const model = 'gemini-2.5-flash'
  const prompt = `You are an expert technical interviewer at a top-tier tech company. Generate a comprehensive interview guide for a ${experienceLevel} ${role} position.

Provide your response in the following structured JSON format:
{
  "role": "${role}",
  "experienceLevel": "${experienceLevel}",
  "technicalQuestions": [
    {
      "question": "<deep technical question>",
      "difficulty": "<Easy|Medium|Hard>",
      "topic": "<topic area>",
      "whatInterviewerTests": "<what skills/knowledge this tests>",
      "idealAnswer": "<comprehensive ideal answer>",
      "followUpQuestions": [<string>]
    }
  ],
  "behavioralQuestions": [
    {
      "question": "<STAR-format behavioral question>",
      "whatInterviewerTests": "<what this assesses>",
      "idealAnswerGuidance": "<what a great answer includes>",
      "redFlags": [<string>]
    }
  ],
  "systemDesignQuestion": {
    "question": "<relevant system design challenge>",
    "evaluationCriteria": [<string>],
    "hints": [<string>]
  },
  "preparationTips": [<string>]
}

Generate highly relevant, role-specific questions that would realistically appear in a ${experienceLevel} ${role} interview at a top tech company. Make technical questions deep and challenging.`

  const response = await getGenAI().models.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { responseMimeType: 'application/json' }
  })

  return response.text ?? ''
}
