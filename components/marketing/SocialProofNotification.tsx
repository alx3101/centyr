'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Image as ImageIcon, Zap } from 'lucide-react'

const NOTIFICATIONS = [
  { name: 'Marco B.', city: 'Milano', action: 'ha elaborato', count: 47, type: 'images' },
  { name: 'Sofia R.', city: 'Roma', action: 'ha elaborato', count: 120, type: 'images' },
  { name: 'Alessandro M.', city: 'Torino', action: 'si è iscritto a', count: 0, type: 'signup' },
  { name: 'Giulia P.', city: 'Firenze', action: 'ha elaborato', count: 85, type: 'images' },
  { name: 'Luca T.', city: 'Napoli', action: 'è passato a', count: 0, type: 'upgrade' },
  { name: 'Emma C.', city: 'Bologna', action: 'ha elaborato', count: 200, type: 'images' },
  { name: 'Francesco D.', city: 'Verona', action: 'si è iscritto a', count: 0, type: 'signup' },
  { name: 'Chiara L.', city: 'Padova', action: 'ha elaborato', count: 63, type: 'images' },
  { name: 'Andrea V.', city: 'Genova', action: 'è passato a', count: 0, type: 'upgrade' },
  { name: 'Martina S.', city: 'Palermo', action: 'ha elaborato', count: 95, type: 'images' },
]

function getTimeAgo() {
  const minutes = Math.floor(Math.random() * 10) + 1
  return `${minutes} min fa`
}

export default function SocialProofNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentNotification, setCurrentNotification] = useState(0)
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    // Initial delay before showing first notification
    const initialDelay = setTimeout(() => {
      setTimeAgo(getTimeAgo())
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(initialDelay)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Hide after 5 seconds
    const hideTimeout = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    // Show next notification after 8 seconds
    const nextTimeout = setTimeout(() => {
      setCurrentNotification((prev) => (prev + 1) % NOTIFICATIONS.length)
      setTimeAgo(getTimeAgo())
      setIsVisible(true)
    }, 15000)

    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(nextTimeout)
    }
  }, [isVisible, currentNotification])

  const notification = NOTIFICATIONS[currentNotification]

  const getMessage = () => {
    switch (notification.type) {
      case 'images':
        return `${notification.action} ${notification.count} immagini`
      case 'signup':
        return `${notification.action} Centyr`
      case 'upgrade':
        return `${notification.action} Premium`
      default:
        return notification.action
    }
  }

  const getIcon = () => {
    switch (notification.type) {
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
              <span className="text-gray-500"> da {notification.city}</span>
            </p>
            <p className="text-sm text-gray-700 font-medium">{getMessage()}</p>
            <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
