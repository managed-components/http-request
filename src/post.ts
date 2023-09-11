import { MCEvent } from '@managed-components/types'
import { flattenKeys } from './utils'

export function getRequestPost(event: MCEvent) {
  let requestBody = { ...event.payload }
  delete requestBody.method
  delete requestBody.endpoint //should we also cleanup "__zcl_track"?

  // check if the request body has to be encoded
  if (event.payload.method.endsWith('urlencoded')) {
    requestBody = new URLSearchParams(flattenKeys(requestBody)).toString()
  }
  return requestBody
}

export function sendEventPost(event: MCEvent) {
  // using requestbin for testing, should be replaced with ${event.payload.endpoint}
  fetch(`https://enlitaswx7po.x.pipedream.net/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(getRequestPost(event)),
  })
}
