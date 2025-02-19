'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChatType } from './types'
import { CHAT_KEY } from '@/lib/constants'
import { useEffect, useState } from 'react'

export const HistoryButton = () => {
  const [chatHistory, setChatHistory] = useState<ChatType[]>([])

  useEffect(() => {
    const storedChatHistory = localStorage.getItem(CHAT_KEY)
    const chatHistory: ChatType[] = storedChatHistory
      ? JSON.parse(storedChatHistory)
      : []

    setChatHistory(chatHistory)
  }, [])

  // Reserve space for History button, even if there is none, yet.
  if (chatHistory.length === 0) {
    return (
      <Button
        variant="secondary"
        className="mx-auto block mt-8 opacity-0 cursor-default"
      >
        History
      </Button>
    )
  }

  return (
    <Link href="/history">
      <Button variant="secondary" className="mx-auto block mt-8 animate-fadeIn">
        History
      </Button>
    </Link>
  )
}
