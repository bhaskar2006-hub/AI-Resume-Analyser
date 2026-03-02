'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Code, Users, Layers, BookOpen, AlertTriangle } from 'lucide-react'

interface TechQuestion {
  question: string
  difficulty: string
  topic: string
  whatInterviewerTests: string
  idealAnswer: string
  followUpQuestions: string[]
}

interface BehavioralQuestion {
  question: string
  whatInterviewerTests: string
  idealAnswerGuidance: string
  redFlags: string[]
}

interface SystemDesignQuestion {
  question: string
  evaluationCriteria: string[]
  hints: string[]
}

interface InterviewData {
  role: string
  experienceLevel: string
  technicalQuestions: TechQuestion[]
  behavioralQuestions: BehavioralQuestion[]
  systemDesignQuestion: SystemDesignQuestion
  preparationTips: string[]
}

const difficultyColor = (d: string) => {
  if (d === 'Easy') return 'bg-green-500/10 text-green-400 border-green-500/20'
  if (d === 'Medium') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  return 'bg-red-500/10 text-red-400 border-red-500/20'
}

export default function InterviewResults({ data }: { data: InterviewData }) {
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral' | 'system' | 'tips'>('technical')
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleItem = (i: number) => {
    setExpandedItems(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  const tabs = [
    { id: 'technical', label: 'Technical', icon: Code, count: data.technicalQuestions?.length },
    { id: 'behavioral', label: 'Behavioral', icon: Users, count: data.behavioralQuestions?.length },
    { id: 'system', label: 'System Design', icon: Layers, count: 1 },
    { id: 'tips', label: 'Prep Tips', icon: BookOpen, count: data.preparationTips?.length },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-1">
          {data.experienceLevel} {data.role} Interview Guide
        </h2>
        <p className="text-gray-400 text-sm">
          {(data.technicalQuestions?.length ?? 0) + (data.behavioralQuestions?.length ?? 0) + 1} questions · Comprehensive coverage
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setExpandedItems([]) }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.count != null && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-indigo-600/30' : 'bg-gray-800'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Technical Questions */}
      {activeTab === 'technical' && (
        <div className="space-y-3">
          {data.technicalQuestions?.map((q, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2.5 py-1 rounded-full">{q.topic}</span>
                  </div>
                  <p className="text-gray-200 font-medium text-sm">{q.question}</p>
                </div>
                {expandedItems.includes(i) ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />}
              </button>
              {expandedItems.includes(i) && (
                <div className="border-t border-gray-700 p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-indigo-400 mb-2">WHAT THIS TESTS</p>
                    <p className="text-gray-400 text-sm">{q.whatInterviewerTests}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-400 mb-2">IDEAL ANSWER</p>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{q.idealAnswer}</p>
                  </div>
                  {q.followUpQuestions?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-yellow-400 mb-2">FOLLOW-UP QUESTIONS</p>
                      <ul className="space-y-1">
                        {q.followUpQuestions.map((fq, j) => (
                          <li key={j} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-yellow-500 mt-0.5">→</span> {fq}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Behavioral Questions */}
      {activeTab === 'behavioral' && (
        <div className="space-y-3">
          {data.behavioralQuestions?.map((q, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-gray-200 font-medium text-sm">{q.question}</p>
                </div>
                {expandedItems.includes(i) ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
              </button>
              {expandedItems.includes(i) && (
                <div className="border-t border-gray-700 p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-indigo-400 mb-2">WHAT THIS ASSESSES</p>
                    <p className="text-gray-400 text-sm">{q.whatInterviewerTests}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-400 mb-2">IDEAL ANSWER GUIDANCE</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{q.idealAnswerGuidance}</p>
                  </div>
                  {q.redFlags?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> RED FLAGS TO AVOID
                      </p>
                      <ul className="space-y-1">
                        {q.redFlags.map((rf, j) => (
                          <li key={j} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-red-500 mt-0.5 flex-shrink-0">×</span> {rf}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* System Design */}
      {activeTab === 'system' && data.systemDesignQuestion && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-3">System Design Challenge</h3>
            <p className="text-gray-200 leading-relaxed">{data.systemDesignQuestion.question}</p>
          </div>
          {data.systemDesignQuestion.evaluationCriteria?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-indigo-400 mb-3">EVALUATION CRITERIA</p>
              <ul className="space-y-2">
                {data.systemDesignQuestion.evaluationCriteria.map((c, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5 flex-shrink-0">◆</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.systemDesignQuestion.hints?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-yellow-400 mb-3">HINTS</p>
              <ul className="space-y-2">
                {data.systemDesignQuestion.hints.map((h, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5 flex-shrink-0">💡</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Prep Tips */}
      {activeTab === 'tips' && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Preparation Tips
          </h3>
          <ol className="space-y-4">
            {data.preparationTips?.map((tip, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="bg-indigo-600/20 text-indigo-400 rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 text-sm font-bold">{i + 1}</span>
                <p className="text-gray-300 text-sm leading-relaxed pt-0.5">{tip}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
