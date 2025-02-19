import { NextResponse } from 'next/server'
import events from '../../../events.json'

export async function GET() {
  return NextResponse.json(events)
}
