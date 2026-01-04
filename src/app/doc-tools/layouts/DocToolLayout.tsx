'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'
import Navbar from './Navbar'

interface DocToolLayoutProps {
  children: React.ReactNode
}

export default function DocToolLayout({ children }: DocToolLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        <Navbar 
          setSidebarOpen={setSidebarOpen}
          setRightSidebarOpen={setRightSidebarOpen}
        />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto h-0">
          {children}
        </main>
      </div>

      <RightSidebar 
        rightSidebarOpen={rightSidebarOpen} 
        setRightSidebarOpen={setRightSidebarOpen} 
      />
      
      {/* Overlays for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {rightSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setRightSidebarOpen(false)}
        />
      )}
    </div>
  )
}