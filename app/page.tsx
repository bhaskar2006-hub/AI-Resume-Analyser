import Link from 'next/link'
import { Brain, FileText, Users, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-purple-950 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-medium">Powered by Google Gemini AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Land Your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dream Job
            </span>
            {' '}with AI-Powered Coaching
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Get brutally honest resume analysis from an AI trained on 20+ years of hiring expertise.
            Generate role-specific interview questions that will actually be asked.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25"
            >
              Start for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 border border-gray-700"
            >
              View Pricing
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">No credit card required · 3 free analyses</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Get Hired</h2>
            <p className="text-gray-400 text-lg">Two powerful AI tools working together to maximize your chances</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <FileText className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Resume Analyzer</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Upload your resume and get a critical assessment from an AI that thinks like a senior hiring manager. No fluff, just actionable feedback.
              </p>
              <ul className="space-y-3 mb-8">
                {['ATS compatibility scoring', 'Missing keywords identification', 'Bullet point rewriting with XYZ formula', 'Overall score with priority fixes'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/auth/login" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Analyze My Resume <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <Users className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Mock Interview Generator</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Get role-specific interview questions with ideal answers. Practice with the same questions top tech companies actually ask.
              </p>
              <ul className="space-y-3 mb-8">
                {['Role & level-specific technical questions', 'Behavioral questions with STAR guidance', 'System design challenges', 'Ideal answers and preparation tips'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/auth/login" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Generate Questions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Get actionable feedback in under 60 seconds</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload or Input', desc: 'Upload your resume PDF/TXT or enter your target job role and experience level.', icon: FileText },
              { step: '02', title: 'AI Analysis', desc: 'Our AI analyzes your content using the same criteria top hiring managers and ATS systems use.', icon: Brain },
              { step: '03', title: 'Get Results', desc: 'Receive detailed, actionable feedback with specific improvements and a priority fix list.', icon: Zap },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-indigo-400 font-mono text-sm font-bold mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-lg mb-12">Start free, upgrade when you need more</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-gray-500 text-lg font-normal">/month</span></div>
              <ul className="space-y-3 mb-8 text-left">
                {['3 resume analyses', '3 interview generations', 'Full AI feedback', 'PDF & TXT support'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/login" className="block w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors text-center">
                Get Started Free
              </Link>
            </div>
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Pro Coach</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-gray-400 text-lg font-normal">/month</span></div>
              <ul className="space-y-3 mb-8 text-left">
                {['Unlimited resume analyses', 'Unlimited interview gens', 'Priority AI processing', 'Cancel anytime'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/login" className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl transition-all text-center">
                Start Pro Coach
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 items-center text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <span className="text-gray-400 font-medium">4.9/5 from 500+ users</span>
            </div>
            <div className="text-gray-700">•</div>
            <span>10,000+ resumes analyzed</span>
            <div className="text-gray-700">•</div>
            <span>Used by engineers at Google, Meta, Amazon</span>
          </div>
        </div>
      </section>
    </div>
  )
}
