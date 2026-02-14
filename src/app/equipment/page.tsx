'use client'

import { useState } from 'react'
import EquipmentLayout from './layouts/EquipmentLayout'
import EquipmentForm from './components/EquipmentForm'

export default function Equipment() {
  const [showForm, setShowForm] = useState(false)

  return (
    <EquipmentLayout>
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm flex items-center gap-1">
            <span className="text-lg">+</span>
            <span>New</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Equipment List</h2>
        <p className="text-gray-600">Equipment records will appear here</p>
      </div>
      {showForm && <EquipmentForm onClose={() => setShowForm(false)} />}
    </EquipmentLayout>
  )
}
