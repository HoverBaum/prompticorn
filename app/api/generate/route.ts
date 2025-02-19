import { isOngoing } from '@/lib/eventUtils'
import { readEvents } from '@/lib/eventUtilsServer'
import { BlobServiceClient } from '@azure/storage-blob'
import { nanoid } from '@/lib/customNanoId'
import { AzureOpenAI } from 'openai'

export async function POST(req: Request) {
  const { prompt, eventId } = await req.json()
  console.log('image prompt:', prompt)

  const events = await readEvents()

  const isValidEventId = events.some(evt => evt.id === eventId && isOngoing(evt))

  if (!isValidEventId) {
    return new Response('Invalid eventId', { status: 400 })
  }

  if (!prompt) {
    return new Response('Prompt is required', { status: 400 })
  }

  // Generate image using DALL-E.
  console.log('Generating image...')
  const client = new AzureOpenAI({
    apiVersion: process.env.DALLE_API_VERSION,
    endpoint: process.env.AZURE_ENDPOINT,
    apiKey: process.env.AZURE_API_KEY,
  })
  const dalleResult = await client.images.generate({
    prompt,
    model: 'dall-e-3',
    size: '1024x1024',
  })

  if (dalleResult.data.length === 0 || dalleResult.data[0].url === undefined) {
    console.log(dalleResult)
    return new Response('Image generation failed, please retry', { status: 500 })
  }
  const imageResult = dalleResult.data[0]
  console.log('Image generated:', imageResult.url)

  // Store image in Blobl storage.
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING as string
  )

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(
    eventId
  )
  //Check if container exists
  console.log('Checking if container exists...')
  const containerExists = await containerClient.exists()
  // Create the container
  if (!containerExists) {
    const createContainerResponse = await containerClient.create({
      access: 'blob',
    })
    console.log(
      `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
    )
  } else {
    console.log('Container already exists!')
  }

  // Create a unique name for the blob
  console.log('Storing image in blob storage...')
  const blobName = nanoid() + '.png'

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)

  // Display blob name and url
  console.log(
    `Uploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
  )

  // checked for existence of url earlier
  const imageResponse = await fetch(imageResult.url!)
  if (!imageResponse.ok) {
    throw new Error(
      `Failed to fetch image. Status code: ${imageResponse.status}`
    )
  }

  const arrayBuffer = await imageResponse.arrayBuffer()
  await blockBlobClient.uploadData(arrayBuffer)
  await blockBlobClient.setMetadata({
    prompt: encodeURIComponent(prompt),
    revisedPrompt: encodeURIComponent(imageResult.revised_prompt!),
  })
  console.log('Image stored in blob storage:', blockBlobClient.url)

  // Return image link from storage and final prompt.
  return new Response(
    JSON.stringify({
      url: blockBlobClient.url,
      actual_prompt: imageResult.revised_prompt,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  )
}
