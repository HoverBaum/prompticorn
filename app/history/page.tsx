'use client'

import { SiteHeader } from '@/components/SiteHeader'
import { CHAT_KEY } from '@/lib/constants'
import { ChatType } from '../types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RocketIcon } from '@radix-ui/react-icons'

export default function History() {
  const [chatHistory, setChatHistory] = useState<ChatType[]>([])

  // Initially read Chat History from localstorage.
  useEffect(() => {
    const storedChatHistory = localStorage.getItem(CHAT_KEY)
    const chatHistory: ChatType[] = storedChatHistory
      ? JSON.parse(storedChatHistory)
      : []

    setChatHistory(chatHistory)
  }, [])

  const deleteChat = (id: string) => {
    const newHistory = chatHistory.filter((chat) => chat.id !== id)
    localStorage.setItem(CHAT_KEY, JSON.stringify(newHistory))
    setChatHistory(newHistory)
  }

  return (
    <div className="bg-noise min-h-screen bg-background pb-8">
      <SiteHeader isCentered></SiteHeader>
      <div className="max-w-prose p-4 mx-auto flex-col space-y-4">
        {chatHistory.length === 0 && (
          <p>
            No Chats yet, let's start one{' '}
            <RocketIcon className="inline-block" />
          </p>
        )}
        {chatHistory
          .sort((a, b) => b.startedAt - a.startedAt)
          .map((chat) => (
            <Card key={chat.id}>
              <CardHeader className="pb-0">{chat.name}</CardHeader>
              <CardContent>
                <small>{new Date(chat.startedAt).toLocaleString()}</small>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/chat/${chat.id}`}>
                  <Button>Continue</Button>
                </Link>

                <Button
                  variant="destructive"
                  className="opacity-70 hover:opacity-100"
                  onClick={() => deleteChat(chat.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
