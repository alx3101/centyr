# API Client Usage Guide

This guide shows how to use the updated API client based on your Image Alignment Service OpenAPI specification.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Authentication](#authentication)
3. [Available Endpoints](#available-endpoints)
4. [TypeScript Types](#typescript-types)
5. [Error Handling](#error-handling)
6. [Migration Guide](#migration-guide)

---

## Quick Start

```typescript
import { api } from '@/lib/api'

// Upload an image
const file = /* File object from input */
const { job_id } = await api.uploadImage(file)

// Poll job status
const status = await api.getJobStatus(job_id)

// Get job details
const job = await api.getJobDetails(job_id)
```

---

## Authentication

The API uses **AWS Cognito** for authentication with JWT Bearer tokens.

### Setting the Token

```typescript
// After Cognito authentication, store the token
localStorage.setItem('auth_token', cognitoIdToken)

// The API client automatically includes the token in all requests
// Authorization: Bearer {token}
```

### Getting Current User

```typescript
import { api, type UserInfo } from '@/lib/api'

const userInfo: UserInfo = await api.getCurrentUser()
console.log(userInfo)
// {
//   user_id: "cognito-user-id",
//   email: "user@example.com",
//   email_verified: true,
//   username: "johndoe",
//   subscription: {
//     plan: "free",
//     usage: 3,
//     quota: 10,
//     status: "active"
//   }
// }
```

---

## Available Endpoints

### Health & System

#### Health Check
```typescript
const health = await api.healthCheck()
// Returns: { status: "healthy", services: { dynamodb: true, s3: true, redis: true, cognito: true } }
```

### User Management

#### Get Current User Info
```typescript
import { type UserInfo } from '@/lib/api'

const user: UserInfo = await api.getCurrentUser()
```

### Image Upload & Processing

#### Upload Image
```typescript
import { type UploadResponse } from '@/lib/api'

const file: File = /* from input */
const response: UploadResponse = await api.uploadImage(file)
const { job_id } = response

// Error handling
try {
  await api.uploadImage(file)
} catch (error) {
  if (error.message.includes('Quota exceeded')) {
    // Handle quota limit
  } else if (error.message.includes('File too large')) {
    // Handle file size error
  }
}
```

**Quota Limits:**
- **Free Plan:** 10 uploads/month
- **Premium Plan:** 500 uploads/month

**File Requirements:**
- Supported formats: PNG, JPG, JPEG
- Max file size: Varies by plan

### Job Management

#### Get Job Status (Quick Polling)
```typescript
import { type JobStatusResponse, JobStatus } from '@/lib/api'

const status: JobStatusResponse = await api.getJobStatus(job_id)
console.log(status)
// {
//   job_id: "abc123",
//   status: "processing",
//   progress: 45,
//   message: "Aligning image..."
// }

// Check status
if (status.status === JobStatus.COMPLETED) {
  // Job is done
}
```

#### Get Job Details (Full Information)
```typescript
import { type JobResponse } from '@/lib/api'

const job: JobResponse = await api.getJobDetails(job_id)
console.log(job)
// {
//   job_id: "abc123",
//   status: "completed",
//   created_at: "2025-01-15T10:30:00Z",
//   updated_at: "2025-01-15T10:31:23Z",
//   input_image_url: "https://s3.../input.jpg",
//   output_image_url: "https://s3.../output.jpg",
//   error_message: null,
//   processing_time: 83.5
// }
```

#### Get Job Result (Download URL)
```typescript
const result = await api.getJobResult(job_id)
// Redirects to S3 URL or returns download information
```

#### Delete Job
```typescript
await api.deleteJob(job_id)
// Removes job from database and deletes files from S3
```

### Polling Pattern Example

```typescript
async function pollJobStatus(jobId: string, maxAttempts = 60): Promise<JobResponse> {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await api.getJobStatus(jobId)

    if (status.status === JobStatus.COMPLETED) {
      return await api.getJobDetails(jobId)
    }

    if (status.status === JobStatus.FAILED) {
      const details = await api.getJobDetails(jobId)
      throw new Error(details.error_message || 'Job failed')
    }

    // Wait 2 seconds before next poll
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  throw new Error('Job timeout')
}

// Usage
try {
  const { job_id } = await api.uploadImage(file)
  const result = await pollJobStatus(job_id)
  console.log('Processing complete!', result.output_image_url)
} catch (error) {
  console.error('Processing failed:', error)
}
```

### Billing & Subscriptions

#### Create Checkout Session
```typescript
import { type CreateCheckoutRequest, type CheckoutResponse } from '@/lib/api'

const request: CreateCheckoutRequest = {
  price_id: 'price_1234567890', // Stripe Price ID
  success_url: `${window.location.origin}/dashboard?payment=success`,
  cancel_url: `${window.location.origin}/pricing?payment=cancelled`,
}

const checkout: CheckoutResponse = await api.createCheckoutSession(request)

// Redirect user to Stripe Checkout
window.location.href = checkout.checkout_url
```

#### Customer Portal (Manage Subscription)
```typescript
import { type CustomerPortalRequest } from '@/lib/api'

const request: CustomerPortalRequest = {
  return_url: `${window.location.origin}/dashboard`,
}

const portal = await api.createCustomerPortal(request)

// Redirect to Stripe Customer Portal
window.location.href = portal.portal_url
```

#### Cancel Subscription
```typescript
// Cancel at period end (default)
await api.cancelSubscription(false)

// Cancel immediately
await api.cancelSubscription(true)
```

---

## TypeScript Types

### Exported Types

```typescript
import {
  // Enums
  JobStatus,

  // User types
  type UserInfo,

  // Job types
  type JobResponse,
  type JobStatusResponse,
  type UploadResponse,

  // Billing types
  type CreateCheckoutRequest,
  type CheckoutResponse,
  type CustomerPortalRequest,
  type CustomerPortalResponse,

  // System types
  type HealthCheckResponse,
} from '@/lib/api'
```

### JobStatus Enum

```typescript
enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// Usage
if (job.status === JobStatus.COMPLETED) {
  // Handle completion
}
```

---

## Error Handling

### Common Errors

```typescript
try {
  await api.uploadImage(file)
} catch (error) {
  const message = error.message

  if (message.includes('400')) {
    // Validation error (invalid file, dimensions, etc.)
  } else if (message.includes('413')) {
    // File too large
  } else if (message.includes('429')) {
    // Quota exceeded
  } else if (message.includes('503')) {
    // Service unavailable (S3 or DynamoDB error)
  } else if (message.includes('401')) {
    // Unauthorized - token expired or invalid
  } else if (message.includes('404')) {
    // Job not found
  } else {
    // Other errors
  }
}
```

### Error Response Format

The API returns errors in this format:
```json
{
  "detail": "Error message here"
}
```

---

## Migration Guide

### Deprecated Methods

The following methods are **deprecated** but remain for backward compatibility:

| Old Method | New Method | Notes |
|------------|-----------|-------|
| `login()` | Use AWS Cognito | Auth moved to Cognito |
| `signup()` | Use AWS Cognito | Auth moved to Cognito |
| `getUser()` | `getCurrentUser()` | Renamed for clarity |
| `processImages()` | `uploadImage()` | Now single file |
| `getProcessingStatus()` | `getJobStatus()` | Renamed |
| `getJobs()` | ❌ Not available | List endpoint removed |
| `downloadProcessedImages()` | `getJobResult()` | Renamed |
| `getSubscription()` | `getCurrentUser()` | Subscription included in user info |

### Migration Examples

#### Old: Multiple Files Upload
```typescript
// ❌ Old way (deprecated)
const files = [file1, file2, file3]
await api.processImages(files)
```

```typescript
// ✅ New way (upload one at a time)
for (const file of files) {
  const { job_id } = await api.uploadImage(file)
  // Track job_id
}
```

#### Old: Get User
```typescript
// ❌ Old way (still works but deprecated)
const user = await api.getUser()
```

```typescript
// ✅ New way
const user = await api.getCurrentUser()
```

#### Old: Check Subscription
```typescript
// ❌ Old way
const subscription = await api.getSubscription()
```

```typescript
// ✅ New way
const user = await api.getCurrentUser()
const subscription = user.subscription
console.log(subscription.plan) // "free" or "premium"
console.log(subscription.usage) // Current usage
console.log(subscription.quota) // Monthly quota
```

---

## React Hook Examples

### useImageUpload Hook

```typescript
'use client'

import { useState } from 'react'
import { api, type JobResponse, JobStatus } from '@/lib/api'

export function useImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<JobResponse | null>(null)

  const uploadAndProcess = async (file: File) => {
    setUploading(true)
    setError(null)

    try {
      // Upload
      const { job_id } = await api.uploadImage(file)
      setUploading(false)
      setProcessing(true)

      // Poll status
      while (true) {
        const status = await api.getJobStatus(job_id)

        if (status.status === JobStatus.COMPLETED) {
          const job = await api.getJobDetails(job_id)
          setResult(job)
          setProcessing(false)
          return job
        }

        if (status.status === JobStatus.FAILED) {
          const job = await api.getJobDetails(job_id)
          throw new Error(job.error_message || 'Processing failed')
        }

        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setUploading(false)
      setProcessing(false)
      throw err
    }
  }

  return {
    uploading,
    processing,
    error,
    result,
    uploadAndProcess,
  }
}
```

### useSubscription Hook

```typescript
'use client'

import { useState, useEffect } from 'react'
import { api, type UserInfo } from '@/lib/api'

export function useSubscription() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const userData = await api.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Failed to load user:', error)
    } finally {
      setLoading(false)
    }
  }

  const upgradeToPremium = async () => {
    const { checkout_url } = await api.createCheckoutSession({
      price_id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
      success_url: `${window.location.origin}/dashboard?payment=success`,
      cancel_url: `${window.location.origin}/pricing`,
    })

    window.location.href = checkout_url
  }

  const manageSubscription = async () => {
    const { portal_url } = await api.createCustomerPortal({
      return_url: `${window.location.origin}/dashboard`,
    })

    window.location.href = portal_url
  }

  return {
    user,
    loading,
    subscription: user?.subscription,
    upgradeToPremium,
    manageSubscription,
    refresh: loadUser,
  }
}
```

---

## Environment Variables

Make sure these are set in your `.env.local`:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=https://your-api-domain.com

# App URL (for redirects)
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com

# Stripe (for billing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_...
```

---

## Webhook Configuration

Don't forget to configure the Stripe webhook in your Stripe Dashboard:

**Webhook URL:** `https://your-api-domain.com/api/v1/webhooks/stripe`

**Events to listen for:**
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`
- `invoice.paid`

---

## Support

For API issues, check:
1. Network tab in browser DevTools
2. Backend logs
3. Stripe dashboard (for billing issues)
4. AWS Cognito console (for auth issues)
