import { ImageResponse } from '@/app/types'
import OpenAI from 'openai'
import { saveImageResponse } from './saveImage'
import { nanoid } from '@/lib/customNanoId'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()
  console.log('image prompt:', prompt)

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    size: '1024x1024',
  })

  const imageSrc = response.data[0].url!
  const revisedPrompt = response.data[0].revised_prompt!

  const responseObject: ImageResponse = {
    timestamp: Date.now(),
    prompt,
    imageSrc,
    revisedPrompt,
    id: `image:${nanoid()}`,
  }

  await saveImageResponse(responseObject)

  return new Response(JSON.stringify(responseObject), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}
