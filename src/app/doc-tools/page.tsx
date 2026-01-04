'use client'

import { useState } from 'react'
import DocToolLayout from './layouts/DocToolLayout'

export default function DocCreationPage() {
  const [documentContent, setDocumentContent] = useState<string>('')

  return (
    <DocToolLayout>
      <div className="h-full p-4">
        <textarea
          value={documentContent}
          onChange={(e) => setDocumentContent(e.target.value)}
          className="w-full h-full p-4 border-0 resize-none focus:outline-none text-gray-900 bg-white"
          style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt' }}
          placeholder="Start typing your document..."
        />
      </div>
    </DocToolLayout>
  )
}