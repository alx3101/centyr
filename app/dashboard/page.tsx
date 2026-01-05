'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Upload, Download, Loader, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { SkeletonDashboard } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'

interface ProcessingJob {
  job_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  processed_count: number
  total_count: number
  created_at: string
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const currentJobId = searchParams?.get('job')
  const { user, refreshUser } = useAuth()

  const [currentJob, setCurrentJob] = useState<ProcessingJob | null>(null)
  const [recentJobs, setRecentJobs] = useState<ProcessingJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (currentJobId) {
      pollJobStatus(currentJobId)
    }
    loadRecentJobs()
    refreshUser() // Aggiorna i dati utente
  }, [currentJobId])

  const pollJobStatus = async (jobId: string) => {
    const token = localStorage.getItem('auth_token')

    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${jobId}/status`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()
        setCurrentJob(data)

        if (data.status === 'completed') {
          clearInterval(interval)
          toast.success('Processing completed!')
          refreshUser() // Aggiorna usage
        } else if (data.status === 'failed') {
          clearInterval(interval)
          toast.error('Processing failed')
        }
      } catch (error) {
        console.error('Error polling job status:', error)
      }
    }, 2000)

    return () => clearInterval(interval)
  }

  const loadRecentJobs = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setRecentJobs(data.jobs || [])
      }
    } catch (error) {
      console.error('Error loading jobs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (jobId: string) => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/images/download/${jobId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()
      window.open(data.download_url, '_blank')
      toast.success('Download started!')
    } catch (error) {
      toast.error('Download failed')
    }
  }

  const usagePercentage = user
    ? (user.subscription.usage / user.subscription.quota) * 100
    : 0

  if (!user) {
    return <SkeletonDashboard />
  }

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username || user.email.split('@')[0]}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your images
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Plan</h3>
              <span className="px-3 py-1 gradient-purple-fuchsia text-white text-xs font-bold rounded-full">
                {user.subscription.plan.toUpperCase()}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{user.subscription.quota}</p>
            <p className="text-sm text-gray-500">images/month</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Usage This Month</h3>
            <div className="flex items-end gap-2 mb-2">
              <p className="text-3xl font-bold text-gray-900">{user.subscription.usage}</p>
              <p className="text-lg text-gray-500 mb-1">/ {user.subscription.quota}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="gradient-purple-fuchsia h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Remaining</h3>
            <p className="text-3xl font-bold text-gradient">
              {user.subscription.quota - user.subscription.usage}
            </p>
            <p className="text-sm text-gray-500">images left</p>
            {user.subscription.quota - user.subscription.usage < 10 && (
              <Link
                href="/pricing"
                className="text-sm text-primary-600 hover:text-fuchsia-600 font-semibold mt-2 inline-block"
              >
                Upgrade plan →
              </Link>
            )}
          </div>
        </div>

        {/* Current Processing Job */}
        {currentJob && currentJob.status !== 'completed' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-fuchsia-300 shadow-xl mb-8 glow-purple animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Loader className="w-6 h-6 text-fuchsia-600 animate-spin" />
                Processing Images...
              </h2>
              <span className="text-sm text-gray-600">Job ID: {currentJob.job_id?.slice(0, 8) || 'N/A'}</span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{currentJob.processed_count} / {currentJob.total_count} images</span>
                <span>{currentJob.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="gradient-animated h-4 rounded-full transition-all duration-500"
                  style={{ width: `${currentJob.progress}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-600">
              Estimated time remaining: ~{((currentJob.total_count - currentJob.processed_count) * 3)} seconds
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <Link
            href="/upload"
            className="inline-flex items-center gap-3 gradient-purple-fuchsia text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple"
          >
            <Upload className="w-6 h-6" />
            Upload New Images
          </Link>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Jobs</h2>

          {isLoading ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 text-primary-600 animate-spin mx-auto" />
            </div>
          ) : recentJobs.length === 0 ? (
            <EmptyState
              icon={Upload}
              title="No processing jobs yet"
              description="Upload your first images to get started"
              action={
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 gradient-purple-fuchsia text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
                >
                  <Upload className="w-5 h-5" />
                  Upload Images
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.job_id}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-fuchsia-300 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {job.status === 'completed' && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                    {job.status === 'processing' && (
                      <Loader className="w-6 h-6 text-primary-600 animate-spin" />
                    )}
                    {job.status === 'failed' && (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    {job.status === 'pending' && (
                      <Clock className="w-6 h-6 text-gray-400" />
                    )}

                    <div>
                      <p className="font-semibold text-gray-900">
                        {job.total_count} images
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(job.created_at).toLocaleDateString()} at{' '}
                        {new Date(job.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${job.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : job.status === 'processing'
                          ? 'bg-blue-100 text-blue-700'
                          : job.status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {job.status}
                    </span>

                    {job.status === 'completed' && (
                      <button
                        onClick={() => handleDownload(job.job_id)}
                        className="flex items-center gap-2 px-4 py-2 gradient-purple-fuchsia text-white rounded-lg font-semibold hover:scale-105 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<SkeletonDashboard />}>
      <DashboardContent />
    </Suspense>
  )
}
