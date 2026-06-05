import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

// 156 characters — sweet spot for Google snippets (between 150-160)
const META_DESC = 'Theros By The Sea — beach restaurant στην Ανάβυσσο, Αττική. Μεσογειακή κουζίνα, cocktails & καφές δίπλα στη θάλασσα. Δευτ–Κυρ 08:00–00:00.'

// Restaurant JSON-LD structured data — Google reads this for rich results
const RESTAURANT_LD = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': 'https://therosbythesea.com/#restaurant',
  name: 'Theros By The Sea',
  description: META_DESC,
  url: 'https://therosbythesea.com',
  image: 'https://therosbythesea.com/images/6O1A5835.webp',
  telephone: '+302291036400',
  servesCuisine: ['Mediterranean', 'Greek', 'Pizza'],
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Λεωφ. Αθηνών Σουνίου 21',
    addressLocality: 'Ανάβυσσος',
    postalCode: '190 13',
    addressRegion: 'Αττική',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.7244,
    longitude: 23.9394,
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '00:00',
  }],
  acceptsReservations: 'True',
  hasMenu: 'https://therosbythesea.com',
  sameAs: [
    'https://www.instagram.com/theros_by_the_sea/',
    'https://www.tiktok.com/@theros_by_the_sea',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.3',
    reviewCount: '184',
    bestRating: '5',
    worstRating: '1',
  },
}

export const metadata: Metadata = {
  title: 'Theros By The Sea | Εστιατόριο & Beach Bar Ανάβυσσος',
  description: META_DESC,
  keywords: [
    // Greek
    'εστιατόριο Ανάβυσσος',
    'beach restaurant Αττική',
    'Theros By The Sea',
    'Theros Ανάβυσσος',
    'εστιατόριο παραλία Αττική',
    'beach bar Ανάβυσσος',
    'καφέ Ανάβυσσος',
    'Αθηναϊκή Ριβιέρα εστιατόριο',
    // English
    'restaurant Anavissos',
    'beach restaurant Athens Riviera',
    'Anavissos beach bar',
    'Mediterranean restaurant Athens',
    'best restaurant Anavissos',
    'Theros by the Sea Anavissos',
  ],
  authors: [{ name: 'Theros By The Sea' }],
  creator: 'Theros By The Sea',
  publisher: 'Theros By The Sea',
  category: 'restaurant',
  openGraph: {
    title: 'Theros By The Sea | Εστιατόριο & Beach Bar Ανάβυσσος',
    description: 'Μεσογειακή κουζίνα, cocktails & καφές δίπλα στη θάλασσα. Ανάβυσσος, Αττική.',
    url: 'https://therosbythesea.com',
    siteName: 'Theros By The Sea',
    locale: 'el_GR',
    images: [{
      url: 'https://therosbythesea.com/images/6O1A5835.webp',
      width: 1200,
      height: 630,
      alt: 'Theros By The Sea — Beach Restaurant στην Ανάβυσσο, Αττική',
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theros By The Sea | Beach Restaurant Ανάβυσσος',
    description: 'Μεσογειακή κουζίνα δίπλα στη θάλασσα. Ανάβυσσος, Αττική.',
    images: ['https://therosbythesea.com/images/6O1A5835.webp'],
  },
  alternates: {
    canonical: 'https://therosbythesea.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: 'WuFDBKiqDOwtw_6G4cPGiSJ5VGqXEG8G4jbFAHAaGRc',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <head>
        {/* Preconnect to Google Fonts before any other requests */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&family=Playfair+Display:ital@1&display=swap"
          rel="stylesheet"
        />
        {/* Preload hero — largest above-the-fold image */}
        <link rel="preload" as="image" href="/images/6O1A5835.webp" />
      </head>
      <body>
        {children}
        {/* Restaurant JSON-LD structured data for Google rich results */}
        <Script
          id="restaurant-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(RESTAURANT_LD) }}
        />
      </body>
    </html>
  )
}
