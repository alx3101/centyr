# Centyr - AI Product Photo Alignment

> Automatically align and center thousands of product photos in seconds

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
# Open http://localhost:3000
```

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **TailwindCSS** (Purple/Fuchsia design system)
- **AWS Cognito** (Authentication)
- **React Query** (Data fetching + polling)
- **Stripe** (Subscription billing)
- **React Dropzone** (File upload)

## Features

- Batch upload (1-100 images per job)
- Real-time job status via polling (5s interval when processing)
- Background removal (AI-powered, premium)
- Custom output size and margins (premium)
- Job retry for failed batch images
- Stripe checkout and customer portal
- Responsive dashboard with progress tracking

## Project Structure

```
centyr-web/
├── app/
│   ├── (auth)/              # Login, Signup (Cognito)
│   ├── dashboard/           # Jobs list, job detail, billing
│   ├── upload/              # Batch upload with options
│   ├── pricing/             # Plans page
│   └── page.tsx             # Landing page
├── components/
│   ├── marketing/           # Hero, Pricing, Features, etc.
│   ├── layout/              # AppShell, UnifiedNavbar
│   ├── guards/              # AuthGuard
│   └── ui/                  # ConfirmModal, Loader, etc.
├── hooks/
│   ├── useAuth.ts           # Cognito auth context
│   ├── useUpload.ts         # Upload + polling logic
│   └── queries/             # React Query hooks (useRecentJobs)
├── lib/
│   ├── api.ts               # API client (typed)
│   ├── cognito.ts           # Cognito SDK wrapper
│   └── utils.ts             # cn() utility
└── public/                  # Static assets
```

## API Integration

All API calls via typed client in `lib/api.ts`:

```typescript
import { api } from '@/lib/api'

await api.uploadBatch(files, jobName, options)
await api.getJobs(limit)
await api.getJobDetails(jobId)
await api.retryJob(jobId)
await api.deleteJob(jobId)
await api.getCurrentUser()
await api.createCheckoutSession(request)
```

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_...
NEXT_PUBLIC_COGNITO_CLIENT_ID=...
NEXT_PUBLIC_COGNITO_REGION=eu-west-3
```

## Deployment

```bash
# Vercel
vercel --prod

# Or build locally
npm run build && npm start
```
