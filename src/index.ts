import { Manager, MCEvent } from '@managed-components/types'
import { flattenKeys } from './utils'

// Functions related to post requests

export function preparePostRequestBody(event: MCEvent) {
  let requestBody = { ...event.payload }
  delete requestBody.method
  delete requestBody.endpoint
  delete requestBody.ecommerce //should we also cleanup "__zcl_track"?

  // check if the request body has to be encoded
  if (event.payload.method.endsWith('urlencoded')) {
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
    body: JSON.stringify(preparePostRequestBody(event)),
  })
}

// Functions related to get requests
export function constructGetRequestUrl(event: MCEvent) {
  const requestBody = { ...event.payload }
  delete requestBody.method
  delete requestBody.endpoint
  delete requestBody.ecommerce //should we also cleanup "__zcl_track"?
  const url = new URL(`${event.payload.endpoint}`)
  for (const [key, val] of new URLSearchParams(
    flattenKeys(requestBody)
  ).entries()) {
    url.searchParams.append(key, val)
  }
  return url
}

export function sendGetRequest(event: MCEvent) {
  fetch(`${constructGetRequestUrl(event)}`, {
    method: 'GET',
  })
}

// Event listeners
export default async function (manager: Manager) {
  await manager.addEventListener('event', async event => {
    if (event.payload.method.startsWith('post')) {
      sendPostRequest(event)
    } else {
      sendGetRequest(event)
    }
  })
  await manager.addEventListener('ecommerce', async event => {
    if (event.payload.method.startsWith('post')) {
      sendPostRequest(event)
    } else {
      sendGetRequest(event)
    }
  })
}
