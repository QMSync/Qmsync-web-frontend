'use client'

import { useState } from 'react'
import FormatsLayout from './layouts/FormatsLayout'

export default function FormatsAnnexures() {
  const [activeTab, setActiveTab] = useState<'formats' | 'annexures'>('formats')

  return (
    <FormatsLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('formats')} 
              className={`px-4 py-2 rounded text-sm ${activeTab === 'formats' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Formats
            </button>
            <button 
              onClick={() => setActiveTab('annexures')} 
              className={`px-4 py-2 rounded text-sm ${activeTab === 'annexures' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Annexures
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm flex items-center gap-1">
            <span className="text-lg">+</span>
            <span>Upload</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{activeTab === 'formats' ? 'Formats' : 'Annexures'}</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Upload and manage {activeTab} documents</p>
        </div>
      </div>
    </FormatsLayout>
  )
}
