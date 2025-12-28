'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Upload, X, Check, Loader } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface UploadedFile {
  file: File
  preview: string
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
}

export default function UploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
      progress: 0,
    }))
    setFiles([...files, ...newFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 100,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
  }

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      files.forEach(({ file }) => {
        formData.append('files', file)
      })

      const token = localStorage.getItem('auth_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/process`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Processing failed')
      }

      setJobId(data.job_id)
      toast.success('Processing started! Redirecting to dashboard...')

      // Update file statuses
      setFiles(files.map(f => ({ ...f, status: 'processing' as const })))

      // Redirect to dashboard to see progress
      setTimeout(() => {
        router.push(`/dashboard?job=${data.job_id}`)
      }, 2000)
    } catch (error: any) {
      toast.error(error.message || 'Processing failed')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upload Your Product Images
          </h1>
          <p className="text-xl text-gray-600">
            Drag & drop your images and let our AI align them perfectly
          </p>
        </div>

        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-2xl p-12 mb-8
            transition-all duration-300 cursor-pointer
            bg-white/80 backdrop-blur-sm
            ${isDragActive
              ? 'border-fuchsia-500 bg-fuchsia-50 scale-105'
              : 'border-purple-300 hover:border-fuchsia-400 hover:shadow-lg'
            }
            animate-fade-in-up
          `}
          style={{ animationDelay: '0.1s' }}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 gradient-purple-fuchsia rounded-full flex items-center justify-center mb-6 glow-purple">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-3">
              {isDragActive ? 'Drop your images here' : 'Drag & drop product images'}
            </p>
            <p className="text-gray-600 mb-4">
              or click to browse from your computer
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-sm text-gray-500">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">JPG</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">PNG</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">WebP</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Max 50MB each</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Up to 100 files</span>
            </div>
          </div>
        </div>

        {/* Uploaded Files Preview */}
        {files.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-purple-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Uploaded Images ({files.length})
              </h2>
              <button
                onClick={() => setFiles([])}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors font-semibold"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((uploadedFile, index) => (
                <div
                  key={index}
                  className="relative group animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-purple-100 group-hover:border-fuchsia-400 transition-all">
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Status indicator */}
                  <div className="absolute top-2 left-2">
                    {uploadedFile.status === 'pending' && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                    )}
                    {uploadedFile.status === 'processing' && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Loader className="w-4 h-4 text-primary-600 animate-spin" />
                      </div>
                    )}
                    {uploadedFile.status === 'completed' && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  {uploadedFile.status === 'pending' && (
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}

                  <p className="text-xs text-gray-600 mt-2 truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-gray-400">{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Button */}
        {files.length > 0 && (
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="gradient-purple-fuchsia text-white px-12 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl glow-purple-strong disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  Processing {files.length} images...
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6" />
                  Process {files.length} {files.length === 1 ? 'Image' : 'Images'}
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Estimated time: ~{files.length * 3} seconds
            </p>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-100 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">~3 seconds per image</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-100 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Pixel Perfect</h3>
            <p className="text-sm text-gray-600">AI-powered alignment</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-100 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">Encrypted & deleted after 30 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}
