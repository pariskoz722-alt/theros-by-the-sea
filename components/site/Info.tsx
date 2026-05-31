'use client'
import { useEffect, useRef } from 'react'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function Info() {
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
    <div className="sec" id="info" ref={ref}>
      <div id="info-inner">
        <div className="info-card fade-up">
          <div className="info-icon">⏰</div>
          <h3>{tr(copy.info.hours, lang)}</h3>
          <p>{tr(copy.info.days, lang)}</p>
          <p>08:00 – 00:00</p>
        </div>
        <div className="info-card fade-up" style={{ transitionDelay: '.15s' }}>
          <div className="info-icon">📍</div>
          <h3>{tr(copy.info.address, lang)}</h3>
          <a
            href="https://maps.google.com/?q=Theros+by+the+Sea+Anavissos"
            target="_blank"
            rel="noopener noreferrer"
          >
            Λεωφ. Αθηνών Σουνίου 21<br />Ανάβυσσος 190 13
          </a>
        </div>
        <div className="info-card fade-up" style={{ transitionDelay: '.3s' }}>
          <div className="info-icon">📞</div>
          <h3>{tr(copy.info.phone, lang)}</h3>
          <a href="tel:+302291036400">2291 036 400</a>
          <p style={{ marginTop: '.8rem', fontSize: '.8rem' }}>Delivery · Takeaway · Dine-in</p>
        </div>
      </div>

      {/* Google Maps */}
      <div className="info-map fade-up" style={{ transitionDelay: '.45s' }}>
        <iframe
          src="https://maps.google.com/maps?q=Theros+by+the+Sea+Anavissos+Attica+Greece&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="380"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Theros By The Sea — Χάρτης"
        />
        <a
          href="https://maps.google.com/?q=Theros+by+the+Sea+Anavissos"
          target="_blank"
          rel="noopener noreferrer"
          className="map-directions-btn"
        >
          {lang === 'el' ? '📍 Οδηγίες' : '📍 Get Directions'}
        </a>
      </div>
    </div>
  )
}
