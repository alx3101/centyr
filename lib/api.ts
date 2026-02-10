const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// ===========================
// TypeScript Types/Interfaces
// ===========================

export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface UserInfo {
  user_id: string
  email: string
  email_verified: boolean
  username: string
  subscription: {
    plan: string
    plan_name: string
    current_period_uploads: number
    monthly_limit: number
    status: string,
    usage_percentage: number
    features: Features;

  }
}

export interface Features {
  analytics_enabled: boolean;
  max_batch_size: number;
  monthly_limit: number;
  plan_id: string;
  plan_name: string;
  priority_queue: boolean;
  rate_limit_per_hour: number;
  rate_limit_per_minute: number;
  storage_retention_days: number;
  webhooks_enabled: boolean;
}


export interface JobOutput {
  input_s3_key: string
  input_url: string
  input_width: number
  input_height: number
  input_format: string
  output_s3_key: string
  output_url: string
  output_width: number
  output_height: number
  output_format: string
  status: string
  processing_time: number
}

export interface JobResponse {
  job_id: string
  status: JobStatus
  created_at: string
  updated_at: string
  input_image_url?: string | null
  output_image_url?: string | null
  error_message?: string | null
  processing_time?: number | null
  job_name?: string
  image_count?: number
  batch_mode?: boolean
  outputs?: JobOutput[]
}

export interface JobStatusResponse {
  job_id: string
  status: JobStatus
  progress?: number | null
  message?: string | null
}

export interface CheckoutResponse {
  session_id: string
  checkout_url: string
}

export interface CreateCheckoutRequest {
  price_id: string
  success_url: string
  cancel_url: string
}

export interface CustomerPortalRequest {
  return_url: string
}

export interface CustomerPortalResponse {
  portal_url: string
}

export interface UploadResponse {
  job_id: string
}

export interface ProcessingOptions {
  removeBackground?: boolean
  customBackground?: File
  // Premium: custom output size (square, 500-4000px)
  outputSize?: number
  // Premium: custom margin (10-200px)
  margin?: number
}

export interface HealthCheckResponse {
  status: string
  services: {
    dynamodb: boolean
    s3: boolean
    redis: boolean
    cognito: boolean
  }
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  period: string
  stripe_price_id: string | null
  stripe_product_id: string
  features: string[]
  popular: boolean
  monthly_limit: number
  metadata: Record<string, any>
}

export interface PricingPlansResponse {
  plans: PricingPlan[]
}

// ===========================
// API Client Class
// ===========================

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  /**
   * Generic request method with automatic token injection
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      let errorMessage = 'Request failed'
      try {
        const error = await response.json()
        errorMessage = error.detail || error.message || errorMessage
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }
      throw new Error(errorMessage)
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) {
      return {} as T
    }

    return response.json()
  }

  // ===========================
  // Health & Root Endpoints
  // ===========================

  /**
   * Health Check - GET /health
   *
   * Checks connectivity to all critical services:
   * - DynamoDB (subscriptions table)
   * - S3 (bucket accessibility)
   * - Redis (Celery broker)
   * - Cognito (JWKS endpoint)
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    return this.request<HealthCheckResponse>('/health')
  }

  /**
   * Root - GET /
   */
  async getRoot(): Promise<any> {
    return this.request('//')
  }

  // ===========================
  // User Endpoints
  // ===========================

  /**
   * Get Current User Info - GET /api/v1/me
   *
   * Get current authenticated user information from Cognito token
   * Includes subscription and quota information
   */
  async getCurrentUser(): Promise<UserInfo> {
    return this.request<UserInfo>('/api/v1/me')
  }

  // ===========================
  // Upload Endpoints
  // ===========================

  /**
   * Upload Image - POST /api/v1/upload
   *
   * Upload an image for alignment processing
   *
   * Requires authentication (JWT token in Authorization header)
   * Respects subscription quota limits (Free: 10/month, Premium: 500/month)
   *
   * @param file - Image file to align
   * @returns job_id to track the processing status
   * @throws {Error} 400: Validation error (invalid file, filename, dimensions, etc.)
   * @throws {Error} 413: File too large
   * @throws {Error} 429: Quota exceeded
   * @throws {Error} 503: Service unavailable (S3 or DynamoDB error)
   * @throws {Error} 500: Unexpected error
   */
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseURL}/api/v1/upload`, {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      let errorMessage = 'Upload failed'
      try {
        const error = await response.json()
        errorMessage = error.detail || error.message || errorMessage
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }
      throw new Error(errorMessage)
    }

    return response.json()
  }

  /**
   * Upload Batch - POST /api/v1/upload/batch
   *
   * Upload multiple images as a single batch job
   *
   * Requires authentication (JWT token in Authorization header)
   * Respects subscription quota limits and max_batch_size for the plan
   *
   * @param files - Array of image files to process
   * @param jobName - Optional name for the batch job
   * @param options - Optional processing options (removeBackground, customBackground)
   * @returns job_id to track the processing status
   * @throws {Error} 400: Validation error or batch size exceeded
   * @throws {Error} 413: File too large
   * @throws {Error} 429: Quota exceeded
   * @throws {Error} 503: Service unavailable
   * @throws {Error} 500: Unexpected error
   */
  async uploadBatch(files: File[], jobName?: string, options?: ProcessingOptions): Promise<UploadResponse> {
    const formData = new FormData()

    // Add all files
    files.forEach((file, index) => {
      formData.append('files', file)
    })

    // Add job name if provided
    if (jobName) {
      formData.append('job_name', jobName)
    }

    // Add processing options
    if (options?.removeBackground) {
      formData.append('remove_background', 'true')
    }

    // Add custom background image if provided
    if (options?.customBackground) {
      formData.append('background_image', options.customBackground)
    }

    // Premium: custom output size
    if (options?.outputSize) {
      formData.append('output_size', options.outputSize.toString())
    }

    // Premium: custom margin
    if (options?.margin) {
      formData.append('margin', options.margin.toString())
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseURL}/api/v1/upload`, {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      let errorMessage = 'Batch upload failed'
      try {
        const error = await response.json()
        errorMessage = error.detail || error.message || errorMessage
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }
      throw new Error(errorMessage)
    }

    return response.json()
  }

  // ===========================
  // Job Endpoints
  // ===========================

  /**
   * Get Job Details - GET /api/v1/jobs/{job_id}
   *
   * Get detailed job information
   * Requires authentication. Users can only access their own jobs.
   *
   * @param jobId - Job ID
   * @returns Full job details including status, timestamps, and URLs
   */
  async getJobDetails(jobId: string): Promise<JobResponse> {
    return this.request<JobResponse>(`/api/v1/jobs/${jobId}`)
  }

  /**
   * Get Job Status - GET /api/v1/jobs/{job_id}/status
   *
   * Get simplified job status
   * Requires authentication. Quick endpoint for polling job progress.
   *
   * @param jobId - Job ID
   */
  async getJobStatus(jobId: string): Promise<JobStatusResponse> {
    return this.request<JobStatusResponse>(`/api/v1/jobs/${jobId}/status`)
  }

  /**
   * Get Job Result - GET /api/v1/jobs/{job_id}/result
   *
   * Get the processed image result
   * Requires authentication. Redirects to the S3 URL if processing is complete.
   *
   * @param jobId - Job ID
   */
  async getJobResult(jobId: string): Promise<any> {
    return this.request(`/api/v1/jobs/${jobId}/result`)
  }

  /**
   * Delete Job - DELETE /api/v1/jobs/{job_id}
   *
   * Delete a job and its associated resources
   * Requires authentication. Users can only delete their own jobs.
   * Removes job from database and optionally deletes files from S3.
   *
   * @param jobId - Job ID
   */
  async deleteJob(jobId: string): Promise<any> {
    return this.request(`/api/v1/jobs/${jobId}`, {
      method: 'DELETE',
    })
  }

  /**
   * Retry Job - POST /api/v1/jobs/{job_id}/retry
   *
   * Retry failed/incomplete images in a batch job.
   * Re-sends SQS messages for images that were not processed.
   *
   * @param jobId - Job ID
   */
  async retryJob(jobId: string): Promise<{ job_id: string; retry_count: number; status: string; message: string }> {
    return this.request(`/api/v1/jobs/${jobId}/retry`, {
      method: 'POST',
    })
  }

  // ===========================
  // Pricing Endpoints
  // ===========================

  /**
   * Get Pricing Plans - GET /api/v1/pricing/plans
   *
   * Fetches all active pricing plans from Stripe.
   * This endpoint is public (no authentication required).
   *
   * @returns List of pricing plans
   */
  async getPricingPlans(): Promise<PricingPlansResponse> {
    return this.request<PricingPlansResponse>('/api/v1/pricing/plans')
  }

  // ===========================
  // Billing Endpoints
  // ===========================

  /**
   * Create Checkout Session - POST /api/v1/billing/create-checkout
   *
   * Creates a checkout session for the user to purchase a subscription.
   *
   * Flow:
   * 1. User clicks "Upgrade to Premium" in frontend
   * 2. Frontend calls this endpoint with price_id
   * 3. Backend creates Stripe checkout session
   * 4. Frontend redirects to checkout_url
   * 5. User completes payment on Stripe
   * 6. Stripe redirects to success_url
   * 7. Stripe sends webhook to /webhooks/stripe
   * 8. Backend updates subscription in database
   *
   * @param request - Checkout request with price_id and redirect URLs
   * @returns Checkout session with URL to redirect user
   */
  async createCheckoutSession(request: CreateCheckoutRequest): Promise<CheckoutResponse> {
    return this.request<CheckoutResponse>('/api/v1/billing/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
  }

  /**
   * Create Customer Portal - POST /api/v1/billing/customer-portal
   *
   * Allows users to:
   * - Update payment method
   * - View invoices
   * - Cancel subscription
   * - Download receipts
   *
   * @param request - Portal request with return URL
   * @returns Portal URL to redirect user
   */
  async createCustomerPortal(request: CustomerPortalRequest): Promise<CustomerPortalResponse> {
    return this.request<CustomerPortalResponse>('/api/v1/billing/customer-portal', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  /**
   * Cancel Subscription - POST /api/v1/billing/cancel-subscription
   *
   * @param cancelImmediately - If true, cancel now. If false, cancel at period end
   * @returns Success message
   */
  async cancelSubscription(cancelImmediately: boolean = false): Promise<any> {
    return this.request('/api/v1/billing/cancel-subscription', {
      method: 'POST',
      body: JSON.stringify({ cancel_immediately: cancelImmediately }),
    })
  }

  // ===========================
  // Legacy/Compatibility Methods
  // ===========================

  /**
   * @deprecated Use getCurrentUser() instead
   */
  async getUser() {
    return this.getCurrentUser()
  }

  /**
   * @deprecated Use uploadImage() instead
   */
  async processImages(files: File[]) {
    // For backward compatibility, upload the first file
    if (files.length === 0) {
      throw new Error('No files provided')
    }
    return this.uploadImage(files[0])
  }

  /**
   * @deprecated Use getJobStatus() instead
   */
  async getProcessingStatus(jobId: string) {
    return this.getJobStatus(jobId)
  }

  /**
   * Get User Jobs - GET /api/v1/jobs
   *
   * Get all jobs for the current user
   * Returns a list of jobs ordered by creation date (most recent first)
   *
   * @param limit - Maximum number of jobs to return (default: 50)
   * @returns List of user jobs with metadata
   */
  async getJobs(limit: number = 50): Promise<{ jobs: any[]; count: number }> {
    return this.request<{ jobs: any[]; count: number }>(`/api/v1/jobs?limit=${limit}`)
  }

  /**
   * @deprecated Use getJobResult() instead (endpoint not in new API)
   */
  async downloadProcessedImages(jobId: string) {
    return this.getJobResult(jobId)
  }

  /**
   * @deprecated Auth endpoints removed - use AWS Cognito directly
   */
  async login(_email: string, _password: string) {
    throw new Error('login() is deprecated - use AWS Cognito authentication')
  }

  /**
   * @deprecated Auth endpoints removed - use AWS Cognito directly
   */
  async signup(_email: string, _password: string, _fullName: string) {
    throw new Error('signup() is deprecated - use AWS Cognito authentication')
  }

  /**
   * @deprecated Use createCheckoutSession() instead
   */
  async getSubscription() {
    // Subscription info is now included in getCurrentUser()
    const user = await this.getCurrentUser()
    return user.subscription
  }
}

export const api = new ApiClient(API_BASE_URL)
