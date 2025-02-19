import { Button } from '@/components/ui/button'
import { ExclamationTriangleIcon, RocketIcon } from '@radix-ui/react-icons'
import {
  useBotMessageImageGeneration,
  useImageGeneration,
} from '../../ImageGeneration.context'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ImageDrawer } from './ImageDrawer'
import { ConfettiExplosion } from '@/components/ConfettiExplosion'
import Image from 'next/image'
import PlayAnimated from './play_animated.gif'
import { usePathname } from 'next/navigation'

type ImageGenerationProps = {
  prompt: string
  botMessageId: string
}

export const ImageGeneration = ({
  prompt,
  botMessageId,
}: ImageGenerationProps) => {
  const { generateImage } = useImageGeneration()
  const imageGeneration = useBotMessageImageGeneration(botMessageId)
  const currentPath = usePathname()
  const eventId = currentPath.split('/')[1]

  const handleClick = () => {
    generateImage(prompt, botMessageId, eventId)
  }

  return (
    <div>
      {imageGeneration?.state === 'success' && (
        <>
          <ImageDrawer generation={imageGeneration} />
          <ConfettiExplosion />
        </>
      )}
      {imageGeneration?.state === 'generating' && (
        <div className="flex items-center">
          <Image
            className="w-12 h-12 rounded-md"
            src={PlayAnimated}
            alt="Loading..."
          />
          <div className="flex flex-col ml-2">
            <span>Generating</span>

            <small>(May take 15 seconds)</small>
          </div>
        </div>
      )}

      {imageGeneration?.state === 'error' && (
        <Alert variant="destructive" className="mb-2">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occured during image generation. Please try again.
          </AlertDescription>
        </Alert>
      )}
      {(!imageGeneration || imageGeneration?.state === 'error') && (
        <Button onClick={handleClick}>
          Generate Image <RocketIcon className="ml-2" />
        </Button>
      )}
    </div>
  )
}
