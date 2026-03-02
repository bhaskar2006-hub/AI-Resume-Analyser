'use client'

import { useState } from 'react'
import { CheckCircle, Zap, Crown, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpgrade = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_placeholder' }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/auth/login'
          return
        }
        setError(data.error || 'Failed to start checkout')
      } else if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setError('Failed to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Simple,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Transparent
            </span>{' '}
            Pricing
          </h1>
          <p className="text-gray-400 text-xl">Start free. Upgrade when you need more power.</p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-center text-sm">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="mb-6">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Free</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">Perfect for getting started</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                { text: '3 resume analyses', included: true },
                { text: '3 interview generations', included: true },
                { text: 'Full AI feedback', included: true },
                { text: 'PDF & TXT support', included: true },
                { text: 'Unlimited analyses', included: false },
                { text: 'Priority processing', included: false },
              ].map((item) => (
                <li key={item.text} className={`flex items-center gap-3 ${item.included ? 'text-gray-300' : 'text-gray-600'}`}>
                  <CheckCircle className={`w-5 h-5 flex-shrink-0 ${item.included ? 'text-gray-400' : 'text-gray-700'}`} />
                  <span className={!item.included ? 'line-through' : ''}>{item.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/auth/login"
              className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="relative bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-500/40 rounded-2xl p-8">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                <Crown className="w-3.5 h-3.5" />
                MOST POPULAR
              </span>
            </div>

            <div className="mb-6">
              <p className="text-indigo-300 text-sm font-medium uppercase tracking-wider mb-2">Pro Coach</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$29</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">For serious job seekers</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Unlimited resume analyses',
                'Unlimited interview generations',
                'Priority AI processing',
                'PDF & TXT support',
                'All future features',
                'Cancel anytime',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-200">
                  <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Start Pro Coach
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-gray-500 text-xs mt-3">Secure payment via Stripe · Cancel anytime</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'What file formats are supported?', a: 'We support PDF and TXT files for resume upload. PDF parsing extracts text content from your resume.' },
              { q: 'How accurate is the AI analysis?', a: 'Our AI is powered by Google Gemini and trained to evaluate resumes using the same criteria as senior engineering managers and ATS systems at top tech companies.' },
              { q: 'Can I cancel my subscription?', a: "Yes, you can cancel your Pro Coach subscription at any time. You'll retain access until the end of your billing period." },
              { q: 'Is my resume data secure?', a: 'Your resume content is processed in memory and not stored permanently. We take privacy seriously.' },
            ].map((item) => (
              <div key={item.q} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
