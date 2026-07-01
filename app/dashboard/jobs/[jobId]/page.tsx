'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image' // used inside ImageWithLoader
import { api, JobResponse, JobStatus } from '@/lib/api'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { useConfirm } from '@/components/ui/ConfirmModal'
import { ArrowLeft, Download, Trash2, Clock, CheckCircle, XCircle, Loader, Image as ImageIcon, Zap, Info, Upload, RotateCw, RefreshCw, X, Lock } from 'lucide-react'
import { useTranslations } from '@/contexts/LanguageContext'
import { STORE_LOGOS, StorefrontIcon } from '@/components/marketing/StoreLogos'
import { saveJobMeta, getJobMeta } from '@/lib/jobMeta'
import { toast } from 'react-hot-toast'

export default function JobDetailPage() {
  return (
    <AuthGuard>
      <JobDetailContent />
    </AuthGuard>
  )
}

function ImageWithLoader({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-purple-50 to-fuchsia-50">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
          </div>
          <div className="space-y-2 w-3/4">
            <div className="h-2 bg-purple-200 rounded-full animate-pulse"></div>
            <div className="h-2 bg-purple-100 rounded-full animate-pulse w-3/4 mx-auto"></div>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}

function JobDetailContent() {
  const params = useParams()
  const router = useRouter()
  const confirm = useConfirm()
  const t = useTranslations()
  const jd = t.jobDetail
  const jobId = params.jobId as string

  const [job, setJob] = useState<JobResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Reprocess state
  const [showReprocess, setShowReprocess] = useState(false)
  const [rpPreset, setRpPreset] = useState('custom')
  const [rpWidth, setRpWidth] = useState(1000)
  const [rpHeight, setRpHeight] = useState(1000)
  const [rpMarginPct, setRpMarginPct] = useState(5)
  const [isReprocessing, setIsReprocessing] = useState(false)

  const handleRpPresetChange = (key: string) => {
    setRpPreset(key)
    const store = STORE_LOGOS.find(s => s.key === key)
    if (store) {
      setRpWidth(store.width)
      setRpHeight(store.height)
      setRpMarginPct(store.marginPct)
    }
  }

  const handleReprocess = async () => {
    if (!job) return
    setIsReprocessing(true)
    try {
      const inputUrls: string[] = []
      if (job.batch_mode && job.outputs?.length) {
        job.outputs.filter(Boolean).forEach(o => { if (o.input_url) inputUrls.push(o.input_url) })
      } else if (job.input_image_url) {
        inputUrls.push(job.input_image_url)
      }
      if (inputUrls.length === 0) throw new Error('No input images found')

      const fetchedFiles = await Promise.all(
        inputUrls.map(async (url, i) => {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`Failed to fetch image ${i + 1}`)
          const blob = await res.blob()
          const ext = blob.type.includes('png') ? 'png' : blob.type.includes('webp') ? 'webp' : 'jpg'
          return new File([blob], `image-${i + 1}.${ext}`, { type: blob.type })
        })
      )

      const marginPx = Math.round((Math.min(rpWidth, rpHeight) * rpMarginPct) / 100)
      const matchedStore = STORE_LOGOS.find(s => s.key === rpPreset)
      const newJobName = `${job.job_name || 'Job'} [${matchedStore?.name ?? jd.customFormat}]`

      const result = await api.uploadBatch(fetchedFiles, newJobName, {
        outputSize: Math.max(rpWidth, rpHeight),
        margin: marginPx,
      })

      saveJobMeta(result.job_id, { preset: rpPreset, width: rpWidth, height: rpHeight })
      toast.success(jd.reprocessSuccess)
      router.push(`/dashboard/jobs/${result.job_id}`)
    } catch (err: any) {
      toast.error(err.message || jd.reprocessFailed)
    } finally {
      setIsReprocessing(false)
    }
  }

  const rpMarginPx = Math.round((Math.min(rpWidth, rpHeight) * rpMarginPct) / 100)

  // Detect current job format
  const jobMeta = typeof window !== 'undefined' ? getJobMeta(jobId) : null
  const currentStore = jobMeta ? STORE_LOGOS.find(s => s.key === jobMeta.preset) : null
  const outputDims = job?.outputs?.[0]
    ? { w: job.outputs[0].output_width, h: job.outputs[0].output_height }
    : jobMeta
      ? { w: jobMeta.width, h: jobMeta.height }
      : null

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
      fetchJobDetails().then(() => {
        // Trigger animation only on first load
        if (!hasAnimated) {
          setHasAnimated(true)
        }
      })
    }
  }, [jobId]) // eslint-disable-line react-hooks/exhaustive-deps

  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null)

  const handleDownload = async () => {
    if (!job) return

    try {
      setIsDownloading(true)

      const token = localStorage.getItem('auth_token')
      if (!token) return

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${job.job_id}/download`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error(jd.downloadFailed)

      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = job.batch_mode ? `${job.job_name || 'batch'}.zip` : `processed-${job.job_id}.jpg`

      if (contentDisposition) {
        const matches = /filename="?([^"]+)"?/.exec(contentDisposition)
        if (matches && matches[1]) filename = matches[1]
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
      alert(jd.downloadFailed)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleSingleImageDownload = async (_imageUrl: string, index: number) => {
    try {
      setDownloadingIndex(index)

      const token = localStorage.getItem('auth_token')
      if (!token) return

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${job!.job_id}/download?index=${index}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )

      if (!response.ok) throw new Error(jd.downloadFailed)

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `processed-image-${index + 1}.webp`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
      alert(jd.downloadFailed)
    } finally {
      setDownloadingIndex(null)
    }
  }

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: jd.deleteConfirmTitle,
      message: jd.deleteConfirmMsg,
      confirmText: jd.deleteConfirmBtn,
      cancelText: t.common.cancel,
      variant: 'destructive'
    })

    if (!confirmed) return

    try {
      await api.deleteJob(jobId)
      router.push('/dashboard')
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleRetry = async () => {
    const confirmed = await confirm({
      title: jd.retryConfirmTitle,
      message: jd.retryConfirmMsg,
      confirmText: jd.retryConfirmBtn,
      cancelText: t.common.cancel,
      variant: 'default'
    })

    if (!confirmed) return

    try {
      setIsRetrying(true)
      const result = await api.retryJob(jobId)
      alert(jd.retryStarted.replace('{count}', String(result.retry_count)))
      const jobData = await api.getJobDetails(jobId)
      setJob(jobData)
    } catch (err: any) {
      console.error('Retry failed:', err)
      alert(err.message || jd.retryFailed)
    } finally {
      setIsRetrying(false)
    }
  }

  const hasIncompleteImages = () => {
    if (!job || !job.batch_mode || !job.outputs) return false
    const total = job.image_count || 0
    for (let i = 0; i < total; i++) {
      if (i >= job.outputs.length || !job.outputs[i] || job.outputs[i].status === 'failed') {
        return true
      }
    }
    return false
  }

  const getStatusConfig = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED:
        return { color: 'bg-green-100 text-green-700 border-green-300', icon: <CheckCircle className="w-5 h-5" />, label: jd.statusCompleted }
      case JobStatus.PROCESSING:
        return { color: 'bg-blue-100 text-blue-700 border-blue-300', icon: <Loader className="w-5 h-5 animate-spin" />, label: jd.statusProcessing }
      case JobStatus.FAILED:
        return { color: 'bg-red-100 text-red-700 border-red-300', icon: <XCircle className="w-5 h-5" />, label: jd.statusFailed }
      case JobStatus.PENDING:
        return { color: 'bg-gray-100 text-gray-700 border-gray-300', icon: <Clock className="w-5 h-5" />, label: jd.statusPending }
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-300', icon: <Info className="w-5 h-5" />, label: jd.statusUnknown }
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
              <p className="text-gray-600 font-medium">{jd.loading}</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{jd.errorLoading}</h2>
            <p className="text-red-600 mb-6 font-medium">{error || jd.jobNotFound}</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              {jd.backToDashboardBtn}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusConfig = getStatusConfig(job.status)

  // Animation class - only on first load to prevent flash on re-renders
  const animateClass = hasAnimated ? '' : 'animate-fade-in-up'
  const animateScaleClass = hasAnimated ? '' : 'animate-scale-in'

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
            {jd.backToDashboard}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">{jd.title}</span>
        </nav>

        {/* Header Card */}
        <div className={`bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-6 mb-6 shadow-lg ${animateClass}`}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gradient">
                  {job.job_name || jd.untitled}
                </h1>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 ${statusConfig.color} font-bold`}>
                  {statusConfig.icon}
                  <span className="text-sm">{statusConfig.label}</span>
                </div>
              </div>
              <p className="text-gray-600 font-mono text-sm mb-2">{jd.jobId}: {job.job_id}</p>
              {job.batch_mode && job.image_count && (
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <ImageIcon className="w-4 h-4" />
                  {jd.batchJob} · {job.image_count} {jd.images}
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
                    <><Loader className="w-5 h-5 animate-spin" />{jd.downloading}</>
                  ) : (
                    <><Download className="w-5 h-5" />{jd.download}</>
                  )}
                </button>
              )}
              {job.batch_mode && hasIncompleteImages() && (
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 hover:scale-105 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRetrying ? (
                    <><Loader className="w-5 h-5 animate-spin" />{jd.retrying}</>
                  ) : (
                    <><RotateCw className="w-5 h-5" />{jd.retry}</>
                  )}
                </button>
              )}
              <button
                onClick={() => setShowReprocess(v => !v)}
                className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl hover:scale-105 transition-all shadow-md ${showReprocess ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
              >
                <RefreshCw className="w-5 h-5" />
                {jd.reprocess}
              </button>
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

        {/* Reprocess Panel */}
        {showReprocess && (
          <div className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-2xl p-6 mb-6 shadow-lg animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{jd.reprocessTitle}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{jd.reprocessDesc}</p>
              </div>
              <button onClick={() => setShowReprocess(false)} className="text-gray-400 hover:text-gray-600 ml-4">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preset pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {STORE_LOGOS.map(store => {
                const L = store.Logo
                return (
                  <button
                    key={store.key}
                    type="button"
                    onClick={() => handleRpPresetChange(store.key)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
                    style={rpPreset === store.key ? {
                      background: store.brandColor,
                      color: '#fff',
                      borderColor: store.brandColor,
                    } : {
                      background: '#faf5ff',
                      color: '#374151',
                      borderColor: '#e9d5ff',
                    }}
                  >
                    <L size={14} />
                    {store.name} · {store.width}×{store.height}px
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => setRpPreset('custom')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
                style={rpPreset === 'custom' ? {
                  background: '#7c3aed',
                  color: '#fff',
                  borderColor: '#7c3aed',
                } : {
                  background: '#faf5ff',
                  color: '#374151',
                  borderColor: '#e9d5ff',
                }}
              >
                <StorefrontIcon size={14} />
                {jd.customFormat}
              </button>
            </div>

            {/* Custom sliders — only visible in custom mode */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 transition-opacity duration-200 ${rpPreset !== 'custom' ? 'opacity-40 pointer-events-none' : ''}`}>
              {[
                { label: 'Width', value: rpWidth, set: setRpWidth },
                { label: 'Height', value: rpHeight, set: setRpHeight },
              ].map(({ label, value, set }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">{label}</label>
                  <div className="flex items-center gap-2">
                    <input type="range" min="500" max="4000" step="100" value={value} disabled={rpPreset !== 'custom'}
                      onChange={e => set(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 disabled:cursor-not-allowed"
                    />
                    <span className="w-20 text-center px-2 py-1 bg-purple-50 text-purple-700 rounded-lg font-mono text-xs">{value}px</span>
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Margin</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="35" step="1" value={rpMarginPct} disabled={rpPreset !== 'custom'}
                    onChange={e => setRpMarginPct(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 disabled:cursor-not-allowed"
                  />
                  <div className="w-20 text-center px-2 py-1 bg-purple-50 text-purple-700 rounded-lg font-mono text-xs">
                    {rpMarginPct}%
                    <div className="text-gray-400">{rpMarginPx}px</div>
                  </div>
                </div>
              </div>
            </div>

            {rpPreset !== 'custom' && (
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                <Lock className="w-3 h-3" />
                Dimensions set automatically by the preset
              </p>
            )}

            <button
              onClick={handleReprocess}
              disabled={isReprocessing}
              className="flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white font-bold rounded-xl hover:scale-105 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isReprocessing ? (
                <><Loader className="w-5 h-5 animate-spin" />{jd.reprocessing}</>
              ) : (
                <><RefreshCw className="w-5 h-5" />{jd.reprocessStart}</>
              )}
            </button>
          </div>
        )}

        {/* Status Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all ${animateClass}`} style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg gradient-purple-fuchsia flex items-center justify-center shadow-md">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{jd.created}</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{new Date(job.created_at).toLocaleDateString()}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(job.created_at).toLocaleTimeString()}</p>
          </div>

          <div className={`bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all ${animateClass}`} style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg gradient-purple-fuchsia flex items-center justify-center shadow-md">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{jd.updated}</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{new Date(job.updated_at).toLocaleDateString()}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(job.updated_at).toLocaleTimeString()}</p>
          </div>

          {job.processing_time && (
            <div className={`bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all ${animateClass}`} style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{jd.processing}</p>
              </div>
              <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {job.processing_time.toFixed(2)}s
              </p>
              <p className="text-xs text-gray-500 mt-1">{jd.totalTime}</p>
            </div>
          )}

          {job.image_count && job.image_count > 0 && (
            <div className={`bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all ${animateClass}`} style={{ animationDelay: '0.25s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{jd.images}</p>
              </div>
              <p className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {job.image_count}
              </p>
              <p className="text-xs text-gray-500 mt-1">{job.batch_mode ? jd.batchMode : jd.single}</p>
            </div>
          )}

          {(outputDims || currentStore) && (
            <div className={`bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all ${animateClass}`}
              style={{ animationDelay: '0.3s', borderColor: currentStore ? `${currentStore.brandColor}44` : '#e9d5ff' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shadow-md"
                  style={{ background: currentStore ? `${currentStore.brandColor}22` : '#f3e8ff', color: currentStore?.brandColor ?? '#7c3aed' }}>
                  {currentStore
                    ? (() => { const L = currentStore.Logo; return <L size={20} /> })()
                    : <StorefrontIcon size={20} />
                  }
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{jd.outputFormat}</p>
              </div>
              <p className="text-xl font-bold" style={{ color: currentStore?.brandColor ?? '#374151' }}>
                {currentStore ? currentStore.name : jd.customFormat}
              </p>
              {outputDims && (
                <p className="text-xs text-gray-500 mt-1">{outputDims.w} × {outputDims.h}px</p>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {job.error_message && (
          <div className={`bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6 shadow-lg ${animateClass}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-red-700 mb-1">{jd.errorMessage}</p>
                <p className="text-red-600">{job.error_message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Batch Results */}
        {job.status === JobStatus.COMPLETED && job.batch_mode && job.outputs && job.outputs.length > 0 && (
          <div className={`bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-6 shadow-lg ${animateClass}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-purple-600" />
              {jd.batchResults}
              <span className="text-sm font-normal text-gray-500">({job.outputs.length} {jd.images})</span>
            </h2>
            <div className="space-y-6">
              {job.outputs.filter(Boolean).map((output, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50/50 to-fuchsia-50/50 border-2 border-gray-200 rounded-xl p-4 md:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-3 py-1 rounded-full text-sm">
                      #{index + 1}
                    </span>
                  {jd.images} {index + 1}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Original */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-700">{jd.original}</h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{jd.input}</span>
                      </div>
                      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 shadow-md">
                        {output.input_url && (
                          <ImageWithLoader src={output.input_url} alt={`${jd.original} ${index + 1}`} />
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                          <span className="font-semibold text-gray-600">{jd.format}:</span> <span className="text-gray-900">{output.input_format}</span>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                          <span className="font-semibold text-gray-600">{jd.size}:</span> <span className="text-gray-900">{output.input_width}×{output.input_height}px</span>
                        </div>
                      </div>
                    </div>

                    {/* Processed */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gradient">{jd.processed}</h4>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {jd.complete}
                        </span>
                      </div>
                      <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl overflow-hidden border-2 border-purple-300 glow-purple shadow-md">
                        <ImageWithLoader src={output.output_url} alt={`${jd.processed} ${index + 1}`} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="bg-white rounded-lg px-3 py-2 border border-purple-200">
                          <span className="font-semibold text-gray-600">{jd.format}:</span> <span className="text-gray-900">{output.output_format}</span>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-purple-200">
                          <span className="font-semibold text-gray-600">{jd.size}:</span> <span className="text-gray-900">{output.output_width}×{output.output_height}px</span>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-purple-200">
                          <span className="font-semibold text-gray-600">{jd.time}:</span> <span className="text-gray-900">{output.processing_time ? Number(output.processing_time).toFixed(2) : 'N/A'}s</span>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2 border border-purple-200">
                          <span className="font-semibold text-gray-600">{jd.status}:</span> <span className="text-green-600 capitalize">{output.status}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSingleImageDownload(output.output_url, index)}
                        disabled={downloadingIndex === index}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 gradient-purple-fuchsia text-white rounded-lg hover:scale-105 transition-all font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloadingIndex === index ? (
                          <><Loader className="w-4 h-4 animate-spin" />{jd.downloading}</>
                        ) : (
                          <><Download className="w-4 h-4" />{jd.downloadImage} {index + 1}</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Single Image Comparison */}
        {job.status === JobStatus.COMPLETED && !job.batch_mode && job.input_image_url && job.output_image_url && (
          <div className={`bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-6 shadow-lg ${animateClass}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-purple-600" />
              {jd.imageComparison}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-700">{jd.original}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{jd.input}</span>
                </div>
                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300 shadow-md">
                  <ImageWithLoader src={job.input_image_url} alt={jd.original} />
                </div>
              </div>

              {/* Processed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gradient">{jd.processed}</h3>
                  <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {jd.complete}
                  </span>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl overflow-hidden border-2 border-purple-300 glow-purple shadow-md">
                  <ImageWithLoader src={job.output_image_url} alt={jd.processed} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing/Pending State */}
        {(job.status === JobStatus.PROCESSING || job.status === JobStatus.PENDING) && (
          <div className={`bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-2xl p-6 md:p-12 text-center shadow-xl ${animateScaleClass}`}>
            <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {job.status === JobStatus.PROCESSING ? jd.processingYourImage : jd.jobQueued}
            </h3>
            <p className="text-gray-600 text-lg">
              {job.status === JobStatus.PROCESSING ? jd.processingDesc : jd.queuedDesc}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-700">{jd.autoUpdate}</span>
            </div>
          </div>
        )}

        {/* Failed State */}
        {job.status === JobStatus.FAILED && !job.batch_mode && (
          <div className={`bg-white/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-6 md:p-12 text-center shadow-xl ${animateScaleClass}`}>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{jd.processingFailed}</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              {job.error_message || jd.failedDesc}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg"
              >
                <Upload className="w-5 h-5" />
                {jd.tryAnother}
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                {jd.backToDashboardBtn}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
