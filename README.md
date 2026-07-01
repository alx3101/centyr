# Centyr - AI Product Photo Alignment

Automatically align and center thousands of product photos in seconds. AI-powered image alignment tool for e-commerce businesses.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your Cognito + Stripe credentials
npm run dev
# Open http://localhost:3000
```

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: TailwindCSS — purple/white design system
- **Font**: Onest (throughout the entire application)
- **Auth**: AWS Cognito (email/password + Google OAuth)
- **Payments**: Stripe (subscription billing)
- **Data Fetching**: React Query 5 (real-time polling)
- **File Upload**: React Dropzone
- **Image Formats**: JPG, PNG, WEBP, AVIF (input) → PNG/JPG (output)
- **i18n**: Italian (it) + English (en), auto-detected
- **Hosting**: Vercel

---

## Project Structure

```
centyr-web/
├── app/
│   ├── (auth)/                 # login, signup, confirm-email, forgot-password
│   ├── dashboard/              # Protected: jobs list, job detail, billing, settings
│   ├── upload/                 # Upload wizard (3-step)
│   ├── pricing/                # Plans page
│   ├── blog/                   # Blog articles [slug]
│   ├── help/                   # FAQ
│   ├── changelog/              # Version history
│   ├── about/, privacy/,       # Static pages
│   ├── api/auth/token/         # Server route: Cognito OAuth code exchange
│   └── globals.css             # Onest font import, Hero CSS, base styles
│
├── components/
│   ├── marketing/              # Hero, Features, Testimonials, PricingCard, TrustedBy
│   ├── dashboard/              # DashboardSidebar, JobsList, JobDetail, ProcessingStatus
│   ├── layout/                 # AppShell, UnifiedNavbar
│   ├── guards/                 # AuthGuard (route protection)
│   ├── ui/                     # Button, Card, Modal, Loader, Skeleton, NavBar
│   └── providers/              # AppProviders (Auth + Language + ReactQuery + Toaster)
│
├── contexts/
│   ├── AuthContext.tsx          # Auth state, login/signup/logout, Cognito integration
│   └── LanguageContext.tsx      # i18n: language switching + useTranslations hook
│
├── hooks/
│   ├── useUpload.ts             # File upload + job polling
│   ├── usePricingPlans.ts       # Fetch available plans
│   └── queries/                 # React Query hooks
│
├── lib/
│   ├── api.ts                   # Typed API client (all endpoints)
│   ├── cognito.ts               # Cognito SDK: signIn, signUp, signOut, OAuthSignIn
│   ├── auth.ts                  # localStorage token helpers
│   └── jobMeta.ts               # Per-job preset/dims persistence (localStorage)
│
└── i18n/
    └── translations.ts          # All EN/IT strings (dashboard, upload, marketing, etc.)
```

---

## Pages & Routes

### Public
- `/` — Landing page (Hero, Features, TrustedBy, Testimonials, Pricing, CTA)
- `/pricing` — Plans and billing options
- `/blog`, `/blog/[slug]` — Blog articles
- `/help` — FAQ
- `/changelog` — Version history
- `/about`, `/privacy`, `/security`, `/gdpr-compliance`

### Auth
- `/auth/login` — Email/password + Google OAuth
- `/auth/signup` — Registration + Google OAuth
- `/auth/confirm-email` — Email verification
- `/auth/forgot-password`, `/auth/reset-password`
- `/auth/callback` — OAuth callback (exchanges code for tokens)

### Dashboard (requires auth)
- `/dashboard` — Overview, stats, recent jobs
- `/dashboard/jobs/[jobId]` — Job detail, image preview, download, reprocess with different preset
- `/dashboard/billing` — Subscription status, Stripe portal
- `/dashboard/settings` — Account settings

---

## Authentication Flow

### Email/Password
```
User → cognitoSignIn() → USER_PASSWORD_AUTH → ID token → localStorage
```

### Google OAuth
```
User → cognitoOAuthSignIn('Google') → Cognito Hosted UI → /auth/callback
→ /api/auth/token (server route exchanges code) → ID token → localStorage
→ window.location.replace('/dashboard')
```

### AuthContext
```typescript
const { user, isAuthenticated, login, logout, refreshUser } = useAuth()

// user includes subscription info:
user.subscription.plan                     // 'free' | 'prod_xxx' (Stripe Product ID)
user.subscription.monthly_limit
user.subscription.current_period_uploads
user.subscription.features.max_batch_size
```

All API calls automatically include: `Authorization: Bearer <cognito-id-token>`

---

## Internationalization (i18n)

Two languages: **English** (en, default) and **Italian** (it).

- Browser language auto-detected on first visit
- Persisted in `localStorage['language']`
- Instant switching without page reload

```typescript
'use client'
import { useTranslations } from '@/contexts/LanguageContext'

export default function MyComponent() {
  const t = useTranslations()
  return <h1>{t.dashboard.welcomeBack}</h1>
}
```

To add a new string, update the `Translations` interface and both `en`/`it` entries in `i18n/translations.ts`.

---

## Environment Variables

Create `.env.local`:

```bash
# Backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# App URL (must match Cognito "Allowed callback URLs")
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cognito
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_...
NEXT_PUBLIC_COGNITO_CLIENT_ID=...
NEXT_PUBLIC_COGNITO_REGION=eu-west-3
NEXT_PUBLIC_COGNITO_DOMAIN=centyr-backend-dev  # or full https:// URL

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_...
```

**Production (Vercel):**
- `NEXT_PUBLIC_APP_URL` must match exactly the Cognito callback URL
- Use `pk_live_` Stripe key
- `NEXT_PUBLIC_API_URL` → EC2 API endpoint

---

## Local Development

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

Backend must be running at `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000`).

---

## Deployment (Vercel)

```bash
# Push to main → auto-deploys via GitHub integration
git push origin main
```

All `NEXT_PUBLIC_*` variables must be configured in Vercel project settings.

---

## API Integration

All backend calls go through `lib/api.ts`:

```typescript
import { api } from '@/lib/api'

const { job_id } = await api.uploadBatch(files, 'Job Name', {
  removeBackground: true,
  outputSize: 1000,
  margin: 50,
})

const status = await api.getJobStatus(job_id)
const job = await api.getJobDetails(job_id)

const { checkout_url } = await api.createCheckoutSession({
  price_id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
  success_url: `${window.location.origin}/dashboard`,
  cancel_url: `${window.location.origin}/pricing`,
})
```

See `API_REFERENCE.md` for full endpoint documentation.

---

## Documentation

| File | Contents |
|------|----------|
| `API_REFERENCE.md` | All API endpoints with TypeScript examples |
| `i18n/README.md` | i18n system details |

---

**Version**: 2.3.0 · **Hosting**: Vercel · **Last Updated**: April 11, 2026
