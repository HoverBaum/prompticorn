'use client'

import { Button } from '@/components/ui/button'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { SiteHeader } from '@/components/SiteHeader'
import { ChatList } from './ChatList'
import { Card, CardContent } from '@/components/ui/card'
import { usePrompticornChat } from '@/app/chat/[chatId]/usePrompticornChat'
import { BotChatMessage } from './BotChatMessage'
import IndeterminateProgressBar from '@/components/IndeterminantProgressBar'

type ChatProps = {
  params: { chatId: string }
}

export default function Chat({ params }: ChatProps) {
  const [userScrolledUp, setUserScrolledUp] = useState(false)
  const { chatId } = params
  const { messages, input, handleSubmit, isLoading, setInput, isThinking } =
    usePrompticornChat(chatId)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  // Scroll to bottom on new messages.
  useEffect(() => {
    if (userScrolledUp) return
    if (messages.length > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, userScrolledUp])

  // Listen to scroll events and remember if the user scrolled up.
  useEffect(() => {
    const handleScroll = (event: Event) => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      setUserScrolledUp(!scrolledToBottom)
    }

    window.addEventListener('wheel', handleScroll)
    return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit the form with CMD+Enter or CTRL+Enter.
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      if (submitButtonRef.current) {
        submitButtonRef.current.click()
      }
    }

    // Use last prompt with Shift+Arrow Up.
    if ((event.metaKey || event.shiftKey) && event.key === 'ArrowUp') {
      event.preventDefault()
      useLastPrompt()
    }
  }

  const wrappedSubmit = (e: FormEvent<HTMLFormElement>) => {
    setUserScrolledUp(false)
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'instant',
    })
    handleSubmit(e)
  }

  // Use the last prompt from the user messages as input.
  const useLastPrompt = () => {
    const userMessages = messages.filter((m) => m.role === 'user')
    const lastUserMessage = userMessages[userMessages.length - 1]?.content
    refinePrompt(lastUserMessage)
  }

  // Set a previous prompt as input and focus the textarea.
  const refinePrompt = (prompt: string) => {
    setInput(prompt)
    document.getElementById('promptInput')?.focus()
  }

  const ThinkingMessage = () => (
    <div>
      <BotChatMessage
        message={{
          id: 'none',
          content: '',
          role: 'assistant',
        }}
        userPrompt=""
        onRefinePrompt={() => {}}
      />
      <IndeterminateProgressBar />
    </div>
  )

  return (
    <div className="bg-card bg-noise text-card-foreground md:bg-inherit md:text-inherit min-h-screen">
      <SiteHeader />
      {!isLoading && (
        <div className="animate-fadeIn w-full max-w-prose md:py-8 md:px-2 mb-4 relative mx-auto ">
          <div className="md:hidden px-4">
            <ChatList messages={messages} onRefinePrompt={refinePrompt} />
            {isThinking && messages[messages.length - 1].role === 'user' && (
              <ThinkingMessage />
            )}
          </div>
          <Card className="hidden md:block">
            <CardContent>
              <div>
                <ChatList messages={messages} onRefinePrompt={refinePrompt} />
                {isThinking &&
                  messages[messages.length - 1].role === 'user' && (
                    <ThinkingMessage />
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="h-[150px]"></div>
      <div className="fixed bottom-0 left-0 w-full px-2 py-4 shadow-top md:shadow-none border-t md:border-none border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* <p>Prompticorn is over, thanks for participating.</p> */}
        <form onSubmit={wrappedSubmit} className="max-w-prose w-full mx-auto">
          <Textarea
            id="promptInput"
            className="border-2 bg-background "
            value={input}
            placeholder="Your prompt here"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
          />

          <Button
            type="submit"
            className="w-full mt-4 block mx-auto"
            ref={submitButtonRef}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
