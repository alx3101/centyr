'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Upload, Download, History, Settings, LogOut, Loader, CheckCircle, XCircle, Clock } from 'lucide-react'

interface ProcessingJob {
  job_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  processed_count: number
  total_count: number
  created_at: string
}

interface User {
  email: string
  full_name: string
  plan: string
  monthly_limit: number
  images_used_this_month: number
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentJobId = searchParams?.get('job')

  const [user, setUser] = useState<User | null>(null)
  const [currentJob, setCurrentJob] = useState<ProcessingJob | null>(null)
  const [recentJobs, setRecentJobs] = useState<ProcessingJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUser()
    if (currentJobId) {
      pollJobStatus(currentJobId)
    }
    loadRecentJobs()
  }, [currentJobId])

  const loadUser = () => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }
  }

  const pollJobStatus = async (jobId: string) => {
    const token = localStorage.getItem('auth_token')

    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images/status/${jobId}`,
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
        } else if (data.status === 'failed') {
          clearInterval(interval)
          toast.error('Processing failed')
        }
      } catch (error) {
        console.error('Error polling job status:', error)
      }
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(interval)
  }

  const loadRecentJobs = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/jobs`, {
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

      // Open download URL
      window.open(data.download_url, '_blank')
      toast.success('Download started!')
    } catch (error) {
      toast.error('Download failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    router.push('/login')
    toast.success('Logged out successfully')
  }

  const usagePercentage = user
    ? (user.images_used_this_month / user.monthly_limit) * 100
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-sm border-r-2 border-purple-100 p-6 hidden md:block">
        <Link href="/" className="text-2xl font-bold text-gradient block mb-8">
          Centyr
        </Link>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-900 bg-purple-100 rounded-lg font-semibold"
          >
            <History className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/upload"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload Images
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-auto absolute bottom-6 left-6 right-6"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-up">
            Welcome back, {user?.full_name || 'User'}!
          </h1>
          <p className="text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Here's what's happening with your images
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Plan</h3>
              <span className="px-3 py-1 gradient-purple-fuchsia text-white text-xs font-bold rounded-full">
                {user?.plan?.toUpperCase()}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{user?.monthly_limit}</p>
            <p className="text-sm text-gray-500">images/month</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Usage This Month</h3>
            <div className="flex items-end gap-2 mb-2">
              <p className="text-3xl font-bold text-gray-900">{user?.images_used_this_month}</p>
              <p className="text-lg text-gray-500 mb-1">/ {user?.monthly_limit}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="gradient-purple-fuchsia h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Remaining</h3>
            <p className="text-3xl font-bold text-gradient">
              {user ? user.monthly_limit - user.images_used_this_month : 0}
            </p>
            <p className="text-sm text-gray-500">images left</p>
            {user && user.monthly_limit - user.images_used_this_month < 10 && (
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
              <span className="text-sm text-gray-600">Job ID: {currentJob.job_id.slice(0, 8)}</span>
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
            className="inline-flex items-center gap-3 gradient-purple-fuchsia text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <Upload className="w-6 h-6" />
            Upload New Images
          </Link>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Jobs</h2>

          {isLoading ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 text-primary-600 animate-spin mx-auto" />
            </div>
          ) : recentJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No processing jobs yet</p>
              <Link
                href="/upload"
                className="text-primary-600 hover:text-fuchsia-600 font-semibold mt-2 inline-block"
              >
                Upload your first images →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job, index) => (
                <div
                  key={job.job_id}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-fuchsia-300 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * index}s` }}
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
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center">
        <Loader className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
