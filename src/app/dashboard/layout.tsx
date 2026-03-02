import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                {/* Adds a top subtle glow matching the theme */}
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none -z-10 blur-3xl" />
                <div className="p-8 max-w-6xl mx-auto min-h-screen flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    )
}
