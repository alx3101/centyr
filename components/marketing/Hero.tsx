'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white py-20 md:py-32 overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
            Align All Your Product Photos<br />
            <span className="text-gradient animate-pulse-slow">in Seconds</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Stop wasting hours on manual editing. Centyr's AI automatically centers your products, removes shadows, and creates perfectly aligned photos—with just one click.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/upload"
              className="gradient-purple-fuchsia text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple hover:glow-purple-strong"
            >
              Start Free Trial
            </Link>
            <button
              onClick={() => setShowVideo(true)}
              className="group border-2 border-primary-400 text-primary-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              See It In Action
              <span className="inline-block group-hover:translate-x-1 transition-transform">▶</span>
            </button>
          </div>

          {/* Trust Bar */}
          <div className="text-sm text-gray-500 flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Used by 1,000+ e-commerce stores
            </span>
            <span className="hidden sm:inline">
              {/* •</span>
            <span>Featured on Shopify App Store</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <span className="text-fuchsia-500">★★★★★</span> 4.9 Rating */}
            </span>
          </div>

          {/* Hero Image - Before/After Split */}
          <div className="max-w-5xl mx-auto animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-2xl p-8 border border-purple-100 hover:shadow-purple-500/20 transition-all duration-500">
              <div className="group">
                <div className="text-sm font-semibold text-gray-600 mb-3 text-left flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                  BEFORE
                </div>
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="w-32 h-32 bg-gray-400 rounded-lg transform rotate-12 group-hover:rotate-[-15deg] transition-transform duration-500"></div>
                  </div>
                  <span className="text-gray-500 font-medium relative z-10">Misaligned & Chaotic</span>
                </div>
              </div>
              <div className="group">
                <div className="text-sm font-semibold text-fuchsia-600 mb-3 text-left flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  AFTER
                </div>
                <div className="aspect-square bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white rounded-lg flex items-center justify-center relative overflow-hidden border-2 border-fuchsia-400 shadow-lg shadow-fuchsia-200 group-hover:shadow-xl group-hover:shadow-fuchsia-300 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 gradient-purple-fuchsia rounded-lg opacity-20 animate-pulse-slow"></div>
                  </div>
                  <span className="text-gradient font-bold relative z-10 text-xl">Perfectly Aligned ✨</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse"></span>
              3-second auto-play demo • 6 product categories
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowVideo(false)}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full aspect-video flex items-center justify-center shadow-2xl glow-purple-strong animate-scale-in">
            <p className="text-gray-500">Demo Video Placeholder</p>
          </div>
        </div>
      )}
    </section>
  )
}
