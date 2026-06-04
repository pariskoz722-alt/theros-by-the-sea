'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/lib/types'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

const LOCAL_IMAGES = [
  { url: '/images/6O1A5835.webp', alt: 'Lounge χώρος', cls: 'g1' },
  { url: '/images/6O1A5861.webp', alt: 'Θέα θάλασσα', cls: 'g2' },
  { url: '/images/6O1A5866.webp', alt: 'Ατμόσφαιρα', cls: 'g3' },
  { url: '/images/6O1A5871.webp', alt: 'Παραθαλάσσιος χώρος', cls: 'g4' },
  { url: '/images/6O1A5874.webp', alt: 'Lounge sofa', cls: 'g5' },
]

export default function Gallery() {
  const [images, setImages] = useState<{ url: string; alt: string; cls: string }[]>(LOCAL_IMAGES)
  const { lang } = useLang()

  // ── Lightbox state ──────────────────────────────────────────────
  const [lbIdx,  setLbIdx]  = useState(0)
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIn,   setLbIn]   = useState(false)   // controls opacity transition
  const touchX = useRef<number | null>(null)

  const openLb = (i: number) => {
    setLbIdx(i)
    setLbOpen(true)
    // Two rAF ticks so the element mounts before we transition opacity in
    requestAnimationFrame(() => requestAnimationFrame(() => setLbIn(true)))
  }

  const closeLb = () => {
    setLbIn(false)
    setTimeout(() => setLbOpen(false), 300)
  }

  // Keyboard: Escape closes, arrows navigate
  useEffect(() => {
    if (!lbOpen) return
    const n = images.length
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLb()
      if (e.key === 'ArrowLeft')  setLbIdx(i => (i - 1 + n) % n)
      if (e.key === 'ArrowRight') setLbIdx(i => (i + 1) % n)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lbOpen, images.length])

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = lbOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lbOpen])

  // ── Gallery grid stagger animation ──────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: .06 }
    )
    document.querySelectorAll('.gallery-grid .anim-stagger').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [images])

  // ── Supabase ────────────────────────────────────────────────────
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('gallery_images')
      .select('*')
      .eq('visible', true)
      .order('display_order')
      .then(({ data }) => {
        if (data && data.length >= 5) {
          const gridClasses = ['g1', 'g2', 'g3', 'g4', 'g5']
          setImages(
            (data as GalleryImage[]).slice(0, 5).map((img, i) => ({
              url: img.url,
              alt: img.alt_el || '',
              cls: gridClasses[i],
            }))
          )
        }
      })
  }, [])

  const n = images.length

  return (
    <div id="gallery" className="sec">

      {/* ── Grid ── */}
      <div className="gallery-header fade-up">
        <p className="section-label">{tr(copy.gallery.label, lang)}</p>
        <h2 className="section-title">
          {tr(copy.gallery.title1, lang)}<em>{tr(copy.gallery.titleEm, lang)}</em>{tr(copy.gallery.title2, lang)}
        </h2>
      </div>

      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div
            className={`gitem ${img.cls} anim-stagger`}
            key={img.cls}
            onClick={() => openLb(idx)}
            style={{ cursor: 'zoom-in' }}
          >
            <Image
              className="gitem-img"
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              unoptimized={img.url.startsWith('http')}
            />
            <div className="gitem-overlay">
              <span className="gitem-num">0{idx + 1}</span>
              <span className="gitem-caption">{img.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lbOpen && (
        <div
          className={`lb-overlay${lbIn ? ' lb-in' : ''}`}
          onClick={closeLb}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close × */}
          <button
            className="lb-close"
            onClick={e => { e.stopPropagation(); closeLb() }}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Left arrow */}
          <button
            className="lb-arrow lb-prev"
            onClick={e => { e.stopPropagation(); setLbIdx(i => (i - 1 + n) % n) }}
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image — stops click propagation so bg click still closes */}
          <div
            className="lb-img-wrap"
            onClick={e => e.stopPropagation()}
            onTouchStart={e => { touchX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              if (touchX.current === null) return
              const delta = touchX.current - e.changedTouches[0].clientX
              if (Math.abs(delta) > 50) setLbIdx(i => delta > 0 ? (i + 1) % n : (i - 1 + n) % n)
              touchX.current = null
            }}
          >
            <Image
              key={images[lbIdx].url}   /* key forces re-mount on image change */
              src={images[lbIdx].url}
              alt={images[lbIdx].alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="100vw"
              unoptimized={images[lbIdx].url.startsWith('http')}
              priority
            />
          </div>

          {/* Right arrow */}
          <button
            className="lb-arrow lb-next"
            onClick={e => { e.stopPropagation(); setLbIdx(i => (i + 1) % n) }}
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter — 2 / 5 */}
          <div className="lb-counter" onClick={e => e.stopPropagation()}>
            {lbIdx + 1} / {n}
          </div>
        </div>
      )}
    </div>
  )
}
