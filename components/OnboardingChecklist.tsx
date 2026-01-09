'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, X } from 'lucide-react'
import Link from 'next/link'

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  action?: {
    label: string
    href: string
  }
}

interface OnboardingChecklistProps {
  items: ChecklistItem[]
  onDismiss?: () => void
}

export default function OnboardingChecklist({ items, onDismiss }: OnboardingChecklistProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const completedCount = items.filter(item => item.completed).length
  const totalCount = items.length
  const progress = (completedCount / totalCount) * 100

  if (isDismissed) return null

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg mb-8 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            🚀 Get Started with Centyr
          </h3>
          <p className="text-sm text-gray-600">
            Complete these steps to unlock the full potential
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{completedCount} of {totalCount} completed</span>
          <span className="font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="gradient-purple-fuchsia h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 ${
              item.completed
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-white border-2 border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="mt-0.5">
              {item.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </div>

            <div className="flex-1">
              <h4 className={`font-semibold mb-1 ${
                item.completed ? 'text-green-900 line-through' : 'text-gray-900'
              }`}>
                {item.title}
              </h4>
              <p className={`text-sm ${
                item.completed ? 'text-green-700' : 'text-gray-600'
              }`}>
                {item.description}
              </p>

              {!item.completed && item.action && (
                <Link
                  href={item.action.href}
                  className="inline-block mt-2 text-sm font-semibold text-primary-600 hover:text-fuchsia-600 transition-colors"
                >
                  {item.action.label} →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {completedCount === totalCount && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-center">
          <p className="text-green-900 font-bold mb-2">🎉 Congratulations!</p>
          <p className="text-sm text-green-700">
            You've completed the onboarding. You're all set to create amazing aligned images!
          </p>
        </div>
      )}
    </div>
  )
}
