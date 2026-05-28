import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Theros By The Sea',
  description: 'Γεύσεις, ατμόσφαιρα και ήλιος δίπλα στη θάλασσα. Ανάβυσσος, Αττική.',
  keywords: ['restaurant', 'Anavissos', 'Αττική', 'θάλασσα', 'εστιατόριο'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  )
}
