import { ChatMessageType } from '../../types'
import { BotChatMessage } from './BotChatMessage'
import { UserChatMessage } from './UserChatMessage'

const exampleChat: ChatMessageType[] = [
  {
    id: '1',
    role: 'user',
    content: `My first prompt version`,
  },
  {
    id: '2',
    role: 'assistant',
    content: `Looks great already 🌈
Here are some tips to improve it:
1. Tipp
2. Tipp
3. Tipp

Keep improving 👐`,
  },
  {
    id: '3',
    role: 'user',
    content: `My refined prompt`,
  },
]

type ChatListProps = {
  onRefinePrompt: (prompt: string) => void
  messages: ChatMessageType[]
}

export const ChatList = ({ messages, onRefinePrompt }: ChatListProps) => {
  return (
    <>
      {messages.map((m: ChatMessageType, index) =>
        m.role === 'user' ? (
          <UserChatMessage
            message={m}
            className="my-8"
            key={m.id}
            onRefinePrompt={onRefinePrompt}
          ></UserChatMessage>
        ) : (
          <BotChatMessage
            message={m}
            className="my-8"
            key={m.id}
            userPrompt={messages[index - 1]?.content}
            onRefinePrompt={() => onRefinePrompt(messages[index - 1].content)}
          />
        )
      )}
      {messages.length === 1 && (
        <div className="opacity-60">
          <ChatList messages={exampleChat} onRefinePrompt={() => {}} />
        </div>
      )}
    </>
  )
}
