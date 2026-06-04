'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function Info() {
  const ref        = useRef<HTMLDivElement>(null)
  const { lang }   = useLang()
  const [mapOn, setMapOn] = useState(false)

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
          <div className="info-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h3>{tr(copy.info.hours, lang)}</h3>
          <p>{tr(copy.info.days, lang)}</p>
          <p>08:00 – 00:00</p>
        </div>
        <div className="info-card fade-up" style={{ transitionDelay: '.15s' }}>
          <div className="info-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <h3>{tr(copy.info.address, lang)}</h3>
          <a href="https://maps.google.com/?q=Theros+by+the+Sea+Anavissos" target="_blank" rel="noopener noreferrer">
            Λεωφ. Αθηνών Σουνίου 21<br />Ανάβυσσος 190 13
          </a>
        </div>
        <div className="info-card fade-up" style={{ transitionDelay: '.3s' }}>
          <div className="info-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <h3>{tr(copy.info.phone, lang)}</h3>
          <a href="tel:+302291036400">2291 036 400</a>
          <p style={{ marginTop: '.8rem', fontSize: '.8rem' }}>Takeaway · Dine-in</p>
        </div>
      </div>

      {/* Google Maps — lazy loaded on user click (GDPR: no cookies until consent) */}
      <div className="info-map fade-up" style={{ transitionDelay: '.45s' }}>
        {mapOn ? (
          <>
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
              {lang === 'el' ? 'Οδηγίες' : 'Get Directions'}
            </a>
          </>
        ) : (
          <div className="map-placeholder">
            <div className="map-placeholder-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ color: 'var(--terracotta)', marginBottom: '1rem' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <p className="map-placeholder-address">
                Λεωφ. Αθηνών Σουνίου 21<br />Ανάβυσσος, Αττική
              </p>
              <p className="map-placeholder-notice">
                {lang === 'el'
                  ? 'Ο χάρτης φορτώνει περιεχόμενο από Google Maps.'
                  : 'The map loads content from Google Maps.'}
              </p>
              <button className="map-load-btn" onClick={() => setMapOn(true)}>
                {lang === 'el' ? 'Φόρτωση χάρτη' : 'Load map'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
