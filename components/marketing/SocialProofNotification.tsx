'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Image as ImageIcon, Zap } from 'lucide-react'
import { useTranslations } from '@/contexts/LanguageContext'

const NOTIFICATIONS = [
  { name: 'Marco B.',      city: 'Milan',    action: 'images',  count: 47 },
  { name: 'Sofia R.',      city: 'Rome',     action: 'images',  count: 120 },
  { name: 'Alessandro M.', city: 'Turin',    action: 'signup',  count: 0 },
  { name: 'Giulia P.',     city: 'Florence', action: 'images',  count: 85 },
  { name: 'Luca T.',       city: 'Naples',   action: 'upgrade', count: 0 },
  { name: 'Emma C.',       city: 'Bologna',  action: 'images',  count: 200 },
  { name: 'Francesco D.',  city: 'Verona',   action: 'signup',  count: 0 },
  { name: 'Chiara L.',     city: 'Padua',    action: 'images',  count: 63 },
  { name: 'Andrea V.',     city: 'Genoa',    action: 'upgrade', count: 0 },
  { name: 'Martina S.',    city: 'Palermo',  action: 'images',  count: 95 },
]

function getTimeAgo(minAgoLabel: string) {
  const minutes = Math.floor(Math.random() * 10) + 1
  return `${minutes} ${minAgoLabel}`
}

export default function SocialProofNotification() {
  const t = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const [currentNotification, setCurrentNotification] = useState(0)
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setTimeAgo(getTimeAgo(t.marketing.socialProof.minAgo))
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(initialDelay)
  }, [t.marketing.socialProof.minAgo])

  useEffect(() => {
    if (!isVisible) return

    const hideTimeout = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    const nextTimeout = setTimeout(() => {
      setCurrentNotification((prev) => (prev + 1) % NOTIFICATIONS.length)
      setTimeAgo(getTimeAgo(t.marketing.socialProof.minAgo))
      setIsVisible(true)
    }, 15000)

    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(nextTimeout)
    }
  }, [isVisible, currentNotification, t.marketing.socialProof.minAgo])

  const notification = NOTIFICATIONS[currentNotification]

  const getMessage = () => {
    switch (notification.action) {
      case 'images':
        return t.marketing.socialProof.processedImages.replace('{count}', String(notification.count))
      case 'signup':
        return t.marketing.socialProof.signedUp
      case 'upgrade':
        return t.marketing.socialProof.upgraded
      default:
        return ''
    }
  }

  const getIcon = () => {
    switch (notification.action) {
      case 'images':
        return <ImageIcon className="w-5 h-5 text-purple-600" />
      case 'signup':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'upgrade':
        return <Zap className="w-5 h-5 text-amber-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-purple-600" />
    }
  }

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-xs animate-bounce-subtle">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-full flex items-center justify-center flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">
              <span className="font-bold">{notification.name}</span>
              <span className="text-gray-500"> {t.marketing.socialProof.from} {notification.city}</span>
            </p>
            <p className="text-sm text-gray-700 font-medium">{getMessage()}</p>
            <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
