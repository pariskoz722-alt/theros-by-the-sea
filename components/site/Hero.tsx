'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function Hero() {
  const mosaicRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const h = new Date().getHours()
    const cls = h >= 6 && h < 12 ? 'morning' : h >= 19 && h < 23 ? 'evening' : h >= 23 || h < 6 ? 'night' : 'day'
    document.body.classList.add(cls)

    setTimeout(() => mosaicRef.current?.classList.add('loaded'), 100)

    setTimeout(() => {
      document.querySelectorAll('#hero .reveal-line').forEach(el => el.classList.add('visible'))
    }, 200)

    const onScroll = () => {
      const s = window.scrollY
      if (parallaxRef.current && s < window.innerHeight * 1.5) {
        parallaxRef.current.style.transform = `translateY(${s * 0.3}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero">
      <div className="hero-parallax-layer" ref={parallaxRef}>
        <div className="hero-bg-mosaic" ref={mosaicRef}>
          <div className="hi1" /><div className="hi2" /><div className="hi3" />
          <div className="hi4" /><div className="hi5" />
        </div>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="reveal-line"><span className="hero-eyebrow">{tr(copy.hero.eyebrow, lang)}</span></div>
        <h1 className="hero-title">
          <div className="reveal-line"><span>Theros</span></div>
          <div className="reveal-line"><span><em>By The Sea</em></span></div>
        </h1>
        <div className="reveal-line"><span className="hero-sub">{tr(copy.hero.sub, lang)}</span></div>
        <div className="reveal-line"><span>
          <div className="hero-divider" />
          <div className="hero-ctas">
            <Link href="/booking" className="btn-primary">{tr(copy.hero.cta1, lang)}</Link>
            <a href="#gallery" className="btn-outline">{tr(copy.hero.cta2, lang)}</a>
          </div>
        </span></div>
      </div>
    </section>
  )
}
