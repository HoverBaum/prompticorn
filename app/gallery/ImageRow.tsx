'use client'
import { useEffect, useState } from 'react'
import { DisplayedGalleryImage, GalleryImage } from '../types'
import { nanoid } from '@/lib/customNanoId'
import {
  BASE_SIZE_PX,
  SCALE_FACTOR,
  BASE_SPAW_RATE_MS,
  PER_LEVEL_SPAWN_RATE_MS,
  BASE_MOVEMENT_DURATION_S,
  PER_LEVE_MOVEMENT_DURATION_S,
  BASE_POSITION_VH,
} from './galleryConstants'

const sizeForLayer = (layer: number) =>
  BASE_SIZE_PX * Math.pow(SCALE_FACTOR, layer)

const moveUpForLayer = (layer: number): number => {
  if (layer === 0) return 0
  return (
    ((sizeForLayer(layer) * Math.pow(SCALE_FACTOR, layer)) /
      window.innerHeight) *
      100 +
    moveUpForLayer(layer - 1)
  )
}

type ImageRowProps = {
  level: number
  images: GalleryImage[]
}

export const ImageRow = ({ level, images }: ImageRowProps) => {
  const [ticks, setTicks] = useState(0)
  const [currentImages, setCurrentImages] = useState<DisplayedGalleryImage[]>(
    []
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((ticks) => ticks + 1)
    }, BASE_SPAW_RATE_MS + level * level * PER_LEVEL_SPAWN_RATE_MS)
    return () => clearInterval(interval)
  }, [])

  // On every tick, add a random image to currentImages.
  useEffect(() => {
    const storageKey = 'imageRowsImageIds'
    const storedImageIds: string[] = JSON.parse(
      localStorage.getItem(storageKey) || '[]'
    )
    const notShownImages = images.filter(
      (image) => !storedImageIds.includes(image.id)
    )

    let randomImage: GalleryImage

    if (notShownImages.length === 0) {
      randomImage = images[Math.floor(Math.random() * images.length)]
    } else {
      randomImage =
        notShownImages[Math.floor(Math.random() * notShownImages.length)]
      storedImageIds.push(randomImage.id)
      localStorage.setItem(storageKey, JSON.stringify(storedImageIds))
    }

    // const randomImage = images[Math.floor(Math.random() * images.length)]
    const displayId = nanoid()
    setCurrentImages((currentImages) => [
      ...currentImages,
      { ...randomImage, addedAt: ticks, displayId },
    ])
    setTimeout(() => {
      setCurrentImages((currentImages) =>
        currentImages.filter((image) => image.displayId !== displayId)
      )
    }, (BASE_MOVEMENT_DURATION_S + level * level * PER_LEVE_MOVEMENT_DURATION_S) * 1000 + 100)
  }, [ticks])

  return (
    <div>
      {currentImages.map((image) => {
        const size = sizeForLayer(level)
        const top = BASE_POSITION_VH - moveUpForLayer(level)

        return (
          <div
            key={image.displayId}
            className={`animate-moveRight absolute bg-background`}
            style={{
              animationDuration: `${
                BASE_MOVEMENT_DURATION_S +
                level * level * PER_LEVE_MOVEMENT_DURATION_S
              }s`,
              top: `${top}vh`,
              width: `${size}px`,
              height: `${size}px`,
              zIndex: 10 - level,
            }}
          >
            <img className="w-full h-full" src={image.imageSrc} />
            <div
              className=" h-full w-full absolute top-0 bg-background"
              style={{ opacity: `0.${level * 2}` }}
            ></div>
            <img className="w-full h-full reflection" src={image.imageSrc} />
          </div>
        )
      })}
    </div>
  )
}
