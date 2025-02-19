// Import required modules
import { customAlphabet } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts'
import { BufReader } from 'https://deno.land/std@0.224.0/io/buf_reader.ts'
import { readLines } from 'https://deno.land/std@0.224.0/io/mod.ts'
import moment from 'https://deno.land/x/momentjs@2.29.1-deno/mod.ts'

export const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 32)

interface Event {
  id: string
  startTime: string
  endTime: string
  displayName: string
}

// Utility functions for handling events
async function loadEvents(): Promise<Event[]> {
  try {
    const data = await Deno.readTextFile('events.json')
    return JSON.parse(data)
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await Deno.writeTextFile('events.json', JSON.stringify([]))
      return []
    } else {
      throw error
    }
  }
}

async function saveEvents(events: Event[]): Promise<void> {
  const data = JSON.stringify(events)
  await Deno.writeTextFile('events.json', data)
}

async function prompt(text: string): Promise<string> {
  await Deno.stdout.write(new TextEncoder().encode(text))
  const reader = new BufReader(Deno.stdin)
  for await (const line of readLines(reader)) {
    return line.trim()
  }
  return ''
}

function parseDate(input: string): string | null {
  const date = moment(input, 'YYYY-MM-DD HH:mm', true)
  if (date.isValid()) {
    return date.toISOString()
  } else {
    return null
  }
}

// Command functions
async function addEvent() {
  console.log('Adding a new event...')

  let startTime: string | null = null
  let endTime: string | null = null

  while (!startTime) {
    const startTimeInput = await prompt('Enter start time (YYYY-MM-DD HH:mm): ')
    startTime = parseDate(startTimeInput)
    if (!startTime) {
      console.log(
        `Invalid start time format. Expected format: YYYY-MM-DD HH:mm`
      )
    }
  }

  while (!endTime) {
    const endTimeInput = await prompt('Enter end time (YYYY-MM-DD HH:mm): ')
    endTime = parseDate(endTimeInput)
    if (!endTime) {
      console.log(`Invalid end time format. Expected format: YYYY-MM-DD HH:mm`)
    }
  }

  const displayName = await prompt('Enter display name: ')
  if (!displayName) {
    console.log('Display name is required')
    return
  }

  const id = nanoid()
  const newEvent: Event = { id, startTime, endTime, displayName }

  const events = await loadEvents()
  events.push(newEvent)
  await saveEvents(events)

  console.log('Event added successfully')
}

async function listEvents() {
  console.log('Listing all events...')
  const events = await loadEvents()
  if (events.length === 0) {
    console.log('No events found.')
    return
  }
  events.forEach((event) => {
    console.log(`ID: ${event.id}`)
    console.log(`Start Time: ${event.startTime}`)
    console.log(`End Time: ${event.endTime}`)
    console.log(`Display Name: ${event.displayName}`)
    console.log('------')
  })
}

async function deleteEvent() {
  console.log('Deleting an event...')
  const id = await prompt('Enter the ID of the event to delete: ')
  if (!id) {
    console.log('Event ID is required')
    return
  }

  const events = await loadEvents()
  const index = events.findIndex((event) => event.id === id)

  if (index === -1) {
    console.log(`No event found with ID: ${id}`)
    return
  }

  events.splice(index, 1)
  await saveEvents(events)

  console.log('Event deleted successfully')
}

// Command-line argument handling
const command = Deno.args[0]

switch (command) {
  case 'add':
    try {
      await addEvent()
    } catch (error) {
      console.error(error)
    }
    break
  case 'list':
    await listEvents()
    break
  case 'delete':
    try {
      await deleteEvent()
    } catch (error) {
      console.error(error)
    }
    break
  default:
    console.log("Unknown command. Use 'add', 'list', or 'delete'.")
}
