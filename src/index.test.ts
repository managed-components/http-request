import { MCEvent } from '@managed-components/types'
import { constructGetRequestUrl, createRequestBody } from '.'
const mockEvent: MCEvent = {
  type: 'ecommerce',
  client: {
    emitter: 'browser',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    language: 'en-GB,en-US;q=0.9,en;q=0.8',
    referer: '',
    ip: '::1',
    title: 'Example Dot Com',
    timestamp: 1694436541740,
    url: new URL('http://example.com'),
    fetch: () => undefined,
    set: () => undefined,
    execute: () => undefined,
    return: () => undefined,
    get: () => undefined,
    attachEvent: () => undefined,
    detachEvent: () => undefined,
  },
  payload: {
    endpoint: 'https://example.com',
    name: 'Order Completed',
    app_id: 'wow1234',
    app_name: 'terrificapp!',
    app_version: 'my version 1234',
    checkout_id: '616727740',
    order_id: '817286897056801',
    affiliation: 'affiliate.com',
    total: 30,
    revenue: 20,
    shipping: 3,
    tax: 2,
    discount: 5,
    coupon: 'winter-sale',
    currency: 'USD',
    products: [
      {
        product_id: '999666321',
        sku: '8251511',
        name: 'Boy’s shorts',
        price: 10,
        quantity: 2,
        category: 'shorts',
      },
      {
        product_id: '742566131',
        sku: '7251567',
        name: 'Blank T-shirt',
        price: 5,
        quantity: 2,
        category: 'T-shirts',
      },
    ],
    ecommerce: {},
  },
}
describe('check the constructGetRequestUrl function', () => {
  it('check that the resulted url from mockEvent is identical', async () => {
    const mockGetRequestHref = constructGetRequestUrl(mockEvent).href
    const expectedUrlHref =
      'https://example.com/?name=Order+Completed&app_id=wow1234&app_name=terrificapp%21&app_version=my+version+1234&checkout_id=616727740&order_id=817286897056801&affiliation=affiliate.com&total=30&revenue=20&shipping=3&tax=2&discount=5&coupon=winter-sale&currency=USD&products.0.product_id=999666321&products.0.sku=8251511&products.0.name=Boy%E2%80%99s+shorts&products.0.price=10&products.0.quantity=2&products.0.category=shorts&products.1.product_id=742566131&products.1.sku=7251567&products.1.name=Blank+T-shirt&products.1.price=5&products.1.quantity=2&products.1.category=T-shirts'
    expect(mockGetRequestHref).toEqual(expectedUrlHref)
  })
})

describe('check the preparePostRequestBody function when method is post', () => {
  it('check that the resulted body from mockEvent is identical', async () => {
    mockEvent.payload['method'] = 'post'
    const mockRequestBody = createRequestBody(mockEvent)
    const expectedRequestBody = {
      name: 'Order Completed',
      app_id: 'wow1234',
      app_name: 'terrificapp!',
      app_version: 'my version 1234',
      checkout_id: '616727740',
      order_id: '817286897056801',
      affiliation: 'affiliate.com',
      total: 30,
      revenue: 20,
      shipping: 3,
      tax: 2,
      discount: 5,
      coupon: 'winter-sale',
      currency: 'USD',
      products: [
        {
          product_id: '999666321',
          sku: '8251511',
          name: 'Boy’s shorts',
          price: 10,
          quantity: 2,
          category: 'shorts',
        },
        {
          product_id: '742566131',
          sku: '7251567',
          name: 'Blank T-shirt',
          price: 5,
          quantity: 2,
          category: 'T-shirts',
        },
      ],
    }
    expect(mockRequestBody).toEqual(expectedRequestBody)
  })
})

describe('check the preparePostRequestBody function when method is post urlencoded', () => {
  it('check that the resulted body from mockEvent is identical', async () => {
    mockEvent.payload['method'] = 'post urlencoded'
    const mockRequestBody = createRequestBody(mockEvent)
    const expectedRequestBody =
      'name=Order+Completed&app_id=wow1234&app_name=terrificapp%21&app_version=my+version+1234&checkout_id=616727740&order_id=817286897056801&affiliation=affiliate.com&total=30&revenue=20&shipping=3&tax=2&discount=5&coupon=winter-sale&currency=USD&products.0.product_id=999666321&products.0.sku=8251511&products.0.name=Boy%E2%80%99s+shorts&products.0.price=10&products.0.quantity=2&products.0.category=shorts&products.1.product_id=742566131&products.1.sku=7251567&products.1.name=Blank+T-shirt&products.1.price=5&products.1.quantity=2&products.1.category=T-shirts'
    expect(mockRequestBody).toEqual(expectedRequestBody)
  })
})
