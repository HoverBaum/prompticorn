import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { AzureImageResponse, ImageResponse } from './types'
import { nanoid } from '@/lib/customNanoId'
import { IMAGE_GENERATION_KEY } from '@/lib/constants'

type ImageGenerationContextProps = {
  generateImage: (prompt: string, comesAfterId: string, eventId: string) => void
  imageGenerations: ImageGeneration[]
}

type AdditionalMessageProviderProps = {
  children: React.ReactNode
}

const ImageGenerationContext = createContext<
  ImageGenerationContextProps | undefined
>(undefined)

export const useImageGeneration = () => {
  const context = useContext(ImageGenerationContext)
  if (!context) {
    throw new Error(
      'useImageGeneration must be used within a ImageGenerationContext'
    )
  }
  return context
}

export const useBotMessageImageGeneration = (botMessageId: string) => {
  const context = useImageGeneration()
  return context.imageGenerations.find(
    (gen) => gen.botMessageId === botMessageId
  )
}

type BaseImageGeneration = {
  id: string
  botMessageId: string
  prompt: string
}

type GeneratingImageGeneration = BaseImageGeneration & {
  state: 'generating'
}

type ErrorImageGeneration = BaseImageGeneration & {
  state: 'error'
}

export type SuccessFullImageGeneration = BaseImageGeneration & {
  state: 'success'
  src: string
  fullPrompt: string
}

export type ImageGeneration =
  | SuccessFullImageGeneration
  | GeneratingImageGeneration
  | ErrorImageGeneration

type ImageGenerationAction =
  | { type: 'addGeneration'; id: string; botMessageId: string; prompt: string }
  | { type: 'setError'; id: string }
  | { type: 'setSuccess'; id: string; src: string; fullPrompt: string }
  | { type: 'hydrate'; generations: ImageGeneration[] }

function imageGenerationReducer(
  state: ImageGeneration[],
  action: ImageGenerationAction
): ImageGeneration[] {
  switch (action.type) {
    case 'addGeneration':
      return [
        ...state.filter((item) => item.botMessageId !== action.botMessageId),
        {
          id: action.id,
          state: 'generating',
          botMessageId: action.botMessageId,
          prompt: action.prompt,
        },
      ]
    case 'setError':
      return state.map((item) =>
        item.id === action.id ? { ...item, state: 'error' } : item
      )
    case 'setSuccess':
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              state: 'success',
              src: action.src,
              fullPrompt: action.fullPrompt,
            }
          : item
      )
    case 'hydrate':
      return action.generations
    default:
      throw new Error()
  }
}

export const ImageGenerationProvider = ({
  children,
}: AdditionalMessageProviderProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [imageGenerations, dispatch] = useReducer(imageGenerationReducer, [])

  useEffect(() => {
    const storedGenerations = localStorage.getItem(IMAGE_GENERATION_KEY)
    if (storedGenerations) {
      dispatch({ type: 'hydrate', generations: JSON.parse(storedGenerations) })
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading) return
    localStorage.setItem(IMAGE_GENERATION_KEY, JSON.stringify(imageGenerations))
  }, [imageGenerations, isLoading])

  const generateImage = async (
    prompt: string,
    botMessageId: string,
    eventId: string
  ) => {
    if (
      imageGenerations.find((gen) => gen.botMessageId === botMessageId)
        ?.state === 'generating'
    ) {
      return
    }
    const id = nanoid()
    dispatch({ type: 'addGeneration', id, botMessageId, prompt })

    const content = { prompt, eventId }

    const response: AzureImageResponse = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: 'setSuccess',
          id,
          src: res.url,
          fullPrompt: res.actual_prompt,
        })
        return res
      })
      .catch((e) => {
        console.error(e)
        dispatch({ type: 'setError', id })
      })
    console.log(response)
    // if (response['url']) {
    //   dispatch({
    //     type: 'setSuccess',
    //     id,
    //     src: response.url,
    //     fullPrompt: response.actual_prompt,
    //   })
    // }
  }

  return (
    <ImageGenerationContext.Provider
      value={{ generateImage, imageGenerations }}
    >
      {children}
    </ImageGenerationContext.Provider>
  )
}
