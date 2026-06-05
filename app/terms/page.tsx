import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Όροι Χρήσης | Theros By The Sea',
  description: 'Όροι χρήσης του ιστοτόπου Theros By The Sea.',
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: '80px' }}>
      <nav className="site-nav scrolled" style={{ padding: 'clamp(.85rem,3vw,1.25rem) clamp(1rem,4vw,3rem)' }}>
        <Link href="/" className="nav-logo" style={{ color: 'var(--text-dark)', animation: 'none' }}>
          Theros By The Sea
        </Link>
        <Link href="/" style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-mid)', textDecoration: 'none', flexShrink: 0 }}>
          ← Αρχική
        </Link>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(2rem,5vw,3rem) clamp(1rem,4vw,1.5rem) 5rem' }}>
        <p style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '.8rem' }}>
          Νομικές Πληροφορίες
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '.5rem' }}>
          Όροι Χρήσης
        </h1>
        <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
          Τελευταία ενημέρωση: Ιούνιος 2025
        </p>

        <div style={{ fontSize: '.92rem', lineHeight: 1.85, color: 'var(--text-mid)' }}>

          <Section title="1. Αποδοχή Όρων">
            <p>
              Χρησιμοποιώντας τον ιστότοπο <strong>Theros By The Sea</strong> (therosbythesea.gr),
              αποδέχεστε τους παρόντες Όρους Χρήσης. Αν δεν συμφωνείτε, παρακαλούμε μην
              χρησιμοποιείτε τον ιστότοπο.
            </p>
          </Section>

          <Section title="2. Σκοπός Ιστοτόπου">
            <p>
              Ο ιστότοπος παρέχει πληροφορίες για το εστιατόριο Theros By The Sea:
              ώρες λειτουργίας, τοποθεσία, φωτογραφίες και στοιχεία επικοινωνίας.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Για <strong>κρατήσεις τραπεζιού</strong> επικοινωνήστε τηλεφωνικά στο{' '}
              <a href="tel:+302291036400" style={{ color: 'var(--terracotta)' }}>2291 036 400</a>.
            </p>
          </Section>

          <Section title="3. Πνευματική Ιδιοκτησία">
            <p>
              Το σύνολο του περιεχομένου του ιστοτόπου (φωτογραφίες, κείμενα, σχεδιασμός)
              αποτελεί πνευματική ιδιοκτησία του Theros By The Sea και προστατεύεται από
              την ισχύουσα νομοθεσία. Απαγορεύεται η αναπαραγωγή χωρίς γραπτή άδεια.
            </p>
          </Section>

          <Section title="4. Περιορισμός Ευθύνης">
            <p>
              Το Theros By The Sea δεν φέρει ευθύνη για τεχνικά προβλήματα ή αδυναμία
              πρόσβασης στον ιστότοπο λόγω ανωτέρας βίας. Σε κάθε περίπτωση μπορείτε
              να επικοινωνήσετε μαζί μας τηλεφωνικά στο <strong>2291 036 400</strong>.
            </p>
          </Section>

          <Section title="5. Σύνδεσμοι Τρίτων">
            <p>
              Ο ιστότοπος περιέχει συνδέσμους προς τρίτες υπηρεσίες (Google Maps, Instagram).
              Δεν φέρουμε ευθύνη για το περιεχόμενο ή τις πρακτικές απορρήτου αυτών των υπηρεσιών.
            </p>
          </Section>

          <Section title="6. Εφαρμοστέο Δίκαιο">
            <p>
              Οι παρόντες Όροι διέπονται από το ελληνικό δίκαιο. Κάθε διαφορά υπάγεται στην
              αποκλειστική αρμοδιότητα των δικαστηρίων της Αθήνας.
            </p>
          </Section>

          <Section title="7. Αλλαγές Όρων">
            <p>
              Διατηρούμε το δικαίωμα να τροποποιούμε τους παρόντες όρους. Οι αλλαγές ισχύουν
              από τη δημοσίευσή τους στον ιστότοπο.
            </p>
          </Section>

          <Section title="8. Επικοινωνία">
            <div style={{ background: 'var(--sand)', padding: '1.25rem 1.5rem', borderLeft: '3px solid var(--terracotta)' }}>
              <strong>Theros By The Sea</strong><br />
              Λεωφ. Αθηνών Σουνίου 21, Ανάβυσσος 190 13<br />
              theros1818@gmail.com<br />
              2291 036 400
            </div>
          </Section>

        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--sand-dark)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontSize: '.75rem', color: 'var(--text-light)', textDecoration: 'none' }}>← Αρχική</Link>
          <Link href="/privacy" style={{ fontSize: '.75rem', color: 'var(--text-light)', textDecoration: 'none' }}>Πολιτική Απορρήτου</Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 400,
        color: 'var(--text-dark)', marginBottom: '1rem',
        paddingBottom: '.5rem', borderBottom: '1px solid var(--sand-dark)',
      }}>
        {title}
      </h2>
      {children}
    </div>
  )
}
