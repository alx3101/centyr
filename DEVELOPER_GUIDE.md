# 🛠️ Developer Quick Reference Guide

> Guida rapida per sviluppatori che lavorano sul progetto Centyr

## 📋 Comandi Essenziali

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build production
npm run start            # Run production build
npm run lint             # ESLint check
npx tsc --noEmit         # TypeScript check

# Utilities
git status               # Check git status
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to remote
```

## 🔑 File Chiave da Conoscere

| File | Scopo |
|------|-------|
| `app/layout.tsx` | Root layout, LanguageProvider, Toaster |
| `app/page.tsx` | Landing page |
| `app/(auth)/login/page.tsx` | Pagina login |
| `app/dashboard/page.tsx` | Dashboard utente |
| `lib/api.ts` | API client centralizzato |
| `lib/auth.ts` | Helpers autenticazione |
| `hooks/useAuth.ts` | Hook gestione auth |
| `hooks/useUpload.ts` | Hook gestione upload |
| `i18n/translations.ts` | Traduzioni EN/IT |
| `contexts/LanguageContext.tsx` | Context i18n |

## 🎨 Classi CSS Comuni

```css
/* Gradients */
.gradient-purple-fuchsia { background: linear-gradient(to right, #8B5CF6, #D946EF); }
.text-gradient { /* Purple to Fuchsia text */ }
.gradient-animated { /* Animated gradient background */ }

/* Animations */
.animate-fade-in-up { /* Fade in from bottom */ }
.animate-scale-in { /* Scale in from 95% */ }
.animate-float { /* Float up and down */ }

/* Effects */
.glow-purple { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
.backdrop-blur-sm { backdrop-filter: blur(8px); }

/* Buttons */
.btn-primary { @apply gradient-purple-fuchsia text-white px-6 py-3 rounded-lg; }
```

## 🔌 API Endpoints (Backend)

### Auth
```
POST   /auth/signup          # Registrazione
POST   /auth/login           # Login
GET    /auth/me              # Get user info
```

### Images
```
POST   /images/process       # Upload & process
GET    /images/status/:id    # Job status
GET    /images/jobs          # User jobs
GET    /images/download/:id  # Download results
```

### Subscriptions
```
POST   /subscriptions/create-checkout  # Stripe checkout
GET    /subscriptions/me               # Get subscription
POST   /subscriptions/cancel           # Cancel sub
```

## 🎯 Pattern Comuni

### 1. Usare Traduzioni

```typescript
import { useTranslations } from '@/contexts/LanguageContext'

const t = useTranslations()

return <h1>{t.dashboard.welcomeBack}</h1>
```

### 2. Chiamare API

```typescript
import { api } from '@/lib/api'

const data = await api.processImages(files)
```

### 3. Gestire Auth

```typescript
import { useAuth } from '@/hooks/useAuth'

const { user, login, logout, isAuthenticated } = useAuth()
```

### 4. Toast Notifications

```typescript
import toast from 'react-hot-toast'

toast.success('Success!')
toast.error('Error!')
toast.loading('Loading...')
```

### 5. Protected Route

```typescript
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

  return <div>Protected content</div>
}
```

## 🐛 Debugging Tips

### 1. TypeScript Errors
```bash
# Check errors
npx tsc --noEmit

# Common fixes:
# - Import types: import type { User } from '@/types'
# - Add type assertions: as const, as string
# - Check null: user?.email
```

### 2. API Errors
```typescript
// Always wrap in try/catch
try {
  const data = await api.someEndpoint()
} catch (error: any) {
  console.error('API Error:', error)
  toast.error(error.message)
}
```

### 3. Hydration Errors
```typescript
// Use client component for localStorage/window
'use client'

// Or check window
if (typeof window !== 'undefined') {
  // browser code
}
```

### 4. Build Errors
```bash
# Clean build
rm -rf .next
npm run build

# Check for:
# - Server/client component mismatch
# - Missing 'use client' directives
# - Async component issues
```

## 🎨 Aggiungere Nuova Pagina

```bash
# 1. Crea file
touch app/my-page/page.tsx

# 2. Aggiungi codice
```

```typescript
'use client'

import { useTranslations } from '@/contexts/LanguageContext'

export default function MyPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-fuchsia-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gradient">
          {t.mySection.title}
        </h1>
      </div>
    </div>
  )
}
```

## 🌍 Aggiungere Traduzioni

```typescript
// 1. i18n/translations.ts - Aggiungi interfaccia
export interface Translations {
  mySection: {
    title: string
    subtitle: string
  }
}

// 2. Aggiungi traduzioni
export const translations = {
  en: {
    mySection: {
      title: 'My Title',
      subtitle: 'My Subtitle'
    }
  },
  it: {
    mySection: {
      title: 'Il mio Titolo',
      subtitle: 'Il mio Sottotitolo'
    }
  }
}

// 3. Usa nel componente
const t = useTranslations()
<h1>{t.mySection.title}</h1>
```

## 📝 Git Commit Messages

Usa Conventional Commits:

```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve login error"
git commit -m "docs: update README"
git commit -m "style: format code"
git commit -m "refactor: simplify API client"
git commit -m "test: add auth tests"
```

Tipi:
- `feat`: Nuova feature
- `fix`: Bug fix
- `docs`: Documentazione
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

## 🚀 Deploy Checklist

```bash
# 1. Test locale
npm run build
npm run start

# 2. Type check
npx tsc --noEmit

# 3. Lint
npm run lint

# 4. Git
git add .
git commit -m "release: v1.0.0"
git push

# 5. Deploy
vercel --prod

# 6. Test produzione
# - Login flow
# - Upload flow
# - Payment flow
# - Language switching
```

## 📊 Performance Tips

### 1. Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### 2. Dynamic Imports
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

### 3. Memoization
```typescript
import { useMemo, useCallback } from 'react'

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

const handleClick = useCallback(() => {
  doSomething()
}, [])
```

## 🔐 Security Best Practices

1. **Never commit secrets**
   - Use `.env.local`
   - Add to `.gitignore`
   - Use Vercel env vars

2. **Validate user input**
   ```typescript
   if (!email || !email.includes('@')) {
     return toast.error('Invalid email')
   }
   ```

3. **Sanitize data**
   ```typescript
   const sanitized = DOMPurify.sanitize(userInput)
   ```

4. **HTTPS only in production**
   - Vercel handles this
   - Never send tokens over HTTP

## 🆘 Common Errors & Solutions

### Error: "Cannot find module '@/...'"

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Error: "Hydration failed"

```typescript
// Add 'use client'
'use client'

// Or suppress warning
<div suppressHydrationWarning>
```

### Error: "Missing environment variables"

```bash
# Check .env.local exists
cp .env.example .env.local

# Restart dev server
npm run dev
```

### Error: "Module not found: react-hot-toast"

```bash
npm install react-hot-toast
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Stripe Docs](https://stripe.com/docs)

## 💡 Pro Tips

1. **Use TypeScript autocomplete**: Press `Ctrl+Space` for suggestions
2. **Use Console**: `console.log()` is your friend
3. **Use React DevTools**: Install browser extension
4. **Read error messages**: They're usually helpful
5. **Google errors**: Someone else had the same problem
6. **Ask ChatGPT**: Describe your error clearly
7. **Git commit often**: Small, frequent commits are better
8. **Test in browser**: Check Chrome DevTools Network tab
9. **Use Prettier**: Auto-format on save
10. **Stay updated**: `npm outdated` to check packages

---

**Happy coding! 🚀**

Per domande: Controlla la [Full Documentation](PROJECT_DOCUMENTATION.md)
