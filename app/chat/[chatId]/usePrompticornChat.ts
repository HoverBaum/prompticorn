import { CHAT_KEY } from '@/lib/constants'
import { useChat } from 'ai/react'
import { nanoid } from '@/lib/customNanoId'
import { useEffect, useState } from 'react'
import { ChatType } from '../../types'
import { Message } from 'ai'

export const usePrompticornChat = (chatId: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [chatHistory, setChatHistory] = useState<ChatType[]>([])
  const {
    messages,
    input,
    handleSubmit,
    setInput,
    setMessages,
    isLoading: isThinking,
  } = useChat()

  // Save new messages to Chat History
  useEffect(() => {
    if (isLoading || isThinking) return

    console.log('updating history', messages)
    setChatHistory((current) =>
      current.map((chat) => {
        if (chat.id !== chatId) return chat
        return {
          ...chat,
          messages,
          name:
            messages.length >= 2
              ? messages[1].content.split(' ').slice(0, 5).join(' ')
              : chat.name,
        }
      })
    )
  }, [messages, isLoading, isThinking])

  // Save chat history to local storage.
  useEffect(() => {
    if (isLoading) return
    console.log('Saving history', chatHistory)
    localStorage.setItem(CHAT_KEY, JSON.stringify(chatHistory))
  }, [chatHistory, isLoading])

  // React to load finishing and setup chat and history, if empty.
  useEffect(() => {
    if (isLoading) return
    console.log('Setting up after loading')

    // Add current chat to history if it is not in it.
    if (!chatHistory.some((chat) => chat.id === chatId)) {
      const chat: ChatType = {
        id: chatId,
        name: 'New Chat',
        messages: [],
        startedAt: Date.now(),
      }
      setChatHistory([...chatHistory, chat])
    }

    // Add initial message, if empty.
    if (messages.length === 0) {
      const initialMessages: Message[] = [
        {
          id: nanoid(),
          role: 'assistant',
          content: `**Hi there 👋**
  
  Start by typing an image prompt below 👇
                    
  Improve your prompt using my hints. Once your prompts gets good enough, you can generate an image and earn a place in our hall of fame 🏆`,
        },
      ]
      setMessages(initialMessages)
    }
  }, [isLoading])

  // Load chat history and messages from local storage.
  useEffect(() => {
    const storedHistory = localStorage.getItem(CHAT_KEY)
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory) as ChatType[]
      const storedChat = parsedHistory.find((chat) => chat.id === chatId)
      if (storedChat) {
        // Use stored messsages,
        setMessages(storedChat.messages)
      }
      setChatHistory(parsedHistory)
    }

    setIsLoading(false)
  }, [])

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    isThinking,
    chatHistory,
  }
}
