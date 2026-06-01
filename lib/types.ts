export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'rejected'
export type Area = 'indoor' | 'outdoor' | 'bar' | 'any'

export interface Table {
  id: string
  name: string
  area: 'indoor' | 'outdoor' | 'bar'
  capacity: number
  is_active: boolean
  created_at: string
}

export interface Reservation {
  id: string
  name: string
  phone: string
  email?: string
  date: string
  time_slot: string
  guests: number
  area: Area
  table_id?: string
  action_token?: string
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

export interface SlotAvailability {
  time_slot: string
  available_tables: number
  is_available: boolean
}
