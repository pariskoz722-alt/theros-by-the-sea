'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
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
      minHeight: '100vh',
      background: 'var(--text-dark)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
      backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(196,113,74,.08) 0%, transparent 60%)',
    }}>
      <div style={{ maxWidth: 420, width: '100%' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.6rem', fontWeight: 300,
            letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--sand)',
          }}>
            Theros By The Sea
          </div>
          <div style={{
            width: 32, height: 1,
            background: 'var(--terracotta)',
            margin: '.9rem auto',
            opacity: .7,
          }} />
          <p style={{
            fontSize: '.62rem', letterSpacing: '.3em',
            textTransform: 'uppercase', color: 'rgba(160,128,106,.6)',
          }}>
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <form onSubmit={handleLogin} style={{
          background: 'var(--ivory)',
          padding: '2.5rem 2.5rem 2rem',
          borderTop: '2px solid var(--terracotta)',
        }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.4rem', fontWeight: 300,
            color: 'var(--text-dark)',
            marginBottom: '2rem', letterSpacing: '.04em',
          }}>
            Σύνδεση
          </h2>

          {/* Email */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '.6rem', letterSpacing: '.2em',
              textTransform: 'uppercase', color: 'var(--text-light)',
              marginBottom: '.5rem',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              style={{
                width: '100%', padding: '.8rem 1rem',
                border: '1px solid var(--sand-dark)',
                background: 'white',
                fontFamily: 'Jost, sans-serif',
                fontSize: '.9rem', color: 'var(--text-dark)',
                outline: 'none',
                transition: 'border-color .25s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--terracotta)'}
              onBlur={e  => e.target.style.borderColor = 'var(--sand-dark)'}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.6rem' }}>
            <label style={{
              display: 'block',
              fontSize: '.6rem', letterSpacing: '.2em',
              textTransform: 'uppercase', color: 'var(--text-light)',
              marginBottom: '.5rem',
            }}>
              Κωδικός
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              style={{
                width: '100%', padding: '.8rem 1rem',
                border: '1px solid var(--sand-dark)',
                background: 'white',
                fontFamily: 'Jost, sans-serif',
                fontSize: '.9rem', color: 'var(--text-dark)',
                outline: 'none',
                transition: 'border-color .25s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--terracotta)'}
              onBlur={e  => e.target.style.borderColor = 'var(--sand-dark)'}
            />
          </div>

          {error && (
            <div style={{
              padding: '.7rem 1rem',
              background: 'rgba(196,113,74,.08)',
              borderLeft: '2px solid var(--terracotta)',
              fontSize: '.8rem', color: 'var(--terracotta-dark)',
              marginBottom: '1.2rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '.9rem',
              background: loading ? 'var(--text-light)' : 'var(--terracotta)',
              color: 'var(--ivory)', border: 'none',
              fontFamily: 'Jost, sans-serif',
              fontSize: '.68rem', fontWeight: 500,
              letterSpacing: '.25em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background .25s',
            }}
            onMouseEnter={e => { if (!loading) (e.target as HTMLButtonElement).style.background = 'var(--terracotta-dark)' }}
            onMouseLeave={e => { if (!loading) (e.target as HTMLButtonElement).style.background = 'var(--terracotta)' }}
          >
            {loading ? 'Σύνδεση…' : 'Είσοδος'}
          </button>
        </form>

        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontSize: '.62rem', letterSpacing: '.1em',
          color: 'rgba(160,128,106,.35)',
        }}>
          Theros By The Sea · Σύστημα Διαχείρισης
        </p>
      </div>
    </div>
  )
}
