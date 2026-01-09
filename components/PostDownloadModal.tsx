'use client'

import { useState } from 'react'
import { X, Sparkles, Upload, Zap, Share2 } from 'lucide-react'
import Link from 'next/link'

interface PostDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  userPlan: 'free' | 'pro' | 'enterprise'
  remainingUploads: number
  totalLimit: number
}

export default function PostDownloadModal({
  isOpen,
  onClose,
  userPlan,
  remainingUploads,
  totalLimit
}: PostDownloadModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const isLowOnCredits = remainingUploads < totalLimit * 0.3
  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=USER123`

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative animate-scale-in shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4">
            <Sparkles className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Download Complete! ✨
          </h2>
          <p className="text-gray-600">
            Your perfectly aligned image is ready
          </p>
        </div>

        {/* Conditional Content Based on Plan */}
        {userPlan === 'free' && isLowOnCredits ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-orange-900 mb-2">
                ⚠️ Running Low on Credits
              </p>
              <p className="text-sm text-orange-700">
                You have <span className="font-bold">{remainingUploads}/{totalLimit}</span> uploads remaining this month
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <Zap className="w-6 h-6 text-fuchsia-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Upgrade to Pro</h3>
                  <p className="text-sm text-gray-600">
                    Get unlimited uploads, bulk processing, and priority support for just $19/month
                  </p>
                </div>
              </div>

              <Link
                href="/pricing"
                className="block w-full text-center gradient-purple-fuchsia text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* What's Next Section */}
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-fuchsia-600" />
                What's next?
              </h3>

              <div className="space-y-3">
                <Link
                  href="/upload"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors group"
                >
                  <Upload className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Process More Images</p>
                    <p className="text-xs text-gray-600">Upload another batch</p>
                  </div>
                  <span className="text-primary-600 text-sm">→</span>
                </Link>

                {userPlan === 'free' && (
                  <Link
                    href="/pricing"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors group"
                  >
                    <Zap className="w-5 h-5 text-fuchsia-600 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">Unlock Bulk Upload</p>
                      <p className="text-xs text-gray-600">Process 100s of images at once</p>
                    </div>
                    <span className="text-fuchsia-600 text-sm">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Referral Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <Share2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Love Centyr?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Share with a friend and you both get <span className="font-bold text-blue-600">5 free image credits!</span>
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 px-3 py-2 border-2 border-blue-200 rounded-lg text-sm bg-white"
                    />
                    <button
                      onClick={copyReferralLink}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
