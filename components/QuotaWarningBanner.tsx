'use client'

import { AlertTriangle, Zap, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface QuotaWarningBannerProps {
  currentUploads: number
  limit: number
  plan: string
}

export default function QuotaWarningBanner({
  currentUploads,
  limit,
  plan
}: QuotaWarningBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const percentage = (currentUploads / limit) * 100
  const remaining = limit - currentUploads

  // Don't show if not on free plan or if dismissed
  if (plan !== 'free' || isDismissed) return null

  // Show at 80% usage
  if (percentage < 80) return null

  const isAtLimit = percentage >= 100

  return (
    <div
      className={`mb-6 rounded-2xl p-6 border-2 shadow-lg animate-fade-in ${
        isAtLimit
          ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
          : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
          isAtLimit ? 'bg-red-100' : 'bg-orange-100'
        }`}>
          <AlertTriangle className={`w-6 h-6 ${
            isAtLimit ? 'text-red-600' : 'text-orange-600'
          }`} />
        </div>

        <div className="flex-1">
          <h3 className={`text-lg font-bold mb-2 ${
            isAtLimit ? 'text-red-900' : 'text-orange-900'
          }`}>
            {isAtLimit
              ? '🚨 Monthly Limit Reached'
              : '⚠️ Running Low on Credits'
            }
          </h3>

          <p className={`text-sm mb-4 ${
            isAtLimit ? 'text-red-700' : 'text-orange-700'
          }`}>
            {isAtLimit ? (
              <>
                You've used all <span className="font-bold">{limit} images</span> this month.
                Upgrade to Pro for unlimited uploads!
              </>
            ) : (
              <>
                You've used <span className="font-bold">{currentUploads}/{limit} images</span> this month.
                Only <span className="font-bold">{remaining} left</span>!
              </>
            )}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-white/50 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                isAtLimit
                  ? 'bg-gradient-to-r from-red-500 to-red-600'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          {/* Benefits List */}
          <div className="bg-white/80 rounded-xl p-4 mb-4">
            <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-fuchsia-600" />
              Upgrade to Pro and get:
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Unlimited</strong> image uploads per month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Bulk processing</strong> - upload 100s at once</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Priority support</strong> and faster processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>API access</strong> for automation</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link
              href="/pricing"
              className="flex-1 text-center gradient-purple-fuchsia text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {isAtLimit ? 'Upgrade Now to Continue' : 'Upgrade to Pro - $19/mo'}
            </Link>
            {!isAtLimit && (
              <button
                onClick={() => setIsDismissed(true)}
                className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
