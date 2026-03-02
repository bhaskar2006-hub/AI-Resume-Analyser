'use client'

import { useState } from 'react'
import { FileText, Loader2, AlertCircle, CheckCircle, BrainCircuit, Upload } from 'lucide-react'

// Define the shape of the expected response
interface AnalysisResult {
    ats_score: number
    strengths: string[]
    weaknesses: string[]
    improved_bullets: string[]
    missing_skills: string[]
}

export default function ResumeAnalyzer() {
    const [resumeText, setResumeText] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<AnalysisResult | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setError(null)

        try {
            if (file.type === 'text/plain') {
                const text = await file.text()
                setResumeText(text)
            } else if (file.type === 'application/pdf') {
                const formData = new FormData()
                formData.append('file', file)
                const res = await fetch('/api/parse-pdf', {
                    method: 'POST',
                    body: formData
                })
                if (!res.ok) throw new Error('Failed to parse PDF')
                const data = await res.json()
                setResumeText(data.text)
            } else {
                throw new Error('Unsupported file type. Please upload a .txt or .pdf file.')
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsUploading(false)
            if (e.target) e.target.value = ''
        }
    }

    const handleAnalyze = async () => {
        if (!resumeText.trim()) {
            setError('Please paste your resume text first.')
            return
        }

        setIsAnalyzing(true)
        setError(null)

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeText }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to analyze resume')
            }

            const data = await response.json()
            setResult(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsAnalyzing(false)
        }
    }

    // Helper to determine score color
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400 border-green-500/30 bg-green-500/10'
        if (score >= 60) return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
        return 'text-red-400 border-red-500/30 bg-red-500/10'
    }

    const getProgressColor = (score: number) => {
        if (score >= 80) return 'bg-green-400'
        if (score >= 60) return 'bg-yellow-400'
        return 'bg-red-400'
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-400" /> Resume Analyzer
                </h1>
                <p className="text-slate-400">
                    Paste your resume text below. Our strict AI coach will critique your format, identify missing keywords, and score your ATS compatibility for technical roles.
                </p>
            </header>

            {/* Input Section */}
            <div className="glass-panel p-6 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="resume" className="text-sm font-medium text-slate-300">Resume Plain Text</label>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">{resumeText.length} characters</span>
                        <div className="relative">
                            <input
                                type="file"
                                id="resume-upload"
                                accept=".txt,.pdf"
                                onChange={handleFileUpload}
                                disabled={isUploading}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <label htmlFor="resume-upload" className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded border border-white/10 transition-colors pointer-events-none">
                                {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                {isUploading ? 'Uploading...' : 'Upload File (.pdf, .txt)'}
                            </label>
                        </div>
                    </div>
                </div>
                <textarea
                    id="resume"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="John Doe\nSoftware Engineer\n\nExperience\n- Built scalable APIs using Node.js..."
                    className="w-full h-64 bg-background/50 border border-white/10 rounded-xl p-4 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y"
                />

                {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !resumeText.trim()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    {isAnalyzing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                        </>
                    ) : (
                        <>
                            <BrainCircuit className="w-5 h-5" /> Analyze Resume
                        </>
                    )}
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Main Score & High Level */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className={`glass-panel p-6 flex flex-col items-center justify-center text-center border ${getScoreColor(result.ats_score).split(' border-')[0]} ${getScoreColor(result.ats_score).split(' bg-')[0]}`}>
                            <h3 className="text-lg font-medium mb-2 text-slate-300">ATS Score</h3>
                            <div className={`text-6xl font-bold ${getScoreColor(result.ats_score).split(' ')[0]}`}>
                                {result.ats_score}
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2.5 mt-4 overflow-hidden">
                                <div className={`h-2.5 rounded-full ${getProgressColor(result.ats_score)}`} style={{ width: `${result.ats_score}%` }}></div>
                            </div>
                        </div>

                        <div className="md:col-span-2 glass-panel p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-green-400 flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5" /> Strengths</h3>
                                <ul className="list-disc list-inside text-slate-400 space-y-1 text-sm">
                                    {result.strengths.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-2"><AlertCircle className="w-5 h-5" /> Weaknesses</h3>
                                <ul className="list-disc list-inside text-slate-400 space-y-1 text-sm">
                                    {result.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Feedback */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-panel p-6">
                            <h3 className="text-lg font-medium text-blue-400 mb-4">Critiqued Bullets</h3>
                            <div className="space-y-4">
                                {result.improved_bullets.map((item, i) => (
                                    <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-white/5 text-sm text-slate-300">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel p-6">
                            <h3 className="text-lg font-medium text-purple-400 mb-4">Missing Keywords for Tech Roles</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.missing_skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
