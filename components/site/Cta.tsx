'use client'
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
        <a href="tel:+302291036400" className="btn-primary">
          2291 036 400
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
        <a
          href="https://www.tiktok.com/@theros_by_the_sea"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ig"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.16 8.16 0 0 0 4.77 1.52V7.02a4.85 4.85 0 0 1-1-.33z"/>
          </svg>
          TikTok
        </a>
      </div>
    </div>
  )
}
