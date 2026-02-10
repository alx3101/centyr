'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Hero() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-purple-100">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-700">Processing 1M+ images monthly</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Perfect Product Photos,<br />
            <span className="text-gradient">Automatically</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional AI that centers your products perfectly. Upload hundreds of images, get pixel-perfect results in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="gradient-purple-fuchsia text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Prova Gratis
            </Link>
            <Link
              href="/pricing"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg border-2 border-purple-200 inline-flex items-center justify-center gap-2"
            >
              Vedi Prezzi
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Nessuna carta richiesta</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>10 job gratis al mese</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>30 giorni soddisfatti o rimborsati</span>
            </div>
          </div>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* AFTER Image (Bottom Layer) */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white">
              <div className="w-48 h-48 gradient-purple-fuchsia rounded-lg opacity-90"></div>
            </div>

            {/* BEFORE Image (Top Layer with Clip) */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="w-48 h-48 bg-gray-400 rounded-lg transform rotate-12"></div>
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-semibold">
              BEFORE
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-semibold">
              AFTER
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Drag to compare
          </p>
        </div>
      </div>
    </section>
  )
}
