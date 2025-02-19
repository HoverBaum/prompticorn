import { useEffect, useState } from 'react'
import { DisplayedGalleryImage, GalleryImage } from '../types'
import { nanoid } from '@/lib/customNanoId'

const PRESENTER_DURATION_S = 20
const localTimeKey = 'localTimeKey'

type PresenterProps = {
  images: GalleryImage[]
}

export const Presenter = ({ images }: PresenterProps) => {
  const [image, setImage] = useState<DisplayedGalleryImage | undefined>(
    undefined
  )

  const updateImage = () => {
    const storageKey = 'presentedImageIds'
    const storedLastTime = localStorage.getItem(localTimeKey)
    const now = new Date()
    if (!storedLastTime) {
      // Do anyway.
    } else {
      const lastTime = storedLastTime ? new Date(storedLastTime) : new Date()

      // if lastTime is less then 10s ago, abort.
      if (now.getTime() - lastTime.getTime() < 10000) {
        return
      }
    }
    localStorage.setItem(localTimeKey, now.toISOString())

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

    setImage({ ...randomImage, addedAt: Date.now(), displayId: nanoid() })
  }

  // Handle the end of a presenter animation and set a new image to be presented.
  const handleAnimationEnd = () => {
    updateImage()
  }

  // Clear the local storage when the component is mounted.
  // else we get errors in dev when reloading too often.
  useEffect(() => {
    localStorage.removeItem(localTimeKey)
  }, [])

  // Set the initial image randomly.
  useEffect(() => {
    if (image === undefined && images.length > 0) updateImage()
  }, [image, images])

  if (!image) return null

  return (
    <div>
      <div
        onAnimationEnd={handleAnimationEnd}
        key={'presenter-image-' + image.displayId + image.addedAt}
        className="z-50 text-card-foreground fixed rounded-md animate-presenter"
        style={{ animationDuration: `${PRESENTER_DURATION_S}s` }}
      >
        <img src={image.imageSrc} alt={image.prompt} className="rounded-sm" />

        <p className="animate-presenterPrompt">{image.prompt}</p>
      </div>

      <img
        className="fixed animate-presenterReflection"
        src={image.imageSrc}
        key={'presenter-reflection-' + image.id}
        style={{ animationDuration: `${PRESENTER_DURATION_S}s` }}
      />
    </div>
  )
}
