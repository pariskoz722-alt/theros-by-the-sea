'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Reservation, ReservationStatus } from '@/lib/types'

const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: 'Αναμονή',
  confirmed: 'Επιβεβαιωμένη',
  cancelled: 'Ακυρωμένη',
}
const STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: '#f59e0b',
  confirmed: '#10b981',
  cancelled: '#ef4444',
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<ReservationStatus | 'all'>('all')
  const [dateFilter, setDateFilter] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)

  const load = useCallback(async () => {
    const supabase = createClient()
    let q = supabase.from('reservations').select('*').order('date', { ascending: true }).order('time_slot')
    if (filter !== 'all') q = q.eq('status', filter)
    if (dateFilter) q = q.eq('date', dateFilter)
    const { data } = await q
    setReservations((data || []) as Reservation[])
    setLoading(false)
  }, [filter, dateFilter])

  useEffect(() => {
    load()
    const supabase = createClient()
    const channel = supabase
      .channel('admin-reservations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, load)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [load])

  async function updateStatus(id: string, status: ReservationStatus) {
    setUpdating(id)
    const supabase = createClient()
    await supabase.from('reservations').update({ status }).eq('id', id)
    setUpdating(null)
  }

  async function deleteReservation(id: string) {
    if (!confirm('Είστε σίγουροι για τη διαγραφή;')) return
    const supabase = createClient()
    await supabase.from('reservations').delete().eq('id', id)
  }

  const filtered = reservations

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-dark)' }}>Κρατήσεις</h1>
          <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginTop: '.25rem' }}>{filtered.length} αποτελέσματα</p>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="form-input"
            style={{ width: 160, fontSize: '.8rem', padding: '.5rem .75rem' }}
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as ReservationStatus | 'all')}
            className="form-input"
            style={{ width: 150, fontSize: '.8rem', padding: '.5rem .75rem' }}
          >
            <option value="all">Όλες</option>
            <option value="pending">Αναμονή</option>
            <option value="confirmed">Επιβεβαιωμένες</option>
            <option value="cancelled">Ακυρωμένες</option>
          </select>
          {(filter !== 'all' || dateFilter) && (
            <button onClick={() => { setFilter('all'); setDateFilter('') }} style={{ background: 'none', border: 'none', color: 'var(--terracotta)', cursor: 'pointer', fontSize: '.8rem' }}>
              ✕ Καθαρισμός
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Φόρτωση…</p>
      ) : filtered.length === 0 ? (
        <div style={{ background: 'white', padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Δεν βρέθηκαν κρατήσεις</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {filtered.map(r => (
            <div key={r.id} style={{
              background: 'white', padding: '1.25rem 1.5rem',
              borderLeft: `3px solid ${STATUS_COLORS[r.status]}`,
              display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--text-dark)', marginBottom: '.25rem' }}>{r.name}</div>
                <div style={{ fontSize: '.8rem', color: 'var(--text-mid)' }}>
                  {r.phone}{r.email ? ` · ${r.email}` : ''}
                </div>
                {r.notes && <div style={{ fontSize: '.75rem', color: 'var(--text-light)', marginTop: '.25rem', fontStyle: 'italic' }}>"{r.notes}"</div>}
              </div>
              <div>
                <div style={{ fontSize: '.85rem', color: 'var(--text-dark)', fontWeight: 500 }}>
                  📅 {r.date} · ⏰ {r.time_slot}
                </div>
                <div style={{ fontSize: '.8rem', color: 'var(--text-mid)', marginTop: '.2rem' }}>
                  👥 {r.guests} άτομα
                </div>
                <div style={{ marginTop: '.4rem' }}>
                  <span style={{
                    fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase',
                    padding: '.2rem .6rem', color: STATUS_COLORS[r.status],
                    background: STATUS_COLORS[r.status] + '18',
                  }}>
                    {STATUS_LABELS[r.status]}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', alignItems: 'flex-end' }}>
                {r.status !== 'confirmed' && (
                  <button
                    onClick={() => updateStatus(r.id, 'confirmed')}
                    disabled={updating === r.id}
                    style={{ background: '#10b981', color: 'white', border: 'none', padding: '.4rem .8rem', fontSize: '.72rem', cursor: 'pointer', letterSpacing: '.05em' }}
                  >
                    ✓ Επιβεβαίωση
                  </button>
                )}
                {r.status !== 'cancelled' && (
                  <button
                    onClick={() => updateStatus(r.id, 'cancelled')}
                    disabled={updating === r.id}
                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '.4rem .8rem', fontSize: '.72rem', cursor: 'pointer' }}
                  >
                    ✕ Ακύρωση
                  </button>
                )}
                {r.status === 'cancelled' && (
                  <button
                    onClick={() => deleteReservation(r.id)}
                    style={{ background: 'transparent', color: 'var(--text-light)', border: 'none', padding: '.4rem', fontSize: '.72rem', cursor: 'pointer' }}
                  >
                    🗑
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
