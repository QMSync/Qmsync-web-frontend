'use client'

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void
}

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-200 h-12 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-medium text-gray-900">Admin Panel</h1>
      </div>
    </header>
  )
}
