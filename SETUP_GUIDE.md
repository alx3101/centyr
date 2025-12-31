# Centry Frontend - Setup Guide

This guide will help you set up the Centry frontend to work with your AWS Cognito-based backend.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [AWS Cognito Configuration](#aws-cognito-configuration)
4. [Installation](#installation)
5. [Running the App](#running-the-app)
6. [Testing Authentication](#testing-authentication)
7. [API Integration](#api-integration)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js 18+ installed
- AWS Cognito User Pool configured
- Backend API running (with Cognito integration)
- Stripe account (for billing features)

---

## Environment Setup

Create a `.env.local` file in the project root:

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
# In production: https://api.your-domain.com

# AWS Cognito Configuration
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_YourPoolId
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id-here
NEXT_PUBLIC_COGNITO_REGION=eu-west-3

# Stripe (Optional - for billing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_...

# App URL (for redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Where to Find Cognito Values

1. **User Pool ID**:
   - Go to AWS Console → Cognito → User Pools
   - Select your pool
   - Copy the "Pool Id" (format: `region_xxxxx`)

2. **Client ID**:
   - In your User Pool, go to "App integration" tab
   - Under "App clients", select your app client
   - Copy the "Client ID"

3. **Region**:
   - Same as your User Pool region (e.g., `eu-west-3`, `us-east-1`)

---

## AWS Cognito Configuration

### Required User Pool Settings

1. **Sign-in options**:
   - ✅ Email address
   - ✅ Username (optional)

2. **Password policy** (recommended):
   - Minimum length: 8
   - Require: uppercase, lowercase, numbers, special characters

3. **MFA** (optional but recommended):
   - Optional or Required based on your security needs

4. **Email verification**:
   - ✅ Required (users must verify email after signup)

5. **App Client Settings**:
   - ✅ Don't generate a client secret (for public apps)
   - ✅ Enable username password auth
   - ✅ Enable SRP (Secure Remote Password)

### Attribute Mappings

Make sure these attributes are configured:

- `email` (required, mutable)
- `name` (optional, for full name)
- `email_verified` (auto-managed by Cognito)

---

## Installation

1. **Install dependencies**:

```bash
npm install
```

This will install:
- `amazon-cognito-identity-js` (Cognito SDK)
- Next.js and React
- TailwindCSS
- Other dependencies

2. **Verify installation**:

```bash
npm list amazon-cognito-identity-js
```

Should show version 6.x.x or higher.

---

## Running the App

### Development Mode

```bash
npm run dev
```

The app will be available at http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

---

## Testing Authentication

### 1. Sign Up Flow

1. Navigate to http://localhost:3000/signup
2. Enter email, password, and full name
3. Submit the form
4. You should be redirected to `/verify-email`
5. Check your email for the verification code
6. Enter the code to verify your account

### 2. Sign In Flow

1. Navigate to http://localhost:3000/login
2. Enter your verified email and password
3. Click "Login"
4. You should be redirected to `/dashboard`

### 3. Testing with Backend

Make sure your backend is running and configured to accept Cognito tokens:

```bash
# Test backend health
curl http://localhost:8000/health

# Test authenticated endpoint (replace TOKEN with your Cognito ID token)
curl -H "Authorization: Bearer TOKEN" http://localhost:8000/api/v1/me
```

### Getting Your ID Token

After logging in, open browser DevTools → Console:

```javascript
localStorage.getItem('auth_token')
```

This is your Cognito ID token that the frontend sends to the backend.

---

## API Integration

### How Authentication Works

1. **User signs up**:
   - Frontend → Cognito (creates user)
   - Cognito → Email (verification code)
   - User verifies email

2. **User logs in**:
   - Frontend → Cognito (authenticate)
   - Cognito → Frontend (ID token, access token, refresh token)
   - Frontend stores ID token in `localStorage`

3. **API calls**:
   - Frontend reads token from `localStorage`
   - Sends request with `Authorization: Bearer {idToken}` header
   - Backend validates token with Cognito JWKS
   - Backend returns user-specific data

### Token Refresh

Cognito tokens expire after 1 hour by default. The frontend automatically refreshes tokens using the `cognitoGetIdToken()` function, which:

1. Checks if current session is valid
2. If expired, uses refresh token to get new tokens
3. Returns fresh ID token

### Making API Calls

```typescript
import { api } from '@/lib/api'

// Upload image
const { job_id } = await api.uploadImage(file)

// Get user info
const user = await api.getCurrentUser()

// Check job status
const status = await api.getJobStatus(job_id)
```

All API calls automatically include the Cognito token.

---

## Available API Methods

### Authentication (via Cognito)

```typescript
import { useAuth } from '@/hooks/useAuth'

const { user, isLoading, isAuthenticated, login, signup, logout } = useAuth()

// Sign up
await signup('user@example.com', 'Password123!', 'John Doe')

// Log in
await login('user@example.com', 'Password123!')

// Log out
logout()
```

### User & Subscription

```typescript
import { api } from '@/lib/api'

// Get current user (includes subscription info)
const user = await api.getCurrentUser()
console.log(user.subscription.plan) // "free" or "premium"
console.log(user.subscription.usage) // 3
console.log(user.subscription.quota) // 10
```

### Image Upload & Processing

```typescript
import { api } from '@/lib/api'

// Upload single image
const { job_id } = await api.uploadImage(file)

// Get job status (for polling)
const status = await api.getJobStatus(job_id)

// Get full job details
const job = await api.getJobDetails(job_id)

// Delete job
await api.deleteJob(job_id)
```

### Billing (Stripe)

```typescript
import { api } from '@/lib/api'

// Create checkout session
const checkout = await api.createCheckoutSession({
  price_id: 'price_1234567890',
  success_url: 'http://localhost:3000/billing/success',
  cancel_url: 'http://localhost:3000/pricing',
})

// Redirect to Stripe
window.location.href = checkout.checkout_url

// Create customer portal
const portal = await api.createCustomerPortal({
  return_url: 'http://localhost:3000/billing',
})

// Cancel subscription
await api.cancelSubscription(false) // at period end
await api.cancelSubscription(true)  // immediately
```

---

## File Structure

```
centyr-web/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes (login, signup)
│   ├── dashboard/           # Dashboard page
│   ├── upload/              # Upload page
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── app/                 # App-specific components
│   ├── common/              # Shared components
│   └── ui/                  # UI primitives
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts          # Authentication hook (Cognito)
│   └── useUpload.ts        # Upload hook
├── lib/                     # Utilities & services
│   ├── api.ts              # API client (NEW - based on OpenAPI spec)
│   ├── cognito.ts          # Cognito utilities (NEW)
│   ├── auth.ts             # Auth helpers (UPDATED)
│   └── utils.ts            # General utilities
├── .env.local              # Environment variables (create this)
├── API_GUIDE.md            # API usage guide (NEW)
└── SETUP_GUIDE.md          # This file (NEW)
```

---

## Troubleshooting

### "Cannot find module 'amazon-cognito-identity-js'"

**Solution**: Install the package:
```bash
npm install amazon-cognito-identity-js
```

### "Invalid User Pool configuration"

**Cause**: Incorrect Cognito environment variables

**Solution**:
1. Check `.env.local` has correct values
2. Verify User Pool ID format: `region_xxxxx`
3. Restart dev server: `npm run dev`

### "Token expired" errors

**Cause**: Cognito tokens expire after 1 hour

**Solution**: The app automatically refreshes tokens. If this fails:
1. Log out and log in again
2. Clear localStorage and try again

### "CORS errors" when calling backend

**Cause**: Backend not configured for CORS

**Solution**: Add to your backend (FastAPI):
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### "User is not authenticated" after login

**Cause**: Token not being sent to backend

**Solution**:
1. Check DevTools → Network → Headers
2. Verify `Authorization: Bearer ...` header exists
3. Check localStorage has `auth_token` key

### TypeScript errors

**Solution**: Run type checking:
```bash
npx tsc --noEmit
```

If errors persist, check:
1. All imports are correct
2. API types match backend responses
3. Run `npm install` to ensure all types are installed

---

## Next Steps

1. ✅ Set up environment variables
2. ✅ Install dependencies
3. ✅ Run development server
4. ✅ Test signup/login flow
5. ✅ Upload test image
6. ✅ Configure Stripe (optional)
7. ✅ Deploy to production

---

## Support

For issues:
1. Check TypeScript compilation: `npx tsc --noEmit`
2. Check browser console for errors
3. Check backend logs
4. Review AWS Cognito CloudWatch logs

---

## Production Deployment

### Environment Variables (Production)

```bash
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_YourPoolId
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id-here
NEXT_PUBLIC_COGNITO_REGION=eu-west-3
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Deployment Checklist

- [ ] Update all environment variables to production values
- [ ] Enable CORS on backend for production domain
- [ ] Configure Cognito callback URLs
- [ ] Set up Stripe webhook endpoint
- [ ] Enable HTTPS
- [ ] Test complete user flow in production

---

**Ready to go! 🚀**
