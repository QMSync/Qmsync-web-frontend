'use client'

import { useState, useEffect } from 'react'
import ProceduresLayout from './layouts/ProceduresLayout'
import ProcedureForm from './components/ProcedureForm'

interface Procedure {
  id: number
  document_number: string
  document_name: string
  version: string
  department: string
  status: string
  effective_date: string
  display_copy_link: string
  preparation_date: string
  prepared_by: string
  date_of_issue: string
  change_request_number?: string
  change_description?: string
  created_by_name?: string
  created_at: string
  updated_at: string
}

interface Annexure {
  id: number
  number: string
  name: string
  footer_number: string
  usage: string
  file: string
  uploaded_at: string
}

export default function Procedures() {
  const [showForm, setShowForm] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAnnexureForm, setShowAnnexureForm] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null)
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [annexures, setAnnexures] = useState<Annexure[]>([])
  const [newAnnexure, setNewAnnexure] = useState({ number: '', name: '', footerNumber: '', usage: '', file: null as File | null })

  const fetchProcedures = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/procedures/procedures/')
      if (response.ok) {
        const data = await response.json()
        setProcedures(data)
      }
    } catch (error) {
      console.error('Error fetching procedures:', error)
    }
  }

  const fetchAnnexures = async (procedureId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/procedures/annexures/?procedure=${procedureId}`)
      if (response.ok) {
        const data = await response.json()
        setAnnexures(data)
      }
    } catch (error) {
      console.error('Error fetching annexures:', error)
    }
  }

  useEffect(() => {
    fetchProcedures()
  }, [])

  const handleSuccess = () => {
    fetchProcedures()
  }

  const handleViewRecord = (proc: Procedure, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(proc.display_copy_link, '_blank')
  }

  const handleOpenRecord = (proc: Procedure, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedProcedure(proc)
    fetchAnnexures(proc.id)
  }

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this procedure?')) return
    
    try {
      const response = await fetch(`http://localhost:8000/api/procedures/procedures/${id}/`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (response.ok) {
        fetchProcedures()
      }
    } catch (error) {
      console.error('Error deleting procedure:', error)
    }
  }

  const handleAddAnnexure = async () => {
    if (!selectedProcedure || !newAnnexure.file) return

    const formData = new FormData()
    formData.append('procedure', selectedProcedure.id.toString())
    formData.append('number', newAnnexure.number)
    formData.append('name', newAnnexure.name)
    formData.append('footer_number', newAnnexure.footerNumber)
    formData.append('usage', newAnnexure.usage)
    formData.append('file', newAnnexure.file)

    try {
      const response = await fetch('http://localhost:8000/api/procedures/annexures/', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      if (response.ok) {
        fetchAnnexures(selectedProcedure.id)
        setShowAnnexureForm(false)
        setNewAnnexure({ number: '', name: '', footerNumber: '', usage: '', file: null })
      }
    } catch (error) {
      console.error('Error adding annexure:', error)
    }
  }

  return (
    <ProceduresLayout>
      {!showForm && !selectedProcedure ? (
        <div className="p-6">
          <div className="flex justify-end gap-3 mb-4">
            <button 
              onClick={() => setShowForm(true)}
              className="text-white px-4 py-2 rounded-full hover:opacity-90 transition-colors text-sm flex items-center gap-1"
              style={{backgroundColor: '#0072AA'}}
            >
              <span className="text-lg">+</span>
              <span>Add Record</span>
            </button>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="text-white px-4 py-2 rounded-full hover:opacity-90 transition-colors text-sm flex items-center gap-1"
              style={{backgroundColor: '#0072AA'}}
            >
              <span className="text-lg">↑</span>
              <span>Upload for Approval</span>
            </button>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Procedures/SOPs</h2>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Doc Number</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Document Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Version</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Effective Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {procedures.length > 0 ? (
                  procedures.map((proc) => (
                    <tr 
                      key={proc.id} 
                      className="border-t hover:bg-gray-50 relative"
                      onMouseEnter={() => setHoveredRow(proc.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-4 py-2 text-sm">{proc.document_number}</td>
                      <td className="px-4 py-2 text-sm">{proc.document_name}</td>
                      <td className="px-4 py-2 text-sm">{proc.version}</td>
                      <td className="px-4 py-2 text-sm uppercase">{proc.department}</td>
                      <td className="px-4 py-2 text-sm">{new Date(proc.effective_date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          proc.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {proc.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <button 
                          onClick={(e) => handleDelete(proc.id, e)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          Delete
                        </button>
                      </td>
                      {hoveredRow === proc.id && (
                        <td className="absolute right-0 top-0 bottom-0 flex items-center gap-2 bg-white shadow-lg px-4 border-l">
                          <button 
                            onClick={(e) => handleViewRecord(proc, e)}
                            className="px-3 py-1 text-white rounded text-xs whitespace-nowrap"
                            style={{backgroundColor: '#0072AA'}}
                          >
                            View Display Copy
                          </button>
                          <button 
                            onClick={(e) => handleOpenRecord(proc, e)}
                            className="px-3 py-1 text-white rounded text-xs whitespace-nowrap"
                            style={{backgroundColor: '#21AA47'}}
                          >
                            Open Record
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-600 text-sm">
                      No procedures found. Click "Add Record" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : showForm ? (
        <ProcedureForm onClose={() => setShowForm(false)} onSuccess={handleSuccess} />
      ) : selectedProcedure ? (
        <div className="p-6">
          <button 
            onClick={() => setSelectedProcedure(null)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded text-sm"
          >
            ← Back to List
          </button>
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h2 className="text-2xl font-bold mb-4">{selectedProcedure.document_name}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Document Number</p>
                <p className="font-medium">{selectedProcedure.document_number}</p>
              </div>
              <div>
                <p className="text-gray-600">Version</p>
                <p className="font-medium">{selectedProcedure.version}</p>
              </div>
              <div>
                <p className="text-gray-600">Department</p>
                <p className="font-medium uppercase">{selectedProcedure.department}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-medium capitalize">{selectedProcedure.status}</p>
              </div>
              <div>
                <p className="text-gray-600">Preparation Date</p>
                <p className="font-medium">{new Date(selectedProcedure.preparation_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Prepared By</p>
                <p className="font-medium">{selectedProcedure.prepared_by}</p>
              </div>
              <div>
                <p className="text-gray-600">Effective Date</p>
                <p className="font-medium">{new Date(selectedProcedure.effective_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Date of Issue</p>
                <p className="font-medium">{new Date(selectedProcedure.date_of_issue).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Display Copy Link</p>
                <a href={selectedProcedure.display_copy_link} target="_blank" className="text-blue-600 hover:underline text-xs">View Link</a>
              </div>
              <div>
                <p className="text-gray-600">Created By</p>
                <p className="font-medium">{selectedProcedure.created_by_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Created At</p>
                <p className="font-medium">{new Date(selectedProcedure.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Updated At</p>
                <p className="font-medium">{new Date(selectedProcedure.updated_at).toLocaleString()}</p>
              </div>
              {selectedProcedure.change_request_number && (
                <>
                  <div>
                    <p className="text-gray-600">Change Request Number</p>
                    <p className="font-medium">{selectedProcedure.change_request_number}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Change Description</p>
                    <p className="font-medium">{selectedProcedure.change_description}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Annexures</h3>
              <button 
                onClick={() => setShowAnnexureForm(!showAnnexureForm)}
                className="px-4 py-2 text-white rounded text-sm"
                style={{backgroundColor: '#0072AA'}}
              >
                {showAnnexureForm ? 'Cancel' : '+ Add Annexure'}
              </button>
            </div>
            
            {showAnnexureForm && (
              <div className="bg-gray-50 rounded p-4 mb-4">
                <h4 className="text-sm font-bold mb-3">Add New Annexure</h4>
                <div className="space-y-2 mb-2">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-2">
                      <input 
                        type="text" 
                        value={newAnnexure.number}
                        onChange={(e) => setNewAnnexure({ ...newAnnexure, number: e.target.value })}
                        placeholder="Annexure Number"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="text" 
                        value={newAnnexure.name}
                        onChange={(e) => setNewAnnexure({ ...newAnnexure, name: e.target.value })}
                        placeholder="Annexure Name"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
                      />
                    </div>
                    <div className="col-span-1">
                      <input 
                        type="text" 
                        value={newAnnexure.footerNumber}
                        onChange={(e) => setNewAnnexure({ ...newAnnexure, footerNumber: e.target.value })}
                        placeholder="Footer"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
                      />
                    </div>
                    <div className="col-span-2">
                      <select 
                        value={newAnnexure.usage}
                        onChange={(e) => setNewAnnexure({ ...newAnnexure, usage: e.target.value })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
                      >
                        <option value="">To be used as</option>
                        <option value="Reference copy">Reference copy</option>
                        <option value="Use as such">Use as such</option>
                        <option value="Specimen copy">Specimen copy</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setNewAnnexure({ ...newAnnexure, file: e.target.files?.[0] || null })}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
                      />
                    </div>
                    <div className="col-span-1">
                      <button 
                        type="button"
                        onClick={handleAddAnnexure}
                        className="w-full px-2 py-1.5 text-white rounded text-xs"
                        style={{backgroundColor: '#0072AA'}}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {annexures.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Number</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Footer</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">Usage</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">File</th>
                  </tr>
                </thead>
                <tbody>
                  {annexures.map((ann) => (
                    <tr key={ann.id} className="border-t">
                      <td className="px-4 py-2">{ann.number}</td>
                      <td className="px-4 py-2">{ann.name}</td>
                      <td className="px-4 py-2">{ann.footer_number}</td>
                      <td className="px-4 py-2">{ann.usage}</td>
                      <td className="px-4 py-2">
                        <a href={`http://localhost:8000${ann.file}`} target="_blank" className="text-blue-600 hover:underline text-xs">View PDF</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600 text-sm">No annexures added yet.</p>
            )}
          </div>
        </div>
      ) : null}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Upload Document for Approval</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                <input type="file" className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approvers</label>
                <input type="text" placeholder="Enter email addresses" className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowUploadModal(false)} className="px-4 py-2 bg-gray-200 rounded text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white rounded text-sm" style={{backgroundColor: '#0072AA'}}>Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ProceduresLayout>
  )
}
