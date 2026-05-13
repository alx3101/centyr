'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Language, translations, Translations } from '@/i18n/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLanguage = 'en',
}: {
  children: ReactNode
  initialLanguage?: Language
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    document.documentElement.lang = lang
    document.cookie = `centyr_language=${lang}; path=/; max-age=31536000; SameSite=Lax`
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
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

export function useTranslations() {
  const { t } = useLanguage()
  return t
}
