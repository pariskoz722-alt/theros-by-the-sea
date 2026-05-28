'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return

    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cursor || !ring) return

    document.body.classList.add('custom-cursor')

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let animFrame: number
    const animRing = () => {
      rx += (mx - rx) * .12
      ry += (my - ry) * .12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      animFrame = requestAnimationFrame(animRing)
    }
    animRing()

    const hoverEls = document.querySelectorAll('a,button,.gitem')
    const addHover = () => document.body.classList.add('cursor-hover')
    const removeHover = () => document.body.classList.remove('cursor-hover')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.body.classList.remove('custom-cursor')
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animFrame)
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}
