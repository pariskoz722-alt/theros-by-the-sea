import { LanguageProvider } from '@/components/site/LanguageContext'
import Nav from '@/components/site/Nav'
import Hero from '@/components/site/Hero'
import About from '@/components/site/About'
import Quote from '@/components/site/Quote'
import Reviews from '@/components/site/Reviews'
import Gallery from '@/components/site/Gallery'
import Info from '@/components/site/Info'
import Cta from '@/components/site/Cta'
import Footer from '@/components/site/Footer'

export default function Home() {
  return (
    <LanguageProvider>
      <Nav />
      <Hero />
      <About />
      <Quote />
      <Reviews />
      <Gallery />
      <Info />
      <Cta />
      <Footer />
    </LanguageProvider>
  )
}
