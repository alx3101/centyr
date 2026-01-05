'use client'

import { useState } from 'react'

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)

    // Get auth token from localStorage
    const token = localStorage.getItem('auth_token')
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      // Call backend directly instead of going through Next.js middleware
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://51.44.133.83'
      const response = await fetch(`${backendUrl}/api/v1/upload`, {
        method: 'POST',
        headers,
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setResult({ error: data.message || data.detail || 'Upload failed' })
      } else {
        setResult(data)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      setResult({ error: 'Upload failed' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold"
        >
          Choose an image
        </label>
        <p className="text-gray-500 mt-2">or drag and drop</p>

        {selectedFile && (
          <div className="mt-6">
            <p className="text-gray-700 mb-4">Selected: {selectedFile.name}</p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {uploading ? 'Processing...' : 'Process Image'}
            </button>
          </div>
        )}

        {result && (
          <div className="mt-6">
            {result.error ? (
              <p className="text-red-600">Error: {result.error}</p>
            ) : (
              <p className="text-green-600">Success! Image processed.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
