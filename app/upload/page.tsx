'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Upload, X, Check, Loader, Sparkles, Zap, Shield } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useUpload } from '@/hooks/useUpload'
import { useAuth } from '@/contexts/AuthContext'

export default function UploadPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { files, isUploading, addFiles, removeFile, clearFiles, uploadAndProcess } = useUpload()
  const [jobName, setJobName] = useState('')

  // Get max batch size from user subscription features
  const maxBatchSize = user?.subscription?.features?.max_batch_size || 1

  const onDrop = (acceptedFiles: File[]) => {
    // Check batch size limit
    const totalFiles = files.length + acceptedFiles.length
    if (totalFiles > maxBatchSize) {
      toast.error(`Maximum ${maxBatchSize} images per batch. ${user?.subscription?.plan_name === 'Free' ? 'Upgrade to process more at once!' : ''}`)
      // Only add up to the limit
      const remainingSlots = maxBatchSize - files.length
      if (remainingSlots > 0) {
        addFiles(acceptedFiles.slice(0, remainingSlots))
      }
      return
    }
    addFiles(acceptedFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    maxFiles: maxBatchSize,
  })

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    if (!jobName.trim()) {
      toast.error('Please enter a name for this job')
      return
    }

    const jobId = await uploadAndProcess(jobName.trim())
    if (jobId) {
      setTimeout(() => {
        router.push(`/dashboard?job=${jobId}`)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 border border-purple-100">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">AI-Powered Processing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upload Your <span className="text-gradient">Product Images</span>
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
          `}
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
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                Up to {maxBatchSize} {maxBatchSize === 1 ? 'file' : 'files'} per batch
              </span>
              {maxBatchSize === 1 && (
                <Link href="/pricing" className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full font-semibold hover:bg-fuchsia-200 transition-colors">
                  Upgrade for bulk upload ↗
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Job Name Input */}
        {files.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-purple-100 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <label htmlFor="jobName" className="block text-sm font-semibold text-gray-700 mb-2">
              Job Name *
            </label>
            <input
              type="text"
              id="jobName"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="e.g., Summer Collection 2024, Product Catalog, etc."
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-fuchsia-400 transition-colors"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-2">
              Give this batch a memorable name ({jobName.length}/100 characters)
            </p>
          </div>
        )}

        {/* Uploaded Files Preview */}
        {files.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-purple-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Uploaded Images ({files.length})
              </h2>
              <button
                onClick={clearFiles}
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
                      onClick={() => removeFile(uploadedFile.id)}
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
              disabled={isUploading}
              className="gradient-purple-fuchsia text-white px-12 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl glow-purple-strong disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
            >
              {isUploading ? (
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
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Lightning Fast</h3>
            <p className="text-sm text-gray-600">~3 seconds per image with our optimized AI</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-purple-fuchsia flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Pixel Perfect</h3>
            <p className="text-sm text-gray-600">AI-powered precision alignment every time</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Secure & Private</h3>
            <p className="text-sm text-gray-600">End-to-end encrypted, auto-deleted after 30 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}
