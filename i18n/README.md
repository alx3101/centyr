# Internationalization (i18n) Guide

Centyr supporta **Italiano** e **Inglese** con cambio lingua dinamico.

## 🌍 Come Funziona

### 1. **Auto-Detection**
- Al primo accesso, la lingua viene rilevata automaticamente dal browser
- Se il browser è in italiano → italiano
- Altrimenti → inglese (default)

### 2. **Persistenza**
- La scelta della lingua viene salvata in `localStorage`
- Viene mantenuta tra sessioni e refresh

### 3. **Cambio Lingua**
- Usa il componente `<LanguageSelector />` nella navbar
- Click sulla bandiera → dropdown con opzioni
- Cambio istantaneo senza refresh

## 📝 Usare le Traduzioni nei Componenti

### Metodo 1: Hook `useTranslations` (Consigliato)

```typescript
'use client'

import { useTranslations } from '@/contexts/LanguageContext'

export default function MyComponent() {
  const t = useTranslations()

  return (
    <div>
      <h1>{t.dashboard.welcomeBack}</h1>
      <button>{t.common.save}</button>
    </div>
  )
}
```

### Metodo 2: Hook `useLanguage` (Se serve anche setLanguage)

```typescript
'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div>
      <h1>{t.dashboard.welcomeBack}</h1>
      <p>Current language: {language}</p>
    </div>
  )
}
```

## ➕ Aggiungere Nuove Traduzioni

### 1. Aggiorna l'interfaccia TypeScript

Modifica `i18n/translations.ts`:

```typescript
export interface Translations {
  // ... existing sections

  newSection: {
    title: string
    description: string
    action: string
  }
}
```

### 2. Aggiungi le traduzioni

```typescript
export const translations: Record<Language, Translations> = {
  en: {
    // ... existing translations
    newSection: {
      title: 'My Title',
      description: 'My description',
      action: 'Click here',
    },
  },

  it: {
    // ... existing translations
    newSection: {
      title: 'Il mio titolo',
      description: 'La mia descrizione',
      action: 'Clicca qui',
    },
  },
}
```

### 3. Usa nel componente

```typescript
const t = useTranslations()

<h1>{t.newSection.title}</h1>
<p>{t.newSection.description}</p>
<button>{t.newSection.action}</button>
```

## 🎯 Traduzioni Disponibili

### `common`
Elementi comuni UI: loading, error, save, delete, logout, etc.

### `nav`
Menu di navigazione: home, features, pricing, dashboard, upload, settings

### `auth`
Pagine di autenticazione: login, signup, password, etc.

### `dashboard`
Dashboard: statistics, jobs, processing, etc.

### `upload`
Pagina upload: drag & drop, quota, processing, etc.

### `pricing`
Pagina prezzi: plans, features, billing, etc.

### `quota`
Gestione limiti: exceeded, remaining, reset, etc.

### `notifications`
Toast notifications: success, error messages

## 🔧 Configurazione Avanzata

### Aggiungere una Nuova Lingua

1. **Aggiorna il tipo Language**:
```typescript
export type Language = 'en' | 'it' | 'es' // Aggiungi 'es' per spagnolo
```

2. **Aggiungi le traduzioni**:
```typescript
export const translations: Record<Language, Translations> = {
  en: { /* ... */ },
  it: { /* ... */ },
  es: { /* traduzioni spagnole */ },
}
```

3. **Aggiorna LanguageSelector**:
```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]
```

### Cambiare la Lingua Default

In `contexts/LanguageContext.tsx`:

```typescript
const getInitialLanguage = (): Language => {
  // ... existing code

  // Change default from 'en' to 'it'
  return 'it' // <-- Cambia qui
}
```

## 📱 Best Practices

1. **Sempre usare traduzioni**: Non scrivere mai testo hardcoded
```typescript
// ❌ BAD
<button>Save</button>

// ✅ GOOD
<button>{t.common.save}</button>
```

2. **Organizzare per sezione**: Raggruppa traduzioni correlate
```typescript
// ✅ GOOD
t.dashboard.welcomeBack
t.dashboard.recentJobs

// ❌ BAD
t.welcomeBackDashboard
t.recentJobsDashboard
```

3. **Nomi descrittivi**: Usa nomi che spieghino il contesto
```typescript
// ✅ GOOD
t.auth.passwordTooShort

// ❌ BAD
t.error1
```

4. **Validazione TypeScript**: Il sistema è type-safe!
```typescript
t.dashboard.wrongKey // ❌ TypeScript error!
t.dashboard.welcomeBack // ✅ OK
```

## 🐛 Troubleshooting

### Il componente non si aggiorna quando cambio lingua

Assicurati che il componente sia "use client":
```typescript
'use client'

import { useTranslations } from '@/contexts/LanguageContext'
```

### "useLanguage must be used within a LanguageProvider"

Verifica che `<LanguageProvider>` sia nel layout root:
```typescript
// app/layout.tsx
<body>
  <LanguageProvider>
    {children}
  </LanguageProvider>
</body>
```

### Le traduzioni non vengono salvate

Controlla la console per errori di localStorage. Potrebbe essere disabilitato nel browser.

## 🚀 Performance

- ✅ Zero dependencies esterne (no next-i18next, no react-intl)
- ✅ Lightweight (~10KB totali per entrambe le lingue)
- ✅ No route reloading al cambio lingua
- ✅ Type-safe con TypeScript
- ✅ SSR-friendly con hydration check
