'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: .1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="sec" id="about" ref={ref}>
      <div id="about-inner">
        <div className="about-images fade-up">
          {/* Wrapper divs required for Next.js Image fill */}
          <div className="about-img-main">
            <Image
              src="/images/6O1A5838.webp"
              alt="Χώρος Theros By The Sea"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 70vw, 36vw"
              priority
            />
          </div>
          <div className="about-img-accent">
            <Image
              src="/images/6O1A5849.webp"
              alt="Lounge χώρος"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 50vw, 29vw"
            />
          </div>
        </div>
        <div className="about-text fade-up" style={{ transitionDelay: '.15s' }}>
          <h2 className="section-title">
            {tr(copy.about.title1, lang)}<br />
            {tr(copy.about.title2, lang)}<em>{tr(copy.about.titleEm, lang)}</em>{tr(copy.about.title3, lang)}
          </h2>
          <p>{tr(copy.about.p1, lang)}</p>
          <p>{tr(copy.about.p2, lang)}</p>
          <div className="about-stats">
            <div><div className="stat-num">4.3</div><div className="stat-label">{tr(copy.about.stat1, lang)}</div></div>
            <div><div className="stat-num">184</div><div className="stat-label">{tr(copy.about.stat2, lang)}</div></div>
            <div><div className="stat-num">€10–35</div><div className="stat-label">{tr(copy.about.stat3, lang)}</div></div>
          </div>
          <a href="tel:+302291036400" className="btn-primary">{tr(copy.about.cta, lang)}</a>
        </div>
      </div>
    </div>
  )
}
