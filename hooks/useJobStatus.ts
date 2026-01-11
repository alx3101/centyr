'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'react-hot-toast'

export interface JobStatusUpdate {
  job_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  message: string
  updated_at?: string
  output_url?: string
  error_message?: string
}

interface UseJobStatusOptions {
  onComplete?: (data: JobStatusUpdate) => void
  onError?: (error: string) => void
  onStatusChange?: (data: JobStatusUpdate) => void
}

/**
 * Hook for real-time job status updates using Server-Sent Events (SSE)
 *
 * Replaces inefficient polling with a persistent HTTP connection that receives
 * updates only when the job status actually changes.
 *
 * @param jobId - The job ID to monitor
 * @param options - Callbacks for status events
 * @returns Current job status and control functions
 */
export function useJobStatus(
  jobId: string | null,
  options: UseJobStatusOptions = {}
) {
  const [status, setStatus] = useState<JobStatusUpdate | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const eventSourceRef = useRef<EventSource | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
      eventSourceRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    setIsConnected(false)
  }, [])

  const connect = useCallback(() => {
    if (!jobId) {
      return
    }

    // Don't reconnect if already connected
    if (eventSourceRef.current) {
      return
    }

    const token = localStorage.getItem('auth_token')
    if (!token) {
      setError('No authentication token')
      return
    }

    // Create SSE connection
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const url = `${apiUrl}/api/v1/jobs/${jobId}/stream?token=${token}`

    const eventSource = new EventSource(url)
    eventSourceRef.current = eventSource

    // Connection opened
    eventSource.onopen = () => {
      setIsConnected(true)
      setError(null)
      console.log(`[SSE] Connected to job ${jobId}`)
    }

    // Status update event
    eventSource.addEventListener('status', (event) => {
      try {
        const data: JobStatusUpdate = JSON.parse(event.data)
        setStatus(data)
        options.onStatusChange?.(data)

        // Show toast for status changes
        if (data.status === 'processing') {
          toast.loading(data.message, { id: `job-${jobId}` })
        } else if (data.status === 'completed') {
          toast.success(data.message, { id: `job-${jobId}` })
        }
      } catch (err) {
        console.error('[SSE] Failed to parse status event:', err)
      }
    })

    // Completion event
    eventSource.addEventListener('complete', (event) => {
      try {
        const data: JobStatusUpdate = JSON.parse(event.data)
        setStatus(data)
        options.onComplete?.(data)

        if (data.status === 'completed') {
          toast.success('Processing completed!', { id: `job-${jobId}` })
        } else if (data.status === 'failed') {
          toast.error(data.error_message || 'Processing failed', { id: `job-${jobId}` })
        }
      } catch (err) {
        console.error('[SSE] Failed to parse complete event:', err)
      }
    })

    // Error event
    eventSource.addEventListener('error', (event: any) => {
      try {
        const data = JSON.parse(event.data)
        const errorMsg = data.error || 'Unknown error'
        setError(errorMsg)
        options.onError?.(errorMsg)
        toast.error(errorMsg, { id: `job-${jobId}` })
      } catch (err) {
        // EventSource onerror fallback
        console.error('[SSE] Connection error:', err)
      }
    })

    // Close event - server signals to disconnect
    eventSource.addEventListener('close', (event) => {
      console.log(`[SSE] Server requested close for job ${jobId}`)
      disconnect()
    })

    // Generic error handler (connection issues)
    eventSource.onerror = (err) => {
      console.error('[SSE] EventSource error:', err)
      setIsConnected(false)

      // Don't auto-reconnect if job is completed/failed
      if (status?.status && ['completed', 'failed'].includes(status.status)) {
        disconnect()
        return
      }

      // Auto-reconnect after 5 seconds for transient errors
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('[SSE] Attempting to reconnect...')
        disconnect()
        connect()
      }, 5000)
    }

    return eventSource
  }, [jobId, options, status?.status, disconnect])

  // Setup and cleanup
  useEffect(() => {
    if (!jobId) {
      disconnect()
      return
    }

    connect()

    // Cleanup on unmount or jobId change
    return () => {
      disconnect()
    }
  }, [jobId, connect, disconnect])

  return {
    status,
    isConnected,
    error,
    disconnect,
    reconnect: () => {
      disconnect()
      connect()
    }
  }
}
