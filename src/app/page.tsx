"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Folder, File, ChevronRight, Upload } from "lucide-react"

// Updated mock data with file type and size
const mockData = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    children: [
      { id: "1-1", name: "Report", type: "file", fileType: "docx", size: "2.3 MB", url: "#" },
      { id: "1-2", name: "Presentation", type: "file", fileType: "pptx", size: "5.1 MB", url: "#" },
    ],
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    children: [
      { id: "2-1", name: "Vacation", type: "file", fileType: "jpg", size: "3.2 MB", url: "#" },
      { id: "2-2", name: "Family", type: "file", fileType: "png", size: "4.7 MB", url: "#" },
    ],
  },
  { id: "3", name: "Budget", type: "file", fileType: "xlsx", size: "1.8 MB", url: "#" },
  { id: "4", name: "Project", type: "file", fileType: "pdf", size: "6.5 MB", url: "#" },
]

export default function GoogleDriveUI() {
  const [currentFolder, setCurrentFolder] = useState<string[]>([])

  const getCurrentItems = () => {
    let items = mockData
    for (const folderId of currentFolder) {
      const folder = items.find((item) => item.id === folderId && item.type === "folder")
      if (folder && "children" in folder) {
        items = folder.children
      } else {
        break
      }
    }
    return items
  }

  const navigateToFolder = (folderId: string) => {
    setCurrentFolder((prev) => [...prev, folderId])
  }

  const navigateToBreadcrumb = (index: number) => {
    setCurrentFolder((prev) => prev.slice(0, index))
  }

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      { id: "root", name: "My Drive" },
      ...currentFolder.map((folderId, index) => {
        const folder = mockData.find((item) => item.id === folderId)
        return { id: folderId, name: folder ? folder.name : `Folder ${index + 1}` }
      }),
    ]

    return (
      <div className="flex items-center space-x-2 text-sm mb-4">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.id} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
            <button onClick={() => navigateToBreadcrumb(index)} className="hover:underline focus:outline-none">
              {crumb.name}
            </button>
          </div>
        ))}
      </div>
    )
  }

  const renderItem = (item: any) => {
    const isFolder = item.type === "folder"

    return (
      <div
        key={item.id}
        className="flex items-center h-16 px-6 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 group"
        onClick={() => isFolder && navigateToFolder(item.id)}
      >
        <div className="flex items-center flex-grow min-w-0">
          {isFolder ? (
            <Folder className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />
          ) : (
            <File className="w-6 h-6 mr-4 text-gray-400 flex-shrink-0" />
          )}
          <span className="truncate text-base">{item.name}</span>
        </div>
        {!isFolder && (
          <>
            <span className="text-sm text-gray-400 mr-8 uppercase tracking-wider">{item.fileType}</span>
            <span className="text-sm text-gray-400 w-24 text-right">{item.size}</span>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <svg viewBox="0 0 87.3 78" className="w-8 h-8 mr-2" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
                fill="#0066da"
              />
              <path
                d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
                fill="#00ac47"
              />
              <path
                d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
                fill="#ea4335"
              />
              <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
              <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
              <path
                d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
                fill="#ffba00"
              />
            </svg>
            <span className="text-2xl font-semibold">Google Drive</span>
          </div>
          <Button variant="secondary" size="lg" className="text-base bg-gray-800 hover:bg-gray-700 border-gray-700">
            <Upload className="w-5 h-5 mr-2" />
            Upload
          </Button>
        </div>

        {renderBreadcrumbs()}

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex items-center h-12 px-6 bg-gray-700 text-sm font-medium text-gray-300">
            <span className="flex-grow">Name</span>
            <span className="mr-8 w-16 text-center">Type</span>
            <span className="w-24 text-right">Size</span>
          </div>
          {getCurrentItems().map(renderItem)}
        </div>
      </div>
    </div>
  )
}

