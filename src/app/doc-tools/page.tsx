'use client'

import { useState } from 'react'
import DocToolLayout from './layouts/DocToolLayout'
import RichTextEditor from './components/RichTextEditor'
import PDFUploadModal from './components/PDFUploadModal'

export default function DocCreationPage() {
  const [documentContent, setDocumentContent] = useState<string>('')
  const [currentView, setCurrentView] = useState<'editor' | 'pdf-upload'>('editor')

  const handlePdfUploadClick = () => {
    setCurrentView('pdf-upload')
  }

  const handlePdfContentLoaded = (content: string) => {
    setDocumentContent(content)
    setCurrentView('editor')
  }

  const handleBackToEditor = () => {
    setCurrentView('editor')
  }

  return (
    <DocToolLayout onPdfUploadClick={handlePdfUploadClick}>
      <div className="h-full">
        {currentView === 'pdf-upload' ? (
          <PDFUploadModal 
            isOpen={true} 
            onClose={handleBackToEditor}
            onContentLoaded={handlePdfContentLoaded}
            inline={true}
          />
        ) : (
          <RichTextEditor 
            content={documentContent}
            onContentChange={setDocumentContent}
          />
        )}
      </div>
    </DocToolLayout>
  )
}