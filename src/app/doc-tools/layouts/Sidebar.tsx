'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  onPdfUploadClick: () => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, onPdfUploadClick }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <>
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-48 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-bold text-blue-600">QMSync</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
            {/* Document Import Section */}
            <div className="mb-3">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">Import</h3>
              <div className="space-y-1">
                <button 
                  onClick={onPdfUploadClick}
                  className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <span className="text-xs">PDF to Word</span>
                </button>
                <button className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors duration-200 text-gray-700 hover:bg-gray-100">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">Scan Text</span>
                </button>
                <button className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors duration-200 text-gray-700 hover:bg-gray-100">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs">Import Word</span>
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="border-t border-gray-200 pt-2">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">Navigate</h3>
              <Link
                href="/doc-tools"
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors duration-200 ${
                  isActive('/doc-tools') ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium text-xs">Editor</span>
              </Link>

              <Link
                href="/doc-tools/templates"
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors duration-200 ${
                  isActive('/doc-tools/templates') ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="font-medium text-xs">Templates</span>
              </Link>

              <Link
                href="/doc-tools/history"
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors duration-200 ${
                  isActive('/doc-tools/history') ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-xs">History</span>
              </Link>
            </div>
          </nav>

          {/* User info */}
          <div className="border-t border-gray-200 p-2">
            <div className="flex items-center gap-1.5 px-2 py-1.5 cursor-pointer hover:bg-blue-50 rounded-md transition-colors duration-200">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                <span className="text-blue-700 font-semibold text-xs">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">User</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}