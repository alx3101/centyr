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

  const uploadAndProcess = async () => {
    if (files.length === 0) {
      toast.error('No files to upload')
      return null
    }

    setIsUploading(true)

    try {
      // Upload files one at a time (new API only accepts single file)
      const jobIds: string[] = []

      for (const fileData of files) {
        // Update file status to uploading
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id ? { ...f, status: 'uploading' as const } : f
          )
        )

        // Upload single file
        const response = await api.uploadImage(fileData.file)
        jobIds.push(response.job_id)

        // Update file status to processing
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileData.id ? { ...f, status: 'processing' as const } : f
          )
        )
      }

      // Set current job to first one (for backward compatibility)
      if (jobIds.length > 0) {
        setCurrentJob({
          job_id: jobIds[0],
          status: 'processing',
          progress: 0,
        })
      }

      toast.success('Upload started! Processing images...')
      return jobIds[0] || null
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
