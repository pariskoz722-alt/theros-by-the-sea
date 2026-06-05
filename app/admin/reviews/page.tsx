'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Review } from '@/lib/types'

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ text_el: '', text_en: '', author: '', stars: 5 })
  const [saving, setSaving] = useState(false)

  async function loadReviews() {
    const supabase = createClient()
    const { data } = await supabase.from('reviews').select('*').order('display_order')
    setReviews((data || []) as Review[])
    setLoading(false)
  }

  useEffect(() => { loadReviews() }, [])

  async function toggleVisible(r: Review) {
    const supabase = createClient()
    await supabase.from('reviews').update({ visible: !r.visible }).eq('id', r.id)
    setReviews(prev => prev.map(x => x.id === r.id ? { ...x, visible: !x.visible } : x))
  }

  async function deleteReview(id: string) {
    if (!confirm('Διαγραφή review;')) return
    const supabase = createClient()
    await supabase.from('reviews').delete().eq('id', id)
    setReviews(prev => prev.filter(r => r.id !== id))
  }

  async function updateOrder(id: string, val: number) {
    const supabase = createClient()
    await supabase.from('reviews').update({ display_order: val }).eq('id', id)
    setReviews(prev =>
      [...prev.map(r => r.id === id ? { ...r, display_order: val } : r)]
        .sort((a, b) => a.display_order - b.display_order)
    )
  }

  async function addReview(e: React.FormEvent) {
    e.preventDefault()
    if (!form.text_el || !form.author) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('reviews').insert({
      text_el: form.text_el,
      text_en: form.text_en || null,
      author: form.author,
      stars: form.stars,
      visible: true,
      display_order: reviews.length,
    })
    setForm({ text_el: '', text_en: '', author: '', stars: 5 })
    setShowForm(false)
    setSaving(false)
    await loadReviews()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-dark)' }}>Reviews</h1>
          <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginTop: '.25rem' }}>{reviews.filter(r => r.visible).length} ορατά · {reviews.length} σύνολο</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(v => !v)}>
          {showForm ? '✕ Άκυρο' : '+ Νέο review'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={addReview} style={{ background: 'white', padding: '1.5rem', marginBottom: '1.5rem', borderTop: '2px solid var(--terracotta)' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 300, marginBottom: '1.25rem', color: 'var(--text-dark)' }}>
            Νέο Review
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Κείμενο (ΕΛ) *</label>
              <textarea className="form-input" rows={3} value={form.text_el} onChange={e => setForm(f => ({ ...f, text_el: e.target.value }))} required style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Κείμενο (EN)</label>
              <textarea className="form-input" rows={3} value={form.text_en} onChange={e => setForm(f => ({ ...f, text_en: e.target.value }))} style={{ resize: 'vertical' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Όνομα *</label>
              <input className="form-input" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} required />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Αστέρια</label>
              <select className="form-input" value={form.stars} onChange={e => setForm(f => ({ ...f, stars: parseInt(e.target.value) }))}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{'★'.repeat(n)}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Αποθήκευση…' : 'Αποθήκευση'}</button>
        </form>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Φόρτωση…</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {reviews.map(r => (
            <div key={r.id} style={{
              background: 'white', padding: '1.25rem 1.5rem',
              borderLeft: `3px solid ${r.visible ? 'var(--terracotta)' : 'var(--sand-dark)'}`,
              opacity: r.visible ? 1 : .6,
              display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem' }}>
                  <span style={{ color: 'var(--terracotta)', letterSpacing: 2, fontSize: '.85rem' }}>{'★'.repeat(r.stars)}</span>
                  <span style={{ fontSize: '.75rem', fontWeight: 500, color: 'var(--text-dark)' }}>— {r.author}</span>
                  {!r.visible && <span style={{ fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-light)', border: '1px solid var(--sand-dark)', padding: '.1rem .4rem' }}>ΚΡΥΜΜΈΝΟ</span>}
                </div>
                <p style={{ fontSize: '.83rem', color: 'var(--text-mid)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '.4rem' }}>
                  {r.text_el}
                </p>
                {r.text_en && (
                  <p style={{ fontSize: '.78rem', color: 'var(--text-light)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    {r.text_en}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                  <label style={{ fontSize: '.65rem', color: 'var(--text-light)' }}>Σειρά</label>
                  <input
                    type="number"
                    value={r.display_order}
                    onChange={e => updateOrder(r.id, parseInt(e.target.value) || 0)}
                    style={{ width: 50, fontSize: '.75rem', padding: '.2rem .3rem', border: '1px solid var(--sand-dark)', textAlign: 'center' }}
                  />
                </div>
                <button
                  onClick={() => toggleVisible(r)}
                  style={{ background: 'none', border: '1px solid var(--sand-dark)', fontSize: '.7rem', padding: '.35rem .6rem', cursor: 'pointer', color: 'var(--text-mid)' }}
                >
                  {r.visible ? 'Απόκρυψη' : 'Εμφάνιση'}
                </button>
                <button
                  onClick={() => deleteReview(r.id)}
                  style={{ background: 'none', border: '1px solid #fca5a5', fontSize: '.7rem', padding: '.35rem .5rem', cursor: 'pointer', color: '#ef4444' }}
                >
                  Διαγραφή
                </button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div style={{ background: 'white', padding: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Δεν υπάρχουν reviews ακόμα.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
