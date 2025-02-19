import { EventTypeWithDate } from '@/app/types'
import eventsUnparsed from '@/events.json'

export async function readEvents() {
  const events = eventsUnparsed.map((evt) => {
    const newEvent: EventTypeWithDate = {
      id: evt.id,
      displayName: evt.displayName,
      startTime: new Date(evt.startTime),
      endTime: new Date(evt.endTime),
    }
    return newEvent
  })
  return events
}
