import { Card, CardContent } from '@/components/ui/card'
import RainbowImage from '../Rainbow.png'
import { StartButton } from '../StartButton'
import { HistoryButton } from '../HistoryButton'
import { notFound } from 'next/navigation'
import { isOngoing } from '../../lib/eventUtils'
import { readEvents } from '@/lib/eventUtilsServer'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CameraIcon } from '@radix-ui/react-icons'

export default async function EventHome({
  params,
}: {
  params: { eventId: string }
}) {
  const events = await readEvents()

  const pageEvent = events.find((evt) => evt.id === params.eventId)

  if (!pageEvent) {
    return notFound()
  }

  return (
    <div className="grid place-items-center min-h-screen px-4 py-2">
      <Card
        className="w-full max-w-prose relative pt-16 pb-2 overflow-hidden bg-[#a29aff] bg-right-bottom bg-no-repeat bg-[size:50%]"
        style={{
          backgroundImage: `url(${RainbowImage.src})`,
        }}
      >
        <div className="absolute inset-0 bg-[#a29aff] opacity-30"></div>
        <CardContent className="relative z-10">
          <h1 className="scroll-m-20 mb-4 text-4xl font-extrabold tracking-tight lg:text-6xl text-center">
            Prompticorn
          </h1>
          {isOngoing(pageEvent) ? (
            <div className="mt-10 max-w-[35ch] mx-auto text-justify">
              <p>
                <b>Hi there 👋</b>
              </p>
              <p>
                On the next page you will see a chat window where you can talk
                to "Prompticorn". Come up with a prompt to generate an image and
                you will get suggestions to improve your prompt. Iterate on your
                prompt until Prompticorn likes it.
                <br />
                Once your prompt satisfies the Prompticorn, it will offer you a
                button to generate an image.
              </p>
            </div>
          ) : (
            <Alert className="bg-[#a29aff] max-w-prose">
              <CameraIcon className="h-4 w-4" />
              <AlertTitle className="font-bold">Event is over</AlertTitle>
              <AlertDescription>
                You can still browse your images below 🦄
              </AlertDescription>
            </Alert>
          )}

          {isOngoing(pageEvent) && <StartButton />}
          <HistoryButton />

          <div className="flex justify-end mt-2">
            <span>
              Powered by{' '}
              <a
                className="underline"
                href="https://netlight.com/"
                target="_blank"
              >
                Netlight
              </a>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
