'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Upload, X, Check, Loader, Sparkles, Zap, Shield, ImageIcon, Lock, ChevronRight, ChevronLeft, Settings, Eye, AlertCircle, Info } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useUpload } from '@/hooks/useUpload'
import { useAuth } from '@/contexts/AuthContext'

type Step = 'upload' | 'configure' | 'review'

const STEPS: { id: Step; label: string; icon: typeof Upload }[] = [
  { id: 'upload', label: 'Upload', icon: Upload },
  { id: 'configure', label: 'Configure', icon: Settings },
  { id: 'review', label: 'Review', icon: Eye },
]

export default function UploadPage() {
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

  const onDrop = (acceptedFiles: File[]) => {
    const totalFiles = files.length + acceptedFiles.length
    if (totalFiles > maxBatchSize) {
      toast.error(`Maximum ${maxBatchSize} images per batch. ${!isPremium ? 'Upgrade to process more!' : ''}`)
      const remainingSlots = maxBatchSize - files.length
      if (remainingSlots > 0) {
        addFiles(acceptedFiles.slice(0, remainingSlots))
      }
      return
    }

    // Check credits
    if (files.length + acceptedFiles.length > remainingCredits) {
      toast.error(`You only have ${remainingCredits} jobs left this month.`)
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
    maxSize: 50 * 1024 * 1024,
    maxFiles: maxBatchSize,
  })

  const handleNext = () => {
    if (currentStep === 'upload' && files.length === 0) {
      toast.error('Upload at least one image')
      return
    }
    if (currentStep === 'configure' && !jobName.trim()) {
      toast.error('Enter a job name')
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
    }

    const jobId = await uploadAndProcess(jobName.trim(), options)

    if (jobId) {
      toast.success('Job started! Redirecting to dashboard...')
      setTimeout(() => {
        router.push(`/dashboard?job=${jobId}`)
      }, 1500)
    }
  }


  const totalFileSize = useMemo(() => {
    return files.reduce((acc, f) => acc + f.file.size, 0) / 1024 / 1024
  }, [files])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-8 px-4 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Quota */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              New <span className="text-gradient">Job</span>
            </h1>
            <p className="text-gray-600 mt-1">Process your product photos with AI</p>
          </div>

          {/* Quota Indicator */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-purple-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${usagePercentage > 90 ? 'bg-red-100' : usagePercentage > 70 ? 'bg-amber-100' : 'bg-green-100'
                }`}>
                <Zap className={`w-5 h-5 ${usagePercentage > 90 ? 'text-red-600' : usagePercentage > 70 ? 'text-amber-600' : 'text-green-600'
                  }`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{remainingCredits}</span>
                  <span className="text-gray-500 text-sm">jobs remaining</span>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-1">
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

        {/* Progress Stepper */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-8 border-2 border-purple-100 shadow-lg">
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
                      ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg'
                      : isCompleted
                        ? 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200'
                        : 'bg-gray-100 text-gray-400'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'
                      }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className="font-semibold hidden sm:block">{step.label}</span>
                  </button>

                  {index < STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded ${index < stepIndex ? 'bg-green-400' : 'bg-gray-200'
                      }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-100 shadow-xl overflow-hidden">
          {/* Step 1: Upload */}
          {currentStep === 'upload' && (
            <div className="p-4 md:p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload your images</h2>
              <p className="text-gray-600 mb-6">Drag your product photos or click to select</p>

              {/* Drop Zone */}
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-2xl p-8 md:p-12 mb-6
                  transition-all duration-300 cursor-pointer
                  ${isDragActive
                    ? 'border-fuchsia-500 bg-fuchsia-50 scale-[1.02]'
                    : 'border-purple-300 hover:border-fuchsia-400 hover:bg-purple-50'
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all ${isDragActive ? 'bg-fuchsia-500 scale-110' : 'gradient-purple-fuchsia'
                    }`}>
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-2">
                    {isDragActive ? 'Drop it here!' : 'Drag images here'}
                  </p>
                  <p className="text-gray-600 mb-4">or click to browse</p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">JPG</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">PNG</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">WebP</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Max 50MB</span>
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
                      ? 'Free Plan: 1 image per job. '
                      : `You can upload up to ${maxBatchSize} images per job.`
                    }
                    {maxBatchSize === 1 && (
                      <Link href="/pricing" className="font-semibold underline hover:no-underline">
                        Upgrade for unlimited batches
                      </Link>
                    )}
                  </p>
                </div>
              </div>

              {/* Uploaded Files */}
              {files.length > 0 && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">
                      {files.length} {files.length === 1 ? 'image' : 'images'} added
                      <span className="text-gray-500 font-normal ml-2">({totalFileSize.toFixed(1)} MB)</span>
                    </h3>
                    <button
                      onClick={clearFiles}
                      className="text-sm text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove all
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {files.map((uploadedFile, index) => (
                      <div
                        key={uploadedFile.id}
                        className="relative group animate-scale-in"
                        style={{ animationDelay: `${index * 0.03}s` }}
                      >
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-purple-100 group-hover:border-fuchsia-400 transition-all shadow-sm">
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
                        <p className="text-xs text-gray-500 mt-1 truncate px-1">{uploadedFile.file.name}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure job</h2>
              <p className="text-gray-600 mb-6">Customize your processing options</p>

              {/* Job Name */}
              <div className="mb-8">
                <label htmlFor="jobName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobName"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  placeholder="e.g. Summer Collection 2024, Product Catalog..."
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-fuchsia-400 transition-colors text-lg"
                  maxLength={100}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">A descriptive name to identify this batch</p>
              </div>

              {/* Processing Options */}
              <div className="space-y-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-fuchsia-500" />
                  Processing Options
                </h3>

                {/* Background Removal */}
                <div className={`relative p-4 rounded-xl border-2 transition-all ${removeBackground ? 'border-fuchsia-400 bg-fuchsia-50' : 'border-gray-200 bg-white'
                  } ${!isPremium ? 'opacity-60' : ''}`}>
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={removeBackground}
                      onChange={(e) => {
                        if (!isPremium) {
                          toast.error('Upgrade to Premium to use background removal')
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
                      className="w-5 h-5 mt-1 rounded border-2 border-purple-300 text-fuchsia-500 focus:ring-fuchsia-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">Remove Background</span>
                        {!isPremium && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-fuchsia-100 text-fuchsia-700 text-xs font-semibold rounded-full">
                            <Lock className="w-3 h-3" />
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        AI automatically removes the background for clean product shots
                      </p>
                    </div>
                  </label>

                  {/* Custom Background */}
                  {removeBackground && isPremium && (
                    <div className="mt-4 pt-4 border-t border-fuchsia-200 animate-fade-in">
                      <p className="text-sm font-medium text-gray-700 mb-3">Custom background (optional)</p>
                      {!customBackground ? (
                        <label className="flex items-center justify-center h-24 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-fuchsia-400 hover:bg-white transition-all">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
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
                            <ImageIcon className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                            <span className="text-sm text-gray-600">Upload background image</span>
                          </div>
                        </label>
                      ) : (
                        <div className="flex items-center gap-4">
                          <img
                            src={customBackgroundPreview!}
                            alt="Custom background"
                            className="h-24 rounded-xl object-cover border-2 border-purple-200"
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

                {/* Output Settings */}
                <div className="p-4 rounded-xl border-2 border-gray-200 bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-900">Output Settings</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Output Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output Size
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="500"
                          max="4000"
                          step="100"
                          value={outputSize}
                          onChange={(e) => setOutputSize(Number(e.target.value))}
                          className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                        />
                        <span className="w-24 text-center px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-mono text-sm">
                          {outputSize}×{outputSize}
                        </span>
                      </div>
                    </div>

                    {/* Margin Percent */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Margin
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.5"
                          value={marginPercent}
                          onChange={(e) => setMarginPercent(Number(e.target.value))}
                          className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                        />
                        <div className="w-28 text-center px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-mono text-sm">
                          {marginPercent}%
                          <div className="text-xs text-purple-500">
                            {marginPixels}px
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Percentage relative to the output size.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 'review' && (
            <div className="p-4 md:p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & start</h2>
              <p className="text-gray-600 mb-6">Check the details before starting processing</p>

              {/* Summary Card */}
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 border-2 border-purple-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Job</h4>
                    <p className="text-xl font-bold text-gray-900">{jobName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Images</h4>
                    <p className="text-xl font-bold text-gray-900">{files.length} file ({totalFileSize.toFixed(1)} MB)</p>
                  </div>
                </div>

                {/* Options Summary */}
                <div className="mt-6 pt-6 border-t border-purple-200">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Options</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                      AI Alignment
                    </span>
                    {removeBackground && (
                      <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium">
                        Background Removal
                      </span>
                    )}
                    {customBackground && (
                      <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full text-sm font-medium">
                        Custom Background
                      </span>
                    )}
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {outputSize}×{outputSize}px
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      Margin {marginPercent}% ({marginPixels}px)
                    </span>
                  </div>
                </div>
              </div>

              {/* Image Preview Grid */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Preview</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {files.slice(0, 16).map((file) => (
                    <div key={file.id} className="aspect-square rounded-lg overflow-hidden border border-purple-200">
                      <img src={file.preview} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {files.length > 16 && (
                    <div className="aspect-square rounded-lg bg-purple-100 flex items-center justify-center border border-purple-200">
                      <span className="text-purple-700 font-bold text-sm">+{files.length - 16}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Estimated Time */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">
                    Estimated time: ~{Math.floor((files.length * 17 + 180) / (60 * 3))} minutes
                  </p>
                  <p className="text-sm text-blue-700">You'll be redirected to the dashboard to track progress</p>
                </div>
              </div>

              {/* Credit Warning */}
              {files.length > remainingCredits && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-900">Insufficient credits</p>
                    <p className="text-sm text-red-700">
                      You have {remainingCredits} credits but are trying to process {files.length} images.{' '}
                      <Link href="/pricing" className="underline font-semibold">Upgrade</Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Footer */}
          <div className="px-4 md:px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div>
              {stepIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep !== 'review' ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleProcess}
                  disabled={isUploading || files.length > remainingCredits}
                  className="flex items-center gap-2 px-8 py-3 gradient-purple-fuchsia text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isUploading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Start Processing
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Help Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Fast</h4>
              <p className="text-xs text-gray-600">~10 sec per image</p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">AI Precision</h4>
              <p className="text-xs text-gray-600">Perfect alignment</p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100 flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Secure</h4>
              <p className="text-xs text-gray-600">End-to-end encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
