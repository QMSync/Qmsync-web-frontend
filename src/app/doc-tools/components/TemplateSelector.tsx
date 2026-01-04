'use client'

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateSelect: (template: string) => void
}

export default function TemplateSelector({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
  const templates = [
    { id: 'meeting-notes', name: 'Meeting Notes', icon: '📝' },
    { id: 'project-plan', name: 'Project Plan', icon: '📋' },
    { id: 'report', name: 'Report', icon: '📊' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Templates</h2>
      </div>
      <div className="p-4 space-y-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`w-full text-left p-3 rounded-md transition-colors ${
              selectedTemplate === template.id
                ? 'bg-blue-50 border-blue-200 border'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{template.icon}</span>
              <span className="font-medium">{template.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}