'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations, Translations } from '@/i18n/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'centyr_language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Detect browser language or use stored preference
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en'

    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored && (stored === 'en' || stored === 'it')) {
      return stored
    }

    // Detect from browser
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('it')) return 'it'
    return 'en'
  }

  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Update language from storage after mount
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored && (stored === 'en' || stored === 'it')) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang)
      // Update html lang attribute
      document.documentElement.lang = lang
    }
  }

  const value: LanguageContextType = {
    language: mounted ? language : 'en',
    setLanguage,
    t: translations[mounted ? language : 'en'],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Hook per usare solo le traduzioni senza setter
export function useTranslations() {
  const { t } = useLanguage()
  return t
}
