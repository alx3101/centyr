'use client'

import { useState, useEffect } from 'react'
import { Activity, Users, Image as ImageIcon, Zap } from 'lucide-react'

export default function LiveStats() {
  const [stats, setStats] = useState({
    imagesProcessed: 5247832,
    activeUsers: 847,
    avgProcessingTime: 2.3,
  })

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        imagesProcessed: prev.imagesProcessed + Math.floor(Math.random() * 5) + 1,
        activeUsers: Math.max(500, prev.activeUsers + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10)),
        avgProcessingTime: Math.max(1.5, Math.min(3.5, prev.avgProcessingTime + (Math.random() - 0.5) * 0.1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <section className="py-12 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-fuchsia-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
            Stats in tempo reale
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Images Processed */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-7 h-7 text-purple-400" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
              {formatNumber(stats.imagesProcessed)}
            </div>
            <div className="text-purple-300 font-medium">Immagini elaborate</div>
            <div className="text-green-400 text-sm mt-1 flex items-center justify-center gap-1">
              <Activity className="w-3 h-3" />
              +{Math.floor(Math.random() * 50) + 10}/min
            </div>
          </div>

          {/* Active Users */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-fuchsia-500/20 mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-fuchsia-400" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
              {stats.activeUsers}
            </div>
            <div className="text-fuchsia-300 font-medium">Utenti attivi ora</div>
            <div className="text-fuchsia-400 text-sm mt-1 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse"></span>
              Online adesso
            </div>
          </div>

          {/* Avg Processing Time */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/20 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-amber-400" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
              {stats.avgProcessingTime.toFixed(1)}s
            </div>
            <div className="text-amber-300 font-medium">Tempo medio</div>
            <div className="text-amber-400 text-sm mt-1 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" />
              Ultra veloce
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm">
            Join thousands of e-commerce stores already using Centyr
          </p>
        </div>
      </div>
    </section>
  )
}
