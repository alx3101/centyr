# Esempi Pratici di Integrazione

Guida pratica con esempi di codice per integrare il frontend con il backend Cognito.

---

## 🔐 1. Autenticazione con Cognito

### Setup Iniziale (da fare una volta sola)

Crea il file `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_TuoPoolId
NEXT_PUBLIC_COGNITO_CLIENT_ID=il-tuo-client-id
NEXT_PUBLIC_COGNITO_REGION=eu-west-3
```

### Registrazione Utente

```typescript
// pages/signup.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const { signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Il hook useAuth usa Cognito automaticamente
    const result = await signup(email, password, fullName)

    if (result.success) {
      // L'utente è stato creato
      // Viene reindirizzato automaticamente a /verify-email
      console.log('Signup completato! Controlla la tua email.')
    } else {
      // Gestisci errore
      console.error('Errore:', result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Nome completo"
      />
      <button type="submit">Registrati</button>
    </form>
  )
}
```

### Verifica Email

```typescript
// pages/verify-email.tsx
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cognitoConfirmSignUp } from '@/lib/cognito'
import toast from 'react-hot-toast'

export default function VerifyEmailPage() {
  const [code, setCode] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const handleVerify = async () => {
    const result = await cognitoConfirmSignUp(email, code)

    if (result.success) {
      toast.success('Email verificata! Ora puoi effettuare il login.')
      router.push('/login')
    } else {
      toast.error(result.error || 'Verifica fallita')
    }
  }

  return (
    <div>
      <h1>Verifica la tua email</h1>
      <p>Abbiamo inviato un codice a {email}</p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Codice di verifica"
      />
      <button onClick={handleVerify}>Verifica</button>
    </div>
  )
}
```

### Login

```typescript
// pages/login.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await login(email, password)

    if (result.success) {
      // Login effettuato!
      // L'utente viene reindirizzato automaticamente a /dashboard
    } else {
      console.error('Errore login:', result.error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Caricamento...' : 'Login'}
      </button>
    </form>
  )
}
```

---

## 📤 2. Upload Immagine

### Upload Singola Immagine

```typescript
// components/ImageUploader.tsx
'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validazione lato client
    if (!file.type.match(/image\/(jpeg|png|webp)/)) {
      toast.error('Formato non supportato. Usa JPG, PNG o WEBP.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File troppo grande. Max 10MB.')
      return
    }

    setUploading(true)

    try {
      // Upload immagine al backend
      const response = await api.uploadImage(file)
      setJobId(response.job_id)

      toast.success('Upload completato! Processing in corso...')

      // Inizia polling dello stato
      pollJobStatus(response.job_id)

    } catch (error: any) {
      if (error.message.includes('429')) {
        toast.error('Quota mensile esaurita! Passa a Premium.')
      } else {
        toast.error(error.message || 'Upload fallito')
      }
    } finally {
      setUploading(false)
    }
  }

  const pollJobStatus = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const status = await api.getJobStatus(jobId)

        if (status.status === 'completed') {
          clearInterval(interval)
          toast.success('Processing completato!')

          // Scarica immagine processata
          const job = await api.getJobDetails(jobId)
          window.open(job.output_image_url!, '_blank')
        } else if (status.status === 'failed') {
          clearInterval(interval)
          toast.error('Processing fallito')
        }
      } catch (error) {
        clearInterval(interval)
        console.error('Errore polling:', error)
      }
    }, 3000) // Poll ogni 3 secondi
  }

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {jobId && <p>Job ID: {jobId}</p>}
    </div>
  )
}
```

### Upload con Progress Bar

```typescript
// components/ImageUploaderWithProgress.tsx
'use client'

import { useState } from 'react'
import { api, JobStatus } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ImageUploaderWithProgress() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<string>('')

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setStatus('Uploading...')

    try {
      const { job_id } = await api.uploadImage(file)

      setUploading(false)
      setProcessing(true)
      setStatus('Processing...')

      // Poll status con progress
      const pollInterval = setInterval(async () => {
        const jobStatus = await api.getJobStatus(job_id)

        // Aggiorna progress bar
        if (jobStatus.progress) {
          setProgress(jobStatus.progress)
        }

        if (jobStatus.status === JobStatus.COMPLETED) {
          clearInterval(pollInterval)
          setProcessing(false)
          setProgress(100)
          setStatus('Completato!')

          const job = await api.getJobDetails(job_id)
          toast.success('Immagine processata!')

          // Download automatico
          if (job.output_image_url) {
            window.open(job.output_image_url, '_blank')
          }
        } else if (jobStatus.status === JobStatus.FAILED) {
          clearInterval(pollInterval)
          setProcessing(false)
          setStatus('Errore')
          toast.error('Processing fallito')
        }
      }, 2000)

    } catch (error: any) {
      setUploading(false)
      setProcessing(false)
      toast.error(error.message)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading || processing}
      >
        {uploading ? 'Uploading...' : processing ? 'Processing...' : 'Upload'}
      </button>

      {(uploading || processing) && (
        <div>
          <p>{status}</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p>{progress}%</p>
        </div>
      )}
    </div>
  )
}
```

---

## 👤 3. Visualizzare Info Utente e Quota

### Dashboard con Quota

```typescript
// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { api, type UserInfo } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const userData = await api.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Errore caricamento utente:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Caricamento...</div>

  if (!user) return <div>Errore</div>

  const { subscription } = user
  const usagePercentage = (subscription.usage / subscription.quota) * 100

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Info Utente */}
      <div className="user-info">
        <h2>Benvenuto, {user.username}!</h2>
        <p>Email: {user.email}</p>
        <p>Piano: {subscription.plan === 'free' ? 'Gratuito' : 'Premium'}</p>
      </div>

      {/* Quota */}
      <div className="quota-card">
        <h3>Quota Mensile</h3>
        <p>
          {subscription.usage} / {subscription.quota} upload
        </p>

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${usagePercentage}%`,
              backgroundColor: usagePercentage > 80 ? 'red' : 'green',
            }}
          />
        </div>

        {/* Avviso quota */}
        {subscription.usage >= subscription.quota && (
          <div className="warning">
            ⚠️ Quota esaurita! <a href="/pricing">Passa a Premium</a>
          </div>
        )}

        {subscription.plan === 'free' && (
          <a href="/pricing">
            Passa a Premium per 500 upload/mese
          </a>
        )}
      </div>
    </div>
  )
}
```

---

## 💳 4. Integrazione Stripe

### Upgrade a Premium

```typescript
// pages/pricing.tsx
'use client'

import { api } from '@/lib/api'
import toast from 'react-hot-toast'

export default function PricingPage() {
  const handleUpgrade = async () => {
    try {
      // Crea sessione Stripe Checkout
      const checkout = await api.createCheckoutSession({
        price_id: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
        success_url: `${window.location.origin}/billing/success`,
        cancel_url: `${window.location.origin}/pricing`,
      })

      // Redirect a Stripe
      window.location.href = checkout.checkout_url

    } catch (error: any) {
      toast.error('Errore durante checkout')
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Prezzi</h1>

      <div className="pricing-cards">
        {/* Piano Free */}
        <div className="card">
          <h2>Free</h2>
          <p className="price">€0/mese</p>
          <ul>
            <li>✅ 10 upload/mese</li>
            <li>✅ Qualità standard</li>
          </ul>
        </div>

        {/* Piano Premium */}
        <div className="card premium">
          <h2>Premium</h2>
          <p className="price">€19.99/mese</p>
          <ul>
            <li>✅ 500 upload/mese</li>
            <li>✅ Qualità alta</li>
            <li>✅ Priorità nel processing</li>
          </ul>
          <button onClick={handleUpgrade}>
            Passa a Premium
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Pagina Success dopo Pagamento

```typescript
// pages/billing/success.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function BillingSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Aspetta che il webhook Stripe sia processato
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Refresh user data
          refreshUserData()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const refreshUserData = async () => {
    try {
      // Fetch updated subscription info
      await api.getCurrentUser()

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Errore refresh:', error)
    }
  }

  return (
    <div className="success-page">
      <h1>✅ Pagamento Completato!</h1>
      <p>Il tuo account Premium è stato attivato.</p>
      <p>Redirect tra {countdown} secondi...</p>

      <button onClick={() => router.push('/dashboard')}>
        Vai alla Dashboard
      </button>
    </div>
  )
}
```

### Gestione Abbonamento (Customer Portal)

```typescript
// pages/billing.tsx
'use client'

import { useState, useEffect } from 'react'
import { api, type UserInfo } from '@/lib/api'
import toast from 'react-hot-toast'

export default function BillingPage() {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const userData = await api.getCurrentUser()
    setUser(userData)
  }

  const openCustomerPortal = async () => {
    try {
      const portal = await api.createCustomerPortal({
        return_url: `${window.location.origin}/billing`,
      })

      // Redirect a Stripe Customer Portal
      window.location.href = portal.portal_url

    } catch (error: any) {
      if (error.message.includes('404')) {
        toast.error('Non hai ancora un abbonamento attivo')
      } else {
        toast.error('Errore apertura portal')
      }
    }
  }

  const cancelSubscription = async () => {
    const confirmed = confirm(
      'Vuoi cancellare il tuo abbonamento? Verrà disattivato alla fine del periodo di fatturazione.'
    )

    if (!confirmed) return

    try {
      await api.cancelSubscription(false) // false = cancella a fine periodo

      toast.success('Abbonamento cancellato. Rimarrà attivo fino a fine mese.')

      // Refresh user data
      await loadUser()

    } catch (error) {
      toast.error('Errore cancellazione')
    }
  }

  if (!user) return <div>Caricamento...</div>

  const { subscription } = user

  return (
    <div>
      <h1>Gestione Abbonamento</h1>

      <div className="subscription-info">
        <h2>Piano Attuale: {subscription.plan}</h2>
        <p>Stato: {subscription.status}</p>
        <p>Quota: {subscription.usage} / {subscription.quota} upload</p>
      </div>

      {subscription.plan === 'premium' && (
        <div>
          <button onClick={openCustomerPortal}>
            Gestisci Abbonamento (Stripe)
          </button>

          <button onClick={cancelSubscription} className="danger">
            Cancella Abbonamento
          </button>
        </div>
      )}

      {subscription.plan === 'free' && (
        <a href="/pricing">
          <button>Passa a Premium</button>
        </a>
      )}
    </div>
  )
}
```

---

## 🔍 5. Gestione Job

### Lista Job

```typescript
// components/JobList.tsx
'use client'

import { useState, useEffect } from 'react'
import { api, type JobResponse, JobStatus } from '@/lib/api'
import toast from 'react-hot-toast'

export default function JobList() {
  const [jobs, setJobs] = useState<JobResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    // NOTA: L'endpoint "list jobs" non è nel nuovo API
    // Devi salvare i job_id localmente o creare un endpoint backend
    // Per ora, usiamo localStorage come esempio

    const jobIds = JSON.parse(localStorage.getItem('myJobs') || '[]')

    const jobPromises = jobIds.map((id: string) => api.getJobDetails(id))
    const jobs = await Promise.all(jobPromises)

    setJobs(jobs)
    setLoading(false)
  }

  const deleteJob = async (jobId: string) => {
    const confirmed = confirm('Vuoi eliminare questo job?')
    if (!confirmed) return

    try {
      await api.deleteJob(jobId)
      toast.success('Job eliminato')

      // Rimuovi da lista
      setJobs(jobs.filter(j => j.job_id !== jobId))

    } catch (error) {
      toast.error('Errore eliminazione')
    }
  }

  if (loading) return <div>Caricamento...</div>

  return (
    <div>
      <h2>I Miei Job</h2>

      {jobs.length === 0 && <p>Nessun job trovato</p>}

      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.job_id} className="job-card">
            <h3>Job {job.job_id.substring(0, 8)}...</h3>

            <p>
              Stato:
              <span className={`status status-${job.status}`}>
                {job.status}
              </span>
            </p>

            <p>Creato: {new Date(job.created_at).toLocaleString('it-IT')}</p>

            {job.status === JobStatus.COMPLETED && (
              <div>
                <a href={job.output_image_url!} target="_blank">
                  Download Risultato
                </a>
              </div>
            )}

            {job.status === JobStatus.FAILED && (
              <p className="error">{job.error_message}</p>
            )}

            <button onClick={() => deleteJob(job.job_id)}>
              Elimina
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 🛡️ 6. Protezione Route (Middleware)

### Middleware per Route Protette

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check se c'è un token
  const token = request.cookies.get('auth_token')?.value

  // Se non c'è token e la route è protetta, redirect a login
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!token && request.nextUrl.pathname.startsWith('/upload')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/upload/:path*'],
}
```

**NOTA**: Questo usa i cookie. Se usi localStorage, devi fare il check lato client.

### Check Lato Client

```typescript
// app/dashboard/layout.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <div>Caricamento...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <div>{children}</div>
}
```

---

## ✅ Checklist Completa

- [ ] Installato `amazon-cognito-identity-js`
- [ ] Configurato `.env.local` con credenziali Cognito
- [ ] Testato signup
- [ ] Testato verifica email
- [ ] Testato login
- [ ] Testato upload immagine
- [ ] Testato polling job status
- [ ] Testato download risultato
- [ ] Testato visualizzazione quota
- [ ] Testato upgrade a Premium (Stripe)
- [ ] Testato customer portal
- [ ] Testato cancellazione abbonamento

---

**Integrazione completata! 🚀**
