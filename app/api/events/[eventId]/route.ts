import { NextResponse } from 'next/server'
import { notFound } from 'next/navigation'
import events from '../../../../events.json'

// params don't work without specifying request parameter
export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  const event = events.find((evt) => evt.id === params.eventId)

  if (!event) {
    return notFound()
  }

  return NextResponse.json(event)
}
