import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Brain className="w-6 h-6 text-indigo-400" />
            <span className="font-bold text-white">AI Resume Coach</span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/resume-analyzer" className="hover:text-gray-300 transition-colors">Resume Analyzer</Link>
            <Link href="/interview-generator" className="hover:text-gray-300 transition-colors">Interview Generator</Link>
            <Link href="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
          </nav>
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} AI Resume Coach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
