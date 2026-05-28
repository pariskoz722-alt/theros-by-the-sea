import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const CAPACITY = 80

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('reservations')
    .select('time_slot, guests')
    .eq('date', date)
    .neq('status', 'cancelled')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const TIME_SLOTS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','19:00','20:00','21:00','22:00']

  const slots = TIME_SLOTS.map(slot => {
    const booked = (data || [])
      .filter(r => r.time_slot === slot)
      .reduce((sum, r) => sum + r.guests, 0)

    return {
      time_slot: slot,
      booked_guests: booked,
      capacity: CAPACITY,
      available_guests: Math.max(0, CAPACITY - booked),
      is_full: booked >= CAPACITY,
    }
  })

  return NextResponse.json(slots, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
