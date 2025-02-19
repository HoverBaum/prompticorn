import { imagePromptRecognition } from './imagePromptRecognition.prompt'
import { generateObject } from 'ai'
import { z } from 'zod'
import { gpt4oMini } from '../azure'

export const checkIfImagePrompt = async (message: string): Promise<boolean> => {
  console.log('Image Prompt Check')

  const { object } = await generateObject({
    model: gpt4oMini,
    schema: z.object({
      isImagePrompt: z.boolean(),
    }),
    prompt: imagePromptRecognition(message),
  })
  console.log(object)

  return object.isImagePrompt
}
