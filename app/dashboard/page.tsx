'use client'

import { useState, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Upload, Download, Loader, CheckCircle, XCircle, Clock, TrendingUp, Zap, Award, Sparkles, Activity } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRecentJobs } from '@/hooks/queries'
import { useJobStatus } from '@/hooks/useJobStatus'
import { SkeletonDashboard } from '@/components/ui/Skeleton'
import EmptyState from '@/components/EmptyState'
import OnboardingChecklist from '@/components/OnboardingChecklist'
import PostDownloadModal from '@/components/PostDownloadModal'
import QuotaWarningBanner from '@/components/QuotaWarningBanner'
import { useQueryClient } from '@tanstack/react-query'

interface Job {
  job_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  job_name?: string
  updated_at?: string
  output_image_url?: string
  error_message?: string
}

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
  const queryClient = useQueryClient()

  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showPostDownloadModal, setShowPostDownloadModal] = useState(false)

  // React Query for jobs list (cached, no duplicate calls)
  const { data: recentJobs = [], isLoading } = useRecentJobs(50) as { data: Job[], isLoading: boolean }

  // SSE for real-time job status (replaces polling)
  const { status: currentJobStatus, isConnected } = useJobStatus(currentJobId, {
    onComplete: async (data) => {
      await refreshUser()
      queryClient.invalidateQueries({ queryKey: ['jobs', 'recent'] })
      if (data.status === 'completed') {
        window.history.replaceState({}, '', '/dashboard')
      }
    },
    onError: (error) => {
      console.error('[Dashboard] SSE error:', error)
    }
  })

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

      const blob = await response.blob()
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = 'aligned_image.jpg'
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('Download completed!')

      setTimeout(() => {
        setShowPostDownloadModal(true)
      }, 500)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download failed')
    }
  }

  const usagePercentage = user?.subscription?.usage_percentage ?? 0

  // Memoize stats for performance
  const stats = useMemo(() => {
    if (!user) return null
    const completed = recentJobs.filter(j => j.status === 'completed').length
    const failed = recentJobs.filter(j => j.status === 'failed').length
    const processing = recentJobs.filter(j => j.status === 'processing').length
    const successRate = recentJobs.length > 0 ? Math.round((completed / recentJobs.length) * 100) : 0

    return { completed, failed, processing, successRate, total: recentJobs.length }
  }, [recentJobs, user])

  if (!user) {
    return <SkeletonDashboard />
  }

  const currentJob: ProcessingJob | null = currentJobStatus && currentJobId ? {
    job_id: currentJobId,
    status: currentJobStatus.status,
    progress: currentJobStatus.progress,
    processed_count: 0,
    total_count: 1,
    created_at: new Date().toISOString(),
    job_name: undefined
  } : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-8 px-4 md:px-8 overflow-hidden relative">
      {/* Background decoration matching home */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Welcome Message */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 border border-purple-100">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-700">
              {stats && stats.total > 0 ? `${stats.total} jobs processed` : 'Ready to process'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            Welcome back, <span className="text-gradient">{user.email.split('@')[0]}</span>!
          </h1>
          <p className="text-xl text-gray-600">
            Your AI-powered image processing hub
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Plan Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl gradient-purple-fuchsia flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 gradient-purple-fuchsia text-white text-xs font-bold rounded-full shadow-md">
                  {user.subscription.plan_name.toUpperCase()}
                </span>
              </div>
              <p className="text-4xl font-bold text-gradient mb-1">{user.subscription.monthly_limit}</p>
              <p className="text-sm text-gray-600 font-semibold">jobs per month</p>
            </div>
          </div>

          {/* Usage Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl gradient-purple-fuchsia flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Usage</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <p className="text-4xl font-bold text-gray-900">{user.subscription.current_period_uploads}</p>
                <p className="text-xl text-gray-400 font-bold">/ {user.subscription.monthly_limit}</p>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="gradient-purple-fuchsia h-2.5 rounded-full transition-all duration-700 ease-out relative"
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">{Math.round(usagePercentage)}% used</p>
            </div>
          </div>

          {/* Remaining Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Available</h3>
              </div>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                {user.subscription.monthly_limit - user.subscription.current_period_uploads}
              </p>
              <p className="text-sm text-gray-600 font-semibold">jobs left</p>
              {user.subscription.monthly_limit - user.subscription.current_period_uploads < user.subscription.monthly_limit / 2 && (
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-emerald-600 font-bold mt-3 transition-all group-hover:gap-2"
                >
                  Upgrade plan <span>→</span>
                </Link>
              )}
            </div>
          </div>

          {/* Success Rate Card */}
          {stats && stats.total > 0 && (
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Success</h3>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">
                  {stats.successRate}%
                </p>
                <p className="text-sm text-gray-600 font-semibold">{stats.completed} of {stats.total}</p>
              </div>
            </div>
          )}
        </div>

        {/* Quota Warning Banner */}
        <QuotaWarningBanner
          currentUploads={user.subscription.current_period_uploads}
          limit={user.subscription.monthly_limit}
          plan={user.subscription.plan_name}
        />

        {/* Onboarding Checklist */}
        {showOnboarding && recentJobs.length < 3 && (
          <OnboardingChecklist
            items={checklistItems}
            onDismiss={() => setShowOnboarding(false)}
          />
        )}

        {/* Current Processing Job (SSE real-time) */}
        {currentJob && currentJob.status !== 'completed' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-fuchsia-300 shadow-xl mb-8 glow-purple animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Loader className="w-6 h-6 text-fuchsia-600 animate-spin" />
                {currentJobStatus?.message || 'Processing...'}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-mono">
                  {currentJob.job_id?.slice(0, 8) || 'N/A'}
                </span>
                {isConnected && (
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-green-700">Live</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
                <span>{currentJobStatus?.message || 'Processing...'}</span>
                <span className="font-bold">{currentJob.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className="gradient-animated h-3 rounded-full transition-all duration-500"
                  style={{ width: `${currentJob.progress || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4" />
              <span>Real-time updates via Server-Sent Events</span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <Link
            href="/upload"
            className="inline-flex items-center gap-3 gradient-purple-fuchsia text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple"
          >
            <Upload className="w-5 h-5" />
            Upload New Images
          </Link>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg" id="recent-jobs">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-600" />
            Recent Jobs
          </h2>

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
            <div className="space-y-3">
              {recentJobs.map((job, index) => (
                <Link
                  key={job.job_id}
                  href={`/dashboard/jobs/${job.job_id}`}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-fuchsia-300 hover:bg-purple-50/50 transition-all cursor-pointer group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4">
                    {job.status === 'completed' && (
                      <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                    {job.status === 'processing' && (
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                      </div>
                    )}
                    {job.status === 'failed' && (
                      <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                    )}
                    {job.status === 'pending' && (
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-gray-600" />
                      </div>
                    )}

                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-gradient transition-colors">
                        {job.job_name || 'Untitled'}
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        {new Date(job.created_at).toLocaleDateString()} at{' '}
                        {new Date(job.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        job.status === 'completed'
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
                        className="flex items-center gap-2 px-4 py-2 gradient-purple-fuchsia text-white rounded-lg font-bold hover:scale-105 transition-all shadow-md"
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
