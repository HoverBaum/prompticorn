'use client'

import { Suspense, useEffect, useState } from 'react'
import { GalleryImage } from '../../types'
import { SiteHeader } from '@/components/SiteHeader'
import { ImageRow } from '../ImageRow'
import { Presenter } from '../Presenter'
import { GalleryQR } from '../GalleryQR'
import IndeterminateProgressBar from '@/components/IndeterminantProgressBar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CameraIcon } from '@radix-ui/react-icons'
import { useEventData } from '@/providers/eventProvider'
import Countdown from 'react-countdown'
import { isOngoing, isOver } from '@/lib/eventUtils'

const TIMEFRAME_GALLERY_H = 168
const POLLING_INTERVAL_M = 1

export default function GalleryPage({
  params,
}: {
  params: { eventId: string }
}) {
  const { events } = useEventData()

  const [images, setImages] = useState<GalleryImage[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [pageEvent, setPageEvent] = useState(
    events.find((evt) => evt.id === params.eventId)
  )

  const fetchImages = async () => {
    const response = await fetch(`/api/images/${pageEvent?.id}`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e)
      })

    const galleryImages: GalleryImage[] = response ?? []

    setImages(
      galleryImages.map((item) => ({
        ...item,
        // Convert createdAt to a Date object.
        createdAt: new Date(item.createdAt),
      }))
    )
    setIsFetching(false)
  }

  useEffect(() => {
    console.log(events)
    setPageEvent(events.find((evt) => evt.id === params.eventId))
    console.log(pageEvent)
  }, [events])

  useEffect(() => {
    if (pageEvent && (isOngoing(pageEvent) || isOver(pageEvent))) {
      setIsFetching(true)
      fetchImages()
      const interval = setInterval(fetchImages, 1000 * 60 * POLLING_INTERVAL_M)
      return () => clearInterval(interval)
    }
  }, [pageEvent])

  return (
    <div className="h-full min-h-screen flex flex-col">
      <SiteHeader isCentered />
      {pageEvent && (isOngoing(pageEvent) || isOver(pageEvent)) && (
        <div>
          {isFetching && <IndeterminateProgressBar />}

          {!isFetching && images.length === 0 && (
            <div className="w-full grid place-items-center mt-20">
              <Alert className="bg-[#a29aff] max-w-prose">
                <CameraIcon className="h-4 w-4" />
                <AlertTitle className="font-bold">No Images, yet</AlertTitle>
                <AlertDescription>
                  Be the first to create one 🦄
                </AlertDescription>
              </Alert>
            </div>
          )}

          {images.length > 0 && (
            <>
              <Presenter images={images} />
              <ImageRow level={1} images={images} />
              <ImageRow level={2} images={images} />
              <ImageRow level={3} images={images} />
              <ImageRow level={4} images={images} />
            </>
          )}
          {isOngoing(pageEvent) && (
            <Suspense>
              <GalleryQR eventId={params.eventId} />
            </Suspense>
          )}
        </div>
      )}
      {pageEvent && pageEvent.startTime > new Date() && (
        <div className="h-full flex flex-col justify-center items-center flex-1">
          <h1 className="text-6xl md:text-6xl font-bold mb-8">
            {pageEvent.displayName}
          </h1>

          <Countdown
            date={pageEvent.startTime}
            intervalDelay={0}
            precision={1}
            renderer={(props) => (
              <div className="h-full text-4xl md:text-6xl font-bold">{`${props.hours
                .toString()
                .padStart(2, '0')}:${props.minutes
                .toString()
                .padStart(2, '0')}:${props.seconds
                .toString()
                .padStart(2, '0')}`}</div>
            )}
          />
        </div>
      )}
    </div>
  )
}
