import { Manager, MCEvent } from '@managed-components/types'
import { flattenKeys } from './utils'

const SETTING_PREFIX = '__setting_'

function getSettingField(payload: MCEvent['payload'], key: string) {
  return payload[SETTING_PREFIX + key] || payload[key]
}

function handleEvents(manager: Manager, event: MCEvent) {
  const method = getSettingField(event.payload, 'method')
  try {
    if (method?.startsWith('post')) {
      sendPostRequest(manager, event)
    } else {
      sendGetRequest(manager, event)
    }
  } catch {
    //empty
  }
}

export function createRequestBody(event: MCEvent) {
  let requestBody = { ...event.payload }
  const method = getSettingField(requestBody, 'method')
  ;['method', 'endpoint', 'ecommerce'].forEach(key => {
    if (requestBody[SETTING_PREFIX + key]) {
      delete requestBody[SETTING_PREFIX + key]
    } else {
      delete requestBody[key]
    }
  })

  if (method && method.endsWith('urlencoded')) {
    requestBody = new URLSearchParams(flattenKeys(requestBody)).toString()
  }
  return requestBody
}

export function sendPostRequest(manager: Manager, event: MCEvent) {
  manager.fetch(`${getSettingField(event.payload, 'endpoint')}`, {
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
  const url = new URL(`${getSettingField(event.payload, 'endpoint')}`)
  for (const [key, val] of new URLSearchParams(
    flattenKeys(requestBody)
  ).entries()) {
    url.searchParams.append(key, val)
  }
  return url
}

export function sendGetRequest(manager: Manager, event: MCEvent) {
  manager.fetch(`${constructGetRequestUrl(event)}`)
}

// Event listeners
export default async function (manager: Manager) {
  manager.addEventListener('event', (event: MCEvent) => {
    return handleEvents(manager, event)
  })
  manager.addEventListener('ecommerce', (event: MCEvent) => {
    return handleEvents(manager, event)
  })
}
