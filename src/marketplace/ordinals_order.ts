import {
  Request,
  RequestCollections, RequestMakeOrders,
  RequestOrdinalsListings, RequestOrdinalsTradeHistory,
  ResponseCollections, ResponseMakeOrders,
  ResponseOrdinalsListings, ResponseOrdinalsTradeHistory
} from '../types'
import {RequestValidInscriptions, ResponseValidInscriptions} from './types'

export class ordinalsOrder {
  private client: Request

  constructor(client: Request) {
    this.client = client
  }

  async get_valid_inscriptions(params: RequestValidInscriptions) {
    const path = '/marketplace/ordinals/get-valid-inscriptions'
    return await this.client.sendRequest<
      RequestValidInscriptions,
      ResponseValidInscriptions
    >('GET', path, params)
  }

  async collections(params: RequestCollections) {
    const path = '/marketplace/nft/ordinals/collections'
    return await this.client.sendRequest<
      RequestCollections,
      ResponseCollections
    >('GET', path, params)
  }

  async listings(params: RequestOrdinalsListings) {
    const path = '/marketplace/nft/ordinals/listings'
    return await this.client.sendRequest<
      RequestOrdinalsListings,
      ResponseOrdinalsListings
    >('GET', path, params)
  }

  async make_orders(params: RequestMakeOrders) {
    const path = '/marketplace/nft/ordinals/okx/make-orders'
    return await this.client.sendRequest<RequestMakeOrders, ResponseMakeOrders>(
      'POST',
      path,
      params
    )
  }

  async trade_history(params: RequestOrdinalsTradeHistory) {
    const path = '/marketplace/nft/ordinals/trade-history'
    return await this.client.sendRequest<
      RequestOrdinalsTradeHistory,
      ResponseOrdinalsTradeHistory
    >('POST', path, params)
  }
}
