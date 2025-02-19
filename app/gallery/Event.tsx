import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EventTypeWithDate } from '../types'

export default function Event({ event }: { event: EventTypeWithDate }) {
  return (
    <Card key={event.id}>
      <CardHeader className="pb-0">{event.displayName}</CardHeader>
      <CardContent className="flex justify-between">
        <small>{new Date(event.startTime).toLocaleString()}</small>
        <small>{new Date(event.endTime).toLocaleString()}</small>
        {event.endTime < new Date() && <small>{'Over'}</small>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/gallery/${event.id}`}>
          <Button>Continue</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
