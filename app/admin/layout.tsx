'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/reservations', label: 'Κρατήσεις', icon: '📅' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/reviews', label: 'Reviews', icon: '⭐' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f5f0' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, background: 'var(--text-dark)', flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, left: sidebarOpen ? 0 : undefined,
        zIndex: 100,
      }} className="admin-sidebar">
        <div style={{ padding: '2rem 1.5rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 300,
            letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--sand)',
          }}>
            Theros
          </div>
          <p style={{ fontSize: '.58rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: '.25rem' }}>
            Admin Panel
          </p>
        </div>

        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '.75rem 1.5rem', textDecoration: 'none',
                fontSize: '.82rem', letterSpacing: '.08em',
                color: pathname === item.href ? 'var(--terracotta)' : 'rgba(242,235,217,.6)',
                background: pathname === item.href ? 'rgba(196,113,74,.1)' : 'transparent',
                borderLeft: pathname === item.href ? '2px solid var(--terracotta)' : '2px solid transparent',
                transition: 'all .2s',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <Link href="/" style={{ display: 'block', fontSize: '.75rem', color: 'rgba(242,235,217,.4)', textDecoration: 'none', marginBottom: '.5rem' }}>
            ← Προβολή site
          </Link>
          <button onClick={handleLogout} style={{
            background: 'none', border: 'none', color: 'rgba(196,113,74,.7)',
            fontSize: '.75rem', cursor: 'pointer', letterSpacing: '.08em', padding: 0,
          }}>
            Αποσύνδεση
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 240, minWidth: 0 }}>
        {/* Mobile top bar */}
        <div style={{
          display: 'none', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.5rem', background: 'var(--text-dark)',
        }} className="admin-topbar">
          <span style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--sand)', letterSpacing: '.1em' }}>
            Theros Admin
          </span>
          <button onClick={() => setSidebarOpen(v => !v)} style={{ background: 'none', border: 'none', color: 'var(--sand)', fontSize: '1.2rem', cursor: 'pointer' }}>
            ☰
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { width: 220px !important; left: ${sidebarOpen ? '0' : '-220px'} !important; transition: left .3s; }
          main { margin-left: 0 !important; }
          .admin-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
