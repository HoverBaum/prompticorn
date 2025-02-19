import { createAzure } from '@ai-sdk/azure'

const azure = createAzure({
  resourceName: 'oai-project-prompticorn-shared',
  apiKey: process.env.AZURE_API_KEY,
})
export const gpt4oMini = azure('gpt-4o-mini')
