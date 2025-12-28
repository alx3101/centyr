# 📚 Centyr - Documentazione Completa del Progetto

> **Versione**: 1.0.0
> **Ultimo aggiornamento**: 29 Dicembre 2024
> **Stack**: Next.js 14 + TypeScript + TailwindCSS

---

## 📖 Indice

1. [Panoramica del Progetto](#-panoramica-del-progetto)
2. [Architettura](#-architettura)
3. [Stack Tecnologico](#-stack-tecnologico)
4. [Struttura del Progetto](#-struttura-del-progetto)
5. [Funzionalità Implementate](#-funzionalità-implementate)
6. [Autenticazione](#-autenticazione)
7. [Internazionalizzazione](#-internazionalizzazione)
8. [API Integration](#-api-integration)
9. [Gestione Stato](#-gestione-stato)
10. [Styling e Temi](#-styling-e-temi)
11. [Setup e Installazione](#-setup-e-installazione)
12. [Variabili d'Ambiente](#-variabili-dambiente)
13. [Scripts Disponibili](#-scripts-disponibili)
14. [Deployment](#-deployment)
15. [Backend Integration](#-backend-integration)
16. [Testing](#-testing)
17. [Roadmap](#-roadmap)

---

## 🎯 Panoramica del Progetto

**Centyr** è una piattaforma SaaS per l'allineamento automatico di foto prodotto tramite AI. Permette agli e-commerce di caricare migliaia di immagini e ottenere risultati perfettamente allineati in pochi secondi.

### Problema Risolto
- ❌ Ore perse ad allineare manualmente foto prodotto
- ❌ Cataloghi con immagini disomogenee
- ❌ Shadow e riflessi indesiderati sulle foto

### Soluzione Centyr
- ✅ Allineamento automatico del PRODOTTO (non dell'immagine)
- ✅ Rimozione ombre e riflessi tramite AI
- ✅ Processing batch fino a 1000+ immagini
- ✅ Integrazione Shopify/WooCommerce (roadmap)

---

## 🏗️ Architettura

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND                        │
│              Next.js 14 (App Router)             │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Landing  │  │   Auth   │  │Dashboard │      │
│  │  Pages   │  │  Pages   │  │  Pages   │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │      API Client (lib/api.ts)            │   │
│  │   - Auto JWT injection                   │   │
│  │   - Error handling                       │   │
│  │   - Type-safe requests                   │   │
│  └─────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────┘
                   │ HTTP + JWT
                   ▼
┌─────────────────────────────────────────────────┐
│              BACKEND (da implementare)           │
│                FastAPI + Python                  │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   Auth   │  │  Image   │  │ Stripe   │      │
│  │   API    │  │Processing│  │Webhooks  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │         PostgreSQL Database             │   │
│  │  - Users, Jobs, Subscriptions           │   │
│  └─────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                   │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  AWS S3  │  │  Stripe  │  │   AI     │      │
│  │  Storage │  │ Payments │  │Processing│      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnologico

### Frontend
- **Framework**: Next.js 14.1.0 (App Router)
- **Language**: TypeScript 5.3.3
- **Styling**: TailwindCSS 3.4.1
- **UI Components**:
  - Lucide React (icons)
  - React Hot Toast (notifications)
  - React Dropzone (file upload)
- **State Management**: React Context API + Custom Hooks

### Backend (da implementare)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Auth**: JWT tokens
- **Storage**: AWS S3
- **Payments**: Stripe
- **AI Processing**: Custom Python scripts

### DevOps & Deployment
- **Hosting**: Vercel (frontend) + AWS/Railway (backend)
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics + Sentry (roadmap)

---

## 📁 Struttura del Progetto

```
centyr-web/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group per auth
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   ├── signup/
│   │   │   └── page.tsx         # Signup page
│   │   └── layout.tsx           # Auth layout
│   │
│   ├── (marketing)/              # Route group marketing
│   │   ├── pricing/
│   │   │   └── page.tsx         # Pricing page
│   │   └── layout.tsx           # Marketing layout
│   │
│   ├── dashboard/                # Dashboard page
│   │   ├── page.tsx             # Main dashboard
│   │   └── layout.tsx           # Dashboard layout + nav
│   │
│   ├── upload/                   # Upload page
│   │   ├── page.tsx             # Upload interface
│   │   └── layout.tsx           # Upload layout + nav
│   │
│   ├── api/                      # API Routes
│   │   ├── process-image/
│   │   │   └── route.ts         # Image processing proxy
│   │   └── webhook/
│   │       └── route.ts         # Stripe webhooks
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── common/
│   │   └── LanguageSelector.tsx # Language switcher
│   ├── marketing/                # Landing page components
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── BeforeAfter.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   └── ...
│   └── app/                      # App components (legacy)
│
├── contexts/                     # React Contexts
│   └── LanguageContext.tsx      # i18n context
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts               # Authentication hook
│   └── useUpload.ts             # Upload management hook
│
├── i18n/                         # Internationalization
│   ├── translations.ts          # EN/IT translations
│   └── README.md                # i18n documentation
│
├── lib/                          # Utilities & libs
│   ├── api.ts                   # API client
│   ├── auth.ts                  # Auth helpers
│   ├── stripe.ts                # Stripe integration
│   ├── supabase.ts              # Supabase client (legacy)
│   └── utils.ts                 # Utility functions
│
├── public/                       # Static assets
│
├── .env.local                    # Environment variables (git-ignored)
├── .env.example                  # Example env vars
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── PROJECT_DOCUMENTATION.md      # This file
```

---

## ✨ Funzionalità Implementate

### 🔐 Autenticazione
- [x] Login con email/password
- [x] Signup con validazione
- [x] JWT token storage in localStorage
- [x] Auto-redirect se non autenticato
- [x] Logout con pulizia storage
- [ ] Password reset (roadmap)
- [ ] OAuth (Google, GitHub) (roadmap)

### 📤 Upload & Processing
- [x] Drag & drop multiple files
- [x] Preview immagini pre-upload
- [x] Validazione formato (JPG, PNG, WEBP)
- [x] Validazione dimensione (max 50MB)
- [x] Progress tracking per file
- [x] Batch processing API integration
- [x] Job status polling (ogni 2 secondi)
- [ ] Resume upload dopo disconnessione (roadmap)

### 📊 Dashboard
- [x] Statistiche utilizzo mensile
- [x] Progress bar quota
- [x] Recent jobs list
- [x] Job status in tempo reale
- [x] Download risultati processati
- [x] Warning quando quota si esaurisce
- [ ] Analytics avanzate (roadmap)

### 💳 Subscription & Payments
- [x] Integrazione Stripe checkout
- [x] Webhook handling per eventi Stripe
- [x] Piani: Free, Basic ($19), Growth ($39), Scale ($99)
- [x] Visualizzazione piano corrente
- [ ] Upgrade/downgrade piano (roadmap)
- [ ] Gestione billing portal (roadmap)
- [ ] Invoices & receipts (roadmap)

### 🌍 Internazionalizzazione
- [x] Supporto Italiano e Inglese
- [x] Auto-detection lingua browser
- [x] Persistenza scelta in localStorage
- [x] Cambio lingua senza reload
- [x] Type-safe translations
- [x] Language selector in navbar
- [ ] Spagnolo, Francese, Tedesco (roadmap)

### 🎨 UI/UX
- [x] Design system purple/fuchsia gradient
- [x] Animazioni smooth (fade-in, scale, float)
- [x] Glassmorphism effects
- [x] Responsive design mobile-first
- [x] Toast notifications
- [x] Loading states
- [x] Error handling UI
- [x] Skeleton loaders (roadmap)

---

## 🔐 Autenticazione

### Come Funziona

```typescript
// 1. User fa login
const response = await api.login(email, password)

// 2. Backend risponde con JWT token
{
  access_token: "eyJhbGciOiJIUzI1NiIs...",
  user: {
    id: 1,
    email: "user@example.com",
    full_name: "John Doe",
    plan: "basic",
    monthly_limit: 1000,
    images_used_this_month: 45
  }
}

// 3. Frontend salva in localStorage
localStorage.setItem('auth_token', token)
localStorage.setItem('user', JSON.stringify(user))

// 4. Ogni richiesta API include il token
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Files Coinvolti

- **[lib/auth.ts](lib/auth.ts)**: Helpers per gestione auth
  - `setAuth()` - Salva token e user
  - `getStoredToken()` - Recupera token
  - `getStoredUser()` - Recupera user
  - `clearAuth()` - Logout
  - `isAuthenticated()` - Check se loggato

- **[hooks/useAuth.ts](hooks/useAuth.ts)**: Custom hook
  - `login()` - Effettua login
  - `signup()` - Registrazione
  - `logout()` - Logout
  - `refreshUser()` - Aggiorna dati utente
  - `user` - Stato utente corrente
  - `isAuthenticated` - Boolean stato auth

- **[lib/api.ts](lib/api.ts)**: Auto JWT injection
  ```typescript
  private async request<T>(endpoint: string) {
    const token = localStorage.getItem('auth_token')
    headers['Authorization'] = `Bearer ${token}`
    // ...
  }
  ```

### Protezione Route

```typescript
// In ogni pagina protetta
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export default function ProtectedPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [])

  // ... rest of page
}
```

---

## 🌍 Internazionalizzazione

### Setup

Il sistema i18n è implementato con React Context, zero dependencies esterne.

```typescript
// 1. Provider nel root layout
<LanguageProvider>
  {children}
</LanguageProvider>

// 2. Usa hook nei componenti
import { useTranslations } from '@/contexts/LanguageContext'

const t = useTranslations()

<h1>{t.dashboard.welcomeBack}</h1>
<button>{t.common.save}</button>
```

### Lingue Supportate

- 🇬🇧 **English** (default)
- 🇮🇹 **Italiano**

### Aggiungere Traduzioni

1. Apri `i18n/translations.ts`
2. Aggiungi la chiave all'interfaccia `Translations`
3. Aggiungi le traduzioni in EN e IT
4. TypeScript ti guida con autocomplete!

```typescript
export interface Translations {
  mySection: {
    title: string
    button: string
  }
}

export const translations = {
  en: {
    mySection: {
      title: 'My Title',
      button: 'Click me'
    }
  },
  it: {
    mySection: {
      title: 'Il mio titolo',
      button: 'Cliccami'
    }
  }
}
```

Documentazione completa: [i18n/README.md](i18n/README.md)

---

## 🔌 API Integration

### API Client

Centralizzato in `lib/api.ts` con:
- ✅ Auto JWT token injection
- ✅ Error handling unificato
- ✅ Type-safe responses
- ✅ Automatic retries (roadmap)

### Endpoints Disponibili

#### Auth
```typescript
// Login
api.login(email, password)
→ { access_token, user }

// Signup
api.signup(email, password, fullName)
→ { message }

// Get current user
api.getUser()
→ User object
```

#### Image Processing
```typescript
// Upload and process images
api.processImages(files: File[])
→ { job_id, quota }

// Get job status
api.getProcessingStatus(jobId)
→ { job_id, status, progress, processed_count, total_count }

// Get user jobs
api.getJobs()
→ { jobs: Job[] }

// Download processed images
api.downloadProcessedImages(jobId)
→ { download_url, expires_in }
```

#### Subscriptions
```typescript
// Create Stripe checkout session
api.createCheckoutSession(planId, successUrl, cancelUrl)
→ { session_url }

// Get subscription
api.getSubscription()
→ Subscription object

// Cancel subscription
api.cancelSubscription()
→ { message }
```

### Error Handling

```typescript
try {
  const result = await api.processImages(files)
} catch (error) {
  if (error instanceof QuotaExceededError) {
    toast.error('Monthly limit exceeded!')
  } else {
    toast.error(error.message)
  }
}
```

---

## 🎨 Styling e Temi

### Color Palette

```css
/* Primary Gradient */
Purple: #8B5CF6
Fuchsia: #D946EF

/* Backgrounds */
Light Purple: #F3E8FF
Light Fuchsia: #FDF2F8

/* Text */
Dark: #1F2937
Gray: #6B7280
Light Gray: #9CA3AF

/* Status Colors */
Success: #10B981
Error: #EF4444
Warning: #F59E0B
Info: #3B82F6
```

### Gradient Classes

```css
.gradient-purple-fuchsia {
  background: linear-gradient(to right, #8B5CF6, #D946EF);
}

.gradient-animated {
  animation: gradient 3s ease infinite;
}

.text-gradient {
  background: linear-gradient(to right, #8B5CF6, #D946EF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Animations

```css
/* Fade in up */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Scale in */
@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

Usage:
```tsx
<div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
  Content
</div>
```

---

## ⚙️ Setup e Installazione

### Prerequisiti

- Node.js 18+
- npm o yarn
- Git

### Installazione

```bash
# 1. Clone repository
git clone https://github.com/your-username/centyr-web.git
cd centyr-web

# 2. Installa dipendenze
npm install

# 3. Copia environment variables
cp .env.example .env.local

# 4. Configura variabili (vedi sezione sotto)
nano .env.local

# 5. Avvia development server
npm run dev

# 6. Apri browser
open http://localhost:3000
```

---

## 🔑 Variabili d'Ambiente

File: `.env.local`

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe Payment (ottieni da dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (crea i prodotti in Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PRICE_BASIC=price_...
NEXT_PUBLIC_STRIPE_PRICE_GROWTH=price_...
NEXT_PUBLIC_STRIPE_PRICE_SCALE=price_...

# Backend Service
PYTHON_SERVICE_URL=http://localhost:8000
```

### Per Backend (Python/FastAPI)

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/centyr

# JWT Secret (genera con: openssl rand -hex 32)
JWT_SECRET=your_super_secret_jwt_key_here

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=centyr-images

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 📜 Scripts Disponibili

```bash
# Development
npm run dev          # Avvia dev server (localhost:3000)
npm run build        # Build production
npm run start        # Avvia server production
npm run lint         # ESLint check
npm run type-check   # TypeScript check

# Testing (da implementare)
npm run test         # Run tests
npm run test:watch   # Watch mode
npm run test:e2e     # E2E tests

# Utilities
npm run format       # Format code with Prettier (da configurare)
npm run analyze      # Analyze bundle size (da configurare)
```

---

## 🚀 Deployment

### Frontend (Vercel)

1. **Push su GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy su Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

3. **Configura Environment Variables**
   - Dashboard Vercel → Settings → Environment Variables
   - Aggiungi tutte le `NEXT_PUBLIC_*` variables

### Backend (Railway/AWS)

```bash
# Railway
railway login
railway init
railway up

# Oppure AWS
# Setup EC2 + RDS + S3
# Deploy con Docker
```

### Checklist Pre-Deploy

- [ ] Test build locale: `npm run build`
- [ ] Verificare tutte le env vars
- [ ] Test payment flow in test mode
- [ ] Setup Stripe webhooks endpoint
- [ ] Configurare dominio custom
- [ ] Setup SSL certificate
- [ ] Configurare monitoring (Sentry)
- [ ] Setup backup database

---

## 🔄 Backend Integration

### Endpoints Richiesti (FastAPI)

Il frontend si aspetta questi endpoint dal backend:

#### Auth Endpoints

```python
POST /auth/signup
Body: { email, password, full_name }
Response: { message: "Account created" }

POST /auth/login
Body: { email, password }
Response: {
  access_token: "jwt...",
  user: { id, email, full_name, plan, monthly_limit, images_used_this_month }
}

GET /auth/me
Headers: Authorization: Bearer {token}
Response: User object
```

#### Image Processing Endpoints

```python
POST /images/process
Headers: Authorization: Bearer {token}
Body: FormData with files[]
Response: {
  job_id: "uuid",
  quota: { used, limit, remaining }
}

GET /images/status/{job_id}
Headers: Authorization: Bearer {token}
Response: {
  job_id,
  status: "pending" | "processing" | "completed" | "failed",
  progress: 0-100,
  processed_count: number,
  total_count: number
}

GET /images/jobs
Headers: Authorization: Bearer {token}
Response: { jobs: Job[] }

GET /images/download/{job_id}
Headers: Authorization: Bearer {token}
Response: {
  download_url: "https://s3...",
  expires_in: 86400
}
```

#### Subscription Endpoints

```python
POST /subscriptions/create-checkout
Headers: Authorization: Bearer {token}
Body: { plan_id, success_url, cancel_url }
Response: { session_url: "https://checkout.stripe.com/..." }

GET /subscriptions/me
Headers: Authorization: Bearer {token}
Response: Subscription object

POST /subscriptions/cancel
Headers: Authorization: Bearer {token}
Response: { message: "Subscription cancelled" }
```

### Database Schema (suggerito)

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  plan VARCHAR(50) DEFAULT 'free',
  monthly_limit INTEGER DEFAULT 100,
  images_used_this_month INTEGER DEFAULT 0,
  last_reset_date TIMESTAMP DEFAULT NOW(),
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Jobs table
CREATE TABLE processing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  total_count INTEGER NOT NULL,
  processed_count INTEGER DEFAULT 0,
  s3_input_folder VARCHAR(255),
  s3_output_folder VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stripe_subscription_id VARCHAR(255),
  plan VARCHAR(50),
  status VARCHAR(50),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🧪 Testing

### Testing Strategy (da implementare)

```bash
# Unit tests
- Components rendering
- Hooks logic
- API client
- Utils functions

# Integration tests
- Auth flow
- Upload flow
- Payment flow

# E2E tests (Playwright)
- Complete user journey
- Critical paths
```

### Example Test

```typescript
// __tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'

test('login updates user state', async () => {
  const { result } = renderHook(() => useAuth())

  await act(async () => {
    await result.current.login('test@example.com', 'password123')
  })

  expect(result.current.isAuthenticated).toBe(true)
  expect(result.current.user).toBeTruthy()
})
```

---

## 🗺️ Roadmap

### v1.1 - Quota Management (Prossima release)
- [ ] Client-side quota validation
- [ ] Warning modals quando quota bassa
- [ ] Auto-upgrade suggestions
- [ ] Usage analytics dashboard

### v1.2 - Enhanced UX
- [ ] Skeleton loaders
- [ ] Optimistic UI updates
- [ ] Offline mode with service worker
- [ ] Progressive Web App (PWA)
- [ ] Dark mode toggle

### v1.3 - Advanced Features
- [ ] Batch templates (preset processing)
- [ ] Before/After comparison slider
- [ ] Image preview before download
- [ ] Bulk download as ZIP
- [ ] Custom watermark removal

### v2.0 - API & Integrations
- [ ] Public REST API
- [ ] Shopify plugin
- [ ] WooCommerce plugin
- [ ] Zapier integration
- [ ] Webhooks for job completion

### v2.1 - Enterprise Features
- [ ] Team accounts
- [ ] Role-based permissions
- [ ] White-label branding
- [ ] Dedicated support
- [ ] SLA guarantees
- [ ] SSO (SAML)

### v3.0 - AI Enhancements
- [ ] Background removal
- [ ] Auto product tagging
- [ ] Smart crop for social media
- [ ] Color correction
- [ ] Upscaling/enhancement

---

## 📞 Support & Contributi

### Reporting Issues

```bash
# Create issue su GitHub
https://github.com/your-username/centyr-web/issues

# Include:
- Description del problema
- Steps to reproduce
- Expected vs actual behavior
- Screenshots se applicabile
- Browser e OS version
```

### Contributing

```bash
# 1. Fork repository
# 2. Crea branch
git checkout -b feature/my-feature

# 3. Commit changes
git commit -m "Add: my feature"

# 4. Push to branch
git push origin feature/my-feature

# 5. Open Pull Request
```

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- Conventional Commits
- Meaningful variable names
- Comments solo dove necessario

---

## 📄 License

MIT License - vedi LICENSE file

---

## 👥 Team

- **Frontend**: Next.js + TypeScript
- **Backend**: FastAPI + Python (da implementare)
- **AI/ML**: Python image processing
- **DevOps**: Vercel + AWS

---

## 📊 Stats Progetto

- **Lines of Code**: ~15,000+
- **Components**: 25+
- **Pages**: 8
- **API Routes**: 2
- **Custom Hooks**: 2
- **Languages**: 2 (EN, IT)
- **Tests**: 0 (roadmap)
- **Bundle Size**: ~100KB (gzipped)

---

**Ultimo aggiornamento**: 29 Dicembre 2024
**Versione documentazione**: 1.0.0

Per domande o supporto, contatta: support@centyr.com
