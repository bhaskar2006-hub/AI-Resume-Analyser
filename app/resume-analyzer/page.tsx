'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, FileText, X, Loader2, AlertCircle, Sparkles } from 'lucide-react'
import AnalysisResults from '@/components/AnalysisResults'

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState<Record<string, unknown> | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (f.type === 'application/pdf' || f.type === 'text/plain' || f.name.endsWith('.pdf') || f.name.endsWith('.txt')) {
      setFile(f)
      setError('')
      setResults(null)
    } else {
      setError('Please upload a PDF or TXT file')
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setDragging(false), [])

  const handleAnalyze = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    setResults(null)

    const formData = new FormData()
    formData.append('resume', file)

    try {
      const res = await fetch('/api/analyze-resume', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to analyze resume')
      } else {
        setResults(data.analysis)
      }
    } catch {
      setError('Failed to analyze resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI Resume</span> Analyzer
          </h1>
          <p className="text-gray-400 text-lg">Get brutally honest feedback from an AI hiring manager. No sugarcoating.</p>
        </div>

        {!results && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
                dragging ? 'border-indigo-500 bg-indigo-500/5' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <Upload className={`w-12 h-12 mx-auto mb-4 ${dragging ? 'text-indigo-400' : 'text-gray-600'}`} />
              <p className="text-lg font-medium text-gray-300 mb-2">
                {dragging ? 'Drop your resume here' : 'Drag & drop your resume'}
              </p>
              <p className="text-gray-500 text-sm">or click to browse · PDF or TXT · Max 10MB</p>
            </div>

            {file && (
              <div className="mt-4 flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
                <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm flex-1 truncate">{file.name}</span>
                <span className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing your resume...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze My Resume
                </>
              )}
            </button>

            {loading && (
              <p className="text-center text-gray-500 text-sm mt-3">This may take 15-30 seconds for a thorough analysis</p>
            )}
          </div>
        )}

        {results && (
          <div>
            <button
              onClick={() => { setResults(null); setFile(null) }}
              className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              ← Analyze Another Resume
            </button>
            <AnalysisResults analysis={results as unknown as Parameters<typeof AnalysisResults>[0]['analysis']} />
          </div>
        )}
      </div>
    </div>
  )
}
