import { Request } from '../types'
import { RequestCollections, ResponseCollections } from './types'

export class ordinalsCollections {
  private client: Request
  constructor(client: Request) {
    this.client = client
  }
  async ordinals_collections(params: RequestCollections) {
    const path = '/mktplace/nft/ordinals/collections'
    return await this.client.sendRequest<
      RequestCollections,
      ResponseCollections
    >('GET', path, params)
  }
}
