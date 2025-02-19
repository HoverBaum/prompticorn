import { Card, CardContent } from '@/components/ui/card'
import RainbowImage from './Rainbow.png'
import { StartButton } from './StartButton'
import { HistoryButton } from './HistoryButton'

export default function Home() {
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
          <div className="mt-10 max-w-[35ch] mx-auto text-justify">
            <p>
              <b>Hey there, fabulous friend! 🌟</b>
            </p>
            <p>
              Our event is turning up the fun factor, and guess what? We've got
              a magical creature just waiting to chat with{' '}
              <span className="font-bold">YOU</span>! 🦄✨
            </p>
            <p>
              Say hello to the <span className="font-bold">Prompticorn</span> -
              the friendliest, most playful, and oh-so-wise unicorn in town!
              🦄💬
            </p>
            <p>
              Ready for some enchanting conversations? All you need to do is
              take a little trip to our event gallery and find the special QR
              code. 💌📲
            </p>
            <p>
              Once you find that QR code, give it a scan.{' '}
              <span className="font-bold">Poof!</span> Just like magic, you'll
              be whisked away to a chat with the Prompticorn!
            </p>
            <p>
              So, what are you waiting for? Go on and start the hunt for the QR
              code! The Prompticorn can't wait to meet you! 🎈🎉
            </p>
          </div>

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
