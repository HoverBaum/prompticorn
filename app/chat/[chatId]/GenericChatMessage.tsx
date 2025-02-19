import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Markdown from 'react-markdown'

type GenericChatMessageProps = {
  message: string
  /**
   * Optional Children to render below the message.
   */
  children?: React.ReactNode
  avatarSrc: string
  username: string
  className?: string
}

export const GenericChatMessage = ({
  className,
  message,
  avatarSrc,
  username,
  children,
}: GenericChatMessageProps) => {
  return (
    <div className={`text-justify ${className}`}>
      <div className="flex flex-row items-center mb-2">
        <Avatar className="w-6 h-6 md:w-8 md:h-8">
          <AvatarImage src={avatarSrc} />
        </Avatar>
        <span className="mx-2 md:mx-4 uppercase">{username}</span>
      </div>
      <div className="pl-8 md:pl-12">
        <Markdown
          components={{
            ul(props) {
              return <ul className="list-disc mx-0 my-4">{props.children}</ul>
            },
            ol(props) {
              return (
                <ol className="list-decimal mx-0 my-4">{props.children}</ol>
              )
            },
            li(props) {
              return <li className="ml-8 mb-1">{props.children}</li>
            },
            hr(props) {
              return <hr className="my-2" />
            },
          }}
        >
          {message}
        </Markdown>

        {children}
      </div>
    </div>
  )
}
