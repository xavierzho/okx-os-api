import {Request} from '../types'
import {AddressEntry, CursorItem, HistoryPrice, HistoryPriceEntry, Price, TokenInfo} from "./types";


export class TokenPrice {
  client: Request
  constructor(client: Request) {
    this.client = client
  }
  async current_price(tokens: AddressEntry[]) {
    const path = '/wallet/token/current-price'
    return await this.client.sendRequest<AddressEntry[], Price>('POST', path, tokens)
  }

  async real_time_price(tokens: AddressEntry[]) {
    const path = '/wallet/token/real-time-price';
    return await this.client.sendRequest<AddressEntry[], Price>(
      'POST',
      path,
      tokens,
    );
  }

  async history_price(token: HistoryPriceEntry) {
    const path = '/wallet/token/historical-price';
    return await this.client.sendRequest<HistoryPriceEntry, HistoryPrice & CursorItem>(
      'POST',
      path,
      token,
    );
  }

  async token_info(tokens: AddressEntry[]) {
    const path =
      '/wallet/token/token-detail'
    return await this.client.sendRequest<AddressEntry[], TokenInfo>('GET', path, tokens)
  }
}
