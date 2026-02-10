import { useState, useCallback } from 'react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

export interface UploadedFile {
  id: string
  file: File
  preview: string
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error'
  error?: string
}

export interface ProcessingJob {
  job_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress?: number | null
  message?: string | null
  created_at?: string
  completed_at?: string
}

export interface ProcessingOptions {
  removeBackground?: boolean
  customBackground?: File
  // Premium: custom output size (square, 500-4000px)
  outputSize?: number
  // Premium: custom margin (10-200px)
  margin?: number
}

export function useUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [currentJob, setCurrentJob] = useState<ProcessingJob | null>(null)

  const addFiles = useCallback((newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
    }))

    setFiles((prev) => [...prev, ...uploadedFiles])
    return uploadedFiles
  }, [])

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === fileId)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== fileId)
    })
  }, [])

  const clearFiles = useCallback(() => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
  }, [files])

  const uploadAndProcess = async (jobName?: string, options?: ProcessingOptions) => {
    if (files.length === 0) {
      toast.error('No files to upload')
      return null
    }

    setIsUploading(true)

    try {
      // Create batch job with all files
      const fileArray = files.map(f => f.file)

      // Update all files to uploading status
      setFiles((prev) =>
        prev.map((f) => ({ ...f, status: 'uploading' as const }))
      )

      // Upload batch with job name and processing options
      const response = await api.uploadBatch(fileArray, jobName, options)

      // Update all files to processing status
      setFiles((prev) =>
        prev.map((f) => ({ ...f, status: 'processing' as const }))
      )

      // Set current job
      setCurrentJob({
        job_id: response.job_id,
        status: 'processing',
        progress: 0,
      })

      toast.success(`Job "${jobName || 'Untitled'}" created! Processing ${files.length} images...`)
      return response.job_id
    } catch (error: any) {
      toast.error(error.message || 'Upload failed')
      setFiles((prev) =>
        prev.map((f) => ({
          ...f,
          status: 'error' as const,
          error: error.message,
        }))
      )
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const pollJobStatus = useCallback(
    async (jobId: string): Promise<ProcessingJob> => {
      try {
        const status = await api.getProcessingStatus(jobId)
        setCurrentJob(status)

        // Update file statuses based on job progress
        if (status.status === 'completed') {
          setFiles((prev) =>
            prev.map((f) => ({ ...f, status: 'completed' as const }))
          )
          toast.success('Processing completed!')
        } else if (status.status === 'failed') {
          setFiles((prev) =>
            prev.map((f) => ({
              ...f,
              status: 'error' as const,
              error: 'Processing failed',
            }))
          )
          toast.error('Processing failed')
        }

        return status
      } catch (error: any) {
        console.error('Error polling job status:', error)

        // If job not found, mark as error and stop
        if (error.message?.includes('404') || error.message?.includes('not found')) {
          setFiles((prev) =>
            prev.map((f) => ({
              ...f,
              status: 'error' as const,
              error: 'Job not found',
            }))
          )
          setCurrentJob(null)
        }

        throw error
      }
    },
    []
  )

  const downloadProcessedImages = async (jobId: string) => {
    try {
      // Get job details which includes the output image URL
      const job = await api.getJobDetails(jobId)

      if (!job.output_image_url) {
        toast.error('No processed image available')
        throw new Error('No output image')
      }

      // Trigger download
      const link = document.createElement('a')
      link.href = job.output_image_url
      link.download = `processed-image-${jobId}.jpg`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success('Download started!')
      return job.output_image_url
    } catch (error: any) {
      toast.error(error.message || 'Download failed')
      throw error
    }
  }

  return {
    files,
    isUploading,
    currentJob,
    addFiles,
    removeFile,
    clearFiles,
    uploadAndProcess,
    pollJobStatus,
    downloadProcessedImages,
  }
}
