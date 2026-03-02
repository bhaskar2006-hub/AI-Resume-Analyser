'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Target, Zap, TrendingUp, XCircle } from 'lucide-react'

interface AnalysisData {
  overallScore: number
  atsCompatibility: {
    score: number
    issues: string[]
    recommendations: string[]
  }
  missingKeywords: string[]
  bulletPointCritique: Array<{
    original: string
    issue: string
    improved: string
  }>
  xyzImpactSuggestions: string[]
  strengthsFound: string[]
  criticalWeaknesses: string[]
  overallVerdict: string
  topPriorityFixes: string[]
}

export default function AnalysisResults({ analysis }: { analysis: AnalysisData }) {
  const [expandedBullets, setExpandedBullets] = useState<number[]>([])

  const toggleBullet = (i: number) => {
    setExpandedBullets(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  const scoreColor = (score: number) => {
    if (score >= 70) return 'text-green-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const scoreRingColor = (score: number) => {
    if (score >= 70) return '#4ade80'
    if (score >= 40) return '#facc15'
    return '#f87171'
  }

  const circumference = 2 * Math.PI * 54
  const offset = circumference - (analysis.overallScore / 100) * circumference

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#1f2937" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke={scoreRingColor(analysis.overallScore)}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${scoreColor(analysis.overallScore)}`}>{analysis.overallScore}</span>
              <span className="text-gray-500 text-xs">/ 100</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3">Resume Analysis Complete</h2>
            <p className="text-gray-400 leading-relaxed">{analysis.overallVerdict}</p>
          </div>
        </div>
      </div>

      {/* ATS Compatibility */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            ATS Compatibility
          </h3>
          <span className={`text-2xl font-bold ${scoreColor(analysis.atsCompatibility.score)}`}>
            {analysis.atsCompatibility.score}/100
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${analysis.atsCompatibility.score}%`,
              background: scoreRingColor(analysis.atsCompatibility.score)
            }}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {analysis.atsCompatibility.issues?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Issues Found
              </h4>
              <ul className="space-y-2">
                {analysis.atsCompatibility.issues.map((issue, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span> {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {analysis.atsCompatibility.recommendations?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Recommendations
              </h4>
              <ul className="space-y-2">
                {analysis.atsCompatibility.recommendations.map((rec, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span> {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Top Priority Fixes */}
      {analysis.topPriorityFixes?.length > 0 && (
        <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-red-300">
            <Zap className="w-5 h-5" />
            Top Priority Fixes
          </h3>
          <ol className="space-y-3">
            {analysis.topPriorityFixes.map((fix, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="bg-red-500/20 text-red-400 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">{i + 1}</span>
                {fix}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Missing Keywords */}
      {analysis.missingKeywords?.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((kw, i) => (
              <span key={i} className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm px-3 py-1 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bullet Point Critique */}
      {analysis.bulletPointCritique?.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Bullet Point Critique &amp; Rewrites
          </h3>
          <div className="space-y-3">
            {analysis.bulletPointCritique.map((item, i) => (
              <div key={i} className="border border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleBullet(i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-gray-300 text-sm line-clamp-1 flex-1 mr-4">{item.original}</span>
                  {expandedBullets.includes(i) ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
                </button>
                {expandedBullets.includes(i) && (
                  <div className="border-t border-gray-700 p-4 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-red-400 mb-1">ORIGINAL</p>
                      <p className="text-gray-400 text-sm">{item.original}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-yellow-400 mb-1">ISSUE</p>
                      <p className="text-gray-400 text-sm">{item.issue}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-green-400 mb-1">IMPROVED (XYZ FORMAT)</p>
                      <p className="text-green-300 text-sm">{item.improved}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Weaknesses & Strengths */}
      <div className="grid md:grid-cols-2 gap-6">
        {analysis.criticalWeaknesses?.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              Critical Weaknesses
            </h3>
            <ul className="space-y-2">
              {analysis.criticalWeaknesses.map((w, i) => (
                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                  <span className="text-red-500 mt-0.5 flex-shrink-0">×</span> {w}
                </li>
              ))}
            </ul>
          </div>
        )}
        {analysis.strengthsFound?.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Strengths Found
            </h3>
            <ul className="space-y-2">
              {analysis.strengthsFound.map((s, i) => (
                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span> {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
