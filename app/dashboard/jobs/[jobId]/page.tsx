'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { api, JobResponse, JobStatus } from '@/lib/api'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { ArrowLeft, Download, Trash2, Clock, CheckCircle, XCircle, Loader, Image as ImageIcon, Zap, Info, Upload } from 'lucide-react'

export default function JobDetailPage() {
  return (
    <AuthGuard>
      <JobDetailContent />
    </AuthGuard>
  )
}

function JobDetailContent() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string

  const [job, setJob] = useState<JobResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const jobData = await api.getJobDetails(jobId)
        setJob(jobData)
      } catch (err: any) {
        console.error('Failed to fetch job details:', err)
        setError(err.message || 'Failed to load job details')
      } finally {
        setIsLoading(false)
      }
    }

    if (jobId) {
      fetchJobDetails()
    }
  }, [jobId])

  const handleDownload = async () => {
    if (!job) return

    try {
      setIsDownloading(true)

      const token = localStorage.getItem('auth_token')
      if (!token) {
        alert('Please log in to download')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${job.job_id}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Download failed')
      }

      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = job.batch_mode ? `${job.job_name || 'batch'}.zip` : `processed-${job.job_id}.jpg`

      if (contentDisposition) {
        const matches = /filename="?([^"]+)"?/.exec(contentDisposition)
        if (matches && matches[1]) {
          filename = matches[1]
        }
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
      alert('Failed to download')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job?')) return

    try {
      await api.deleteJob(jobId)
      router.push('/dashboard')
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete job')
    }
  }

  const getStatusConfig = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED:
        return {
          color: 'bg-green-100 text-green-700 border-green-300',
          icon: <CheckCircle className="w-5 h-5" />,
          label: 'Completed'
        }
      case JobStatus.PROCESSING:
        return {
          color: 'bg-blue-100 text-blue-700 border-blue-300',
          icon: <Loader className="w-5 h-5 animate-spin" />,
          label: 'Processing'
        }
      case JobStatus.FAILED:
        return {
          color: 'bg-red-100 text-red-700 border-red-300',
          icon: <XCircle className="w-5 h-5" />,
          label: 'Failed'
        }
      case JobStatus.PENDING:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-300',
          icon: <Clock className="w-5 h-5" />,
          label: 'Pending'
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-300',
          icon: <Info className="w-5 h-5" />,
          label: 'Unknown'
        }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading job details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Job</h2>
            <p className="text-red-600 mb-6 font-medium">{error || 'Job not found'}</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusConfig = getStatusConfig(job.status)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-8 px-4 md:px-8 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">Job Details</span>
        </nav>

        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-6 mb-6 shadow-lg animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gradient">
                  {job.job_name || 'Untitled Job'}
                </h1>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 ${statusConfig.color} font-bold`}>
                  {statusConfig.icon}
                  <span className="text-sm">{statusConfig.label}</span>
                </div>
              </div>
              <p className="text-gray-600 font-mono text-sm mb-2">Job ID: {job.job_id}</p>
              {job.batch_mode && job.image_count && (
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <ImageIcon className="w-4 h-4" />
                  Batch Job · {job.image_count} images
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {job.status === JobStatus.COMPLETED && job.output_image_url && (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white font-bold rounded-xl hover:scale-105 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download
                    </>
                  )}
                </button>
              )}
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 hover:scale-105 transition-all shadow-md"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Status Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg gradient-purple-fuchsia flex items-center justify-center shadow-md">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Created</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{new Date(job.created_at).toLocaleDateString()}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(job.created_at).toLocaleTimeString()}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg gradient-purple-fuchsia flex items-center justify-center shadow-md">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Updated</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{new Date(job.updated_at).toLocaleDateString()}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(job.updated_at).toLocaleTimeString()}</p>
          </div>

          {job.processing_time && (
            <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Processing</p>
              </div>
              <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {job.processing_time.toFixed(2)}s
              </p>
              <p className="text-xs text-gray-500 mt-1">Total time</p>
            </div>
          )}

          {job.image_count && job.image_count > 0 && (
            <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Images</p>
              </div>
              <p className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {job.image_count}
              </p>
              <p className="text-xs text-gray-500 mt-1">{job.batch_mode ? 'Batch mode' : 'Single'}</p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {job.error_message && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6 shadow-lg animate-fade-in-up">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-red-700 mb-1">Error Message</p>
                <p className="text-red-600">{job.error_message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Batch Results */}
        {job.status === JobStatus.COMPLETED && job.batch_mode && job.outputs && job.outputs.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-6 shadow-lg animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-purple-600" />
              Batch Results
              <span className="text-sm font-normal text-gray-500">({job.outputs.length} images)</span>
            </h2>
            <div className="space-y-6">
              {job.outputs.map((output, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50/50 to-fuchsia-50/50 border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-3 py-1 rounded-full text-sm">
                      #{index + 1}
                    </span>
                    Image {index + 1}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Original */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-700">Original</h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Input</span>
                      </div>
                      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 shadow-md">
                        {output.input_url && (
                          <Image
                            src={output.input_url}
                            alt={`Original image ${index + 1}`}
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                          <span className="font-semibold text-gray-600">Format:</span> <span className="text-gray-900">{output.input_format}</span>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                          <span className="font-semibold text-gray-600">Size:</span> <span className="text-gray-900">{output.input_width}×{output.input_height}px</span>
                        </div>
                      </div>
                    </div>

                    {/* Processed */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gradient">Processed</h4>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Complete
                        </span>
                      </div>
                      <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl overflow-hidden border-2 border-purple-300 glow-purple shadow-md">
                        <Image
                          src={output.output_url}
                          alt={`Processed image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="bg-white rounded-lg px-3 py-2 border border-purple-200">
                          <span className="font-semibold text-gray-600">Format:</span> <span className="text-gray-900">{output.output_format}</span>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-purple-200">
                          <span className="font-semibold text-gray-600">Size:</span> <span className="text-gray-900">{output.output_width}×{output.output_height}px</span>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-purple-200">
                          <span className="font-semibold text-gray-600">Time:</span> <span className="text-gray-900">{output.processing_time ? Number(output.processing_time).toFixed(2) : 'N/A'}s</span>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-purple-200">
                          <span className="font-semibold text-gray-600">Status:</span> <span className="text-green-600 capitalize">{output.status}</span>
                        </div>
                      </div>
                      <a
                        href={output.output_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 gradient-purple-fuchsia text-white rounded-lg hover:scale-105 transition-all font-bold shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        Download Image {index + 1}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Single Image Comparison */}
        {job.status === JobStatus.COMPLETED && !job.batch_mode && job.input_image_url && job.output_image_url && (
          <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-6 shadow-lg animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-purple-600" />
              Image Comparison
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-700">Original</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Input</span>
                </div>
                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 shadow-md">
                  <Image
                    src={job.input_image_url}
                    alt="Original image"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Processed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gradient">Processed</h3>
                  <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </span>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl overflow-hidden border-2 border-purple-300 glow-purple shadow-md">
                  <Image
                    src={job.output_image_url}
                    alt="Processed image"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing/Pending State */}
        {(job.status === JobStatus.PROCESSING || job.status === JobStatus.PENDING) && (
          <div className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-12 text-center shadow-xl animate-scale-in">
            <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {job.status === JobStatus.PROCESSING ? 'Processing Your Image' : 'Job Queued'}
            </h3>
            <p className="text-gray-600 text-lg">
              {job.status === JobStatus.PROCESSING
                ? 'Your image is being processed by our AI. This usually takes a few seconds.'
                : 'Your job is queued and will start processing shortly.'}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-700">This page will update automatically</span>
            </div>
          </div>
        )}

        {/* Failed State */}
        {job.status === JobStatus.FAILED && !job.batch_mode && (
          <div className="bg-white/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-12 text-center shadow-xl animate-scale-in">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Processing Failed</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              {job.error_message || 'An error occurred while processing your image.'}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg"
              >
                <Upload className="w-5 h-5" />
                Try Another Image
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
