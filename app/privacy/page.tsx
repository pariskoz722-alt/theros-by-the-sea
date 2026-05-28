import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Πολιτική Απορρήτου | Theros By The Sea',
  description: 'Πολιτική Απορρήτου και προστασία προσωπικών δεδομένων του Theros By The Sea.',
}

export default function PrivacyPage() {
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
          Πολιτική Απορρήτου
        </h1>
        <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
          Τελευταία ενημέρωση: Μάιος 2025
        </p>

        <div style={{ fontSize: '.92rem', lineHeight: 1.85, color: 'var(--text-mid)' }}>

          <Section title="1. Υπεύθυνος Επεξεργασίας">
            <p>
              Η επιχείρηση <strong>Theros By The Sea</strong>, με έδρα στη Λεωφόρο Αθηνών Σουνίου 21,
              Ανάβυσσος 190 13, Αττική, είναι ο Υπεύθυνος Επεξεργασίας των προσωπικών σας δεδομένων
              σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (ΓΚΠΔ / GDPR - ΕΕ 2016/679).
            </p>
            <p style={{ marginTop: '1rem' }}>
              📧 Επικοινωνία: <a href="mailto:info@therosbythesea.gr" style={{ color: 'var(--terracotta)' }}>info@therosbythesea.gr</a><br />
              📞 Τηλέφωνο: <a href="tel:+302291036400" style={{ color: 'var(--terracotta)' }}>2291 036 400</a>
            </p>
          </Section>

          <Section title="2. Ποια Δεδομένα Συλλέγουμε">
            <p>Κατά τη διαδικασία online κράτησης συλλέγουμε:</p>
            <ul style={{ marginTop: '.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              <li><strong>Ονοματεπώνυμο</strong> — για την αναγνώριση της κράτησης</li>
              <li><strong>Αριθμός τηλεφώνου</strong> — για επιβεβαίωση και επικοινωνία</li>
              <li><strong>Διεύθυνση email</strong> — προαιρετικά, για αποστολή επιβεβαίωσης</li>
              <li><strong>Ημερομηνία, ώρα και αριθμός ατόμων</strong> — για τη διαχείριση της κράτησης</li>
              <li><strong>Σημειώσεις</strong> — προαιρετικά, για ειδικές απαιτήσεις (π.χ. αλλεργίες)</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              <strong>Δεν συλλέγουμε</strong> οικονομικά στοιχεία, αριθμούς καρτών, ή ευαίσθητα προσωπικά δεδομένα.
            </p>
          </Section>

          <Section title="3. Σκοπός και Νομική Βάση Επεξεργασίας">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem', marginTop: '.5rem' }}>
              <thead>
                <tr style={{ background: 'var(--sand)', textAlign: 'left' }}>
                  <th style={{ padding: '.6rem 1rem', fontWeight: 500 }}>Σκοπός</th>
                  <th style={{ padding: '.6rem 1rem', fontWeight: 500 }}>Νομική Βάση</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Διαχείριση και επιβεβαίωση κράτησης', 'Εκτέλεση σύμβασης (άρθρο 6§1β ΓΚΠΔ)'],
                  ['Επικοινωνία για την κράτησή σας', 'Εκτέλεση σύμβασης'],
                  ['Βελτίωση υπηρεσιών', 'Έννομο συμφέρον (άρθρο 6§1στ ΓΚΠΔ)'],
                  ['Συμμόρφωση με φορολογικές υποχρεώσεις', 'Νομική υποχρέωση (άρθρο 6§1γ ΓΚΠΔ)'],
                ].map(([scope, basis], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--sand-dark)' }}>
                    <td style={{ padding: '.6rem 1rem' }}>{scope}</td>
                    <td style={{ padding: '.6rem 1rem', color: 'var(--text-light)', fontSize: '.82rem' }}>{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="4. Χρόνος Διατήρησης Δεδομένων">
            <p>
              Τα δεδομένα κρατήσεων διατηρούνται για <strong>2 χρόνια</strong> από την ημερομηνία
              της κράτησης για λόγους εξυπηρέτησης και φορολογικής συμμόρφωσης.
              Μετά τη λήξη αυτής της περιόδου διαγράφονται αυτόματα.
            </p>
          </Section>

          <Section title="5. Κοινοποίηση Δεδομένων σε Τρίτους">
            <p>
              Τα δεδομένα σας <strong>δεν πωλούνται</strong> και <strong>δεν κοινοποιούνται</strong> σε τρίτα
              μέρη για εμπορικούς σκοπούς. Χρησιμοποιούμε τους παρακάτω αξιόπιστους παρόχους:
            </p>
            <ul style={{ marginTop: '.75rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              <li>
                <strong>Supabase Inc.</strong> (υποδομή βάσης δεδομένων) — servers εντός ΕΕ,
                συμβατοί με GDPR. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta)' }}>Privacy Policy</a>
              </li>
              <li>
                <strong>Vercel Inc.</strong> (φιλοξενία ιστοσελίδας) — συμβατοί με GDPR.
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta)', marginLeft: '.4rem' }}>Privacy Policy</a>
              </li>
            </ul>
          </Section>

          <Section title="6. Τα Δικαιώματά Σας (GDPR)">
            <p>Έχετε τα παρακάτω δικαιώματα σχετικά με τα προσωπικά σας δεδομένα:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '.75rem', marginTop: '1rem' }}>
              {[
                ['📋 Πρόσβαση', 'Να μάθετε ποια δεδομένα σας έχουμε'],
                ['✏️ Διόρθωση', 'Να διορθώσετε ανακριβή δεδομένα'],
                ['🗑️ Διαγραφή', 'Να ζητήσετε διαγραφή («δικαίωμα λήθης»)'],
                ['⏸️ Περιορισμός', 'Να περιορίσετε την επεξεργασία'],
                ['📤 Φορητότητα', 'Να λάβετε τα δεδομένα σε αναγνώσιμη μορφή'],
                ['❌ Εναντίωση', 'Να αντιταχθείτε στην επεξεργασία'],
              ].map(([right, desc]) => (
                <div key={right} style={{ background: 'white', padding: '.75rem 1rem', border: '1px solid var(--sand-dark)' }}>
                  <div style={{ fontWeight: 500, marginBottom: '.25rem', fontSize: '.85rem' }}>{right}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-light)' }}>{desc}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1rem' }}>
              Για άσκηση των δικαιωμάτων σας επικοινωνήστε μαζί μας στο{' '}
              <a href="mailto:info@therosbythesea.gr" style={{ color: 'var(--terracotta)' }}>info@therosbythesea.gr</a>.
              Απαντάμε εντός <strong>30 ημερών</strong>.
            </p>
            <p style={{ marginTop: '.75rem' }}>
              Έχετε επίσης δικαίωμα καταγγελίας στην{' '}
              <a href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta)' }}>
                Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)
              </a>.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Αυτός ο ιστότοπος χρησιμοποιεί <strong>αποκλειστικά απαραίτητα cookies</strong> για
              τη λειτουργία του admin panel (σύνδεση διαχειριστή). <strong>Δεν χρησιμοποιούμε</strong>{' '}
              cookies παρακολούθησης, analytics ή διαφημιστικά cookies.
            </p>
            <p style={{ marginTop: '.75rem' }}>
              Τα απαραίτητα cookies δεν απαιτούν τη συγκατάθεσή σας σύμφωνα με την Οδηγία
              ePrivacy και τον ΓΚΠΔ.
            </p>
          </Section>

          <Section title="8. Ασφάλεια Δεδομένων">
            <p>
              Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των δεδομένων σας:
              κρυπτογράφηση HTTPS, Row Level Security (RLS) στη βάση δεδομένων, πρόσβαση μόνο από
              εξουσιοδοτημένα άτομα.
            </p>
          </Section>

          <Section title="9. Επικοινωνία">
            <p>
              Για οποιοδήποτε ερώτημα σχετικά με την επεξεργασία των προσωπικών σας δεδομένων:
            </p>
            <div style={{ background: 'var(--sand)', padding: '1.25rem 1.5rem', marginTop: '1rem', borderLeft: '3px solid var(--terracotta)' }}>
              <strong>Theros By The Sea</strong><br />
              Λεωφ. Αθηνών Σουνίου 21, Ανάβυσσος 190 13<br />
              📧 info@therosbythesea.gr<br />
              📞 2291 036 400
            </div>
          </Section>

        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--sand-dark)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontSize: '.75rem', color: 'var(--text-light)', textDecoration: 'none' }}>← Αρχική</Link>
          <Link href="/terms" style={{ fontSize: '.75rem', color: 'var(--text-light)', textDecoration: 'none' }}>Όροι Χρήσης</Link>
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
