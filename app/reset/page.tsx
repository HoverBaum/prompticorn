'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function ResetPage() {
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div className="max-w-prose flex justify-center p-8">
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}
