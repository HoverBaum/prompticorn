import { Button } from '@/components/ui/button'
import { ChatMessageType } from '../../types'
import { GenericChatMessage } from './GenericChatMessage'
import BOID_IMAGE from './boid.png'
import { CopyIcon } from '@radix-ui/react-icons'

type UserChatMessageProps = {
  message: ChatMessageType
  className?: string
  children?: React.ReactNode
  onRefinePrompt: (prompt: string) => void
}

export const UserChatMessage = ({
  message,
  className,
  children,
  onRefinePrompt,
}: UserChatMessageProps) => {
  return (
    <GenericChatMessage
      className={className}
      message={message.content}
      username="You"
      avatarSrc={BOID_IMAGE.src}
    >
      {children}
      <div className="flex justify-end">
        <Button
          onClick={() => onRefinePrompt(message.content)}
          size="icon"
          variant="ghost"
        >
          <CopyIcon />
        </Button>
      </div>
    </GenericChatMessage>
  )
}
