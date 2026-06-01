'use client'
import Link from 'next/link'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useLang()

  return (
    <footer className="site-footer">
      <div className="footer-grid">

        {/* Col 1 — Logo + tagline */}
        <div className="footer-col">
          <div className="footer-logo">Theros By The Sea</div>
          <p className="footer-tagline">{tr(copy.footer.tagline, lang)}</p>
          <p className="footer-copy">© {new Date().getFullYear()} Theros By The Sea</p>
        </div>

        {/* Col 2 — Hours + address + phone */}
        <div className="footer-col">
          <div className="footer-col-label">{tr(copy.info.hours, lang)}</div>
          <p className="footer-detail">{tr(copy.info.days, lang)}<br />08:00 – 00:00</p>
          <div className="footer-col-label">{tr(copy.info.address, lang)}</div>
          <p className="footer-detail">Λεωφ. Αθηνών Σουνίου 21<br />Ανάβυσσος 190 13</p>
          <div className="footer-col-label">{tr(copy.info.phone, lang)}</div>
          <a href="tel:+302291036400" className="footer-phone">2291 036 400</a>
        </div>

        {/* Col 3 — Instagram + links */}
        <div className="footer-col footer-col-right">
          <div className="footer-col-label">{tr(copy.footer.follow, lang)}</div>
          <a
            href="https://www.instagram.com/theros_by_the_sea/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ig"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            @theros_by_the_sea
          </a>
          <div className="footer-legal">
            <Link href="/privacy" className="footer-legal-link">{tr(copy.footer.privacy, lang)}</Link>
            <Link href="/terms" className="footer-legal-link">{tr(copy.footer.terms, lang)}</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
