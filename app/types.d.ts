import { Message } from 'ai'

export type ImageResponse = {
  timestamp: number
  prompt: string
  imageSrc: string
  revisedPrompt: string
  id: string
}

export type AzureImageResponse = {
  actual_prompt: string
  url: string
  user_prompt: string
}

export type AzureGalleryResponse = {
  name: string
  url: string
  user_prompt: string
  actual_prompt: string
  creation_date: string
}

export type GalleryImage = {
  prompt: string
  imageSrc: string
  id: string
  createdAt: Date
}

export type DisplayedGalleryImage = GalleryImage & {
  addedAt: number
  displayId: string
}

type PromptRatingResponse = {
  /**
   * The rating of the prompt, from 0 to 10.
   */
  rating: number
}

export type ChatMessageType = {
  id: string
  content: string
  role: Message['role']
  canCreateImage?: boolean
  imageId?: string
  showsHint?: boolean
}

export type ChatType = {
  id: string
  messages: ChatMessageType[]
  name: string
  startedAt: number
}

export type EventType = {
  id: string
  displayName: string
  startTime: string
  endTime: string
}

export type EventTypeWithDate = {
  id: string
  displayName: string
  startTime: Date
  endTime: Date
}

// DEPRECATED
export type AdditionalMessage = {
  id: string
  role: 'welcome' | 'image_creator'
  content: string | React.ReactNode
  comesAfterId: string
}
