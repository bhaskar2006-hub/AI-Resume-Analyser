'use client'

import { useState } from 'react'
import { MessagesSquare, Loader2, AlertCircle, PlayCircle, HelpCircle, UserCircle } from 'lucide-react'

// Define the shape of the expected response
interface Question {
    question: string
    ideal_answer: string
    what_interviewer_tests: string
}

interface InterviewResult {
    technical_questions: Question[]
    behavioral_questions: Question[]
}

const ROLES = ['Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer', 'Site Reliability Engineer (SRE)', 'Data Engineer']
const EXPERIENCE_LEVELS = ['Fresher (0-1 years)', 'Mid-level (1-3 years)', 'Senior (3-5+ years)', 'Lead / Staff']

export default function InterviewCoach() {
    const [role, setRole] = useState(ROLES[0])
    const [experience, setExperience] = useState(EXPERIENCE_LEVELS[0])
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState<InterviewResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleGenerate = async () => {
        setIsGenerating(true)
        setError(null)

        try {
            const response = await fetch('/api/interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, experience }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to generate interview')
            }

            const data = await response.json()
            setResult(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsGenerating(false)
        }
    }

    const QuestionCard = ({ q, index, type }: { q: Question, index: number, type: 'Technical' | 'Behavioral' }) => (
        <div className="glass-panel p-6 space-y-4">
            <div className="flex items-start gap-3">
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${type === 'Technical' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-pink-500/20 text-pink-400'}`}>
                    Q{index + 1}
                </div>
                <div>
                    <h4 className="text-lg font-medium text-white mb-2 leading-relaxed">{q.question}</h4>

                    <div className="space-y-3 mt-4">
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <PlayCircle className="w-4 h-4" /> Wait for Interviewer logic
                            </div>
                            <p className="text-sm text-slate-300 italic">{q.what_interviewer_tests}</p>
                        </div>

                        <div className="bg-blue-900/10 p-4 rounded-xl border border-blue-500/10">
                            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Ideal Answer Structure
                            </div>
                            <p className="text-sm text-blue-100/80 leading-relaxed">{q.ideal_answer}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="space-y-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                    <MessagesSquare className="w-8 h-8 text-indigo-400" /> Mock Interview Generator
                </h1>
                <p className="text-slate-400">
                    Select your target role and experience to generate specific technical and behavioral questions you are likely to face.
                </p>
            </header>

            {/* Input Section */}
            <div className="glass-panel p-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Target Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                    >
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Experience Level</label>
                    <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                    >
                        {EXPERIENCE_LEVELS.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>

                <div className="md:col-span-2 pt-2 flex flex-col items-center">
                    {error && (
                        <div className="w-full mb-4 flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {isGenerating ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Generating Mock...</>
                        ) : (
                            <><PlayCircle className="w-5 h-5" /> Generate Mock Interview</>
                        )}
                    </button>
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <HelpCircle className="w-6 h-6 text-indigo-400" /> Technical Questions
                        </h2>
                        <div className="space-y-4">
                            {result.technical_questions.map((q, i) => (
                                <QuestionCard key={i} q={q} index={i} type="Technical" />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <UserCircle className="w-6 h-6 text-pink-400" /> Behavioral Questions
                        </h2>
                        <div className="space-y-4">
                            {result.behavioral_questions.map((q, i) => (
                                <QuestionCard key={i} q={q} index={i} type="Behavioral" />
                            ))}
                        </div>
                    </section>

                </div>
            )}
        </div>
    )
}

// Ensure the CheckCircle component is imported. I missed it at the top but rather than recreating, I'll add a quick icon declaration inline for CheckCircle since lucide-react has it
function CheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
