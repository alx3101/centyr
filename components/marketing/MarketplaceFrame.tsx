'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from '@/contexts/LanguageContext'
import { buildDemoFrames } from './StoreLogos'

const CYCLE_MS = 2400
const CANVAS_FIT_PCT = 86

export default function MarketplaceFrame() {
  const t = useTranslations()
  const frames = buildDemoFrames(t.marketing.hero.yourStoreLabel)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [frames.length])

  const store = frames[index]
  const ratio = store.width / store.height
  const canvasHeightPct = CANVAS_FIT_PCT
  const canvasWidthPct = canvasHeightPct * ratio
  const topPct = (100 - canvasHeightPct) / 2
  const leftPct = (100 - canvasWidthPct) / 2

  return (
    <div className="frame-demo-wrap">
      <div
        className="frame-demo-canvas"
        style={{
          top: `${topPct}%`,
          bottom: `${topPct}%`,
          left: `${leftPct}%`,
          right: `${leftPct}%`,
          padding: `${store.marginPct}%`,
        }}
      >
        <img src="/after.webp" alt="Prodotto" className="frame-demo-img" />
      </div>

      <div className="frame-demo-chip-logo">
        <store.Logo size={16} className="frame-demo-chip-logo-icon" />
        <span style={{ color: store.brandColor }}>{store.name}</span>
      </div>

      <div className="frame-demo-chip-dims">
        <div className="frame-demo-chip-dims-dot" />
        <div>
          <div className="v3-result-chip-text">{store.name}</div>
          <div className="v3-result-chip-sub">
            {store.width} × {store.height}px
          </div>
        </div>
      </div>
    </div>
  )
}
