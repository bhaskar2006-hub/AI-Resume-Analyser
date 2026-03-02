'use client'

import { useState } from 'react'
import { Loader2, AlertCircle, Sparkles } from 'lucide-react'
import InterviewResults from '@/components/InterviewResults'

const EXPERIENCE_LEVELS = ['Junior', 'Mid-level', 'Senior', 'Staff', 'Principal']

export default function InterviewGeneratorPage() {
  const [role, setRole] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState<Record<string, unknown> | null>(null)

  const handleGenerate = async () => {
    if (!role.trim() || !experienceLevel) return
    setLoading(true)
    setError('')
    setResults(null)

    try {
      const res = await fetch('/api/generate-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: role.trim(), experienceLevel }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to generate questions')
      } else {
        setResults(data.questions)
      }
    } catch {
      setError('Failed to generate questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mock Interview</span> Generator
          </h1>
          <p className="text-gray-400 text-lg">Get role-specific questions with ideal answers. Practice like it&apos;s the real thing.</p>
        </div>

        {!results && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Role / Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Software Engineer, Product Manager, Data Scientist"
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setExperienceLevel(level)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        experienceLevel === level
                          ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                          : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={!role.trim() || !experienceLevel || loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Interview Questions
                  </>
                )}
              </button>

              {loading && (
                <p className="text-center text-gray-500 text-sm">Generating comprehensive questions may take 15-30 seconds</p>
              )}
            </div>
          </div>
        )}

        {results && (
          <div>
            <button
              onClick={() => { setResults(null); setRole(''); setExperienceLevel('') }}
              className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              ← Generate New Questions
            </button>
            <InterviewResults data={results as unknown as Parameters<typeof InterviewResults>[0]['data']} />
          </div>
        )}
      </div>
    </div>
  )
}
