import dynamic from 'next/dynamic'
import { LanguageProvider } from '@/components/site/LanguageContext'
import Nav from '@/components/site/Nav'
import Hero from '@/components/site/Hero'
import About from '@/components/site/About'
import Gallery from '@/components/site/Gallery'
import Info from '@/components/site/Info'
import Cta from '@/components/site/Cta'
import Footer from '@/components/site/Footer'

// Reviews deferred so it doesn't block the initial render —
// it loads from Supabase anyway, so SSR adds no value here
const Reviews = dynamic(() => import('@/components/site/Reviews'), {
  loading: () => <div className="reviews-skeleton" />,
})

export default function Home() {
  return (
    <LanguageProvider>
      <Nav />
      <Hero />
      <About />
      <Reviews />
      <Gallery />
      <Info />
      <Cta />
      <Footer />
    </LanguageProvider>
  )
}
