'use client'

interface RightSidebarProps {
  rightSidebarOpen: boolean
  setRightSidebarOpen: (open: boolean) => void
}

export default function RightSidebar({ rightSidebarOpen, setRightSidebarOpen }: RightSidebarProps) {
  return (
    <aside className={`fixed lg:static inset-y-0 right-0 z-50 w-48 bg-white border-l border-gray-200 transform transition-transform duration-300 ${
      rightSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
    }`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-900">Tools</span>
          <button 
            onClick={() => setRightSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-2 py-3 space-y-2 overflow-y-auto">
          <div className="bg-gray-50 rounded-md p-2">
            <h3 className="text-xs font-medium text-gray-900 mb-2">Quick Actions</h3>
            <div className="space-y-1">
              <button className="w-full text-left text-xs text-gray-600 hover:text-gray-900 p-1.5 hover:bg-white rounded">
                Save Document
              </button>
              <button className="w-full text-left text-xs text-gray-600 hover:text-gray-900 p-1.5 hover:bg-white rounded">
                Export PDF
              </button>
              <button className="w-full text-left text-xs text-gray-600 hover:text-gray-900 p-1.5 hover:bg-white rounded">
                Share Link
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-md p-2">
            <h3 className="text-xs font-medium text-gray-900 mb-2">Recent Files</h3>
            <div className="space-y-1">
              <div className="text-xs text-gray-600 p-1.5 hover:bg-white rounded cursor-pointer">
                Meeting Notes.md
              </div>
              <div className="text-xs text-gray-600 p-1.5 hover:bg-white rounded cursor-pointer">
                Project Plan.txt
              </div>
              <div className="text-xs text-gray-600 p-1.5 hover:bg-white rounded cursor-pointer">
                Report Draft.md
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}