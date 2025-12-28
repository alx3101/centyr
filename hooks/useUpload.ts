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
  progress: number
  processed_count: number
  total_count: number
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
      // Update all file statuses to uploading
      setFiles((prev) =>
        prev.map((f) => ({ ...f, status: 'uploading' as const }))
      )

      const filesToUpload = files.map((f) => f.file)
      const response = await api.processImages(filesToUpload)

      // Update file statuses to processing
      setFiles((prev) =>
        prev.map((f) => ({ ...f, status: 'processing' as const }))
      )

      // Set current job for polling
      setCurrentJob({
        job_id: response.job_id,
        status: 'processing',
        progress: 0,
        processed_count: 0,
        total_count: files.length,
      })

      toast.success('Upload started! Processing images...')
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
        throw error
      }
    },
    []
  )

  const downloadProcessedImages = async (jobId: string) => {
    try {
      const { download_url } = await api.downloadProcessedImages(jobId)

      // Trigger download
      const link = document.createElement('a')
      link.href = download_url
      link.download = `processed-images-${jobId}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success('Download started!')
      return download_url
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
