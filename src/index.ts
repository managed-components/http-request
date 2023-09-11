import { Manager } from '@managed-components/types'
import { sendEventPost } from './post'
import { sendEventGet } from './get'

export default async function (manager: Manager) {
  await manager.addEventListener('event', async event => {
    console.log('Manager on event listener:', JSON.stringify(manager))
    //checks if this is a POST or GET methos
    if (event.payload.method.startsWith('post')) {
      sendEventPost(event)
    } else {
      sendEventGet(event)
    }
  })
  await manager.addEventListener('ecommerce', async event => {
    console.log('Manager on ecom listener:', JSON.stringify(manager))
    //checks if this is a POST or GET methos
    if (event.payload.method.startsWith('post')) {
      sendEventPost(event)
    } else {
      sendEventGet(event)
    }
  })
}
