'use client'

import { XCircle, ArrowLeft, HelpCircle, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function BillingCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Cancel Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center border-2 border-orange-200">
          {/* Cancel Icon */}
          <div className="mb-6 inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-4">
                <XCircle className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Checkout Cancelled
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            No worries! Your payment was not processed and you haven't been charged.
          </p>

          {/* Reasons / FAQ */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Common questions:
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Changed your mind?</h3>
                <p className="text-sm text-gray-600">
                  You can always upgrade later when you're ready. Your free plan is still active.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Have questions about pricing?</h3>
                <p className="text-sm text-gray-600">
                  Check out our{' '}
                  <Link href="/pricing" className="text-orange-600 hover:underline font-semibold">
                    pricing page
                  </Link>
                  {' '}for detailed plan comparison.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Need help deciding?</h3>
                <p className="text-sm text-gray-600">
                  Our support team is here to help!{' '}
                  <Link href="/support" className="text-orange-600 hover:underline font-semibold">
                    Contact us
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pricing
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-orange-600 text-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Support notice */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-900 mb-1">Still have questions?</h3>
                <p className="text-sm text-blue-700">
                  Our team is available to help you choose the right plan for your needs.
                  We can also set up a demo to show you how our premium features work.
                </p>
                <Link
                  href="/support"
                  className="inline-block mt-2 text-sm font-semibold text-blue-600 hover:underline"
                >
                  Chat with us →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Want to try before you buy?</p>
          <Link
            href="/upload"
            className="text-orange-600 hover:underline font-semibold"
          >
            Upload an image with your free plan
          </Link>
        </div>
      </div>
    </div>
  )
}
