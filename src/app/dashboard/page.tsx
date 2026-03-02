import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { FileText, MessagesSquare, ArrowRight } from 'lucide-react'

export default async function DashboardPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
                </h1>
                <p className="text-slate-400">
                    Here is an overview of your AI coaching progress. Let's land that dream job.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Resume Card */}
                <div className="relative group glass-panel p-8 overflow-hidden transition-all hover:border-blue-500/30 hover:shadow-glow">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                            <FileText className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Resume Analyzer</h3>
                        <p className="text-slate-400">
                            Upload your resume and get a harsh but true ATS compatibility score along with actionable improvements.
                        </p>
                        <Link
                            href="/dashboard/resume"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                            Analyze Resume <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Interview Card */}
                <div className="relative group glass-panel p-8 overflow-hidden transition-all hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MessagesSquare className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <MessagesSquare className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Interview Coach</h3>
                        <p className="text-slate-400">
                            Generate tailored technical and behavioral interview questions based on your specific role and experience level.
                        </p>
                        <Link
                            href="/dashboard/interview"
                            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        >
                            Start Coaching <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
