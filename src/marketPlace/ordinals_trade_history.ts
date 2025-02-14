import { Request } from '../types'
import {
  RequestOrdinalsTradeHistory,
  ResponseOrdinalsTradeHistory,
} from './types'

export class ordinalsTradeHistory {
  private client: Request
  constructor(client: Request) {
    this.client = client
  }
  async ordinals_trade_history(params: RequestOrdinalsTradeHistory) {
    const path = '/mktplace/nft/ordinals/trade-history'
    return await this.client.sendRequest<
      RequestOrdinalsTradeHistory,
      ResponseOrdinalsTradeHistory
    >('POST', path, params)
  }
}
