'use client'

import { useState } from 'react'

interface TrainingFormProps {
  onClose: () => void
}

export default function TrainingForm({ onClose }: TrainingFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    trainer: '',
    date: '',
    duration_hours: '',
    attendees: '',
    status: 'scheduled'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
    // TODO: Submit to backend
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">New Training Record</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trainer</label>
            <input type="text" required value={formData.trainer} onChange={(e) => setFormData({...formData, trainer: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
              <input type="number" step="0.5" required value={formData.duration_hours} onChange={(e) => setFormData({...formData, duration_hours: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attendees (comma-separated)</label>
            <textarea value={formData.attendees} onChange={(e) => setFormData({...formData, attendees: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={2} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
