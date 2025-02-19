import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChatMessageType } from '../../types'
import { nanoid } from '@/lib/customNanoId'

export type ChatState = {
  chatId: string
  chatName: string
  messages: ChatMessageType[]
}

const initialState: ChatState = {
  chatId: nanoid(),
  chatName: 'New Chat',
  messages: [
    {
      id: 'much-id-so-wow',
      role: 'assistant',
      content: `**Hi there 👋**

Start by typing an image prompt below 👇
          
Improve your prompt using the bots suggestions. Once your prompts quality passes the threashold, you will get an image a place in our hall of fame 🏆`,
    },
  ],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessageType>) => {
      state.messages.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMessage } = chatSlice.actions
export const chatReducer = chatSlice.reducer
