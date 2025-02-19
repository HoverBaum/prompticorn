import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import localFont from 'next/font/local'
import { Providers } from './Providers'

const ProximaNova = localFont({
  src: [
    {
      path: './proximanova/proximanova-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './proximanova/proximanova-bold.otf',
      weight: '700',
      style: 'bold',
    },
  ],
})

export const metadata = {
  title: 'Prompticorn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ProximaNova.className} `} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
