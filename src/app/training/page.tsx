'use client'

import { useState } from 'react'
import TrainingLayout from './layouts/TrainingLayout'
import TrainingForm from './components/TrainingForm'

export default function Training() {
  const [showForm, setShowForm] = useState(false)

  return (
    <TrainingLayout>
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm flex items-center gap-1">
            <span className="text-lg">+</span>
            <span>New</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Dashboard</h2>
        <p className="text-gray-600">Training module content will go here</p>
      </div>
      {showForm && <TrainingForm onClose={() => setShowForm(false)} />}
    </TrainingLayout>
  )
}
