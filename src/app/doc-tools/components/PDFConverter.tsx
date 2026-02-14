'use client'

import { useState } from 'react'

interface ConversionResult {
  id: number
  message: string
  status: string
  total_pages: number
  converted_pages: number
  success_percentage: number
  download_url: string
}

export default function PDFConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [converting, setConverting] = useState(false)
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState<string>('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setError('')
        setResult(null)
      } else {
        setError('Please select a PDF file')
        setFile(null)
      }
    }
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
      } else {
        setError(data.error || 'Conversion failed')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setConverting(false)
    }
  }

  const handleDownload = async () => {
    if (!result) return

    try {
      const response = await fetch(`http://localhost:8000${result.download_url}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = file?.name?.replace('.pdf', '.docx') || 'converted.docx'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
    } catch (err) {
      setError('Download failed')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-4">PDF to Word Converter</h2>
      
      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select PDF File
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Convert Button */}
      {file && (
        <div className="mb-4">
          <button
            onClick={handleConvert}
            disabled={converting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {converting ? 'Converting...' : 'Convert to Word'}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Conversion Result */}
      {result && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-medium text-green-800 mb-2">Conversion Complete!</h3>
          <div className="text-sm text-green-700 space-y-1">
            <p>Total Pages: {result.total_pages}</p>
            <p>Converted Pages: {result.converted_pages}</p>
            <p>Success Rate: {result.success_percentage}%</p>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-green-600 mb-1">
              <span>Conversion Progress</span>
              <span>{result.success_percentage}%</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${result.success_percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
          >
            Download Word File
          </button>
        </div>
      )}
    </div>
  )
}