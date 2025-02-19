import { EventType, EventTypeWithDate } from '@/app/types'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type EventState = {
  events: EventTypeWithDate[]
  isFetching: boolean
}

const TIME_UNTIL_EVENT_H = 24
const POLLING_INTERVAL_M = 1

const EventDataContext = createContext<EventState>({} as EventState)

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventTypeWithDate[]>(
    [] as EventTypeWithDate[]
  )
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    api.fetchEvents()
    const interval = setInterval(
      api.fetchEvents,
      1000 * 60 * POLLING_INTERVAL_M
    )
    return () => clearInterval(interval)
  }, [])

  const api = useMemo(() => {
    const fetchEvents = async () => {
      const response: EventType[] = await fetch('/api/events', {
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .catch((e) => {
          console.error(e)
        })

      const filteredEvents = response
        .map((item) => ({
          ...item,
          // Convert createdAt to a Date object.
          startTime: new Date(item.startTime),
          endTime: new Date(item.endTime),
        }))
        // Only show events that are in the past or starting in the next 24 hours
        .filter((item) => {
          const nowDate = new Date()
          return (
            item.startTime <
            new Date(nowDate.valueOf() + 1000 * 60 * 60 * TIME_UNTIL_EVENT_H)
          )
        })
      setEvents(filteredEvents)
      setIsFetching(false)
    }

    return {
      fetchEvents,
    }
  }, [])

  return (
    <EventDataContext.Provider
      value={{
        events: events,
        isFetching: isFetching,
      }}
    >
      {children}
    </EventDataContext.Provider>
  )
}

export const useEventData = () => useContext(EventDataContext)
