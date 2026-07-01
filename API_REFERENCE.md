# API Reference

All backend API calls go through `lib/api.ts`. This document covers every endpoint with request/response shapes and TypeScript examples.

## Base URL

```
NEXT_PUBLIC_API_URL=http://localhost:8000        # Development
NEXT_PUBLIC_API_URL=https://api.centyr.tech      # Production
```

## Authentication

All protected endpoints require the Cognito ID token:

```
Authorization: Bearer <cognito-id-token>
Content-Type: application/json   # or multipart/form-data for uploads
```

The API client in `lib/api.ts` injects this automatically from `localStorage['auth_token']`.

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (invalid input) |
| 401 | Unauthorized (token expired/missing) |
| 403 | Forbidden |
| 404 | Not Found |
| 413 | Payload Too Large |
| 429 | Quota exceeded or rate limited |
| 500 | Internal Server Error |
| 503 | Service Unavailable (S3/DynamoDB down) |

---

## Health

### GET /health

```typescript
const health = await api.healthCheck()
// { status: 'healthy', checks: { api, dynamodb, s3, cognito } }
```

---

## User

### GET /api/v1/me

Returns current user with subscription info.

```typescript
const user = await api.getCurrentUser()
```

```json
{
  "user_id": "cognito-sub-12345",
  "email": "user@example.com",
  "subscription": {
    "plan": "free",
    "plan_name": "Free Plan",
    "current_period_uploads": 3,
    "monthly_limit": 10,
    "status": "active",
    "features": {
      "max_batch_size": 10,
      "monthly_limit": 10,
      "priority_queue": false,
      "rate_limit_per_minute": 5,
      "rate_limit_per_hour": 20,
      "storage_retention_days": 7,
      "analytics_enabled": false,
      "webhooks_enabled": false
    }
  }
}
```

---

## Upload & Processing

### POST /api/v1/upload

Upload 1-100 images as a batch job.

```typescript
const { job_id } = await api.uploadBatch(files, 'Job Name', {
  removeBackground: true,   // premium feature
  outputSize: 1000,         // 500-4000px square (premium)
  margin: 50,               // px padding (premium)
})
```

The `outputSize` maps to the marketplace presets defined in `components/marketing/StoreLogos.tsx`:

| Preset   | outputSize | Notes            |
|----------|------------|------------------|
| Amazon   | 2000       | square, ~5% margin |
| eBay     | 1600       | square, ~10% margin |
| Etsy     | 2000       | square, ~8% margin |
| Zalando  | 2250       | portrait 2:3, ~12% margin |

The preset selection and dimensions are persisted per-job via `lib/jobMeta.ts` (`localStorage` key: `centyr_jm_{jobId}`).

**Errors**: `400` invalid file · `413` too large · `429` quota exceeded

---

## Jobs

### GET /api/v1/jobs/{job_id}

Full job details with presigned S3 URLs.

```typescript
const job = await api.getJobDetails(jobId)
```

```json
{
  "job_id": "abc123",
  "status": "completed",
  "job_name": "Product Photos",
  "image_count": 5,
  "batch_mode": true,
  "processing_time": 83.5,
  "outputs": [
    {
      "input_url": "https://s3.../input.jpg",
      "output_url": "https://s3.../output.webp",
      "output_width": 1000,
      "output_height": 1000,
      "status": "completed",
      "processing_time": 2.5
    }
  ]
}
```

**Status values**: `pending` · `processing` · `completed` · `failed`

### GET /api/v1/jobs/{job_id}/status

Lightweight status for polling.

```typescript
const status = await api.getJobStatus(jobId)
// { job_id, status, progress, message }
```

### GET /api/v1/jobs

List user jobs (paginated).

```typescript
const jobs = await api.getJobs()
```

### DELETE /api/v1/jobs/{job_id}

```typescript
await api.deleteJob(jobId)
```

### POST /api/v1/jobs/{job_id}/retry

Retry failed images in a batch.

### POST /api/v1/jobs/{job_id}/reprocess

Reprocess a job with different options (marketplace preset, output size, margin) without re-uploading the original files.

```typescript
const { job_id } = await api.reprocessJob(jobId, {
  output_size: 2000,   // 500-4000px (optional, defaults to original)
  margin: 100,         // px (optional, defaults to original)
})
```

```json
{
  "job_id": "new-uuid",
  "source_job_id": "original-uuid",
  "image_count": 5,
  "status": "processing"
}
```

- Reuses original S3 input keys — no re-upload needed, no pre-signed URL expiry
- Creates a new job in DynamoDB with `reprocessed_from` linking back to source
- Increments quota once for the new job
- Routes to the correct premium/free SQS queue

**Errors**: `400` invalid options · `403` not your job · `404` job not found · `429` quota exceeded

### GET /api/v1/jobs/{job_id}/download

Download result (ZIP for batch).

---

## Polling Pattern

```typescript
async function pollJob(jobId: string): Promise<JobResponse> {
  for (let i = 0; i < 120; i++) {
    const status = await api.getJobStatus(jobId)
    if (status.status === 'completed') return await api.getJobDetails(jobId)
    if (status.status === 'failed') throw new Error(status.message || 'Job failed')
    await new Promise(r => setTimeout(r, 2000))
  }
  throw new Error('Timeout')
}
```

---

## Billing

### POST /api/v1/billing/create-checkout

```typescript
const { checkout_url } = await api.createCheckoutSession({
  price_id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
  success_url: `${window.location.origin}/dashboard?upgraded=1`,
  cancel_url: `${window.location.origin}/pricing`,
})
window.location.href = checkout_url
```

### POST /api/v1/billing/customer-portal

```typescript
const { portal_url } = await api.createCustomerPortal({
  return_url: `${window.location.origin}/dashboard`,
})
window.location.href = portal_url
```

### POST /api/v1/billing/cancel-subscription

```typescript
await api.cancelSubscription(false)  // end-of-period
await api.cancelSubscription(true)   // immediately
```

---

## Pricing

### GET /api/v1/pricing/plans

```typescript
const plans = await api.getPricingPlans()
// Returns plan list with features and Stripe price IDs
```

---

## TypeScript Types

```typescript
import {
  JobStatus,
  type UserInfo,
  type JobResponse,
  type JobStatusResponse,
  type UploadResponse,
  type CheckoutResponse,
  type Features,
} from '@/lib/api'
```

---

## Job Metadata (localStorage)

`lib/jobMeta.ts` persists the marketplace preset and dimensions per job client-side.

```typescript
import { saveJobMeta, getJobMeta } from '@/lib/jobMeta'

// Save after job creation
saveJobMeta(jobId, { preset: 'amazon', width: 2000, height: 2000 })

// Read on dashboard / job detail
const meta = getJobMeta(jobId)
// { preset: 'amazon', width: 2000, height: 2000 } | null
```

Storage key: `centyr_jm_{jobId}`. Only available for jobs created/reprocessed after this feature was introduced (old jobs return `null`).

---

## Error Handling

```typescript
try {
  await api.uploadBatch(files)
} catch (error) {
  const msg = error instanceof Error ? error.message : 'Unknown error'
  if (msg.includes('429')) // quota exceeded
  if (msg.includes('413')) // file too large
  if (msg.includes('401')) // session expired → redirect to login
  if (msg.includes('503')) // backend unavailable → retry
}
```

---

## Rate Limits & Quotas

| Plan | Uploads/month | Batch size | Rate/min |
|------|--------------|------------|----------|
| Free | 10 | 10 | 5 |
| Premium | 500 | 100 | 60 |

Hitting limits returns `429 Too Many Requests`.

---

**Last Updated**: 2026-07-01
