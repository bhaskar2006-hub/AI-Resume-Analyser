import Link from 'next/link'
import { ArrowRight, CheckCircle, FileText, MessagesSquare, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Effects */}
      <div className="absolute top-0 inset-x-0 h-screen bg-gradient-to-b from-blue-900/20 via-background to-background pointer-events-none -z-10 blur-3xl" />

      {/* Navbar */}
      <header className="px-6 lg:px-14 py-6 flex items-center justify-between z-10 glass-panel border-x-0 rounded-none border-t-0 bg-background/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            CoachAI
          </span>
        </div>
        <nav className="flex gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-24 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Zap className="w-4 h-4" /> V2 is now living with enhanced AI models
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          Land your dream job with <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            AI-powered
          </span> coaching.
        </h1>

        <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          Upload your resume for instant ATS analysis, and practice technical and behavioral interviews with our strict AI coach tailored for software engineers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1"
          >
            Start for free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
          >
            See how it works
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div id="features" className="grid md:grid-cols-2 gap-8 mt-32 max-w-5xl w-full text-left">
          <div className="glass-panel p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mb-6">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Harsh ATS Analysis</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Our AI doesn't hold back. Get a brutal breakdown of your resume's weaknesses, missing keywords, and exactly how to rewrite your bullets to pass automated screens.
            </p>
            <ul className="space-y-3">
              {['Keyword matching', 'Format checking', 'Action verb strength'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-blue-400" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 mb-6">
              <MessagesSquare className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Mock Interviews</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Select your role (Frontend, Backend, Full Stack) and experience level. Receive tailored technical and behavioral questions designed to test your limits.
            </p>
            <ul className="space-y-3">
              {['Role-specific questions', 'Ideal answer guides', 'Interviewer insights'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-indigo-400" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
