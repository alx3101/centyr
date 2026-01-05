# API Quick Reference

Riferimento rapido per tutti gli endpoint disponibili.

---

## 🔐 Autenticazione

### Cognito (Non tramite API)

```typescript
import { cognitoSignIn, cognitoSignUp, cognitoSignOut } from '@/lib/cognito'

// Signup
const result = await cognitoSignUp('email@example.com', 'Password123!', {
  name: 'John Doe'
})

// Login
const result = await cognitoSignIn('email@example.com', 'Password123!')
const idToken = result.idToken // Usa questo per le chiamate API

// Logout
cognitoSignOut()
```

---

## 👤 User & Subscription

### GET /api/v1/me

Ottieni info utente corrente (include subscription).

```typescript
import { api } from '@/lib/api'

const user = await api.getCurrentUser()
// Ritorna: UserInfo
```

**Response**:
```json
{
  "user_id": "cognito-sub-123",
  "email": "user@example.com",
  "email_verified": true,
  "username": "johndoe",
  "subscription": {
    "plan": "free",
    "usage": 3,
    "quota": 10,
    "status": "active"
  }
}
```

---

## 📤 Upload & Processing

### POST /api/v1/upload

Carica un'immagine per processing.

```typescript
const { job_id } = await api.uploadImage(file)
```

**Request**: FormData con campo `file`

**Response**:
```json
{
  "job_id": "abc123..."
}
```

**Errors**:
- `400`: File non valido
- `413`: File troppo grande
- `429`: Quota esaurita
- `503`: Servizio non disponibile

---

## 📊 Job Management

### GET /api/v1/jobs/{job_id}

Ottieni dettagli completi di un job.

```typescript
const job = await api.getJobDetails('abc123')
```

**Response**:
```json
{
  "job_id": "abc123",
  "status": "completed",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:31:23Z",
  "input_image_url": "https://s3.../input.jpg",
  "output_image_url": "https://s3.../output.jpg",
  "error_message": null,
  "processing_time": 83.5
}
```

### GET /api/v1/jobs/{job_id}/status

Ottieni stato semplificato (per polling).

```typescript
const status = await api.getJobStatus('abc123')
```

**Response**:
```json
{
  "job_id": "abc123",
  "status": "processing",
  "progress": 45,
  "message": "Aligning image..."
}
```

**Status values**: `pending`, `processing`, `completed`, `failed`

### GET /api/v1/jobs/{job_id}/result

Ottieni URL risultato (redirect a S3).

```typescript
const result = await api.getJobResult('abc123')
```

### DELETE /api/v1/jobs/{job_id}

Elimina job e file associati.

```typescript
await api.deleteJob('abc123')
```

---

## 💳 Billing (Stripe)

### POST /api/v1/billing/create-checkout

Crea sessione Stripe Checkout.

```typescript
const checkout = await api.createCheckoutSession({
  price_id: 'price_1234567890',
  success_url: 'https://yourapp.com/success',
  cancel_url: 'https://yourapp.com/pricing',
})

// Redirect
window.location.href = checkout.checkout_url
```

**Response**:
```json
{
  "session_id": "cs_...",
  "checkout_url": "https://checkout.stripe.com/..."
}
```

### POST /api/v1/billing/customer-portal

Crea sessione Customer Portal.

```typescript
const portal = await api.createCustomerPortal({
  return_url: 'https://yourapp.com/billing',
})

// Redirect
window.location.href = portal.portal_url
```

**Response**:
```json
{
  "portal_url": "https://billing.stripe.com/..."
}
```

### POST /api/v1/billing/cancel-subscription

Cancella subscription.

```typescript
// Cancella a fine periodo
await api.cancelSubscription(false)

// Cancella immediatamente
await api.cancelSubscription(true)
```

**Query params**:
- `cancel_immediately`: `true` | `false` (default: `false`)

---

## 🏥 Health Check

### GET /health

Verifica stato servizi.

```typescript
const health = await api.healthCheck()
```

**Response**:
```json
{
  "status": "healthy",
  "services": {
    "dynamodb": true,
    "s3": true,
    "redis": true,
    "cognito": true
  }
}
```

---

## 📡 Headers

Tutte le richieste autenticate includono:

```
Authorization: Bearer {cognito_id_token}
Content-Type: application/json
```

Eccezione: Upload usa `multipart/form-data`.

---

## 🚨 Error Responses

Formato standard:

```json
{
  "detail": "Error message here"
}
```

**HTTP Status Codes**:

| Code | Significato |
|------|-------------|
| `200` | Success |
| `400` | Bad Request (validazione) |
| `401` | Unauthorized (token mancante/invalido) |
| `404` | Not Found |
| `429` | Too Many Requests (quota) |
| `500` | Server Error |
| `503` | Service Unavailable |

---

## 🔄 Polling Pattern

Per job che richiedono processing:

```typescript
async function pollUntilComplete(jobId: string): Promise<JobResponse> {
  while (true) {
    const status = await api.getJobStatus(jobId)

    if (status.status === 'completed') {
      return await api.getJobDetails(jobId)
    }

    if (status.status === 'failed') {
      throw new Error('Job failed')
    }

    // Aspetta 2 secondi
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
}
```

---

## 📦 TypeScript Types

```typescript
import {
  JobStatus,           // Enum
  type UserInfo,
  type JobResponse,
  type JobStatusResponse,
  type UploadResponse,
  type CheckoutResponse,
  type CreateCheckoutRequest,
  type CustomerPortalRequest,
  type CustomerPortalResponse,
  type HealthCheckResponse,
} from '@/lib/api'
```

---

## 🎯 Esempi Completi

### Upload + Poll + Download

```typescript
// 1. Upload
const { job_id } = await api.uploadImage(file)

// 2. Poll fino a completamento
let completed = false
while (!completed) {
  const status = await api.getJobStatus(job_id)

  if (status.status === 'completed') {
    completed = true
  } else if (status.status === 'failed') {
    throw new Error('Processing failed')
  } else {
    await new Promise(resolve => setTimeout(resolve, 3000))
  }
}

// 3. Download
const job = await api.getJobDetails(job_id)
window.open(job.output_image_url, '_blank')
```

### Verifica Quota Prima Upload

```typescript
const user = await api.getCurrentUser()

if (user.subscription.usage >= user.subscription.quota) {
  alert('Quota esaurita! Passa a Premium.')
} else {
  // Procedi con upload
  await api.uploadImage(file)
}
```

### Upgrade Flow Completo

```typescript
// 1. Crea checkout
const checkout = await api.createCheckoutSession({
  price_id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
  success_url: `${window.location.origin}/billing/success`,
  cancel_url: `${window.location.origin}/pricing`,
})

// 2. Redirect a Stripe
window.location.href = checkout.checkout_url

// 3. Dopo pagamento, Stripe redirect a success_url
// 4. Webhook backend aggiorna subscription
// 5. Frontend refresh user data

// In success page:
const user = await api.getCurrentUser()
console.log(user.subscription.plan) // "premium"
```

---

## 🔧 Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_XXX
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxx
NEXT_PUBLIC_COGNITO_REGION=eu-west-3
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_xxx
```

---

**Quick Reference completo! 📚**
