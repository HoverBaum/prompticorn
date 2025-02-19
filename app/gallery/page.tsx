'use client'

import { SiteHeader } from '@/components/SiteHeader'
import IndeterminateProgressBar from '@/components/IndeterminantProgressBar'
import Event from './Event'
import { useEventData } from '@/providers/eventProvider'

export default function GalleryPage() {
  const { events, isFetching } = useEventData()

  return (
    <div className="h-full">
      <SiteHeader isCentered />

      {isFetching && <IndeterminateProgressBar />}

      {!isFetching && events.length !== 0 && (
        <div className="max-w-prose p-4 mx-auto flex-col space-y-4">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
