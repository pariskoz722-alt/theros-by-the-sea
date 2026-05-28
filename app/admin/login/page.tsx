'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Λάθος email ή κωδικός.')
    } else {
      router.push('/admin')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--text-dark)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
    }}>
      <div style={{ maxWidth: 400, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300,
            letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--sand)',
          }}>
            Theros By The Sea
          </div>
          <p style={{ fontSize: '.7rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: '.5rem' }}>
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleLogin} style={{
          background: 'var(--ivory)', padding: '2.5rem',
          borderTop: '2px solid var(--terracotta)',
        }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Κωδικός</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <p style={{ color: 'var(--terracotta-dark)', fontSize: '.85rem', marginBottom: '1rem' }}>{error}</p>
          )}
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '.5rem' }} disabled={loading}>
            {loading ? 'Σύνδεση…' : 'Σύνδεση'}
          </button>
        </form>
      </div>
    </div>
  )
}
