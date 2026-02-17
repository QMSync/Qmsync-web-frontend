import Link from 'next/link'

export default function Playground() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left - Modules */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Inter, sans-serif'}}>QMSync</h1>
          <p className="text-gray-600 mb-8">Quality Management & Documentation Platform</p>
          
          <div className="flex flex-col gap-3">
            <Link href="/login" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition-colors text-sm font-semibold">
              Login
            </Link>
            <Link href="/training" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
              Training
            </Link>
            <Link href="/change-requests" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
              Change Requests
            </Link>
            <Link href="/deviation" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
              Deviation
            </Link>
            <Link href="/equipment" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
              Equipment
            </Link>
            <Link href="/goods" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
              Goods
            </Link>
            <Link href="/doc-tools" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
              Doc Tool
            </Link>
          </div>
        </div>
      </div>

      {/* Right - Departments */}
      <div className="w-64 bg-white border-l border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Departments</h2>
        <div className="space-y-2">
          <Link href="/adminapp" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="font-medium text-gray-900">Admin Panel</p>
          </Link>
          <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <p className="font-medium text-gray-900">Store</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <p className="font-medium text-gray-900">Production</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <p className="font-medium text-gray-900">QC</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <p className="font-medium text-gray-900">QA</p>
          </div>
        </div>
      </div>
    </div>
  )
}
