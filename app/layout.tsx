import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://theros-sea.vercel.app'
const OG_IMAGE = `${SITE_URL}/images/6O1A5835.webp`

export const metadata: Metadata = {
  // metadataBase resolves relative image paths to the full domain
  metadataBase: new URL(SITE_URL),

  title: 'Theros By The Sea | Εστιατόριο Ανάβυσσος',
  description: 'Γεύσεις, ατμόσφαιρα και ήλιος δίπλα στη θάλασσα. Ανάβυσσος, Αττική.',
  keywords: [
    'restaurant', 'Anavissos', 'Αττική', 'θάλασσα',
    'εστιατόριο', 'Ανάβυσσος', 'Theros By The Sea',
    'beach restaurant', 'Αττική εστιατόριο',
  ],

  // Canonical URL — tells Google this is the authoritative URL
  alternates: {
    canonical: SITE_URL,
  },

  // Open Graph — WhatsApp, Facebook, Instagram, LinkedIn previews
  openGraph: {
    title: 'Theros By The Sea',
    description: 'Γεύσεις, ατμόσφαιρα και ήλιος δίπλα στη θάλασσα.',
    url: SITE_URL,
    siteName: 'Theros By The Sea',
    type: 'website', // 'restaurant' is not a valid OG type — website is correct
    locale: 'el_GR',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Theros By The Sea — Εστιατόριο στην Ανάβυσσο',
        type: 'image/webp',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'Theros By The Sea',
    description: 'Γεύσεις, ατμόσφαιρα και ήλιος δίπλα στη θάλασσα.',
    images: [OG_IMAGE],
  },

  // Favicon — uses one of our restaurant photos
  icons: {
    icon: '/images/6O1A5835.webp',
    apple: '/images/6O1A5835.webp',
    shortcut: '/images/6O1A5835.webp',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
      <body>{children}</body>
    </html>
  )
}
