'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/lib/types'

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function loadImages() {
    const supabase = createClient()
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order')
    setImages((data || []) as GalleryImage[])
    setLoading(false)
  }

  useEffect(() => { loadImages() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    setUploadError('')
    const supabase = createClient()

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError(`Το αρχείο ${file.name} υπερβαίνει τα 5MB.`)
        continue
      }
      const ext = file.name.split('.').pop()
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage.from('gallery').upload(path, file)
      if (uploadError) { setUploadError(uploadError.message); continue }

      const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(path)

      await supabase.from('gallery_images').insert({
        url: publicUrl,
        storage_path: path,
        alt_el: file.name.replace(/\.[^.]+$/, ''),
        alt_en: file.name.replace(/\.[^.]+$/, ''),
        display_order: images.length,
        visible: true,
      })
    }

    await loadImages()
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function toggleVisible(img: GalleryImage) {
    const supabase = createClient()
    await supabase.from('gallery_images').update({ visible: !img.visible }).eq('id', img.id)
    setImages(prev => prev.map(i => i.id === img.id ? { ...i, visible: !i.visible } : i))
  }

  async function deleteImage(img: GalleryImage) {
    if (!confirm('Διαγραφή εικόνας;')) return
    const supabase = createClient()
    if (img.storage_path) {
      await supabase.storage.from('gallery').remove([img.storage_path])
    }
    await supabase.from('gallery_images').delete().eq('id', img.id)
    setImages(prev => prev.filter(i => i.id !== img.id))
  }

  async function updateOrder(id: string, newOrder: number) {
    const supabase = createClient()
    await supabase.from('gallery_images').update({ display_order: newOrder }).eq('id', id)
    setImages(prev =>
      [...prev.map(i => i.id === id ? { ...i, display_order: newOrder } : i)]
        .sort((a, b) => a.display_order - b.display_order)
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-dark)' }}>Gallery</h1>
          <p style={{ fontSize: '.8rem', color: 'var(--text-light)', marginTop: '.25rem' }}>{images.length} εικόνες</p>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
          <button
            className="btn-primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Ανέβασμα…' : '+ Προσθήκη εικόνων'}
          </button>
        </div>
      </div>

      {uploadError && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '.75rem 1rem', marginBottom: '1rem', fontSize: '.85rem', color: '#dc2626' }}>
          {uploadError}
        </div>
      )}

      <div style={{ background: '#fef9f0', border: '1px solid var(--sand-dark)', padding: '.75rem 1rem', marginBottom: '1.5rem', fontSize: '.8rem', color: 'var(--text-mid)' }}>
        ℹ️ Βεβαιωθείτε ότι έχετε δημιουργήσει το Storage bucket <strong>gallery</strong> στο Supabase.
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Φόρτωση…</p>
      ) : images.length === 0 ? (
        <div style={{ background: 'white', padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Δεν υπάρχουν εικόνες. Ανεβάστε τις πρώτες!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {images.map(img => (
            <div key={img.id} style={{
              background: 'white', overflow: 'hidden',
              opacity: img.visible ? 1 : .5,
              border: img.visible ? '1px solid var(--sand-dark)' : '1px dashed var(--sand-dark)',
            }}>
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={img.url}
                  alt={img.alt_el}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {!img.visible && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '.75rem', letterSpacing: '.1em',
                  }}>
                    ΚΡΥΜΜΈΝΗ
                  </div>
                )}
              </div>
              <div style={{ padding: '.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
                  <label style={{ fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-light)', flexShrink: 0 }}>
                    Σειρά
                  </label>
                  <input
                    type="number"
                    value={img.display_order}
                    onChange={e => updateOrder(img.id, parseInt(e.target.value) || 0)}
                    style={{ width: 50, fontSize: '.8rem', padding: '.2rem .4rem', border: '1px solid var(--sand-dark)', textAlign: 'center' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '.4rem' }}>
                  <button
                    onClick={() => toggleVisible(img)}
                    style={{
                      flex: 1, background: 'none', border: '1px solid var(--sand-dark)',
                      fontSize: '.7rem', padding: '.35rem', cursor: 'pointer', color: 'var(--text-mid)',
                    }}
                  >
                    {img.visible ? '👁 Απόκρυψη' : '👁 Εμφάνιση'}
                  </button>
                  <button
                    onClick={() => deleteImage(img)}
                    style={{
                      background: 'none', border: '1px solid #fca5a5',
                      fontSize: '.7rem', padding: '.35rem .5rem', cursor: 'pointer', color: '#ef4444',
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
