import {Request} from "../types";
import {AddressEntry, CursorItem, UpdateAccountEntry} from "./types";


export class AccountManager {
  readonly client: Request

  constructor(client: Request) {
    this.client = client
  }

  async create(addresses: AddressEntry[]) {
    const path = '/wallet/account/create-wallet-account'
    return this.client.sendRequest<AddressEntry[], {
      accountId: string
    }>('POST', path, addresses)
  }

  async update(params: UpdateAccountEntry) {
    const path = '/wallet/account/update-wallet-account'
    return this.client.sendRequest<UpdateAccountEntry, null>('POST', path, params)
  }

  async delete(accountId: string) {
    const path = '/wallet/account/delete-account'
    return this.client.sendRequest<any, null>('POST', path, {
      accountId
    })
  }

  async accounts(cursor = '1', limit = '50') {
    const path = '/wallet/account/accounts'
    if (Number(limit) > 100) throw new Error('max exceed limit 100')
    return this.client.sendRequest('GET', path, {
      limit,
      cursor
    })
  }

  async addresses(accountId: string, cursor= '1', limit='50', chainIndex?: string) {
    const path = '/wallet/account/account-detail'
    return this.client.sendRequest<any, CursorItem>('GET', path)
  }

}
