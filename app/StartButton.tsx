'use client'

import { Button } from '@/components/ui/button'
import { nanoid } from '@/lib/customNanoId'
import { usePathname, useRouter } from 'next/navigation'

export const StartButton = () => {
  const router = useRouter()
  const currentPath = usePathname()

  const start = () => {
    router.push(`${currentPath}/chat/${nanoid()}`)
  }

  return (
    <Button onClick={start} size="lg" className="mx-auto block mt-8">
      <span className="text-lg">New Chat</span>
    </Button>
  )
}
