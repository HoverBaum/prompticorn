import { ChatMessageType } from '../../types'
import PROMPTICORN_IMAGE from './prompticorn.png'
import { Button } from '@/components/ui/button'
import { GenericChatMessage } from './GenericChatMessage'
import { CopyIcon } from '@radix-ui/react-icons'
import { ImageGeneration } from './ImageGeneration'

interface ChatMessageProps {
  message: ChatMessageType
  /**
   * The CSS class to apply to the div.
   */
  className?: string
  onRefinePrompt: () => void
  userPrompt: string
}

type MarkerType = 'NEEDS_IMPROVEMENT' | 'IMAGE_GENERATION'

export const BotChatMessage = ({
  message,
  className,
  onRefinePrompt,
  userPrompt,
}: ChatMessageProps) => {
  const regexMarker =
    typeof message.content === 'string'
      ? /{{.+?}}/gm.exec(message.content)
      : null
  const marker: MarkerType | null = regexMarker
    ? (regexMarker[0].replace('{{', '').replace('}}', '') as MarkerType)
    : null

  return (
    <GenericChatMessage
      message={message.content.replace(/^.*?{{.*$/gm, '')}
      username="Prompticorn"
      avatarSrc={PROMPTICORN_IMAGE.src}
      className={className}
    >
      {marker === 'NEEDS_IMPROVEMENT' && (
        <div>
          <small>Keep refining your prompt to generate an image.</small>
          <br />
          <Button onClick={onRefinePrompt} variant="outline">
            Refine prompt <CopyIcon className="ml-2" />
          </Button>
        </div>
      )}
      {marker === 'IMAGE_GENERATION' && (
        <ImageGeneration prompt={userPrompt} botMessageId={message.id} />
      )}
    </GenericChatMessage>
  )
}
