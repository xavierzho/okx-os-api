import { Request } from '../types'
import { ordinalsOrder } from './ordinals_order'

export class MarketPlaceAPI {
  client: Request
  readonly ordinalsOrder: ordinalsOrder

  constructor(client: Request) {
    this.client = client
    this.ordinalsOrder = new ordinalsOrder(this.client)
  }
}
