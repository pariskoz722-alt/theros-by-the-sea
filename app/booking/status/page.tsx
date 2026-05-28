'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { Reservation } from '@/lib/types'

const STATUS_LABELS = {
  pending: 'Σε αναμονή επιβεβαίωσης',
  confirmed: 'Επιβεβαιωμένη ✓',
  cancelled: 'Ακυρωμένη',
}
const STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#10b981',
  cancelled: '#ef4444',
}

export default function BookingStatusPage() {
  const [phone, setPhone] = useState('')
  const [reservations, setReservations] = useState<Reservation[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!phone.trim()) return
    setLoading(true)
    setSearched(false)

    const supabase = createClient()
    const { data } = await supabase
      .from('reservations')
      .select('*')
      .eq('phone', phone.trim())
      .order('date', { ascending: false })
      .order('time_slot', { ascending: false })

    setReservations(data as Reservation[] || [])
    setLoading(false)
    setSearched(true)
  }

  async function handleCancel(id: string) {
    if (!confirm('Είστε σίγουροι ότι θέλετε να ακυρώσετε την κράτηση;')) return
    setCancelling(id)
    const supabase = createClient()
    await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', id)
    setReservations(prev =>
      prev ? prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r) : prev
    )
    setCancelling(null)
  }

  const upcoming = reservations?.filter(r => r.date >= new Date().toISOString().split('T')[0]) ?? []
  const past = reservations?.filter(r => r.date < new Date().toISOString().split('T')[0]) ?? []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: '80px' }}>
      {/* Nav */}
      <nav className="site-nav scrolled">
        <Link href="/" className="nav-logo" style={{ color: 'var(--text-dark)', animation: 'none' }}>
          Theros By The Sea
        </Link>
        <Link href="/booking" style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-mid)', textDecoration: 'none' }}>
          ← Νέα κράτηση
        </Link>
      </nav>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p className="section-label">Κρατήσεις</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 300, color: 'var(--text-dark)', lineHeight: 1.15 }}>
            Βρείτε την <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>κράτησή σας</em>
          </h1>
          <p style={{ fontSize: '.9rem', color: 'var(--text-light)', marginTop: '.75rem', lineHeight: 1.6 }}>
            Εισάγετε το τηλέφωνο που χρησιμοποιήσατε κατά την κράτηση.
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '.75rem', marginBottom: '2.5rem' }}>
          <input
            type="tel"
            className="form-input"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="π.χ. 6912345678"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary" disabled={loading || !phone.trim()}>
            {loading ? '…' : 'Αναζήτηση'}
          </button>
        </form>

        {/* Results */}
        {searched && reservations !== null && (
          <>
            {reservations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderTop: '2px solid var(--sand-dark)' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '.75rem' }}>🔍</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '.5rem' }}>
                  Δεν βρέθηκαν κρατήσεις
                </p>
                <p style={{ fontSize: '.85rem', color: 'var(--text-light)' }}>
                  Βεβαιωθείτε ότι το τηλέφωνο είναι σωστό.
                </p>
                <Link href="/booking" className="btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                  Νέα κράτηση
                </Link>
              </div>
            ) : (
              <div>
                {/* Upcoming */}
                {upcoming.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '1rem' }}>
                      Επερχόμενες κρατήσεις
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                      {upcoming.map(r => (
                        <ReservationCard
                          key={r.id}
                          reservation={r}
                          onCancel={handleCancel}
                          cancelling={cancelling === r.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Past */}
                {past.length > 0 && (
                  <div>
                    <p style={{ fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '1rem' }}>
                      Παλαιότερες κρατήσεις
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                      {past.map(r => (
                        <ReservationCard
                          key={r.id}
                          reservation={r}
                          onCancel={handleCancel}
                          cancelling={cancelling === r.id}
                          isPast
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function ReservationCard({
  reservation: r,
  onCancel,
  cancelling,
  isPast = false,
}: {
  reservation: Reservation
  onCancel: (id: string) => void
  cancelling: boolean
  isPast?: boolean
}) {
  const STATUS_LABELS = {
    pending: 'Σε αναμονή επιβεβαίωσης',
    confirmed: 'Επιβεβαιωμένη ✓',
    cancelled: 'Ακυρωμένη',
  }
  const STATUS_COLORS = {
    pending: '#f59e0b',
    confirmed: '#10b981',
    cancelled: '#ef4444',
  }

  const canCancel = !isPast && r.status !== 'cancelled'

  // Format date to Greek
  const dateObj = new Date(r.date + 'T12:00:00')
  const dateStr = dateObj.toLocaleDateString('el-GR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{
      background: 'white',
      borderLeft: `3px solid ${STATUS_COLORS[r.status]}`,
      padding: '1.25rem 1.5rem',
      opacity: isPast ? .7 : 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          {/* Date & time */}
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 400, color: 'var(--text-dark)', marginBottom: '.35rem', textTransform: 'capitalize' }}>
            {dateStr}
          </div>
          <div style={{ fontSize: '.85rem', color: 'var(--text-mid)', marginBottom: '.5rem' }}>
            🕐 {r.time_slot} &nbsp;·&nbsp; 👥 {r.guests} {r.guests === 1 ? 'άτομο' : 'άτομα'}
          </div>
          {r.notes && (
            <div style={{ fontSize: '.78rem', color: 'var(--text-light)', fontStyle: 'italic', marginBottom: '.5rem' }}>
              &ldquo;{r.notes}&rdquo;
            </div>
          )}
          {/* Status badge */}
          <span style={{
            fontSize: '.68rem', letterSpacing: '.08em', textTransform: 'uppercase',
            color: STATUS_COLORS[r.status],
            background: STATUS_COLORS[r.status] + '18',
            padding: '.2rem .6rem',
          }}>
            {STATUS_LABELS[r.status]}
          </span>
        </div>

        {/* Cancel button */}
        {canCancel && (
          <button
            onClick={() => onCancel(r.id)}
            disabled={cancelling}
            style={{
              background: 'transparent', border: '1px solid #fca5a5',
              color: '#ef4444', fontSize: '.72rem', padding: '.5rem 1rem',
              cursor: 'pointer', letterSpacing: '.05em', flexShrink: 0,
              opacity: cancelling ? .5 : 1,
            }}
          >
            {cancelling ? '…' : 'Ακύρωση'}
          </button>
        )}
      </div>
    </div>
  )
}
