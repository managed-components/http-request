import { Manager, MCEvent } from '@managed-components/types'
import { flattenKeys } from './utils'

function handleEvents(event: MCEvent) {
  if (event.payload.method && event.payload.method.startsWith('post')) {
    sendPostRequest(event)
  } else {
    sendGetRequest(event)
  }
}

export function createRequestBody(event: MCEvent) {
  let requestBody = { ...event.payload }
  delete requestBody.method
  delete requestBody.endpoint
  delete requestBody.ecommerce
  if (event.payload.method && event.payload.method.endsWith('urlencoded')) {
    requestBody = new URLSearchParams(flattenKeys(requestBody)).toString()
  }
  return requestBody
}

export function sendPostRequest(event: MCEvent) {
  fetch(`${event.payload.endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createRequestBody(event)),
  })
}

// Functions related to get requests
export function constructGetRequestUrl(event: MCEvent) {
  const requestBody = createRequestBody(event)
  const url = new URL(`${event.payload.endpoint}`)
  for (const [key, val] of new URLSearchParams(
    flattenKeys(requestBody)
  ).entries()) {
    url.searchParams.append(key, val)
  }
  return url
}

export function sendGetRequest(event: MCEvent) {
  fetch(`${constructGetRequestUrl(event)}`)
}

// Event listeners
export default async function (manager: Manager) {
  await manager.addEventListener('event', handleEvents)
  await manager.addEventListener('ecommerce', handleEvents)
}
