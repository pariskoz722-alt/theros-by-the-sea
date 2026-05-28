'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/lib/types'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

const LOCAL_IMAGES = [
  { url: '/images/6O1A5855.jpg', alt: 'Lounge χώρος', cls: 'g1' },
  { url: '/images/6O1A5871.jpg', alt: 'Θέα θάλασσα', cls: 'g2' },
  { url: '/images/6O1A5867.jpg', alt: 'Φυσικό ξύλο', cls: 'g3' },
  { url: '/images/6O1A5848.jpg', alt: 'Rattan καθίσματα', cls: 'g4' },
  { url: '/images/6O1A5874.jpg', alt: 'Lounge sofa', cls: 'g5' },
]

export default function Gallery() {
  const [images, setImages] = useState<{ url: string; alt: string; cls: string }[]>(LOCAL_IMAGES)
  const { lang } = useLang()

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

  return (
    <div id="gallery" className="sec">
      <div className="gallery-header fade-up">
        <p className="section-label">{tr(copy.gallery.label, lang)}</p>
        <h2 className="section-title">
          {tr(copy.gallery.title1, lang)}<em>{tr(copy.gallery.titleEm, lang)}</em>{tr(copy.gallery.title2, lang)}
        </h2>
      </div>
      <div className="gallery-grid">
        {images.map((img) => (
          <div className={`gitem ${img.cls}`} key={img.cls}>
            <img src={img.url} alt={img.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}
