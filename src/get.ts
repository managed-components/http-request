import { MCEvent } from '@managed-components/types'
import { flattenKeys } from './utils'

export function getRequestUrl(event: MCEvent) {
  const requestBody = { ...event.payload }
  delete requestBody.method
  delete requestBody.endpoint //should we also cleanup "__zcl_track"?

  // replace requestbin with `event.payload.endpoint` after testing
  const url = new URL('https://enlitaswx7po.x.pipedream.net/')
  for (const [key, val] of new URLSearchParams(
    flattenKeys(requestBody)
  ).entries()) {
    url.searchParams.append(key, val)
  }
  return url
}

export function sendEventGet(event: MCEvent) {
  // using requestbin for testing, should be replaced with ${event.payload.endpoint}
  fetch(`${getRequestUrl(event)}`, {
    method: 'GET',
  })
}
