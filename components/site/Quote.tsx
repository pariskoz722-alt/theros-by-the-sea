'use client'
import { useEffect, useRef } from 'react'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

export default function Quote() {
  const ref = useRef<HTMLQuoteElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: .2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div id="quote-section">
      <div className="quote-line" />
      <blockquote className="editorial-quote fade-up" ref={ref}>
        <em>&#8220;{tr(copy.quote.text, lang)}&#8221;</em>
      </blockquote>
      <div className="quote-line" />
    </div>
  )
}
