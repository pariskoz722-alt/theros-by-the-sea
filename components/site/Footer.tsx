'use client'
import Link from 'next/link'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useLang()

  return (
    <footer className="site-footer" style={{ flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div className="footer-logo">Theros By The Sea</div>
        <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', letterSpacing: '.05em' }}>
          Λεωφ. Αθηνών Σουνίου 21, Ανάβυσσος · 2291 036 400
        </p>
        <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', letterSpacing: '.05em' }}>
          © {new Date().getFullYear()} Theros By The Sea
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <Link href="/privacy" style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', textDecoration: 'none' }}>
          {tr(copy.footer.privacy, lang)}
        </Link>
        <Link href="/terms" style={{ fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', textDecoration: 'none' }}>
          {tr(copy.footer.terms, lang)}
        </Link>
      </div>
    </footer>
  )
}
