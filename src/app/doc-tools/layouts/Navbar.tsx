'use client'

import { usePathname } from 'next/navigation'

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void
  setRightSidebarOpen: (open: boolean) => void
}

export default function Navbar({ setSidebarOpen, setRightSidebarOpen }: NavbarProps) {
  const pathname = usePathname()

  const getPageTitle = () => {
    switch (pathname) {
      case '/doc-tools':
        return 'Document Editor'
      case '/doc-tools/templates':
        return 'Templates'
      case '/doc-tools/history':
        return 'History'
      default:
        return 'Document Tools'
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 h-12 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-lg font-medium text-gray-900">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setRightSidebarOpen(true)}
          className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </header>
  )
}