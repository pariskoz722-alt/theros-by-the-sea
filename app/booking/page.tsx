'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { TimeSlotAvailability } from '@/lib/types'

const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','19:00','20:00','21:00','22:00']

type Step = 'date' | 'time' | 'details' | 'success'

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

export default function BookingPage() {
  const [step, setStep] = useState<Step>('date')
  const [date, setDate] = useState(todayStr())
  const [timeSlot, setTimeSlot] = useState('')
  const [availability, setAvailability] = useState<TimeSlotAvailability[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', guests: '2', notes: '' })
  const [gdprConsent, setGdprConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchAvailability = useCallback(async (d: string) => {
    setLoadingSlots(true)
    try {
      const res = await fetch(`/api/availability?date=${d}`)
      const data = await res.json()
      setAvailability(data)
    } catch {
      setAvailability([])
    } finally {
      setLoadingSlots(false)
    }
  }, [])

  useEffect(() => {
    if (step === 'time' && date) {
      fetchAvailability(date)

      // Real-time: subscribe to reservation changes for this date
      const supabase = createClient()
      const channel = supabase
        .channel(`reservations:${date}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'reservations', filter: `date=eq.${date}` },
          () => fetchAvailability(date)
        )
        .subscribe()

      return () => { supabase.removeChannel(channel) }
    }
  }, [step, date, fetchAvailability])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.phone) { setError('Παρακαλώ συμπληρώστε όνομα και τηλέφωνο.'); return }
    if (!gdprConsent) { setError('Παρακαλώ αποδεχτείτε την Πολιτική Απορρήτου για να συνεχίσετε.'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, date, time_slot: timeSlot, guests: parseInt(form.guests) }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error || 'Κάτι πήγε στραβά. Δοκιμάστε ξανά.')
      } else {
        setStep('success')
      }
    } catch {
      setError('Σφάλμα σύνδεσης. Δοκιμάστε ξανά.')
    } finally {
      setSubmitting(false)
    }
  }

  const slotForSelected = availability.find(s => s.time_slot === timeSlot)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: '80px' }}>
      {/* Minimal nav */}
      <nav className="site-nav scrolled">
        <Link href="/" className="nav-logo" style={{ color: 'var(--text-dark)', animation: 'none' }}>
          Theros By The Sea
        </Link>
        <Link href="/" style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-mid)', textDecoration: 'none' }}>
          ← Επιστροφή
        </Link>
      </nav>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '3rem 1.5rem' }}>

        {step === 'success' ? (
          <div className="booking-success">
            <div className="check">✓</div>
            <h3>Η κράτησή σας καταχωρήθηκε!</h3>
            <p>
              <strong>{form.name}</strong>, λάβαμε την κράτησή σας για <strong>{form.guests} άτομα</strong>,
              στις <strong>{date}</strong> στις <strong>{timeSlot}</strong>.<br /><br />
              Θα επικοινωνήσουμε μαζί σας στο <strong>{form.phone}</strong> για επιβεβαίωση.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn-primary">Αρχική</Link>
              <Link href={`/booking/status?phone=${encodeURIComponent(form.phone)}`} className="btn-outline" style={{ color: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
                Δείτε την κράτησή σας
              </Link>
              <button className="btn-outline" style={{ color: 'var(--text-mid)', borderColor: 'var(--sand-dark)', fontSize: '.65rem' }}
                onClick={() => { setStep('date'); setTimeSlot(''); setForm({ name: '', phone: '', email: '', guests: '2', notes: '' }) }}>
                Νέα κράτηση
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress indicator */}
            <div style={{ display: 'flex', gap: '.5rem', marginBottom: '2.5rem', alignItems: 'center' }}>
              {(['date', 'time', 'details'] as Step[]).map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.7rem', fontWeight: 500,
                    background: step === s ? 'var(--terracotta)' : (
                      ['date','time','details'].indexOf(step) > i ? 'var(--terracotta)' : 'var(--sand-dark)'
                    ),
                    color: step === s || ['date','time','details'].indexOf(step) > i ? 'white' : 'var(--text-light)',
                  }}>{i + 1}</div>
                  {i < 2 && <div style={{ width: 40, height: 1, background: 'var(--sand-dark)' }} />}
                </div>
              ))}
            </div>

            {/* Step: Date */}
            {step === 'date' && (
              <div>
                <p className="booking-step-label">Βήμα 1 από 3</p>
                <h1 className="booking-title">Διαλέξτε <em>ημερομηνία</em></h1>
                <div className="form-group">
                  <label className="form-label">Ημερομηνία</label>
                  <input
                    type="date"
                    className="form-input"
                    value={date}
                    min={todayStr()}
                    onChange={e => setDate(e.target.value)}
                  />
                </div>
                <button
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '1rem' }}
                  onClick={() => setStep('time')}
                  disabled={!date}
                >
                  Συνέχεια →
                </button>
              </div>
            )}

            {/* Step: Time Slot */}
            {step === 'time' && (
              <div>
                <p className="booking-step-label">Βήμα 2 από 3 · {date}</p>
                <h1 className="booking-title">Διαλέξτε <em>ώρα</em></h1>
                {loadingSlots ? (
                  <p style={{ color: 'var(--text-light)', fontSize: '.9rem', marginBottom: '1rem' }}>Φόρτωση διαθεσιμότητας…</p>
                ) : (
                  <div className="slot-grid">
                    {TIME_SLOTS.map(slot => {
                      const info = availability.find(a => a.time_slot === slot)
                      const full = info?.is_full ?? false
                      const avail = info?.available_guests ?? 80
                      return (
                        <button
                          key={slot}
                          className={`slot-btn${timeSlot === slot ? ' selected' : ''}`}
                          disabled={full}
                          onClick={() => setTimeSlot(slot)}
                        >
                          {slot}
                          {info && (
                            <span className="slot-avail">
                              {full ? 'Πλήρες' : `${avail} θέσεις`}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
                {slotForSelected && !slotForSelected.is_full && (
                  <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                    ✓ Επιλεγμένη ώρα: <strong>{timeSlot}</strong> · {slotForSelected.available_guests} διαθέσιμες θέσεις
                  </p>
                )}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-outline" style={{ color: 'var(--text-mid)', borderColor: 'var(--sand-dark)' }} onClick={() => setStep('date')}>
                    ← Πίσω
                  </button>
                  <button
                    className="btn-primary"
                    style={{ flex: 1 }}
                    disabled={!timeSlot}
                    onClick={() => setStep('details')}
                  >
                    Συνέχεια →
                  </button>
                </div>
              </div>
            )}

            {/* Step: Details */}
            {step === 'details' && (
              <form onSubmit={handleSubmit}>
                <p className="booking-step-label">Βήμα 3 από 3 · {date} · {timeSlot}</p>
                <h1 className="booking-title">Τα <em>στοιχεία</em> σας</h1>

                <div className="form-group">
                  <label className="form-label">Όνομα *</label>
                  <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Πλήρες όνομα" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Τηλέφωνο *</label>
                  <input className="form-input" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="69XXXXXXXX" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email (προαιρετικό)</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Αριθμός ατόμων *</label>
                  <select className="form-input" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'άτομο' : 'άτομα'}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Σημειώσεις (προαιρετικό)</label>
                  <textarea className="form-input" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="π.χ. αλλεργίες, ειδικές απαιτήσεις…" rows={3} style={{ resize: 'vertical' }} />
                </div>

                {/* GDPR Consent */}
                <div style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start', padding: '1rem', background: 'var(--sand)', marginBottom: '1.25rem' }}>
                  <input
                    type="checkbox"
                    id="gdpr"
                    checked={gdprConsent}
                    onChange={e => setGdprConsent(e.target.checked)}
                    style={{ marginTop: '3px', accentColor: 'var(--terracotta)', width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }}
                  />
                  <label htmlFor="gdpr" style={{ fontSize: '.78rem', color: 'var(--text-mid)', lineHeight: 1.6, cursor: 'pointer' }}>
                    Συμφωνώ με την επεξεργασία των προσωπικών μου δεδομένων για σκοπούς διαχείρισης της κράτησης,
                    σύμφωνα με την{' '}
                    <Link href="/privacy" target="_blank" style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}>
                      Πολιτική Απορρήτου
                    </Link>
                    {' '}του Theros By The Sea. *
                  </label>
                </div>

                {error && <p style={{ color: 'var(--terracotta-dark)', fontSize: '.85rem', marginBottom: '1rem' }}>{error}</p>}

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" className="btn-outline" style={{ color: 'var(--text-mid)', borderColor: 'var(--sand-dark)' }} onClick={() => setStep('time')}>
                    ← Πίσω
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={submitting || !gdprConsent}>
                    {submitting ? 'Αποστολή…' : 'Επιβεβαίωση κράτησης'}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
