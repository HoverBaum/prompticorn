import Image from 'next/image'
import PROMPTICORN_IMAGE from './prompticorn.png'
import Link from 'next/link'

type SiteHeaderProps = {
  children?: React.ReactNode
  isCentered?: boolean
}

export function SiteHeader({ children, isCentered }: SiteHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md`}
    >
      <div
        className={`max-w-prose mx-auto px-2 items-center py-2 flex  ${
          isCentered ? 'justify-center' : 'justify-between'
        }`}
      >
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center">
          <Link href="/">
            <Image
              src={PROMPTICORN_IMAGE}
              width={40}
              height={40}
              alt="🦄"
              className="mr-2"
            />
          </Link>
          Prompticorn
        </h1>
        <div className="flex items-center">{children}</div>
      </div>
    </header>
  )
}
