const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

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
      const error = await response.json()
      throw new Error(error.detail || 'Request failed')
    }

    return response.json()
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ access_token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async signup(email: string, password: string, fullName: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
      }),
    })
  }

  async getUser() {
    return this.request<any>('/auth/me')
  }

  // Image processing endpoints
  async processImages(files: File[]) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    const token = localStorage.getItem('auth_token')

    const response = await fetch(`${this.baseURL}/images/process`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Processing failed')
    }

    return response.json()
  }

  async getProcessingStatus(jobId: string) {
    return this.request<{
      job_id: string
      status: 'pending' | 'processing' | 'completed' | 'failed'
      progress: number
      processed_count: number
      total_count: number
    }>(`/images/status/${jobId}`)
  }

  async getJobs() {
    return this.request<{ jobs: any[] }>('/images/jobs')
  }

  async downloadProcessedImages(jobId: string) {
    return this.request<{ download_url: string; expires_in: number }>(
      `/images/download/${jobId}`
    )
  }

  // Subscription endpoints
  async createCheckoutSession(planId: string, successUrl: string, cancelUrl: string) {
    return this.request<{ session_url: string }>('/subscriptions/create-checkout', {
      method: 'POST',
      body: JSON.stringify({
        plan_id: planId,
        success_url: successUrl,
        cancel_url: cancelUrl,
      }),
    })
  }

  async getSubscription() {
    return this.request<any>('/subscriptions/me')
  }

  async cancelSubscription() {
    return this.request('/subscriptions/cancel', {
      method: 'POST',
    })
  }
}

export const api = new ApiClient(API_BASE_URL)
