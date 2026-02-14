'use client'

import { useState } from 'react'
import AdminLayout from './layouts/AdminLayout'
import UserForm from './components/UserForm'

export default function AdminApp() {
  const [showForm, setShowForm] = useState(false)

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm flex items-center gap-1">
            <span className="text-lg">+</span>
            <span>New</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
        <p className="text-gray-600">User list will appear here</p>
      </div>
      {showForm && <UserForm onClose={() => setShowForm(false)} />}
    </AdminLayout>
  )
}
