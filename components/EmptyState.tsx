'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  secondaryLabel?: string
  onSecondaryAction?: () => void
  tips?: string[]
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  tips
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-fuchsia-100 mb-6">
        <Icon className="w-10 h-10 text-primary-600" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="gradient-purple-fuchsia text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {actionLabel}
          </Link>
        )}

        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="gradient-purple-fuchsia text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {actionLabel}
          </button>
        )}

        {secondaryLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="border-2 border-primary-400 text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300"
          >
            {secondaryLabel}
          </button>
        )}
      </div>

      {tips && tips.length > 0 && (
        <div className="max-w-md mx-auto bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-6 border-2 border-purple-100">
          <p className="font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <span>💡</span> Quick Tips
          </p>
          <ul className="space-y-2 text-left text-sm text-gray-700">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
