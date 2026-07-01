'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Upload, X, Check, Loader, Sparkles, Zap, Shield, ImageIcon, Lock, ChevronRight, ChevronLeft, Settings, Eye, AlertCircle, Info, Sun } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useUpload, type MarketplacePreset } from '@/hooks/useUpload'
import { compressImageFiles } from '@/lib/imageCompression'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from '@/contexts/LanguageContext'

type Step = 'upload' | 'configure' | 'review'

export default function UploadPage() {
  const t = useTranslations()
  const router = useRouter()
  const { user } = useAuth()
  const { files, isUploading, addFiles, removeFile, clearFiles, uploadAndProcess } = useUpload()

  // Wizard state
  const [currentStep, setCurrentStep] = useState<Step>('upload')
  const [jobName, setJobName] = useState('')

  // Premium features state
  const [removeBackground, setRemoveBackground] = useState(false)
  const [customBackground, setCustomBackground] = useState<File | null>(null)
  const [customBackgroundPreview, setCustomBackgroundPreview] = useState<string | null>(null)
  const [outputSize, setOutputSize] = useState<number>(1000)
  const [marginPercent, setMarginPercent] = useState<number>(5)
  // Shadow
  const [shadowEnabled, setShadowEnabled] = useState(false)
  const [shadowBlur, setShadowBlur] = useState(20)
  const [shadowOpacity, setShadowOpacity] = useState(0.35)
  const [shadowOffsetY, setShadowOffsetY] = useState(12)
  // Marketplace presets
  const [outputPresets, setOutputPresets] = useState<MarketplacePreset[]>([])

  const MARKETPLACE_PRESETS: { key: MarketplacePreset; name: string; dims: string; color: string }[] = [
    { key: 'amazon', name: 'Amazon', dims: '2000×2000', color: '#FF9900' },
    { key: 'ebay', name: 'eBay', dims: '1600×1600', color: '#E53238' },
    { key: 'etsy', name: 'Etsy', dims: '2000×2000', color: '#F1641E' },
    { key: 'zalando', name: 'Zalando', dims: '1500×2250', color: '#FF6900' },
  ]

  const togglePreset = (key: MarketplacePreset) => {
    setOutputPresets(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    )
  }


  const STEPS: { id: Step; label: string; icon: typeof Upload }[] = [
    { id: 'upload', label: t.upload.stepUpload, icon: Upload },
    { id: 'configure', label: t.upload.stepConfigure, icon: Settings },
    { id: 'review', label: t.upload.stepReview, icon: Eye },
  ]

  // Derived state
  const isPremium = user?.subscription?.plan !== 'free'
  const maxBatchSize = user?.subscription?.features?.max_batch_size || 1
  const currentUploads = user?.subscription?.current_period_uploads || 0
  const monthlyLimit = user?.subscription?.monthly_limit || 10
  const remainingCredits = monthlyLimit - currentUploads
  const usagePercentage = (currentUploads / monthlyLimit) * 100

  const stepIndex = STEPS.findIndex(s => s.id === currentStep)

  const marginPixels = useMemo(() => {
    return Math.round((outputSize * marginPercent) / 100)
  }, [outputSize, marginPercent])


  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 'upload':
        return files.length > 0
      case 'configure':
        return jobName.trim().length > 0
      case 'review':
        return !isUploading
      default:
        return false
    }
  }, [currentStep, files.length, jobName, isUploading])

  const onDrop = async (acceptedFiles: File[]) => {
    const totalFiles = files.length + acceptedFiles.length
    if (totalFiles > maxBatchSize) {
      toast.error(`${t.upload.maxBatchExceeded.replace('{count}', String(maxBatchSize))} ${!isPremium ? t.upload.upgradeToProcess : ''}`)
      const remainingSlots = maxBatchSize - files.length
      if (remainingSlots > 0) {
        const compressed = await compressImageFiles(acceptedFiles.slice(0, remainingSlots))
        addFiles(compressed)
      }
      return
    }

    // Check credits
    if (files.length + acceptedFiles.length > remainingCredits) {
      toast.error(t.upload.onlyCreditsLeft.replace('{count}', String(remainingCredits)))
      return
    }

    const toastId = toast.loading(t.upload.compressingImages ?? 'Compressing...')
    const compressed = await compressImageFiles(acceptedFiles)
    toast.dismiss(toastId)
    addFiles(compressed)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/avif': ['.avif'],
    },
    maxSize: 50 * 1024 * 1024,
    maxFiles: maxBatchSize,
  })

  const handleNext = () => {
    if (currentStep === 'upload' && files.length === 0) {
      toast.error(t.upload.uploadAtLeastOne)
      return
    }
    if (currentStep === 'configure' && !jobName.trim()) {
      toast.error(t.upload.enterJobName)
      return
    }

    const nextIndex = stepIndex + 1
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id)
    }
  }

  const handleBack = () => {
    const prevIndex = stepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id)
    }
  }

  const handleProcess = async () => {
    if (files.length === 0 || !jobName.trim()) return

    const options = {
      removeBackground,
      customBackground: customBackground || undefined,
      outputSize,
      margin: marginPixels,
      shadowEnabled: removeBackground && shadowEnabled,
      shadowBlur,
      shadowOpacity,
      shadowOffsetY,
      outputPresets: outputPresets.length > 0 ? outputPresets : undefined,
    }

    const jobId = await uploadAndProcess(jobName.trim(), options)

    if (jobId) {
      toast.success(t.upload.jobStarted)
      setTimeout(() => {
        router.push(`/dashboard?job=${jobId}`)
      }, 1500)
    }
  }


  const totalFileSize = useMemo(() => {
    return files.reduce((acc, f) => acc + f.file.size, 0) / 1024 / 1024
  }, [files])

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Quota */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f0a1e]" style={{ fontFamily: 'Onest, sans-serif' }}>
              {t.upload.newJob}
            </h1>
            <p className="text-[#6b7280] mt-1">{t.upload.newJobSubtitle}</p>
          </div>

          {/* Quota Indicator */}
          <div className="bg-white rounded-xl p-4 border border-[#f0f0f0]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${usagePercentage > 90 ? 'bg-red-100' : usagePercentage > 70 ? 'bg-amber-100' : 'bg-green-100'
                }`}>
                <Zap className={`w-5 h-5 ${usagePercentage > 90 ? 'text-red-600' : usagePercentage > 70 ? 'text-amber-600' : 'text-green-600'
                  }`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0f0a1e]">{remainingCredits}</span>
                  <span className="text-[#9ca3af] text-sm">{t.upload.jobsRemaining}</span>
                </div>
                <div className="w-32 bg-[#f3f4f6] rounded-full h-1.5 mt-1">
                  <div
                    className={`h-1.5 rounded-full transition-all ${usagePercentage > 90 ? 'bg-red-500' : usagePercentage > 70 ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                    style={{ width: `${100 - usagePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is a job */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-purple-800">
            <span className="font-semibold">{t.upload.whatIsJob}</span> {t.upload.jobExplanation}
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white rounded-2xl p-4 mb-8 border border-[#f0f0f0]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = index < stepIndex

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => index < stepIndex && setCurrentStep(step.id)}
                    disabled={index > stepIndex}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive
                      ? 'bg-[#7c3aed] text-white'
                      : isCompleted
                        ? 'bg-[#f0fdf4] text-[#16a34a] cursor-pointer hover:bg-green-100'
                        : 'bg-[#f3f4f6] text-[#9ca3af]'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : isCompleted ? 'bg-green-500 text-white' : 'bg-[#e5e7eb]'
                      }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className="font-semibold hidden sm:block">{step.label}</span>
                  </button>

                  {index < STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded ${index < stepIndex ? 'bg-green-400' : 'bg-[#e5e7eb]'
                      }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          {/* Step 1: Upload */}
          {currentStep === 'upload' && (
            <div className="p-4 md:p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0f0a1e] mb-2">{t.upload.uploadStepTitle}</h2>
              <p className="text-[#6b7280] mb-6">{t.upload.uploadStepSubtitle}</p>

              {/* Drop Zone */}
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-2xl p-8 md:p-12 mb-6
                  transition-all duration-300 cursor-pointer
                  ${isDragActive
                    ? 'border-[#7c3aed] bg-[#faf5ff] scale-[1.02]'
                    : 'border-[#e9d5ff] hover:border-[#7c3aed] hover:bg-[#faf5ff]'
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all ${isDragActive ? 'bg-[#7c3aed] scale-110' : 'bg-[#7c3aed]'
                    }`}>
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-xl font-bold text-[#0f0a1e] mb-2">
                    {isDragActive ? t.upload.dropHere : t.upload.dragHere}
                  </p>
                  <p className="text-[#6b7280] mb-4">{t.upload.orBrowse}</p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-full text-sm">JPG</span>
                    <span className="px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-full text-sm">PNG</span>
                    <span className="px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-full text-sm">WebP</span>
                    <span className="px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-full text-sm">AVIF</span>
                    <span className="px-3 py-1 bg-[#f3f4f6] text-[#6b7280] rounded-full text-sm">Max 50MB</span>
                  </div>
                </div>
              </div>

              {/* Batch limit info */}
              <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${maxBatchSize === 1 ? 'bg-amber-50 border border-amber-200' : 'bg-purple-50 border border-purple-200'
                }`}>
                <Info className={`w-5 h-5 flex-shrink-0 ${maxBatchSize === 1 ? 'text-amber-600' : 'text-purple-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm ${maxBatchSize === 1 ? 'text-amber-800' : 'text-purple-800'}`}>
                    {maxBatchSize === 1
                      ? t.upload.freePlanLimit + ' '
                      : t.upload.canUploadTo.replace('{count}', String(maxBatchSize))
                    }
                    {maxBatchSize === 1 && (
                      <Link href="/pricing" className="font-semibold underline hover:no-underline">
                        {t.upload.upgradeUnlimited}
                      </Link>
                    )}
                  </p>
                </div>
              </div>

              {/* Uploaded Files */}
              {files.length > 0 && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#0f0a1e]">
                      {files.length} {files.length === 1 ? t.upload.imageAdded : t.upload.imagesAdded}
                      <span className="text-[#9ca3af] font-normal ml-2">({totalFileSize.toFixed(1)} MB)</span>
                    </h3>
                    <button
                      onClick={clearFiles}
                      className="text-sm text-red-600 hover:text-red-700 font-semibold"
                    >
                      {t.upload.removeAll}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {files.map((uploadedFile, index) => (
                      <div
                        key={uploadedFile.id}
                        className="relative group animate-scale-in"
                        style={{ animationDelay: `${index * 0.03}s` }}
                      >
                        <div className="aspect-square bg-[#f3f4f6] rounded-xl overflow-hidden border border-[#f0f0f0] group-hover:border-[#7c3aed] transition-all">
                          <img
                            src={uploadedFile.preview}
                            alt={uploadedFile.file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeFile(uploadedFile.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                        <p className="text-xs text-[#9ca3af] mt-1 truncate px-1">{uploadedFile.file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Configure */}
          {currentStep === 'configure' && (
            <div className="p-4 md:p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0f0a1e] mb-2">{t.upload.configureTitle}</h2>
              <p className="text-[#6b7280] mb-6">{t.upload.configureSubtitle}</p>

              {/* Job Name */}
              <div className="mb-8">
                <label htmlFor="jobName" className="block text-sm font-semibold text-[#374151] mb-2">
                  {t.upload.jobNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobName"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  placeholder={t.upload.jobNamePlaceholder}
                  className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl focus:outline-none focus:border-[#7c3aed] transition-colors text-lg"
                  maxLength={100}
                  autoFocus
                />
                <p className="text-xs text-[#9ca3af] mt-2">{t.upload.jobNameHelper}</p>
              </div>

              {/* Processing Options */}
              <div className="space-y-6">
                <h3 className="font-bold text-[#0f0a1e] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#7c3aed]" />
                  {t.upload.processingOptions}
                </h3>

                {/* Background Removal */}
                <div className={`relative p-4 rounded-xl border transition-all ${removeBackground ? 'border-[#7c3aed] bg-[#faf5ff]' : 'border-[#f0f0f0] bg-white'
                  } ${!isPremium ? 'opacity-60' : ''}`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={removeBackground}
                      onChange={(e) => {
                        if (!isPremium) {
                          toast.error(t.upload.upgradePremium)
                          return
                        }
                        setRemoveBackground(e.target.checked)
                        if (!e.target.checked) {
                          setCustomBackground(null)
                          if (customBackgroundPreview) {
                            URL.revokeObjectURL(customBackgroundPreview)
                            setCustomBackgroundPreview(null)
                          }
                        }
                      }}
                      disabled={!isPremium}
                      className="w-5 h-5 mt-1 rounded border-2 border-[#e5e7eb] text-[#7c3aed] focus:ring-[#7c3aed]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#0f0a1e]">{t.upload.removeBackground}</span>
                        {!isPremium && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#faf5ff] text-[#7c3aed] text-xs font-semibold rounded-full">
                            <Lock className="w-3 h-3" />
                            {t.upload.premium}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#6b7280]">
                        {t.upload.removeBackgroundDesc}
                      </p>
                    </div>
                  </label>

                  {/* Custom Background */}
                  {removeBackground && isPremium && (
                    <div className="mt-4 pt-4 border-t border-[#e9d5ff] animate-fade-in">
                      <p className="text-sm font-medium text-[#374151] mb-3">{t.upload.customBackground}</p>
                      {!customBackground ? (
                        <label className="flex items-center justify-center h-24 border-2 border-dashed border-[#e9d5ff] rounded-xl cursor-pointer hover:border-[#7c3aed] hover:bg-white transition-all">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/avif"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                setCustomBackground(file)
                                setCustomBackgroundPreview(URL.createObjectURL(file))
                              }
                            }}
                            className="hidden"
                          />
                          <div className="text-center">
                            <ImageIcon className="w-6 h-6 text-[#9ca3af] mx-auto mb-1" />
                            <span className="text-sm text-[#6b7280]">{t.upload.uploadBackgroundImage}</span>
                          </div>
                        </label>
                      ) : (
                        <div className="flex items-center gap-4">
                          <img
                            src={customBackgroundPreview!}
                            alt="Custom background"
                            className="h-24 rounded-xl object-cover border border-[#f0f0f0]"
                          />
                          <button
                            onClick={() => {
                              setCustomBackground(null)
                              if (customBackgroundPreview) {
                                URL.revokeObjectURL(customBackgroundPreview)
                                setCustomBackgroundPreview(null)
                              }
                            }}
                            className="text-red-600 hover:text-red-700 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Shadow */}
                <div className={`relative p-4 rounded-xl border transition-all ${shadowEnabled && removeBackground ? 'border-[#7c3aed] bg-[#faf5ff]' : 'border-[#f0f0f0] bg-white'} ${!removeBackground ? 'opacity-50' : ''}`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shadowEnabled}
                      onChange={(e) => {
                        if (!removeBackground) return
                        setShadowEnabled(e.target.checked)
                      }}
                      disabled={!removeBackground}
                      className="w-5 h-5 mt-1 rounded border-2 border-[#e5e7eb] text-[#7c3aed] focus:ring-[#7c3aed]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sun className="w-4 h-4 text-[#7c3aed]" />
                        <span className="font-semibold text-[#0f0a1e]">Drop shadow</span>
                        {!removeBackground && (
                          <span className="text-xs text-[#9ca3af]">(richiede rimozione sfondo)</span>
                        )}
                      </div>
                      <p className="text-sm text-[#6b7280]">Aggiunge un'ombra morbida sotto il prodotto su sfondo bianco.</p>
                    </div>
                  </label>

                  {shadowEnabled && removeBackground && (
                    <div className="mt-4 pt-4 border-t border-[#e9d5ff] grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Intensità</label>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0.05" max="0.8" step="0.05" value={shadowOpacity}
                            onChange={e => setShadowOpacity(Number(e.target.value))}
                            className="flex-1 h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#7c3aed]" />
                          <span className="text-xs font-mono text-[#7c3aed] w-8">{Math.round(shadowOpacity * 100)}%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Sfumatura</label>
                        <div className="flex items-center gap-2">
                          <input type="range" min="1" max="80" step="1" value={shadowBlur}
                            onChange={e => setShadowBlur(Number(e.target.value))}
                            className="flex-1 h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#7c3aed]" />
                          <span className="text-xs font-mono text-[#7c3aed] w-8">{shadowBlur}px</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#374151] mb-1">Offset verticale</label>
                        <div className="flex items-center gap-2">
                          <input type="range" min="0" max="40" step="1" value={shadowOffsetY}
                            onChange={e => setShadowOffsetY(Number(e.target.value))}
                            className="flex-1 h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#7c3aed]" />
                          <span className="text-xs font-mono text-[#7c3aed] w-8">{shadowOffsetY}px</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Marketplace Presets */}
                <div className="p-4 rounded-xl border border-[#f0f0f0] bg-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#7c3aed]" />
                    <span className="font-semibold text-[#0f0a1e]">Formato output</span>
                  </div>
                  <p className="text-sm text-[#6b7280] mb-4">Scegli uno o più marketplace per generare file con le specifiche esatte, oppure imposta dimensioni custom.</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {/* Custom card */}
                    <button
                      type="button"
                      onClick={() => setOutputPresets([])}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                        outputPresets.length === 0
                          ? 'border-[#7c3aed] bg-[#faf5ff]'
                          : 'border-[#f0f0f0] hover:border-[#d8b4fe]'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#f3f4f6]">
                        {outputPresets.length === 0
                          ? <Check className="w-3 h-3 text-[#7c3aed]" />
                          : <Settings className="w-3 h-3 text-[#9ca3af]" />
                        }
                      </div>
                      <span className="font-semibold text-sm text-[#0f0a1e]">Custom</span>
                      <span className="text-xs text-[#9ca3af] font-mono">{outputSize}×{outputSize}</span>
                    </button>

                    {MARKETPLACE_PRESETS.map(p => (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => togglePreset(p.key)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                          outputPresets.includes(p.key)
                            ? 'border-[#7c3aed] bg-[#faf5ff]'
                            : 'border-[#f0f0f0] hover:border-[#d8b4fe]'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${p.color}22` }}>
                          {outputPresets.includes(p.key)
                            ? <Check className="w-3 h-3" style={{ color: p.color }} />
                            : <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                          }
                        </div>
                        <span className="font-semibold text-sm text-[#0f0a1e]">{p.name}</span>
                        <span className="text-xs text-[#9ca3af] font-mono">{p.dims}</span>
                      </button>
                    ))}
                  </div>
                  {outputPresets.length > 0 && (
                    <p className="text-xs text-[#7c3aed] mt-3">
                      Genererà {outputPresets.length} file separati nel download ZIP.
                    </p>
                  )}
                </div>

                {/* Output Settings — visible only in Custom mode */}
                {outputPresets.length === 0 && <div className="p-4 rounded-xl border border-[#f0f0f0] bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5 text-[#7c3aed]" />
                    <span className="font-semibold text-[#0f0a1e]">{t.upload.outputSettings}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Output Size */}
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        {t.upload.outputSize}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="500"
                          max="4000"
                          step="100"
                          value={outputSize}
                          onChange={(e) => setOutputSize(Number(e.target.value))}
                          className="flex-1 h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
                        />
                        <span className="w-24 text-center px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-lg font-mono text-sm">
                          {outputSize}×{outputSize}
                        </span>
                      </div>
                    </div>

                    {/* Margin Percent */}
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        {t.upload.margin}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="35"
                          step="1"
                          value={marginPercent}
                          onChange={(e) => setMarginPercent(Number(e.target.value))}
                          className="flex-1 h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
                        />
                        <div className="w-28 text-center px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-lg font-mono text-sm">
                          {marginPercent}%
                          <div className="text-xs text-[#9ca3af]">
                            {marginPixels}px
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#9ca3af] mt-2">
                        {t.upload.marginHelper}
                      </p>
                    </div>
                  </div>
                </div>}

              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 'review' && (
            <div className="p-4 md:p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-[#0f0a1e] mb-2">{t.upload.reviewTitle}</h2>
              <p className="text-[#6b7280] mb-6">{t.upload.reviewSubtitle}</p>

              {/* Summary Card */}
              <div className="bg-[#faf5ff] rounded-2xl p-6 border border-[#e9d5ff] mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide mb-2">{t.upload.summaryJob}</h4>
                    <p className="text-xl font-bold text-[#0f0a1e]">{jobName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide mb-2">{t.upload.summaryImages}</h4>
                    <p className="text-xl font-bold text-[#0f0a1e]">{files.length} file ({totalFileSize.toFixed(1)} MB)</p>
                  </div>
                </div>

                {/* Options Summary */}
                <div className="mt-6 pt-6 border-t border-[#e9d5ff]">
                  <h4 className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide mb-3">{t.upload.summaryOptions}</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white text-[#7c3aed] rounded-full text-sm font-medium border border-[#e9d5ff]">
                      {t.upload.aiAlignment}
                    </span>
                    {removeBackground && (
                      <span className="px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-full text-sm font-medium border border-[#e9d5ff]">
                        {t.upload.backgroundRemoval}
                      </span>
                    )}
                    {customBackground && (
                      <span className="px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-full text-sm font-medium border border-[#e9d5ff]">
                        {t.upload.customBackgroundLabel}
                      </span>
                    )}
                    {removeBackground && shadowEnabled && (
                      <span className="px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-full text-sm font-medium border border-[#e9d5ff]">
                        Drop shadow
                      </span>
                    )}
                    {outputPresets.length > 0 && outputPresets.map(p => (
                      <span key={p} className="px-3 py-1 bg-[#faf5ff] text-[#7c3aed] rounded-full text-sm font-medium border border-[#e9d5ff] capitalize">
                        {p}
                      </span>
                    ))}
                    {outputPresets.length === 0 && (
                      <span className="px-3 py-1 bg-[#f3f4f6] text-[#6b7280] rounded-full text-sm font-medium">
                        {outputSize}×{outputSize}px
                      </span>
                    )}
                    <span className="px-3 py-1 bg-[#f3f4f6] text-[#6b7280] rounded-full text-sm font-medium">
                      {t.upload.margin} {marginPercent}% ({marginPixels}px)
                    </span>
                  </div>
                </div>
              </div>

              {/* Image Preview Grid */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide mb-3">{t.upload.summaryPreview}</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {files.slice(0, 16).map((file) => (
                    <div key={file.id} className="aspect-square rounded-lg overflow-hidden border border-[#f0f0f0]">
                      <img src={file.preview} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {files.length > 16 && (
                    <div className="aspect-square rounded-lg bg-[#faf5ff] flex items-center justify-center border border-[#e9d5ff]">
                      <span className="text-[#7c3aed] font-bold text-sm">+{files.length - 16}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Estimated Time */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">
                    {t.upload.estimatedTimeLabel.replace('{minutes}', String(Math.floor((files.length * 17 + 180) / (60 * 3))))}
                  </p>
                  <p className="text-sm text-blue-700">{t.upload.redirectInfo}</p>
                </div>
              </div>

              {/* Credit Warning */}
              {files.length > remainingCredits && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-900">{t.upload.insufficientCredits}</p>
                    <p className="text-sm text-red-700">
                      {t.upload.insufficientCreditsDesc
                        .replace('{remaining}', String(remainingCredits))
                        .replace('{count}', String(files.length))}{' '}
                      <Link href="/pricing" className="underline font-semibold">{t.dashboard.upgrade}</Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Footer */}
          <div className="px-4 md:px-8 py-4 bg-[#f9fafb] border-t border-[#f0f0f0] flex items-center justify-between">
            <div>
              {stepIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2 text-[#6b7280] hover:text-[#111827] font-semibold transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  {t.common.back}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep !== 'review' ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center gap-2 px-6 py-3 bg-[#7c3aed] text-white font-bold rounded-xl hover:bg-[#6d28d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.upload.continueBtn}
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleProcess}
                  disabled={isUploading || files.length > remainingCredits}
                  className="flex items-center gap-2 px-8 py-3 bg-[#7c3aed] text-white font-bold rounded-xl hover:bg-[#6d28d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      {t.upload.processingBtn}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      {t.upload.startProcessing}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Help Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-[#f0f0f0] flex items-start gap-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-[#0f0a1e] text-sm">{t.upload.fast}</h4>
              <p className="text-xs text-[#6b7280]">{t.upload.fastDesc}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#f0f0f0] flex items-start gap-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="w-10 h-10 bg-[#faf5ff] rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#7c3aed]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#0f0a1e] text-sm">{t.upload.aiPrecision}</h4>
              <p className="text-xs text-[#6b7280]">{t.upload.aiPrecisionDesc}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#f0f0f0] flex items-start gap-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-[#0f0a1e] text-sm">{t.upload.secure}</h4>
              <p className="text-xs text-[#6b7280]">{t.upload.secureDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
