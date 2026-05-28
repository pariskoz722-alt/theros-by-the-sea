'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Reservation } from '@/lib/types'

interface Stats {
  total: number
  today: number
  pending: number
  confirmed: number
  cancelled: number
  byDate: Record<string, number>
  bySlot: Record<string, number>
}

function StatCard({ label, value, sub, accent }: { label: string; value: number | string; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      background: 'white', padding: '1.5rem', borderTop: `2px solid ${accent ? 'var(--terracotta)' : 'var(--sand-dark)'}`,
    }}>
      <div style={{ fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '.5rem' }}>{label}</div>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 300, color: accent ? 'var(--terracotta)' : 'var(--text-dark)' }}>{value}</div>
      {sub && <div style={{ fontSize: '.75rem', color: 'var(--text-light)', marginTop: '.25rem' }}>{sub}</div>}
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const today = new Date().toISOString().split('T')[0]

    async function load() {
      const { data } = await supabase.from('reservations').select('*').order('created_at', { ascending: false })
      const rows = (data || []) as Reservation[]

      const byDate: Record<string, number> = {}
      const bySlot: Record<string, number> = {}

      rows.forEach(r => {
        byDate[r.date] = (byDate[r.date] || 0) + 1
        bySlot[r.time_slot] = (bySlot[r.time_slot] || 0) + 1
      })

      setStats({
        total: rows.length,
        today: rows.filter(r => r.date === today).length,
        pending: rows.filter(r => r.status === 'pending').length,
        confirmed: rows.filter(r => r.status === 'confirmed').length,
        cancelled: rows.filter(r => r.status === 'cancelled').length,
        byDate,
        bySlot,
      })
      setLoading(false)
    }

    load()

    // Real-time updates
    const channel = supabase
      .channel('admin-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, load)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  if (loading) return <div style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Φόρτωση…</div>

  const topSlots = Object.entries(stats?.bySlot || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const recentDates = Object.entries(stats?.byDate || {})
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 7)
  const maxCount = Math.max(...recentDates.map(d => d[1]), 1)

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-dark)' }}>Dashboard</h1>
        <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginTop: '.25rem' }}>Επισκόπηση κρατήσεων</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard label="Σύνολο κρατήσεων" value={stats?.total ?? 0} accent />
        <StatCard label="Σήμερα" value={stats?.today ?? 0} />
        <StatCard label="Σε αναμονή" value={stats?.pending ?? 0} sub="pending" />
        <StatCard label="Επιβεβαιωμένες" value={stats?.confirmed ?? 0} sub="confirmed" />
        <StatCard label="Ακυρωθείσες" value={stats?.cancelled ?? 0} sub="cancelled" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Recent activity chart */}
        <div style={{ background: 'white', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
            Πρόσφατες ημέρες
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {recentDates.map(([d, count]) => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                <div style={{ width: 80, fontSize: '.7rem', color: 'var(--text-light)', flexShrink: 0 }}>{d}</div>
                <div style={{ flex: 1, height: 8, background: 'var(--sand-dark)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, right: `${100 - (count / maxCount) * 100}%`, background: 'var(--terracotta)' }} />
                </div>
                <div style={{ width: 20, fontSize: '.8rem', color: 'var(--text-dark)', textAlign: 'right' }}>{count}</div>
              </div>
            ))}
            {recentDates.length === 0 && <p style={{ fontSize: '.85rem', color: 'var(--text-light)' }}>Καμία κράτηση ακόμα</p>}
          </div>
        </div>

        {/* Top slots */}
        <div style={{ background: 'white', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
            Δημοφιλέστερες ώρες
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {topSlots.map(([slot, count]) => (
              <div key={slot} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '.85rem', color: 'var(--text-mid)', fontWeight: 400 }}>{slot}</span>
                <span style={{
                  background: 'var(--sand)', padding: '.2rem .6rem',
                  fontSize: '.72rem', color: 'var(--terracotta)', fontWeight: 500,
                }}>{count} κρατήσεις</span>
              </div>
            ))}
            {topSlots.length === 0 && <p style={{ fontSize: '.85rem', color: 'var(--text-light)' }}>Καμία κράτηση ακόμα</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
