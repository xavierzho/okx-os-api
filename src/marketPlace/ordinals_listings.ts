import { Request } from '../types'
import { RequestOrdinalsListings, ResponseOrdinalsListings } from './types'

export class ordinalsListings {
  private client: Request
  constructor(client: Request) {
    this.client = client
  }
  async ordinals_listings(params: RequestOrdinalsListings) {
    const path = '/mktplace/nft/ordinals/listings'
    return await this.client.sendRequest<
      RequestOrdinalsListings,
      ResponseOrdinalsListings
    >('GET', path, params)
  }
}
