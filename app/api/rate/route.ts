import { openai } from '../lib/openAi'
import OpenAI from 'openai'
import { promptRatingPrompt } from './promptRating.prompt'

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()
  console.log('image prompt for rating:', prompt)

  const allMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: promptRatingPrompt,
    },
    {
      role: 'user',
      content: prompt,
    },
  ]

  // Ask OpenAI for a streaming chat completion given the prompt
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: allMessages,
  })

  console.log('completion:', completion)

  const responseText = completion.choices[0].message.content!
  const jsonString = responseText.replaceAll('\n', '')

  console.log('response:', jsonString)

  const responseObject = JSON.parse(jsonString) as {
    rating: number
  }
  return new Response(JSON.stringify(responseObject), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}
