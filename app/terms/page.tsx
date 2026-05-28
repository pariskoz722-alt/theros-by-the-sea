import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Όροι Χρήσης | Theros By The Sea',
  description: 'Όροι χρήσης της υπηρεσίας online κράτησης του Theros By The Sea.',
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: '80px' }}>
      <nav className="site-nav scrolled">
        <Link href="/" className="nav-logo" style={{ color: 'var(--text-dark)', animation: 'none' }}>
          Theros By The Sea
        </Link>
        <Link href="/" style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-mid)', textDecoration: 'none' }}>
          ← Αρχική
        </Link>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <p style={{ fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '.8rem' }}>
          Νομικές Πληροφορίες
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '.5rem' }}>
          Όροι Χρήσης
        </h1>
        <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
          Τελευταία ενημέρωση: Μάιος 2025
        </p>

        <div style={{ fontSize: '.92rem', lineHeight: 1.85, color: 'var(--text-mid)' }}>

          <Section title="1. Αποδοχή Όρων">
            <p>
              Χρησιμοποιώντας την υπηρεσία online κράτησης του <strong>Theros By The Sea</strong>,
              αποδέχεστε τους παρόντες Όρους Χρήσης. Αν δεν συμφωνείτε, παρακαλούμε μην
              χρησιμοποιείτε την υπηρεσία και επικοινωνήστε μαζί μας τηλεφωνικά.
            </p>
          </Section>

          <Section title="2. Υπηρεσία Online Κράτησης">
            <p>Η υπηρεσία online κράτησης:</p>
            <ul style={{ marginTop: '.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <li>Επιτρέπει την προκαταρκτική δέσμευση τραπεζιού</li>
              <li>Οι κρατήσεις <strong>επιβεβαιώνονται τηλεφωνικά</strong> από το προσωπικό μας</li>
              <li>Η κράτηση δεν είναι οριστική έως ότου λάβετε επιβεβαίωση</li>
              <li>Διατηρούμε το δικαίωμα να αρνηθούμε ή να τροποποιήσουμε κράτηση σε εξαιρετικές περιπτώσεις</li>
            </ul>
          </Section>

          <Section title="3. Πολιτική Ακυρώσεων">
            <div style={{ background: 'var(--sand)', padding: '1.25rem 1.5rem', borderLeft: '3px solid var(--terracotta)', marginBottom: '1rem' }}>
              <strong>Παρακαλούμε ακυρώστε έγκαιρα αν δεν μπορείτε να παρευρεθείτε.</strong>
            </div>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <li>Ακύρωση <strong>έως 2 ώρες πριν</strong>: χωρίς χρέωση</li>
              <li>Ακύρωση <strong>λιγότερο από 2 ώρες</strong> ή μη εμφάνιση (no-show): το τραπέζι αποδεσμεύεται χωρίς ειδοποίηση</li>
              <li>Σε περίπτωση no-show επανειλημμένα, διατηρούμε το δικαίωμα να απορρίψουμε μελλοντικές κρατήσεις</li>
            </ul>
          </Section>

          <Section title="4. Ευθύνες Χρήστη">
            <p>Κατά τη χρήση της υπηρεσίας δεσμεύεστε να:</p>
            <ul style={{ marginTop: '.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              <li>Παρέχετε ακριβή και αληθή στοιχεία</li>
              <li>Χρησιμοποιείτε έγκυρο αριθμό τηλεφώνου</li>
              <li>Ειδοποιείτε έγκαιρα σε περίπτωση αδυναμίας προσέλευσης</li>
              <li>Μην κάνετε κρατήσεις με σκοπό την παρεμπόδιση άλλων πελατών</li>
            </ul>
          </Section>

          <Section title="5. Περιορισμός Ευθύνης">
            <p>
              Το Theros By The Sea δεν φέρει ευθύνη για τεχνικά προβλήματα, αδυναμία πρόσβασης
              στην υπηρεσία ή απώλεια δεδομένων λόγω ανωτέρας βίας. Σε κάθε περίπτωση,
              μπορείτε να επικοινωνήσετε μαζί μας τηλεφωνικά στο <strong>2291 036 400</strong>.
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
              από τη δημοσίευσή τους στον ιστότοπο. Συνιστούμε την περιοδική ανασκόπηση.
            </p>
          </Section>

          <Section title="8. Επικοινωνία">
            <div style={{ background: 'var(--sand)', padding: '1.25rem 1.5rem', borderLeft: '3px solid var(--terracotta)' }}>
              <strong>Theros By The Sea</strong><br />
              Λεωφ. Αθηνών Σουνίου 21, Ανάβυσσος 190 13<br />
              📧 info@therosbythesea.gr<br />
              📞 2291 036 400
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
