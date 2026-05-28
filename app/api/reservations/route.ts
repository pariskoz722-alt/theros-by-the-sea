import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','19:00','20:00','21:00','22:00']
const CAPACITY = 80

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, phone, email, date, time_slot, guests, notes } = body

  if (!name || !phone || !date || !time_slot || !guests) {
    return NextResponse.json({ error: 'Συμπληρώστε όλα τα υποχρεωτικά πεδία.' }, { status: 400 })
  }
  if (!TIME_SLOTS.includes(String(time_slot))) {
    return NextResponse.json({ error: 'Μη έγκυρη ώρα.' }, { status: 400 })
  }
  if (typeof guests !== 'number' || guests < 1 || guests > 20) {
    return NextResponse.json({ error: 'Μη έγκυρος αριθμός ατόμων.' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Check availability
  const { data: existing } = await supabase
    .from('reservations')
    .select('guests')
    .eq('date', date)
    .eq('time_slot', time_slot)
    .neq('status', 'cancelled')

  const currentBooked = (existing || []).reduce((sum, r) => sum + r.guests, 0)
  if (currentBooked + (guests as number) > CAPACITY) {
    return NextResponse.json({ error: 'Δεν υπάρχει διαθέσιμη χωρητικότητα για αυτή την ώρα.' }, { status: 409 })
  }

  const { error } = await supabase.from('reservations').insert({
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: email ? String(email).trim() : null,
    date: String(date),
    time_slot: String(time_slot),
    guests: guests as number,
    notes: notes ? String(notes).trim() : null,
    status: 'pending',
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
