'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  {
    href: '/admin', label: 'Dashboard',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  },
  {
    href: '/admin/gallery', label: 'Gallery',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  },
  {
    href: '/admin/reviews', label: 'Reviews',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname    = usePathname()
  const router      = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  useEffect(() => { setOpen(false) }, [pathname])

  const isLogin = pathname === '/admin/login'
  if (isLogin) return <>{children}</>

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f0ea' }}>

      {/* Sidebar */}
      <aside className="admin-sidebar" style={{
        width: 250, background: 'var(--text-dark)', flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, bottom: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{
          padding: '2rem 1.75rem 1.75rem',
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.15rem', fontWeight: 300,
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--sand)',
          }}>
            Theros
          </div>
          <div style={{
            width: 24, height: 1,
            background: 'var(--terracotta)',
            margin: '.5rem 0',
            opacity: .6,
          }} />
          <p style={{
            fontSize: '.55rem', letterSpacing: '.25em',
            textTransform: 'uppercase', color: 'rgba(160,128,106,.5)',
          }}>
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1.25rem 0' }}>
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '.8rem 1.75rem', textDecoration: 'none',
                  fontSize: '.78rem', letterSpacing: '.1em',
                  color: active ? 'var(--terracotta)' : 'rgba(242,235,217,.5)',
                  background: active ? 'rgba(196,113,74,.08)' : 'transparent',
                  borderLeft: `2px solid ${active ? 'var(--terracotta)' : 'transparent'}`,
                  transition: 'all .2s',
                }}
              >
                <span style={{ opacity: active ? 1 : .6 }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid rgba(255,255,255,.06)',
          display: 'flex', flexDirection: 'column', gap: '.6rem',
        }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.4rem',
            fontSize: '.7rem', letterSpacing: '.08em',
            color: 'rgba(242,235,217,.3)', textDecoration: 'none',
            transition: 'color .2s',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Προβολή site
          </Link>
          <button onClick={handleLogout} style={{
            background: 'none', border: 'none', padding: 0,
            display: 'inline-flex', alignItems: 'center', gap: '.4rem',
            fontSize: '.7rem', letterSpacing: '.08em',
            color: 'rgba(196,113,74,.55)', cursor: 'pointer',
            transition: 'color .2s',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Αποσύνδεση
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 250, minWidth: 0 }}>
        {/* Mobile top bar */}
        <div className="admin-topbar" style={{
          display: 'none', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.5rem', background: 'var(--text-dark)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '.95rem', letterSpacing: '.12em', color: 'var(--sand)' }}>
            Theros Admin
          </span>
          <button onClick={() => setOpen(v => !v)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sand)" strokeWidth="1.5">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        <div style={{ padding: '2.5rem 2rem' }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            width: 230px !important;
            left: ${open ? '0' : '-230px'} !important;
            transition: left .3s ease;
          }
          main { margin-left: 0 !important; }
          .admin-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
