'use client'

import { useState } from 'react'
import { CreditCard, CheckCircle, Zap, Loader2 } from 'lucide-react'

export default function BillingPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubscribe = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
            })
            const { url } = await res.json()
            if (url) {
                window.location.href = url
            }
        } catch (error) {
            console.error('Subscription error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
                    <CreditCard className="w-8 h-8 text-blue-400" /> Upgrade Your Career
                </h1>
                <p className="text-slate-400">
                    Get unlimited mock interviews and resume analysis to ensure you're always ready.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
                {/* Free Tier */}
                <div className="glass-panel p-8 border-white/5 opacity-80 relative">
                    <h3 className="text-xl font-bold text-white mb-2">Free Plan</h3>
                    <div className="text-3xl font-bold text-slate-300 mb-6">₹0<span className="text-lg font-normal text-slate-500">/mo</span></div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-slate-400">
                            <CheckCircle className="w-5 h-5 text-slate-500" /> 1 Resume Analysis
                        </li>
                        <li className="flex items-center gap-3 text-slate-400">
                            <CheckCircle className="w-5 h-5 text-slate-500" /> 3 Mock Interviews
                        </li>
                        <li className="flex items-center gap-3 text-slate-400">
                            <CheckCircle className="w-5 h-5 text-slate-500" /> Basic email support
                        </li>
                    </ul>

                    <button disabled className="w-full bg-slate-800 text-slate-400 py-3 rounded-xl font-medium cursor-not-allowed">
                        Current Plan
                    </button>
                </div>

                {/* Pro Tier */}
                <div className="glass-panel p-8 border-blue-500/30 relative shadow-glow transform md:-translate-y-4">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Zap className="w-3 h-3" /> MOST POPULAR
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">Pro Coach</h3>
                    <div className="text-4xl font-extrabold text-blue-400 mb-6">₹299<span className="text-lg font-normal text-slate-400">/mo</span></div>

                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-slate-300">
                            <CheckCircle className="w-5 h-5 text-blue-400" /> <span className="font-semibold text-white">Unlimited</span> Resume Analysis
                        </li>
                        <li className="flex items-center gap-3 text-slate-300">
                            <CheckCircle className="w-5 h-5 text-blue-400" /> <span className="font-semibold text-white">Unlimited</span> Mock Interviews
                        </li>
                        <li className="flex items-center gap-3 text-slate-300">
                            <CheckCircle className="w-5 h-5 text-blue-400" /> Priority Support
                        </li>
                        <li className="flex items-center gap-3 text-slate-300">
                            <CheckCircle className="w-5 h-5 text-blue-400" /> Future features included
                        </li>
                    </ul>

                    <button
                        onClick={handleSubscribe}
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] disabled:opacity-50"
                    >
                        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : 'Subscribe Now'}
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-4">Secure payment via Stripe. Cancel anytime.</p>
                </div>
            </div>
        </div>
    )
}
