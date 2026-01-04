'use client'

interface ExportOptionsProps {
  documentContent: string
}

export default function ExportOptions({ documentContent }: ExportOptionsProps) {
  const handleExport = (format: string) => {
    if (!documentContent.trim()) {
      alert('Please add some content before exporting')
      return
    }

    const blob = new Blob([documentContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `document.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Export Options</h2>
      </div>
      <div className="p-4 space-y-3">
        <button
          onClick={() => handleExport('txt')}
          className="w-full p-2 text-left hover:bg-gray-50 rounded-md flex items-center space-x-2"
        >
          <span>📄</span>
          <span>Export as TXT</span>
        </button>
        <button
          onClick={() => handleExport('md')}
          className="w-full p-2 text-left hover:bg-gray-50 rounded-md flex items-center space-x-2"
        >
          <span>📝</span>
          <span>Export as Markdown</span>
        </button>
      </div>
    </div>
  )
}