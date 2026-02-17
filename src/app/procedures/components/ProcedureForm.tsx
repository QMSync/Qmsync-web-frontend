'use client'

import { useState } from 'react'

interface ProcedureFormProps {
  onClose: () => void
  onSuccess: () => void
}

interface Annexure {
  number: string
  name: string
  usage: string
  footerNumber: string
  file?: File
}

export default function ProcedureForm({ onClose, onSuccess }: ProcedureFormProps) {
  const [formData, setFormData] = useState({
    documentNumber: '',
    documentName: '',
    preparationDate: '',
    preparedBy: '',
    effectiveDate: '',
    dateOfIssue: '',
    department: '',
    displayCopyLink: '',
    version: '',
    status: 'active'
  })
  const [isNewVersion, setIsNewVersion] = useState(false)
  const [documentExists, setDocumentExists] = useState(false)
  const [changeRequestNumber, setChangeRequestNumber] = useState('')
  const [changeDescription, setChangeDescription] = useState('')
  const [annexures, setAnnexures] = useState<Annexure[]>([])
  const [newAnnexure, setNewAnnexure] = useState<Annexure>({ number: '', name: '', usage: '', footerNumber: '' })
  const [step, setStep] = useState(1)
  const [procedureId, setProcedureId] = useState<number | null>(null)

  const handleDocumentNumberChange = async (docNumber: string) => {
    setFormData({ ...formData, documentNumber: docNumber })
    
    if (docNumber.length > 0) {
      try {
        const response = await fetch(`http://localhost:8000/api/procedures/procedures/by_document_number/?document_number=${docNumber}`)
        if (response.ok) {
          const data = await response.json()
          setDocumentExists(true)
          setFormData({
            ...formData,
            documentNumber: docNumber,
            documentName: data.document_name,
            preparationDate: data.preparation_date,
            preparedBy: data.prepared_by,
            effectiveDate: data.effective_date,
            dateOfIssue: data.date_of_issue,
            department: data.department,
            displayCopyLink: data.display_copy_link,
            version: data.version,
            status: data.status
          })
        } else {
          setDocumentExists(false)
        }
      } catch (error) {
        console.error('Error fetching document:', error)
        setDocumentExists(false)
      }
    } else {
      setDocumentExists(false)
    }
  }

  const handleVersionChange = (newVersion: string) => {
    if (documentExists && newVersion !== formData.version && formData.version) {
      setIsNewVersion(true)
    } else {
      setIsNewVersion(false)
    }
    setFormData({ ...formData, version: newVersion })
  }

  const handleFirstSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload = {
      document_number: formData.documentNumber,
      document_name: formData.documentName,
      version: formData.version,
      preparation_date: formData.preparationDate,
      prepared_by: formData.preparedBy,
      effective_date: formData.effectiveDate,
      date_of_issue: formData.dateOfIssue,
      department: formData.department,
      display_copy_link: formData.displayCopyLink,
      status: isNewVersion ? 'active' : formData.status,
      change_request_number: isNewVersion ? changeRequestNumber : null,
      change_description: isNewVersion ? changeDescription : null,
      annexures: []
    }

    try {
      const response = await fetch('http://localhost:8000/api/procedures/procedures/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const data = await response.json()
        setProcedureId(data.id)
        setStep(2)
      }
    } catch (error) {
      console.error('Error creating procedure:', error)
    }
  }

  const handleAnnexureSubmit = async () => {
    if (!procedureId) return

    try {
      // Upload each annexure with its PDF file
      for (const annexure of annexures) {
        const formData = new FormData()
        formData.append('procedure', procedureId.toString())
        formData.append('number', annexure.number)
        formData.append('name', annexure.name)
        formData.append('footer_number', annexure.footerNumber || '')
        formData.append('usage', annexure.usage)
        if (annexure.file) {
          formData.append('file', annexure.file)
        }

        await fetch('http://localhost:8000/api/procedures/annexures/', {
          method: 'POST',
          credentials: 'include',
          body: formData
        })
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error uploading annexures:', error)
    }
  }

  const addAnnexure = () => {
    if (newAnnexure.number && newAnnexure.name && newAnnexure.usage) {
      setAnnexures([...annexures, newAnnexure])
      setNewAnnexure({ number: '', name: '', usage: '', footerNumber: '' })
    }
  }

  const removeAnnexure = (index: number) => {
    setAnnexures(annexures.filter((_, i) => i !== index))
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-900">{step === 1 ? 'Add Signed SOP Record' : 'Add Annexures'}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">×</button>
      </div>
      
      {step === 1 ? (
      <form onSubmit={handleFirstSubmit} className="bg-white rounded-lg shadow p-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Document Number</label>
            <input 
              type="text" 
              value={formData.documentNumber}
              onChange={(e) => handleDocumentNumberChange(e.target.value)}
              required
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Version</label>
            <input 
              type="text" 
              value={formData.version}
              onChange={(e) => handleVersionChange(e.target.value)}
              required
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
            />
          </div>
        </div>
        
        {isNewVersion && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-2 space-y-1.5">
            <p className="text-xs font-medium text-yellow-800">New Version Detected</p>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Change Request Number *</label>
              <input 
                type="text" 
                value={changeRequestNumber}
                onChange={(e) => setChangeRequestNumber(e.target.value)}
                required
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">Description of Change *</label>
              <textarea 
                value={changeDescription}
                onChange={(e) => setChangeDescription(e.target.value)}
                required
                rows={2}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-0.5">New Display Copy Link *</label>
              <input 
                type="url" 
                value={formData.displayCopyLink}
                onChange={(e) => setFormData({ ...formData, displayCopyLink: e.target.value })}
                required
                placeholder="https://" 
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
              />
            </div>
            <p className="text-xs text-gray-600">Note: Previous version will be marked as obsolete</p>
          </div>
        )}
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Document Name</label>
          <input 
            type="text" 
            value={formData.documentName}
            onChange={(e) => setFormData({ ...formData, documentName: e.target.value })}
            required
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Preparation Date</label>
            <input 
              type="date" 
              value={formData.preparationDate}
              onChange={(e) => setFormData({ ...formData, preparationDate: e.target.value })}
              required
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Prepared By</label>
            <input 
              type="text" 
              value={formData.preparedBy}
              onChange={(e) => setFormData({ ...formData, preparedBy: e.target.value })}
              required
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Effective Date</label>
            <input 
              type="date" 
              value={formData.effectiveDate}
              onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
              required
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Date of Issue</label>
            <input 
              type="date" 
              value={formData.dateOfIssue}
              onChange={(e) => setFormData({ ...formData, dateOfIssue: e.target.value })}
              required
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Department</label>
          <select 
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
          >
            <option value="">Select Department</option>
            <option value="qa">QA</option>
            <option value="qc">QC</option>
            <option value="production">Production</option>
            <option value="store">Store</option>
          </select>
        </div>
        
        {!isNewVersion && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Link to Display Copy</label>
            <input 
              type="url" 
              value={formData.displayCopyLink}
              onChange={(e) => setFormData({ ...formData, displayCopyLink: e.target.value })}
              required
              placeholder="https://" 
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
            />
          </div>
        )}
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Status</label>
          <select 
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            disabled={isNewVersion}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
          >
            <option value="active">Active</option>
            <option value="obsolete">Obsolete</option>
          </select>
        </div>
        
        <div className="flex gap-2 justify-end pt-2">
          <button type="button" onClick={onClose} className="px-3 py-1.5 bg-gray-200 rounded text-xs">Cancel</button>
          <button type="submit" className="px-3 py-1.5 text-white rounded text-xs" style={{backgroundColor: '#0072AA'}}>Next: Add Annexures</button>
        </div>
      </form>
      ) : (
      <div className="bg-white rounded-lg shadow p-4 space-y-2">
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
                onChange={(e) => setNewAnnexure({ ...newAnnexure, file: e.target.files?.[0] })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs" 
              />
            </div>
            <div className="col-span-1">
              <button 
                type="button"
                onClick={addAnnexure}
                className="w-full px-2 py-1.5 text-white rounded text-xs"
                style={{backgroundColor: '#0072AA'}}
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        {annexures.length > 0 && (
          <div className="bg-gray-50 rounded p-2 max-h-60 overflow-y-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1 px-2">Number</th>
                  <th className="text-left py-1 px-2">Name</th>
                  <th className="text-left py-1 px-2">Footer</th>
                  <th className="text-left py-1 px-2">Usage</th>
                  <th className="text-left py-1 px-2">File</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {annexures.map((ann, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-1 px-2">{ann.number}</td>
                    <td className="py-1 px-2">{ann.name}</td>
                    <td className="py-1 px-2">{ann.footerNumber}</td>
                    <td className="py-1 px-2">{ann.usage}</td>
                    <td className="py-1 px-2 text-xs">{ann.file?.name || 'No file'}</td>
                    <td className="py-1 px-2">
                      <button 
                        type="button"
                        onClick={() => removeAnnexure(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="flex gap-2 justify-end pt-2">
          <button type="button" onClick={() => { onSuccess(); onClose(); }} className="px-3 py-1.5 bg-gray-200 rounded text-xs">Skip & Finish</button>
          <button type="button" onClick={handleAnnexureSubmit} className="px-3 py-1.5 text-white rounded text-xs" style={{backgroundColor: '#0072AA'}}>Save Annexures</button>
        </div>
      </div>
      )}
    </div>
  )
}
