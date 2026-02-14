import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">QMSync</h1>
        <p className="text-gray-600 mb-8">Quality Management & Documentation Platform</p>
        
        <div className="flex flex-col gap-3">
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
          <Link href="/doc-tools" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
            Doc Tool
          </Link>
          <Link href="/adminapp" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm">
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  )
}