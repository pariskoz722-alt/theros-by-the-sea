export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Reservation {
  id: string
  name: string
  phone: string
  email?: string
  date: string
  time_slot: string
  guests: number
  notes?: string
  status: ReservationStatus
  created_at: string
}

export interface GalleryImage {
  id: string
  url: string
  storage_path?: string
  alt_el: string
  alt_en: string
  display_order: number
  visible: boolean
  created_at: string
}

export interface Review {
  id: string
  text_el: string
  text_en?: string
  author: string
  stars: number
  visible: boolean
  display_order: number
  created_at: string
}

export interface TimeSlotAvailability {
  time_slot: string
  booked_guests: number
  capacity: number
  available_guests: number
  is_full: boolean
}
