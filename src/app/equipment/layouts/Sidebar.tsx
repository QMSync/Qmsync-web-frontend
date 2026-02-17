'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-48 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="h-full flex flex-col">
        <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200" style={{backgroundColor: '#0072AA'}}>
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold text-white" style={{fontFamily: 'Inter, sans-serif'}}>QMSync</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-gray-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          <Link href="/equipment" onClick={() => setSidebarOpen(false)} className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors duration-200 ${isActive('/equipment') ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
            <span className="font-medium text-xs">Equipment List</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}
