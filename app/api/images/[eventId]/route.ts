import { GalleryImage } from '@/app/types'
import { isOngoing, isOver } from '@/lib/eventUtils'
import { readEvents } from '@/lib/eventUtilsServer'
import { BlobServiceClient } from '@azure/storage-blob'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { eventId: string } }) {
  const eventId = params.eventId
  const events = await readEvents()
  if (!process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING) {
    console.error('Azure Blob Storage Connection String not found')
    return NextResponse.json(
      { message: 'Backend not configured correctly' },
      { status: 500 }
    )
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING
  )
  const containerClient = blobServiceClient.getContainerClient(
    eventId
  )
  const isOngoingOrPastEventId = events.some(evt => evt.id === eventId && (isOngoing(evt) || isOver(evt)))
  const containerExists = await containerClient.exists()
  if (!isOngoingOrPastEventId && !containerExists) {
    return NextResponse.error()
  } else if (!containerExists) {
    const createContainerResponse = await containerClient.create({
      access: 'blob',
    })
    console.log(
      `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
    )
  }

  const images: GalleryImage[] = []

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    // Get Blob Client from name, to get the URL
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name)
    const properties = await tempBlockBlobClient.getProperties()
    const prompt = decodeURIComponent(
      properties.metadata?.prompt || '404 Prompt Not Found 😢'
    )

    // Display blob name and URL
    images.push({
      id: blob.name.split('.')[0],
      imageSrc: tempBlockBlobClient.url,
      createdAt: blob.properties.createdOn || new Date(),
      prompt: prompt,
    })
  }

  return NextResponse.json(images)
}
