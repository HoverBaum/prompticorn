import type { EventTypeWithDate } from '@/app/types'

export const isOngoing = (event: EventTypeWithDate) => {
  return event.startTime < new Date() && event.endTime > new Date()
}

export function isOver(event: EventTypeWithDate) {
  return event.endTime < new Date()
}
