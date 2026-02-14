'use client'

import { useState, useRef } from 'react'

interface PDFUploadModalProps {
  isOpen: boolean
  onClose: () => void
  inline?: boolean
  onContentLoaded?: (content: string) => void
}

interface ConversionResult {
  id: number
  unique_id: string
  message: string
  status: string
  total_pages: number
  converted_pages: number
  success_percentage: number
}

export default function PDFUploadModal({ isOpen, onClose, inline = false, onContentLoaded }: PDFUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState<string>('')
  const [dragOver, setDragOver] = useState(false)
  const [previewContent, setPreviewContent] = useState<string>('')
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
      setResult(null)
    } else {
      setError('Please select a PDF file')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleConvert = async () => {
    if (!file) return

    setConverting(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/doc-tool/api/uploads/convert_pdf/', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        handlePreview(data)
      } else {
        setError(data.error || 'Conversion failed')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setConverting(false)
    }
  }

  const handlePreview = async (conversionResult = result) => {
    if (!conversionResult) return

    try {
      const response = await fetch(`http://localhost:8000/doc-tool/api/converted/${conversionResult.unique_id}/preview/`)
      if (response.ok) {
        const data = await response.json()
        setPreviewContent(data.text)
        setShowPreview(true)
      } else {
        setError('Failed to load preview')
      }
    } catch (err) {
      setError('Failed to load preview')
    }
  }

  const handleClosePreview = async () => {
    if (result) {
      try {
        await fetch(`http://localhost:8000/doc-tool/api/uploads/${result.id}/`, {
          method: 'DELETE'
        })
      } catch (err) {
        console.error('Failed to delete upload:', err)
      }
    }
    
    setShowPreview(false)
    setPreviewContent('')
    setResult(null)
    setFile(null)
    setError('')
  }

  const handleConfirmLoad = () => {
    if (onContentLoaded && previewContent) {
      onContentLoaded(previewContent)
      onClose()
    }
  }

  const resetModal = () => {
    setFile(null)
    setResult(null)
    setError('')
    setConverting(false)
    setPreviewContent('')
    setShowPreview(false)
    onClose()
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">PDF to Word Converter</h2>
        <button onClick={resetModal} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Preview Content */}
      {showPreview ? (
        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Converted Content Preview</h3>
              {result && (
                <p className="text-sm text-green-600">
                  Conversion Success: {result.success_percentage}% ({result.converted_pages}/{result.total_pages} pages)
                </p>
              )}
            </div>
          </div>
          
          <div className="flex-1 border rounded-lg p-4 overflow-auto mb-4 bg-gray-50">
            <div dangerouslySetInnerHTML={{ __html: previewContent }} />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleClosePreview}
              className="flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 text-lg"
            >
              Discard & Close
            </button>
            <button
              onClick={handleConfirmLoad}
              className="flex-1 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 text-lg"
            >
              Load to Editor
            </button>
          </div>
        </div>
      ) : (
        /* Upload Interface */
        <div className="max-w-md mx-auto">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg text-gray-600">
              {file ? file.name : 'Drop PDF file here or click to browse'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Convert Button */}
          {file && !result && (
            <button
              onClick={handleConvert}
              disabled={converting}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-6 text-lg"
            >
              {converting ? 'Converting...' : 'Convert to Word'}
            </button>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}