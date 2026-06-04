import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Theros By The Sea | Εστιατόριο Ανάβυσσος',
  description: 'Γεύσεις, ατμόσφαιρα και ήλιος δίπλα στη θάλασσα. Ανάβυσσος, Αττική. Δευτέρα–Κυριακή 08:00–00:00.',
  openGraph: {
    title: 'Theros By The Sea',
    description: 'Γεύσεις, ατμόσφαιρα και ήλιος δίπλα στη θάλασσα. Ανάβυσσος, Αττική.',
    url: 'https://theros-sea.vercel.app',
    siteName: 'Theros By The Sea',
    images: [{
      url: 'https://theros-sea.vercel.app/images/6O1A5835.webp',
      width: 1200,
      height: 630,
      alt: 'Theros By The Sea - Ανάβυσσος',
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theros By The Sea',
    description: 'Γεύσεις, ατμόσφαιρα και ήλιος δίπλα στη θάλασσα.',
    images: ['https://theros-sea.vercel.app/images/6O1A5835.webp'],
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
