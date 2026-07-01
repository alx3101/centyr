'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Upload, Download, Loader, CheckCircle, XCircle, Clock, TrendingUp, Zap, Award, Activity, Filter, Image as ImageIcon, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRecentJobs } from '@/hooks/queries'
import { STORE_LOGOS } from '@/components/marketing/StoreLogos'
import { getJobMeta } from '@/lib/jobMeta'
import { SkeletonDashboard } from '@/components/ui/Skeleton'
import EmptyState from '@/components/EmptyState'
import OnboardingChecklist from '@/components/OnboardingChecklist'
import PostDownloadModal from '@/components/PostDownloadModal'
import QuotaWarningBanner from '@/components/QuotaWarningBanner'
import { useTranslations } from '@/contexts/LanguageContext'

interface Job {
  job_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  job_name?: string
  updated_at?: string
  output_image_url?: string
  input_image_url?: string
  error_message?: string
  image_count?: number
  batch_mode?: boolean
  processed_count?: number
  metadata?: {
    image_count?: number
    batch_mode?: boolean
    file_size?: number
    original_filename?: string
  }
}

function JobThumbnail({ job }: { job: Job }) {
  const [imgLoading, setImgLoading] = useState(true)
  const src = job.output_image_url || job.input_image_url

  if (!src) {
    return (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
    )
  }

  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-100 group-hover:shadow-sm transition-shadow">
      {imgLoading && (
        <div className="absolute inset-0 bg-[#f3f4f6] animate-pulse" />
      )}
      <img
        src={src}
        alt={job.job_name || 'Job thumbnail'}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setImgLoading(false)}
        onError={(e) => {
          setImgLoading(false)
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          target.nextElementSibling?.classList.remove('hidden')
        }}
      />
      <div className="hidden absolute inset-0 bg-[#f3f4f6] flex items-center justify-center">
        <ImageIcon className="w-8 h-8 text-gray-400" />
      </div>
      <div className="absolute top-1 right-1">
        {job.status === 'completed' && (
          <div className="bg-green-500 rounded-full p-1">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        )}
        {job.status === 'processing' && (
          <div className="bg-blue-500 rounded-full p-1">
            <Loader className="w-3 h-3 text-white animate-spin" />
          </div>
        )}
        {job.status === 'failed' && (
          <div className="bg-red-500 rounded-full p-1">
            <XCircle className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}

function DashboardContent() {
  const { user, refreshUser } = useAuth()
  const t = useTranslations()

  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showPostDownloadModal, setShowPostDownloadModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'processing' | 'failed' | 'pending'>('all')

  // React Query for jobs list - always polls every 10s, faster when processing
  const [pollingInterval, setPollingInterval] = useState<number>(10000)
  const { data: recentJobs = [], isLoading } = useRecentJobs(50, pollingInterval) as { data: Job[], isLoading: boolean }

  // Speed up polling when jobs are active, slow down when idle
  const hasActiveJobs = recentJobs.some(j => j.status === 'processing' || j.status === 'pending')
  useEffect(() => {
    setPollingInterval(hasActiveJobs ? 5000 : 10000)
  }, [hasActiveJobs])

  // Refresh subscription counters when jobs complete
  const completedCount = recentJobs.filter(j => j.status === 'completed').length
  useEffect(() => {
    if (completedCount > 0) {
      refreshUser()
    }
  }, [completedCount])

  // Filtered jobs based on status
  const filteredJobs = useMemo(() => {
    if (statusFilter === 'all') return recentJobs
    return recentJobs.filter(job => job.status === statusFilter)
  }, [recentJobs, statusFilter])

  // Onboarding checklist items
  const checklistItems = [
    {
      id: 'upload',
      title: t.dashboard.checklistUploadTitle,
      description: t.dashboard.checklistUploadDesc,
      completed: recentJobs.length > 0,
      action: {
        label: t.dashboard.checklistUploadAction,
        href: '/upload'
      }
    },
    {
      id: 'download',
      title: t.dashboard.checklistDownloadTitle,
      description: t.dashboard.checklistDownloadDesc,
      completed: recentJobs.some(job => job.status === 'completed'),
      action: {
        label: t.dashboard.checklistDownloadAction,
        href: '#recent-jobs'
      }
    },
    {
      id: 'explore',
      title: t.dashboard.checklistExploreTitle,
      description: t.dashboard.checklistExploreDesc,
      completed: false,
      action: {
        label: t.dashboard.checklistExploreAction,
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
      let filename = blob.type === 'application/zip' ? `job-${jobId}.zip` : `processed-${jobId}.webp`
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

      toast.success(t.dashboard.downloadCompleted)

      setTimeout(() => {
        setShowPostDownloadModal(true)
      }, 500)
    } catch (error) {
      console.error('Download error:', error)
      toast.error(t.dashboard.downloadFailed)
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

  if (isLoading || !user) {
    return <SkeletonDashboard />
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f0a1e] leading-tight" style={{ fontFamily: 'Onest, sans-serif' }}>
            Bentornato, {user.name || user.email.split('@')[0]}
          </h1>
          <p className="text-[#6b7280] mt-1 text-base">
            {t.dashboard.aiPoweredHub}
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
          {/* Plan Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#f0f0f0]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-[#7c3aed] flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="px-2 py-1 sm:px-3 bg-[#faf5ff] text-[#7c3aed] text-xs font-bold rounded-full">
                {user.subscription.plan_name.toUpperCase()}
              </span>
            </div>
            <p className="text-2xl sm:text-4xl font-extrabold text-[#0f0a1e] mb-1" style={{ fontFamily: 'Onest, sans-serif' }}>{user.subscription.monthly_limit}</p>
            <p className="text-xs sm:text-sm text-[#9ca3af]">{t.dashboard.jobsPerMonth}</p>
          </div>

          {/* Usage Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#f0f0f0]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-[#7c3aed] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#9ca3af] uppercase tracking-wider">{t.dashboard.usageLabel}</h3>
            </div>
            <div className="flex items-baseline gap-1 sm:gap-2 mb-3">
              <p className="text-2xl sm:text-4xl font-extrabold text-[#0f0a1e]" style={{ fontFamily: 'Onest, sans-serif' }}>{user.subscription.current_period_uploads}</p>
              <p className="text-base sm:text-xl text-[#9ca3af] font-medium">/ {user.subscription.monthly_limit}</p>
            </div>
            <div className="relative w-full bg-[#f3f4f6] rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-700 ease-out bg-[#7c3aed]"
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-[#9ca3af] mt-2">{Math.round(usagePercentage)}% used</p>
          </div>

          {/* Remaining Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#f0f0f0]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-green-500 flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#9ca3af] uppercase tracking-wider">{t.dashboard.available}</h3>
            </div>
            <p className="text-2xl sm:text-4xl font-extrabold text-[#0f0a1e] mb-1" style={{ fontFamily: 'Onest, sans-serif' }}>
              {user.subscription.monthly_limit - user.subscription.current_period_uploads}
            </p>
            <p className="text-xs sm:text-sm text-[#9ca3af]">{t.dashboard.jobsLeft}</p>
            {user.subscription.monthly_limit - user.subscription.current_period_uploads < user.subscription.monthly_limit / 2 && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-[#7c3aed] hover:text-[#6d28d9] font-semibold mt-2 sm:mt-3 transition-colors"
              >
                {t.dashboard.upgrade} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Success Rate Card */}
          {stats && stats.total > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#f0f0f0]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-[#9ca3af] uppercase tracking-wider">{t.dashboard.success}</h3>
              </div>
              <p className="text-2xl sm:text-4xl font-extrabold text-[#0f0a1e] mb-1" style={{ fontFamily: 'Onest, sans-serif' }}>
                {stats.successRate}%
              </p>
              <p className="text-xs sm:text-sm text-[#9ca3af]">{stats.completed} {t.onboarding.ofCompleted} {stats.total}</p>
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

        {/* Quick Actions */}
        <div className="mb-8">
          <Link
            href="/upload"
            className="inline-flex items-center gap-3 bg-[#7c3aed] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#6d28d9] transition-colors"
          >
            <Upload className="w-5 h-5" />
            {t.dashboard.uploadNewImages}
          </Link>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }} id="recent-jobs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-6 border-b border-[#f0f0f0]">
            <h2 className="text-lg font-bold text-[#0f0a1e] flex items-center gap-2" style={{ fontFamily: 'Onest, sans-serif' }}>
              <Clock className="w-5 h-5 text-[#7c3aed]" />
              {t.dashboard.recentJobs}
              {filteredJobs.length !== recentJobs.length && (
                <span className="text-sm font-normal text-[#9ca3af]">
                  ({filteredJobs.length} of {recentJobs.length})
                </span>
              )}
            </h2>

            {/* Filter Buttons */}
            {recentJobs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(['all', 'completed', 'processing', 'failed', 'pending'] as const).map((filter) => {
                  const filterLabels = {
                    all: t.dashboard.filterAll,
                    completed: t.dashboard.filterCompleted,
                    processing: t.dashboard.filterProcessing,
                    failed: t.dashboard.filterFailed,
                    pending: t.dashboard.filterPending,
                  }
                  const count = filter === 'all'
                    ? recentJobs.length
                    : recentJobs.filter(j => j.status === filter).length

                  if (count === 0 && filter !== 'all') return null

                  return (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all ${statusFilter === filter
                        ? 'bg-[#7c3aed] text-white'
                        : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e9ecef]'
                        }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {filter === 'all' && <Filter className="w-4 h-4" />}
                        {filter === 'completed' && <CheckCircle className="w-4 h-4" />}
                        {filter === 'processing' && <Loader className="w-4 h-4" />}
                        {filter === 'failed' && <XCircle className="w-4 h-4" />}
                        {filter === 'pending' && <Clock className="w-4 h-4" />}
                        <span className="capitalize">{filterLabels[filter]}</span>
                        <span className="opacity-75">({count})</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="p-4 md:p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader className="w-8 h-8 text-[#7c3aed] animate-spin mx-auto" />
              </div>
            ) : recentJobs.length === 0 ? (
              <EmptyState
                icon={Upload}
                title={t.dashboard.noJobsTitle}
                description={t.dashboard.noJobsDesc}
                actionLabel={t.dashboard.uploadNow}
                actionHref="/upload"
                secondaryLabel={t.dashboard.watchDemo}
                onSecondaryAction={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                tips={[
                  t.dashboard.tipJpgPng,
                  t.dashboard.tipBackground,
                  t.dashboard.tipBulk,
                ]}
              />
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#6b7280] font-medium">{t.dashboard.noJobsStatus} {statusFilter}</p>
                <button
                  onClick={() => setStatusFilter('all')}
                  className="mt-4 px-4 py-2 bg-[#7c3aed] text-white rounded-lg font-semibold hover:bg-[#6d28d9] transition-colors"
                >
                  {t.dashboard.showAllJobs}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredJobs.map((job, index) => (
                  <Link
                    key={job.job_id}
                    href={`/dashboard/jobs/${job.job_id}`}
                    className="flex items-center gap-2 md:gap-4 p-3 md:p-4 border border-[#f0f0f0] rounded-xl hover:border-[#e9d5ff] hover:bg-[#faf5ff] transition-all cursor-pointer group animate-fade-in-up overflow-hidden"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      <JobThumbnail job={job} />
                    </div>

                    {/* Job Info */}
                    <div className="flex-grow min-w-0">
                      <p className="font-semibold text-[#0f0a1e] group-hover:text-[#7c3aed] transition-colors truncate">
                        {job.job_name || job.metadata?.original_filename || 'Untitled'}
                      </p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <p className="text-sm text-[#9ca3af]">
                          {new Date(job.created_at).toLocaleDateString()} at{' '}
                          {new Date(job.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {(() => {
                          const meta = getJobMeta(job.job_id)
                          if (!meta) return null
                          const store = STORE_LOGOS.find(s => s.key === meta.preset)
                          const L = store?.Logo
                          return (
                            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full font-semibold"
                              style={{ background: store ? `${store.brandColor}18` : '#faf5ff', color: store?.brandColor ?? '#7c3aed' }}>
                              {L ? <L size={10} /> : null}
                              {store ? store.name : 'Custom'} · {meta.width}×{meta.height}px
                            </span>
                          )
                        })()}
                        {job.metadata?.image_count && job.metadata.image_count > 1 && (
                          <span className="flex items-center gap-1 text-xs bg-[#faf5ff] text-[#7c3aed] px-2 py-1 rounded-full font-semibold">
                            <ImageIcon className="w-3 h-3" />
                            {job.metadata.image_count} images
                          </span>
                        )}
                        {job.metadata?.batch_mode && (
                          <span className="text-xs bg-[#faf5ff] text-[#7c3aed] px-2 py-1 rounded-full font-semibold">
                            {t.dashboard.batch}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress for processing/batch jobs */}
                    {(job.status === 'processing' || job.status === 'pending') && (job.batch_mode || job.metadata?.batch_mode) && (
                      <div className="hidden md:flex items-center gap-3 flex-shrink-0 min-w-[140px]">
                        <div className="w-full">
                          <div className="flex justify-between text-xs font-semibold text-[#6b7280] mb-1">
                            <span>{job.processed_count ?? 0}/{job.image_count ?? job.metadata?.image_count ?? 0}</span>
                            <span>{job.image_count ? Math.round(((job.processed_count ?? 0) / job.image_count) * 100) : 0}%</span>
                          </div>
                          <div className="w-full bg-[#f3f4f6] rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-[#7c3aed] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${job.image_count ? Math.round(((job.processed_count ?? 0) / job.image_count) * 100) : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Status and Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`hidden sm:inline-block px-3 py-1 text-xs font-bold rounded-full ${job.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : job.status === 'processing'
                            ? 'bg-blue-100 text-blue-700'
                            : job.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-[#f3f4f6] text-[#6b7280]'
                          }`}
                      >
                        {job.status === 'processing' && (job.batch_mode || job.metadata?.batch_mode)
                          ? `${job.processed_count ?? 0}/${job.image_count ?? job.metadata?.image_count ?? '?'}`
                          : job.status}
                      </span>

                      {job.status === 'completed' && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleDownload(job.job_id)
                          }}
                          className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-[#7c3aed] text-white rounded-lg font-semibold hover:bg-[#6d28d9] transition-colors text-sm"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden md:inline">{t.dashboard.download}</span>
                        </button>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
