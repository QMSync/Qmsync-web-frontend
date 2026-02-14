'use client'

import { useState } from 'react'

interface EquipmentFormProps {
  onClose: () => void
}

export default function EquipmentForm({ onClose }: EquipmentFormProps) {
  const [formData, setFormData] = useState({
    system_name: '',
    make_manufacturer: '',
    code_no: '',
    capacity: '',
    location: '',
    department: '',
    initial_qual_done_on: '',
    initial_qual_protocol_no: '',
    initial_qual_due_on: '',
    requalification_done_on: '',
    requalification_protocol_no: '',
    requalification_due_on: '',
    remark: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Equipment data:', formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">New Equipment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">System Name</label>
              <input type="text" required value={formData.system_name} onChange={(e) => setFormData({...formData, system_name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Make/Manufacturer</label>
              <input type="text" required value={formData.make_manufacturer} onChange={(e) => setFormData({...formData, make_manufacturer: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code No.</label>
              <input type="text" required value={formData.code_no} onChange={(e) => setFormData({...formData, code_no: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input type="text" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Initial Qualification</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Done On</label>
                <input type="date" value={formData.initial_qual_done_on} onChange={(e) => setFormData({...formData, initial_qual_done_on: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Protocol No.</label>
                <input type="text" value={formData.initial_qual_protocol_no} onChange={(e) => setFormData({...formData, initial_qual_protocol_no: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due On</label>
                <input type="date" value={formData.initial_qual_due_on} onChange={(e) => setFormData({...formData, initial_qual_due_on: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Requalification</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Done On</label>
                <input type="date" value={formData.requalification_done_on} onChange={(e) => setFormData({...formData, requalification_done_on: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Protocol No.</label>
                <input type="text" value={formData.requalification_protocol_no} onChange={(e) => setFormData({...formData, requalification_protocol_no: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due On</label>
                <input type="date" value={formData.requalification_due_on} onChange={(e) => setFormData({...formData, requalification_due_on: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
            <textarea value={formData.remark} onChange={(e) => setFormData({...formData, remark: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={2} />
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
