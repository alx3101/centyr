# Migration Summary - API Client Update

## Overview

The Centry frontend has been successfully updated to work with the new AWS Cognito-based backend API. This document summarizes all changes made.

---

## 🔄 Files Modified

### 1. **lib/api.ts** (Complete Rewrite)

**Changes**:
- Updated to match OpenAPI v3.1 specification
- Added TypeScript types for all API responses
- Removed old authentication endpoints (replaced with Cognito)
- Added new endpoints: `/api/v1/me`, `/api/v1/upload`, `/api/v1/jobs/*`, `/api/v1/billing/*`
- Improved error handling
- Added backward compatibility methods (deprecated)

**New Exports**:
```typescript
// Enums
export { JobStatus }

// Types
export type {
  UserInfo,
  JobResponse,
  JobStatusResponse,
  UploadResponse,
  CheckoutResponse,
  CreateCheckoutRequest,
  CustomerPortalRequest,
  CustomerPortalResponse,
  HealthCheckResponse,
}

// API Client
export { api }
```

**Key Changes**:
- `api.getUser()` → `api.getCurrentUser()` (returns UserInfo with subscription)
- `api.processImages(files[])` → `api.uploadImage(file)` (single file upload)
- `api.getProcessingStatus(jobId)` → `api.getJobStatus(jobId)`
- `api.login()` and `api.signup()` → Deprecated (use Cognito directly)

---

### 2. **lib/cognito.ts** (New File)

**Purpose**: AWS Cognito authentication utilities

**Functions**:
```typescript
cognitoSignUp(email, password, attributes)
cognitoConfirmSignUp(email, code)
cognitoResendCode(email)
cognitoSignIn(email, password)
cognitoGetSession()
cognitoGetIdToken()
cognitoSignOut()
cognitoForgotPassword(email)
cognitoConfirmPassword(email, code, newPassword)
cognitoChangePassword(oldPassword, newPassword)
```

**Dependencies**:
- `amazon-cognito-identity-js` (installed via npm)

---

### 3. **lib/auth.ts** (Updated)

**Changes**:
- Updated `User` interface to match Cognito UserInfo structure
- Changed from `{ id, email, full_name, plan, ... }` to `{ user_id, email, username, subscription: {...} }`
- Added legacy format conversion in `getStoredUser()`
- Maintains backward compatibility

**New User Type**:
```typescript
interface User {
  user_id: string
  email: string
  email_verified: boolean
  username: string
  subscription: {
    plan: string
    usage: number
    quota: number
    status: string
  }
}
```

---

### 4. **hooks/useAuth.ts** (Major Refactor)

**Changes**:
- Integrated AWS Cognito for authentication
- Removed direct API calls to `/auth/login` and `/auth/signup`
- Uses `cognitoSignIn()` and `cognitoSignUp()` instead
- `checkAuth()` now validates Cognito session
- `refreshUser()` refreshes ID token from Cognito
- `logout()` calls `cognitoSignOut()`

**Flow**:
1. User logs in → Cognito authentication
2. Get ID token from Cognito
3. Store token in localStorage
4. Fetch user data from backend using token
5. Backend validates token with Cognito JWKS

---

### 5. **hooks/useUpload.ts** (Updated)

**Changes**:
- Updated `ProcessingJob` interface to match new API
- Changed `uploadAndProcess()` to upload files one at a time
- Updated `pollJobStatus()` to work with new status response
- Updated `downloadProcessedImages()` to use job details endpoint

**Key Differences**:
- Old: `processImages([file1, file2])` → Bulk upload
- New: Loop through files and call `uploadImage(file)` individually

---

### 6. **app/dashboard/layout.tsx** (Minor Fix)

**Changes**:
- Changed `{user.full_name}` → `{user.username || user.email}`
- Maintains compatibility with new User type

---

### 7. **app/upload/layout.tsx** (Minor Fix)

**Changes**:
- Changed `{user.full_name}` → `{user.username || user.email}`
- Maintains compatibility with new User type

---

## 📦 New Dependencies

Added to `package.json`:

```json
{
  "amazon-cognito-identity-js": "^6.x.x"
}
```

Install with:
```bash
npm install amazon-cognito-identity-js
```

---

## 🔧 Environment Variables Required

Add to `.env.local`:

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# AWS Cognito
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_YourPoolId
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
NEXT_PUBLIC_COGNITO_REGION=eu-west-3

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🆕 New Features

### 1. Subscription Information in User Object

```typescript
const user = await api.getCurrentUser()

console.log(user.subscription.plan)    // "free" or "premium"
console.log(user.subscription.usage)   // Current month usage
console.log(user.subscription.quota)   // Monthly quota
console.log(user.subscription.status)  // "active", "cancelled", etc.
```

### 2. Stripe Billing Integration

```typescript
// Create checkout session
const checkout = await api.createCheckoutSession({
  price_id: 'price_xxx',
  success_url: '/billing/success',
  cancel_url: '/pricing',
})

// Customer portal
const portal = await api.createCustomerPortal({
  return_url: '/billing',
})

// Cancel subscription
await api.cancelSubscription(false) // at period end
```

### 3. Health Check Endpoint

```typescript
const health = await api.healthCheck()
// { status: "healthy", services: { dynamodb: true, s3: true, ... } }
```

### 4. Job Management

```typescript
// Get job details
const job = await api.getJobDetails(jobId)

// Delete job
await api.deleteJob(jobId)
```

---

## 🔄 API Endpoint Mapping

| Old Endpoint | New Endpoint | Method | Notes |
|--------------|--------------|--------|-------|
| `/auth/login` | Use Cognito | - | Removed from API |
| `/auth/signup` | Use Cognito | - | Removed from API |
| `/auth/me` | `/api/v1/me` | GET | Returns UserInfo with subscription |
| `/images/process` | `/api/v1/upload` | POST | Single file only |
| `/images/status/{id}` | `/api/v1/jobs/{id}/status` | GET | Simplified response |
| `/images/jobs` | N/A | - | Not in new API |
| `/images/download/{id}` | `/api/v1/jobs/{id}/result` | GET | Returns S3 URL |
| N/A | `/api/v1/jobs/{id}` | GET | Full job details (NEW) |
| N/A | `/api/v1/jobs/{id}` | DELETE | Delete job (NEW) |
| `/subscriptions/create-checkout` | `/api/v1/billing/create-checkout` | POST | Stripe checkout |
| N/A | `/api/v1/billing/customer-portal` | POST | Stripe portal (NEW) |
| `/subscriptions/cancel` | `/api/v1/billing/cancel-subscription` | POST | Cancel subscription |

---

## 🚨 Breaking Changes

### 1. Authentication Method

**Before**:
```typescript
await api.login(email, password)
```

**After**:
```typescript
import { cognitoSignIn } from '@/lib/cognito'

const result = await cognitoSignIn(email, password)
const idToken = result.idToken
localStorage.setItem('auth_token', idToken)
```

**Migration**: Use the `useAuth` hook which handles this automatically.

---

### 2. User Object Structure

**Before**:
```typescript
{
  id: 123,
  email: "user@example.com",
  full_name: "John Doe",
  plan: "free",
  monthly_limit: 10,
  images_used_this_month: 3
}
```

**After**:
```typescript
{
  user_id: "cognito-sub-id",
  email: "user@example.com",
  username: "johndoe",
  email_verified: true,
  subscription: {
    plan: "free",
    usage: 3,
    quota: 10,
    status: "active"
  }
}
```

**Migration**: Update code that accesses `user.full_name` → `user.username` or `user.email`.

---

### 3. Image Upload (Single File)

**Before**:
```typescript
await api.processImages([file1, file2, file3])
```

**After**:
```typescript
for (const file of files) {
  await api.uploadImage(file)
}
```

**Migration**: The `useUpload` hook handles this automatically.

---

## ✅ Backward Compatibility

The following methods are **deprecated** but still work (throw helpful errors):

```typescript
api.login()              // Throws: "Use AWS Cognito for authentication"
api.signup()             // Throws: "Use AWS Cognito for authentication"
api.getUser()            // Calls: getCurrentUser()
api.processImages()      // Calls: uploadImage() on first file
api.getProcessingStatus()// Calls: getJobStatus()
api.getJobs()            // Throws: "Not available in new API"
api.downloadProcessedImages() // Calls: getJobResult()
```

---

## 📝 Migration Checklist

- [x] Install `amazon-cognito-identity-js`
- [x] Update environment variables
- [x] Update `lib/api.ts` with new endpoints
- [x] Create `lib/cognito.ts` for Cognito utilities
- [x] Update `lib/auth.ts` User type
- [x] Refactor `hooks/useAuth.ts` for Cognito
- [x] Update `hooks/useUpload.ts` for new API
- [x] Fix layout files (user.full_name → user.username)
- [x] Verify TypeScript compilation
- [x] Create documentation (API_GUIDE.md, SETUP_GUIDE.md)

---

## 🧪 Testing

### 1. Test Authentication

```bash
# Start dev server
npm run dev

# Navigate to http://localhost:3000/signup
# Sign up with email
# Verify email with code
# Log in
# Verify you're redirected to /dashboard
```

### 2. Test API Calls

```bash
# Make sure backend is running
# Upload an image
# Check job status
# Download result
```

### 3. Test TypeScript

```bash
npx tsc --noEmit
# Should show no errors
```

---

## 📚 Documentation Files Created

1. **API_GUIDE.md** - Complete API usage guide with examples
2. **SETUP_GUIDE.md** - Setup instructions and troubleshooting
3. **MIGRATION_SUMMARY.md** - This file

---

## 🎯 Next Steps

1. Configure AWS Cognito User Pool
2. Add Cognito credentials to `.env.local`
3. Test authentication flow
4. Update any custom components that use `user.full_name`
5. Test image upload and processing
6. Configure Stripe webhooks (if using billing)
7. Deploy to production

---

## 📞 Support

For issues:
1. Check TypeScript: `npx tsc --noEmit`
2. Check browser console
3. Check backend logs
4. Review AWS Cognito logs

---

**Migration completed successfully! 🎉**
