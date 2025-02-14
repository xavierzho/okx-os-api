import { Request } from '../types'
import {
  RequestMakeOrders,
  RequestValidInscriptions,
  ResponseMakeOrders,
  ResponseValidInscriptions,
} from './types'

export class ordinalsOrder {
  private client: Request
  constructor(client: Request) {
    this.client = client
  }
  async get_alid_inscriptions(params: RequestValidInscriptions) {
    const path = '/marketplace/ordinals/valid-inscriptions'
    return await this.client.sendRequest<
      RequestValidInscriptions,
      ResponseValidInscriptions
    >('POST', path, params)
  }
  async make_orders(params: RequestMakeOrders) {
    const path = '/mktplace/nft/ordinals/okx/make-orders'
    return await this.client.sendRequest<RequestMakeOrders, ResponseMakeOrders>(
      'POST',
      path,
      params
    )
  }
}
