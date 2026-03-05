'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/i18n/translations'
import { Globe, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages: { code: Language; name: string; abbr: string }[] = [
    { code: 'en', name: 'English', abbr: 'EN' },
    { code: 'it', name: 'Italiano', abbr: 'IT' },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLanguage = languages.find((l) => l.code === language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
        aria-label="Select language"
      >
        <Globe size={18} />
        <span className="text-xs font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">{currentLanguage?.abbr}</span>
        <span className="hidden sm:inline font-medium">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-purple-100 overflow-hidden z-50 animate-fade-in-up">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                language === lang.code
                  ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white'
                  : 'text-gray-700 hover:bg-purple-50'
              }`}
            >
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${language === lang.code ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700'}`}>{lang.abbr}</span>
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && (
                <Check className="ml-auto w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
