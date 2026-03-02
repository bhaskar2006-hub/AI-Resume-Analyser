'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, MessagesSquare, CreditCard, LayoutDashboard, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analyzer', href: '/dashboard/resume', icon: FileText },
    { name: 'Interview Coach', href: '/dashboard/interview', icon: MessagesSquare },
    { name: 'Subscription', href: '/dashboard/billing', icon: CreditCard },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="flex h-screen flex-col justify-between border-r border-white/10 glass-panel rounded-none bg-background/50 w-64 p-4">
            <div>
                <div className="mb-8 px-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                        CoachAI
                    </h1>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-glow'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="pt-4 border-t border-white/10">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                    <LogOut className="h-5 w-5 text-slate-500 group-hover:text-red-400" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
