import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { FileText, Users, Crown, TrendingUp, ArrowRight, Zap } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const resumeCount = profile?.resume_analyses_count ?? 0
  const interviewCount = profile?.interview_generations_count ?? 0
  const isPro = profile?.is_pro ?? false
  const FREE_LIMIT = 3

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            {isPro && (
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                <Crown className="w-4 h-4" />
                Pro Coach
              </span>
            )}
          </div>
          <p className="text-gray-400">Welcome back, {user.email}</p>
        </div>

        {/* Usage Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Resume Analyses</p>
                  <p className="text-gray-500 text-sm">
                    {isPro ? 'Unlimited' : `${resumeCount} / ${FREE_LIMIT} used`}
                  </p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
            {!isPro && (
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((resumeCount / FREE_LIMIT) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Interview Generations</p>
                  <p className="text-gray-500 text-sm">
                    {isPro ? 'Unlimited' : `${interviewCount} / ${FREE_LIMIT} used`}
                  </p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
            {!isPro && (
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((interviewCount / FREE_LIMIT) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Link href="/resume-analyzer" className="group bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-500/10 group-hover:bg-indigo-500/20 rounded-xl flex items-center justify-center transition-colors">
                <FileText className="w-6 h-6 text-indigo-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-2">Analyze Resume</h3>
            <p className="text-gray-400 text-sm">Upload your resume and get AI-powered critical feedback with specific improvements.</p>
          </Link>

          <Link href="/interview-generator" className="group bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/10 group-hover:bg-purple-500/20 rounded-xl flex items-center justify-center transition-colors">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-2">Generate Interview Questions</h3>
            <p className="text-gray-400 text-sm">Get role-specific technical and behavioral questions with ideal answers.</p>
          </Link>
        </div>

        {/* Upgrade Banner */}
        {!isPro && (
          <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Upgrade to Pro Coach</h3>
                  <p className="text-gray-400 text-sm">Get unlimited analyses and interview generations for $29/month</p>
                </div>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
              >
                Upgrade Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
