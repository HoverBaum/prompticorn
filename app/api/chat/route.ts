import { CoreMessage, streamText } from 'ai'
import { promptHelperPrompt } from './promptHelper.prompt'
import { checkIfImagePrompt } from './checkIfImagePrompt'
import { gpt4oMini } from '../azure'

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  console.log('messages', messages)

  const allMessages: CoreMessage[] = [
    {
      role: 'system',
      content: promptHelperPrompt,
    },
    ...messages,
  ]

  const isImagePrompt = await checkIfImagePrompt(
    messages[messages.length - 1].content
  )
  if (!isImagePrompt) {
    allMessages.push({
      role: 'system',
      content:
        'The last user message was not an image prompt. Kindly remind the user that you only accept image prompts 😊 Note: remember that you never help to write image prompts!',
    })
  }

  const result = await streamText({
    model: gpt4oMini,
    messages: allMessages,
  })

  return result.toDataStreamResponse()
}
