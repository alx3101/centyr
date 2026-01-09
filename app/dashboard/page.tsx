'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Upload, Download, Loader, CheckCircle, XCircle, Clock, ImageIcon } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { SkeletonDashboard } from '@/components/ui/Skeleton'
import EmptyState from '@/components/EmptyState'
import OnboardingChecklist from '@/components/OnboardingChecklist'
import PostDownloadModal from '@/components/PostDownloadModal'
import QuotaWarningBanner from '@/components/QuotaWarningBanner'

interface ProcessingJob {
  job_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  processed_count: number
  total_count: number
  created_at: string
  job_name?: string
  image_count?: number
  batch_mode?: boolean
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const currentJobId = searchParams?.get('job')
  const { user, refreshUser } = useAuth()

  const [currentJob, setCurrentJob] = useState<ProcessingJob | null>(null)
  const [recentJobs, setRecentJobs] = useState<ProcessingJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showPostDownloadModal, setShowPostDownloadModal] = useState(false)

  // Onboarding checklist items
  const checklistItems = [
    {
      id: 'upload',
      title: 'Upload your first image',
      description: 'Try our AI-powered alignment with a product photo',
      completed: recentJobs.length > 0,
      action: {
        label: 'Upload Now',
        href: '/upload'
      }
    },
    {
      id: 'download',
      title: 'Download your result',
      description: 'Get your perfectly aligned image',
      completed: recentJobs.some(job => job.status === 'completed'),
      action: {
        label: 'View Jobs',
        href: '#recent-jobs'
      }
    },
    {
      id: 'explore',
      title: 'Explore features',
      description: 'Check out bulk upload and other pro features',
      completed: false,
      action: {
        label: 'Learn More',
        href: '/pricing'
      }
    }
  ]


  useEffect(() => {
    if (currentJobId) {
      pollJobStatus(currentJobId)
    }
    loadRecentJobs()
    refreshUser()
  }, [currentJobId])

  const pollJobStatus = async (jobId: string) => {
    const token = localStorage.getItem('auth_token')
    let pollCount = 0
    const MAX_POLL_ATTEMPTS = 300 // Max 5 minutes at 5s interval (300 * 5s = 1500s = 25 min)

    const interval = setInterval(async () => {
      pollCount++

      // Stop polling after max attempts
      if (pollCount > MAX_POLL_ATTEMPTS) {
        console.log('Max polling attempts reached, stopping')
        clearInterval(interval)
        toast.error('Job processing is taking longer than expected')
        return
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${jobId}/status`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        )

        // If job not found (404) or any error, stop polling
        if (!response.ok) {
          if (response.status === 404) {
            console.log('Job not found, stopping polling')
            clearInterval(interval)
            // Remove job query param from URL
            window.history.replaceState({}, '', '/dashboard')
            return
          }
          // For other errors (500, 429, etc), also stop polling to avoid spam
          console.error(`Error ${response.status}, stopping polling`)
          clearInterval(interval)
          return
        }

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
        // Stop polling on network errors too
        clearInterval(interval)
      }
    }, 5000) // Increased from 2s to 5s to reduce API calls

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${jobId}/download`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Download failed')
      }

      // Get the blob from response
      const blob = await response.blob()

      // Extract filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = 'aligned_image.jpg'
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()

      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('Download completed!')

      // Show post-download modal after successful download
      setTimeout(() => {
        setShowPostDownloadModal(true)
      }, 500)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download failed')
    }
  }

  const usagePercentage = user?.subscription?.usage_percentage ?? 0

  if (!user) {
    return <SkeletonDashboard />
  }

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.email.split('@')[0]}!
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
                {user.subscription.plan_name.toUpperCase()}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{user.subscription.monthly_limit}</p>
            <p className="text-sm text-gray-500">jobs/month</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Usage This Month</h3>
            <div className="flex items-end gap-2 mb-2">
              <p className="text-3xl font-bold text-gray-900">{user.subscription.current_period_uploads}</p>
              <p className="text-lg text-gray-500 mb-1">/ {user.subscription.monthly_limit}</p>
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
              {user.subscription.monthly_limit - user.subscription.current_period_uploads}
            </p>
            <p className="text-sm text-gray-500">jobs left</p>
            {user.subscription.monthly_limit - user.subscription.current_period_uploads < user.subscription.monthly_limit / 2 && (
              <Link
                href="/pricing"
                className="text-sm text-primary-600 hover:text-fuchsia-600 font-semibold mt-2 inline-block"
              >
                Upgrade plan →
              </Link>
            )}
          </div>
        </div>

        {/* Quota Warning Banner */}
        <QuotaWarningBanner
          currentUploads={user.subscription.current_period_uploads}
          limit={user.subscription.monthly_limit}
          plan={user.subscription.plan_name}
        />

        {/* Onboarding Checklist - Show if user is new */}
        {showOnboarding && recentJobs.length < 3 && (
          <OnboardingChecklist
            items={checklistItems}
            onDismiss={() => setShowOnboarding(false)}
          />
        )}

        {/* Current Processing Job */}
        {currentJob && currentJob.status !== 'completed' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-fuchsia-300 shadow-xl mb-8 glow-purple animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Loader className="w-6 h-6 text-fuchsia-600 animate-spin" />
                {currentJob.job_name || 'Processing...'}
              </h2>
              <span className="text-sm text-gray-600">Job ID: {currentJob.job_id?.slice(0, 8) || 'N/A'}</span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{currentJob.processed_count || 0} / {currentJob.total_count || currentJob.image_count || 1} images</span>
                <span>{currentJob.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="gradient-animated h-4 rounded-full transition-all duration-500"
                  style={{ width: `${currentJob.progress || 0}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-600">
              Estimated time remaining: ~{Math.max(0, ((currentJob.total_count || currentJob.image_count || 1) - (currentJob.processed_count || 0)) * 3)} seconds
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
              title="No jobs processed yet"
              description="Upload your first product photo to see the magic of AI-powered alignment"
              actionLabel="Upload Now"
              actionHref="/upload"
              secondaryLabel="Watch Demo"
              onSecondaryAction={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
              tips={[
                'Works best with JPG/PNG files',
                'White or grey backgrounds give best results',
                'Process multiple images in bulk with Pro plan'
              ]}
            />
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <Link
                  key={job.job_id}
                  href={`/dashboard/jobs/${job.job_id}`}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-fuchsia-300 hover:bg-purple-50/50 transition-all cursor-pointer group"
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
                      <p className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {job.job_name || 'Untitled'}
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
                        onClick={(e) => {
                          e.preventDefault()
                          handleDownload(job.job_id)
                        }}
                        className="flex items-center gap-2 px-4 py-2 gradient-purple-fuchsia text-white rounded-lg font-semibold hover:scale-105 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Post-Download Modal */}
        <PostDownloadModal
          isOpen={showPostDownloadModal}
          onClose={() => setShowPostDownloadModal(false)}
          userPlan={user.subscription.plan_name as 'free' | 'pro' | 'enterprise'}
          remainingUploads={user.subscription.monthly_limit - user.subscription.current_period_uploads}
          totalLimit={user.subscription.monthly_limit}
        />
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
