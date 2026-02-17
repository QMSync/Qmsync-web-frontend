'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, AlertTriangle, ClipboardList, Lock, Package, Wrench, Users, User, BookOpen } from 'lucide-react'

export default function QAConsole() {
  const [showAppMenu, setShowAppMenu] = useState(false)
  const userName = 'Isaac Mugisha'

  const userApps = [
    { name: 'Change Requests', icon: FileText, href: '/change-requests', hasAccess: true, description: 'Submit and track change requests for processes and documents', color: '#0072AA' },
    { name: 'Deviation', icon: AlertTriangle, href: '/deviation', hasAccess: true, description: 'Report and manage deviations from standard procedures', color: '#21AA47' },
    { name: 'Procedures/SOPs', icon: ClipboardList, href: '/procedures', hasAccess: true, description: 'Manage procedures, SOPs, and document approvals', color: '#0072AA' },
    { name: 'Formats & Annexures', icon: BookOpen, href: '/formats-annexures', hasAccess: true, description: 'Upload, print annexures and create books from formats', color: '#0072AA' },
  ]

  const allApps = [
    { name: 'Change Requests', icon: FileText, href: '/change-requests', hasAccess: true },
    { name: 'Deviation', icon: AlertTriangle, href: '/deviation', hasAccess: true },
    { name: 'Procedures/SOPs', icon: ClipboardList, href: '/procedures', hasAccess: true },
    { name: 'Formats & Annexures', icon: BookOpen, href: '/formats-annexures', hasAccess: true },
    { name: 'Goods Receipt', icon: Package, href: '/goods', hasAccess: false },
    { name: 'Training', icon: Users, href: '/training', hasAccess: false },
    { name: 'Equipment', icon: Wrench, href: '/equipment', hasAccess: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-[#0072AA] text-white px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowAppMenu(!showAppMenu)}
                className="p-2 hover:bg-blue-700 rounded transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <rect x="1" y="1" width="5" height="5" />
                  <rect x="7.5" y="1" width="5" height="5" />
                  <rect x="14" y="1" width="5" height="5" />
                  <rect x="1" y="7.5" width="5" height="5" />
                  <rect x="7.5" y="7.5" width="5" height="5" />
                  <rect x="14" y="7.5" width="5" height="5" />
                  <rect x="1" y="14" width="5" height="5" />
                  <rect x="7.5" y="14" width="5" height="5" />
                  <rect x="14" y="14" width="5" height="5" />
                </svg>
              </button>
              {showAppMenu && (
                <div className="absolute top-12 left-0 bg-white rounded-lg shadow-xl p-4 w-80 z-50">
                  <div className="grid grid-cols-3 gap-4">
                    {allApps.map((app) => (
                      <div key={app.name} className="relative">
                        {app.hasAccess ? (
                          <Link href={app.href}>
                            <div className="flex flex-col items-center p-3 rounded hover:bg-gray-100 cursor-pointer">
                              <app.icon size={32} color="#0072AA" />
                              <span className="text-xs text-gray-700 mt-2 text-center">{app.name}</span>
                            </div>
                          </Link>
                        ) : (
                          <div className="flex flex-col items-center p-3 rounded opacity-50 cursor-not-allowed relative">
                            <app.icon size={32} color="#999" />
                            <Lock size={16} className="absolute top-2 right-2" color="#999" />
                            <span className="text-xs text-gray-500 mt-2 text-center">{app.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <h1 className="text-xl font-bold" style={{fontFamily: 'Inter, sans-serif'}}>QMSync</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">{userName}</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <User size={20} color="#0072AA" />
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b border-gray-300 px-6 py-3" style={{borderLeftWidth: '4px', borderLeftColor: '#21AA47'}}>
        <h2 className="text-base font-medium text-gray-700">Quality Assurance Console</h2>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-6">
          {userApps.map((app) => (
            <Link key={app.name} href={app.href}>
              <div className="flex flex-col items-center text-center cursor-pointer group">
                <app.icon size={36} color={app.color} className="mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-xs font-bold text-gray-900 mb-1">{app.name}</h3>
                <p className="text-xs text-gray-600 leading-tight">{app.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-[#0072AA] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2025 QMSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
