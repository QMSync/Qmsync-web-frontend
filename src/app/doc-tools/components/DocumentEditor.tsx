'use client'

import { useEffect } from 'react'

interface DocumentEditorProps {
  content: string
  onContentChange: (content: string) => void
  template: string
}

export default function DocumentEditor({ content, onContentChange, template }: DocumentEditorProps) {
  useEffect(() => {
    if (template && !content) {
      const templateContent = getTemplateContent(template)
      onContentChange(templateContent)
    }
  }, [template, content, onContentChange])

  const getTemplateContent = (templateType: string): string => {
    const templates = {
      'meeting-notes': '# Meeting Notes\n\n**Date:** \n**Attendees:** \n\n## Agenda\n\n## Discussion Points\n\n## Action Items\n\n## Next Steps\n',
      'project-plan': '# Project Plan\n\n**Project Name:** \n**Start Date:** \n**End Date:** \n\n## Objectives\n\n## Scope\n\n## Timeline\n\n## Resources\n\n## Risks\n',
      'report': '# Report\n\n**Title:** \n**Author:** \n**Date:** \n\n## Executive Summary\n\n## Introduction\n\n## Findings\n\n## Recommendations\n\n## Conclusion\n'
    }
    return templates[templateType as keyof typeof templates] || ''
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Document Editor</h2>
      </div>
      <div className="p-4">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-96 p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Start typing your document..."
        />
      </div>
    </div>
  )
}