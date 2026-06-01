'use client'
import { useEffect, useState } from 'react'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const LangToggle = ({ dark }: { dark?: boolean }) => (
    <div className="lang-toggle" style={{ marginTop: 0, border: dark ? '1px solid rgba(44,31,20,.15)' : '1px solid rgba(255,255,255,.25)', padding: '.25rem .6rem' }}>
      <button className={`lang-btn${lang === 'el' ? ' active' : ''}`} style={{ color: lang === 'el' ? 'var(--terracotta)' : dark ? 'var(--text-light)' : 'rgba(255,255,255,.5)' }} onClick={() => setLang('el')}>ΕΛ</button>
      <span className="lang-divider" style={{ color: dark ? 'rgba(44,31,20,.25)' : 'rgba(255,255,255,.3)' }}>|</span>
      <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} style={{ color: lang === 'en' ? 'var(--terracotta)' : dark ? 'var(--text-light)' : 'rgba(255,255,255,.5)' }} onClick={() => setLang('en')}>EN</button>
    </div>
  )

  return (
    <>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="#about-inner" onClick={closeMenu}>About</a>
        <a href="#reviews" onClick={closeMenu}>Reviews</a>
        <a href="#gallery" onClick={closeMenu}>Gallery</a>
        <a href="#info" onClick={closeMenu}>Visit</a>
        <a href="tel:+302291036400" onClick={closeMenu}>2291 036 400</a>
        <div style={{ marginTop: '.5rem' }}><LangToggle dark /></div>
      </div>

      <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">Theros By The Sea</div>
        <ul className="nav-links">
          <li><a href="#about-inner">About</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#info">Visit</a></li>
          <li>
            <a href="https://www.instagram.com/theros_by_the_sea/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="tel:+302291036400" style={{ color: 'var(--terracotta)', fontWeight: 500 }}>
              2291 036 400
            </a>
          </li>
          <li><LangToggle /></li>
        </ul>
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>
    </>
  )
}
