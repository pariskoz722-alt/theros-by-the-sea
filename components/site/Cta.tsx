'use client'
import Link from 'next/link'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function Cta() {
  const { lang } = useLang()

  return (
    <div id="cta">
      <p className="section-label">{tr(copy.cta.label, lang)}</p>
      <h2 className="section-title">
        {tr(copy.cta.title1, lang)}<br /><em>{tr(copy.cta.titleEm, lang)}</em>
      </h2>
      <div className="cta-buttons">
        <Link href="/booking" className="btn-primary">{tr(copy.cta.btn, lang)}</Link>
        <a href="tel:+302291036400" className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(242,235,217,.4)' }}>
          📞 2291 036 400
        </a>
        <a
          href="https://www.instagram.com/theros_by_the_sea/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ig"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          Instagram
        </a>
      </div>
    </div>
  )
}
