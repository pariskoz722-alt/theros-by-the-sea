'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Stats {
  galleryTotal: number
  galleryVisible: number
  reviewsTotal: number
  reviewsVisible: number
  avgStars: number
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
    async function load() {
      const supabase = createClient()

      const [{ data: gallery }, { data: reviews }] = await Promise.all([
        supabase.from('gallery_images').select('visible'),
        supabase.from('reviews').select('visible, stars'),
      ])

      const galleryRows = gallery || []
      const reviewRows = reviews || []
      const visibleReviews = reviewRows.filter(r => r.visible)
      const avgStars = visibleReviews.length
        ? visibleReviews.reduce((sum, r) => sum + (r.stars || 0), 0) / visibleReviews.length
        : 0

      setStats({
        galleryTotal: galleryRows.length,
        galleryVisible: galleryRows.filter(r => r.visible).length,
        reviewsTotal: reviewRows.length,
        reviewsVisible: visibleReviews.length,
        avgStars: Math.round(avgStars * 10) / 10,
      })
      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <div style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Φόρτωση…</div>

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-dark)' }}>Dashboard</h1>
        <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginTop: '.25rem' }}>Επισκόπηση περιεχομένου</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard label="Gallery (σύνολο)" value={stats?.galleryTotal ?? 0} accent />
        <StatCard label="Gallery (ορατές)" value={stats?.galleryVisible ?? 0} sub="visible" />
        <StatCard label="Reviews (σύνολο)" value={stats?.reviewsTotal ?? 0} />
        <StatCard label="Reviews (ορατές)" value={stats?.reviewsVisible ?? 0} sub="visible" />
        <StatCard label="Μέση βαθμολογία" value={stats?.avgStars ? `${stats.avgStars} ★` : '—'} sub="avg stars" />
      </div>

      <div style={{ background: 'white', padding: '1.5rem', maxWidth: 480 }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '1rem' }}>
          Γρήγορες ενέργειες
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          <a href="/admin/gallery" style={{ fontSize: '.85rem', color: 'var(--terracotta)', textDecoration: 'none' }}>
            Διαχείριση Gallery →
          </a>
          <a href="/admin/reviews" style={{ fontSize: '.85rem', color: 'var(--terracotta)', textDecoration: 'none' }}>
            Διαχείριση Reviews →
          </a>
          <a href="/" target="_blank" style={{ fontSize: '.85rem', color: 'var(--text-light)', textDecoration: 'none' }}>
            Προβολή site →
          </a>
        </div>
      </div>
    </div>
  )
}
