'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { ImageGenerationProvider } from './ImageGeneration.context'
import { AppStore, makeStore } from './store'
import { EventProvider } from '@/providers/eventProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  return (
    <Provider store={storeRef.current}>
      <EventProvider>
        <ImageGenerationProvider>{children}</ImageGenerationProvider>
      </EventProvider>
    </Provider>
  )
}
