'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { api, JobResponse, JobStatus } from '@/lib/api'
import { AuthGuard } from '@/components/guards/AuthGuard'

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

      // Use the download endpoint which handles both single and batch jobs
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${job.job_id}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Download failed')
      }

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = job.batch_mode ? `${job.job_name || 'batch'}.zip` : `processed-${job.job_id}.jpg`

      if (contentDisposition) {
        const matches = /filename="?([^"]+)"?/.exec(contentDisposition)
        if (matches && matches[1]) {
          filename = matches[1]
        }
      }

      // Download the file
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

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED:
        return 'text-green-600 bg-green-100 border-green-300'
      case JobStatus.PROCESSING:
        return 'text-blue-600 bg-blue-100 border-blue-300'
      case JobStatus.FAILED:
        return 'text-red-600 bg-red-100 border-red-300'
      case JobStatus.PENDING:
        return 'text-yellow-600 bg-yellow-100 border-yellow-300'
      default:
        return 'text-gray-600 bg-gray-100 border-gray-300'
    }
  }

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED:
        return '✓'
      case JobStatus.PROCESSING:
        return '⟳'
      case JobStatus.FAILED:
        return '✗'
      case JobStatus.PENDING:
        return '○'
      default:
        return '?'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Job</h2>
            <p className="text-red-500 mb-6">{error || 'Job not found'}</p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 gradient-purple-fuchsia text-white font-semibold rounded-xl hover:scale-105 transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-purple-600 transition-colors">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">Job Details</span>
        </nav>

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.job_name || 'Job Details'}</h1>
              <p className="text-gray-600 font-mono text-sm">ID: {job.job_id}</p>
              {job.batch_mode && job.image_count && (
                <p className="text-sm text-purple-600 font-semibold mt-1">
                  Batch Job · {job.image_count} images
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {job.status === JobStatus.COMPLETED && job.output_image_url && (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-6 py-3 gradient-purple-fuchsia text-white font-semibold rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <span>⬇</span>
                      Download
                    </>
                  )}
                </button>
              )}
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 hover:scale-105 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 font-semibold ${getStatusColor(job.status)}`}>
                <span>{getStatusIcon(job.status)}</span>
                <span className="capitalize">{job.status}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Created</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(job.created_at).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(job.created_at).toLocaleTimeString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Updated</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(job.updated_at).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(job.updated_at).toLocaleTimeString()}
              </p>
            </div>
            {job.processing_time && (
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Processing Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {job.processing_time.toFixed(2)}s
                </p>
              </div>
            )}
          </div>
          {job.error_message && (
            <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-red-600 mb-1">Error Message</p>
              <p className="text-red-700">{job.error_message}</p>
            </div>
          )}
        </div>

        {/* Image Comparison - Batch Jobs */}
        {job.status === JobStatus.COMPLETED && job.batch_mode && job.outputs && job.outputs.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Batch Results ({job.outputs.length} images)
            </h2>
            <div className="space-y-6">
              {job.outputs.map((output, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Image {index + 1}</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Original Image */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-md font-semibold text-gray-700">Original</h4>
                        <span className="text-xs text-gray-500">Input</span>
                      </div>
                      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
                        <Image
                          src={output.input_url ?? '/placeholder.jpg'}
                          alt={`Original image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <span className="font-semibold">Format:</span> {output.input_format}
                        </div>
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <span className="font-semibold">Size:</span> {output.input_width}×{output.input_height}px
                        </div>
                      </div>
                    </div>

                    {/* Processed Image */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-md font-semibold text-gradient">Processed</h4>
                        <span className="text-xs text-green-600 font-semibold">✓ Complete</span>
                      </div>
                      <div className="relative aspect-video bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-lg overflow-hidden border-2 border-purple-300 glow-purple">
                        <Image
                          src={output.output_url}
                          alt={`Processed image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <span className="font-semibold">Format:</span> {output.output_format}
                        </div>
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <span className="font-semibold">Size:</span> {output.output_width}×{output.output_height}px
                        </div>
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <span className="font-semibold">Time:</span> {output.processing_time ? Number(output.processing_time).toFixed(2) : 'N/A'}s
                        </div>
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <span className="font-semibold">Status:</span> {output.status}
                        </div>
                      </div>
                      <a
                        href={output.output_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-4 py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                      >
                        Download Image {index + 1}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Comparison - Single Jobs */}
        {job.status === JobStatus.COMPLETED && !job.batch_mode && job.input_image_url && job.output_image_url && (
          <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Image Comparison</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original Image */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-700">Original</h3>
                  <span className="text-sm text-gray-500">Input</span>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border-2 border-gray-300">
                  <Image
                    src={job.input_image_url}
                    alt="Original image"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Processed Image */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gradient">Processed</h3>
                  <span className="text-sm text-purple-600 font-semibold">✓ Complete</span>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl overflow-hidden border-2 border-purple-300 glow-purple">
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
          <div className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {job.status === JobStatus.PROCESSING ? 'Processing...' : 'Pending...'}
            </h3>
            <p className="text-gray-600">
              Your image is being processed. This page will update automatically.
            </p>
          </div>
        )}

        {/* Failed State */}
        {job.status === JobStatus.FAILED && (
          <div className="bg-white/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-red-600">✗</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Failed</h3>
            <p className="text-gray-600 mb-6">
              {job.error_message || 'An error occurred while processing your image.'}
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 gradient-purple-fuchsia text-white font-semibold rounded-xl hover:scale-105 transition-all"
            >
              Try Another Image
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
