# Centry Frontend - API Integration Complete ✅

L'integrazione del frontend Centry con il backend AWS Cognito è stata completata con successo!

---

## 📦 Cosa è Stato Fatto

### 1. **API Client Completamente Aggiornato** ([lib/api.ts](lib/api.ts))
   - ✅ Basato su OpenAPI 3.1 specification
   - ✅ TypeScript types per tutte le risposte
   - ✅ Supporto completo per Cognito JWT tokens
   - ✅ Nuovi endpoint: `/api/v1/me`, `/api/v1/upload`, `/api/v1/jobs/*`, `/api/v1/billing/*`
   - ✅ Backward compatibility con metodi deprecati

### 2. **Autenticazione AWS Cognito** ([lib/cognito.ts](lib/cognito.ts))
   - ✅ Signup con verifica email
   - ✅ Login con JWT tokens
   - ✅ Logout
   - ✅ Forgot password
   - ✅ Change password
   - ✅ Session refresh automatico

### 3. **Hooks Aggiornati**
   - ✅ [hooks/useAuth.ts](hooks/useAuth.ts) - Integrazione Cognito completa
   - ✅ [hooks/useUpload.ts](hooks/useUpload.ts) - Supporto nuova API

### 4. **UI Components Aggiornati**
   - ✅ [app/dashboard/layout.tsx](app/dashboard/layout.tsx) - Visualizza username
   - ✅ [app/upload/layout.tsx](app/upload/layout.tsx) - Visualizza username

### 5. **Documentazione Completa**
   - ✅ [API_GUIDE.md](API_GUIDE.md) - Guida completa all'API
   - ✅ [SETUP_GUIDE.md](SETUP_GUIDE.md) - Istruzioni di setup
   - ✅ [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) - Riassunto modifiche
   - ✅ [ESEMPI_INTEGRAZIONE.md](ESEMPI_INTEGRAZIONE.md) - Esempi pratici in italiano
   - ✅ [API_QUICK_REFERENCE.md](API_QUICK_REFERENCE.md) - Quick reference

---

## 🚀 Quick Start

### 1. Installa Dipendenze

```bash
npm install
```

Questo installa anche `amazon-cognito-identity-js` (già fatto).

### 2. Configura Environment

Crea `.env.local`:

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# AWS Cognito
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-west-3_YourPoolId
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
NEXT_PUBLIC_COGNITO_REGION=eu-west-3

# Stripe (opzionale)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Avvia Dev Server

```bash
npm run dev
```

### 4. Testa Autenticazione

1. Vai su http://localhost:3000/signup
2. Registra un nuovo utente
3. Verifica email con il codice ricevuto
4. Effettua login
5. Vieni reindirizzato a /dashboard

---

## 📚 Documentazione

### Per Iniziare
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Setup completo passo-passo

### Guide di Utilizzo
- **[API_GUIDE.md](API_GUIDE.md)** - Guida completa API in inglese
- **[ESEMPI_INTEGRAZIONE.md](ESEMPI_INTEGRAZIONE.md)** - Esempi pratici in italiano
- **[API_QUICK_REFERENCE.md](API_QUICK_REFERENCE.md)** - Quick reference

### Per Sviluppatori
- **[MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)** - Dettaglio modifiche tecniche

---

## 🎯 Funzionalità Principali

### ✅ Autenticazione
- Signup con AWS Cognito
- Login con JWT tokens
- Email verification
- Password reset
- Session automatica

### ✅ Upload Immagini
- Upload singola immagine
- Validazione file (tipo, dimensione)
- Job tracking con polling
- Download risultati

### ✅ Gestione Quota
- Visualizzazione quota mensile
- Free plan: 10 upload/mese
- Premium plan: 500 upload/mese
- Check automatico prima upload

### ✅ Billing Stripe
- Upgrade a Premium
- Checkout session
- Customer portal
- Cancellazione subscription

### ✅ Job Management
- Lista job
- Dettagli job
- Status polling
- Download risultati
- Eliminazione job

---

## 🔑 API Endpoints Principali

| Endpoint | Metodo | Descrizione |
|----------|--------|-------------|
| `/api/v1/me` | GET | User info + subscription |
| `/api/v1/upload` | POST | Upload immagine |
| `/api/v1/jobs/{id}` | GET | Dettagli job |
| `/api/v1/jobs/{id}/status` | GET | Status job (polling) |
| `/api/v1/jobs/{id}` | DELETE | Elimina job |
| `/api/v1/billing/create-checkout` | POST | Stripe checkout |
| `/api/v1/billing/customer-portal` | POST | Stripe portal |
| `/api/v1/billing/cancel-subscription` | POST | Cancella subscription |

---

## 💡 Esempi di Codice

### Upload Immagine

```typescript
import { api } from '@/lib/api'

const { job_id } = await api.uploadImage(file)
const status = await api.getJobStatus(job_id)
```

### Autenticazione

```typescript
import { useAuth } from '@/hooks/useAuth'

const { login, signup, logout } = useAuth()

await signup('email@example.com', 'Password123!', 'John Doe')
await login('email@example.com', 'Password123!')
```

### Verifica Quota

```typescript
const user = await api.getCurrentUser()

if (user.subscription.usage >= user.subscription.quota) {
  alert('Quota esaurita!')
}
```

### Upgrade a Premium

```typescript
const checkout = await api.createCheckoutSession({
  price_id: 'price_xxx',
  success_url: '/success',
  cancel_url: '/pricing',
})

window.location.href = checkout.checkout_url
```

---

## 🏗️ Struttura Progetto

```
centyr-web/
├── lib/
│   ├── api.ts                    # ✅ API client (UPDATED)
│   ├── cognito.ts                # ✅ Cognito utilities (NEW)
│   ├── auth.ts                   # ✅ Auth helpers (UPDATED)
│   └── ...
├── hooks/
│   ├── useAuth.ts                # ✅ Auth hook (UPDATED)
│   └── useUpload.ts              # ✅ Upload hook (UPDATED)
├── app/
│   ├── dashboard/
│   │   └── layout.tsx            # ✅ (UPDATED)
│   └── upload/
│       └── layout.tsx            # ✅ (UPDATED)
├── .env.local                    # ⚠️ DA CREARE
├── API_GUIDE.md                  # ✅ (NEW)
├── SETUP_GUIDE.md                # ✅ (NEW)
├── MIGRATION_SUMMARY.md          # ✅ (NEW)
├── ESEMPI_INTEGRAZIONE.md        # ✅ (NEW)
├── API_QUICK_REFERENCE.md        # ✅ (NEW)
└── README_API_INTEGRATION.md     # ✅ (NEW - questo file)
```

---

## ✅ Checklist Setup

- [x] Codice aggiornato
- [x] Dipendenze installate (`amazon-cognito-identity-js`)
- [x] TypeScript compila senza errori
- [ ] **Environment variables configurate** (`.env.local`)
- [ ] **AWS Cognito User Pool creato**
- [ ] **Backend API in esecuzione**
- [ ] **Test signup/login**
- [ ] **Test upload immagine**
- [ ] **Stripe configurato** (opzionale)

---

## 🔧 Prossimi Passi

### 1. Configura AWS Cognito

1. Vai su AWS Console → Cognito
2. Crea un User Pool
3. Configura app client (senza secret)
4. Copia User Pool ID e Client ID
5. Aggiungi a `.env.local`

### 2. Configura Backend

Assicurati che il backend:
- Validi token Cognito
- Abbia CORS configurato per `http://localhost:3000`
- Abbia gli endpoint `/api/v1/*` implementati

### 3. Testa Funzionalità

```bash
# 1. Avvia backend
cd ../backend
python main.py

# 2. Avvia frontend
cd ../centyr-web
npm run dev

# 3. Testa signup
# Apri http://localhost:3000/signup

# 4. Testa upload
# Apri http://localhost:3000/upload
```

---

## 🐛 Troubleshooting

### "Cannot find module 'amazon-cognito-identity-js'"

```bash
npm install amazon-cognito-identity-js
```

### "Invalid User Pool configuration"

Controlla `.env.local`:
- `NEXT_PUBLIC_COGNITO_USER_POOL_ID` corretto?
- `NEXT_PUBLIC_COGNITO_CLIENT_ID` corretto?
- Riavvia server: `npm run dev`

### "CORS error"

Aggiungi al backend (FastAPI):

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

### TypeScript errors

```bash
npx tsc --noEmit
```

Dovrebbe mostrare 0 errori.

---

## 📊 Status

| Componente | Status | Note |
|------------|--------|------|
| API Client | ✅ Completo | Basato su OpenAPI spec |
| Cognito Integration | ✅ Completo | Signup/Login/Logout |
| Type Safety | ✅ Completo | 0 errori TypeScript |
| Hooks | ✅ Completo | useAuth, useUpload |
| UI Components | ✅ Aggiornato | Layout files |
| Documentazione | ✅ Completo | 5 guide |
| Testing | ⏳ TODO | Configurare .env.local |

---

## 🎉 Conclusione

L'integrazione è completa! Il frontend Centry è ora pronto per:

1. ✅ Autenticare utenti con AWS Cognito
2. ✅ Caricare e processare immagini
3. ✅ Gestire quote e subscription
4. ✅ Integrare pagamenti Stripe
5. ✅ Tracciare job di processing

**Prossimo step**: Configura `.env.local` e testa il flusso completo!

---

## 📞 Support

Per domande o problemi:

1. Leggi [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Consulta [ESEMPI_INTEGRAZIONE.md](ESEMPI_INTEGRAZIONE.md)
3. Controlla TypeScript: `npx tsc --noEmit`
4. Verifica browser console
5. Controlla backend logs

---

**Happy coding! 🚀**
