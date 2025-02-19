'use client'

import { Card } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import QRCode from 'react-qr-code'

type GalleryQRProps = {
  eventId: string
}

export const GalleryQR = ({ eventId }: GalleryQRProps) => {
  const searchParams = useSearchParams()
  const noqr = searchParams.get('noqr')

  if (noqr !== null) {
    console.log('Opted out of QRCode')
    return null
  }

  return (
    <Card className="fixed bottom-8 right-8 z-[200] p-6">
      <QRCode
        size={200}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value={`https://prompticorn.edgez.live/${eventId}`}
        viewBox={`0 0 256 256`}
        bgColor="hsl(var(--card))"
        fgColor="hsl(var(--card-foreground))"
      />
      <p className="text-xl text-center mt-4">Create your own</p>
    </Card>
  )
}
