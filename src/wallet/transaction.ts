import {
  AddressEntry, AddressTag, CursorItem,
  EvmGasPrice,
  EvmSignData, Nonce, OrderStatus,
  PreTxEntry, QueryTxsEntry,
  Request, SendTxEntry,
  SolanaSignData, SuiObject, SuiObjectEntry,
  TronSignData,
  UtxoGasPrice
} from '../types'

export class Transaction {
  client: Request

  constructor(client: Request) {
    this.client = client
  }

  async getPreSign(params: PreTxEntry) {
    const path = '/wallet/pre-transaction/sign-info'
    return await this.client.sendRequest<PreTxEntry, EvmSignData | UtxoGasPrice | SolanaSignData | TronSignData>('POST', path)
  }

  async gasPrice(chainIndex: string) {
    const path = '/wallet/pre-transaction/gas-price'
    return await this.client.sendRequest<any, EvmGasPrice | UtxoGasPrice>('GET', path, {
      chainIndex
    })
  }

  async gasLimit(params: PreTxEntry) {
    const path = '/wallet/pre-transaction/gas-limit'
    return await this.client.sendRequest<PreTxEntry, {
      gasLimit: string
    }>('GET', path, params)
  }

  async nonce(params: AddressEntry) {
    const path = '/wallet/pre-transaction/nonce'
    return await this.client.sendRequest<AddressEntry, Nonce>('GET', path, params)
  }

  async sui_object(params: SuiObjectEntry, cursor = '1', limit = '50') {
    const path = '/wallet/pre-transaction/sui-object'
    return await this.client.sendRequest<any, SuiObject & CursorItem>('POST', path, {
      ...params,
      cursor,
      limit
    })
  }

  async isBlacklist(tokenIndex: string, address: string) {
    const path = '/wallet/pre-transaction/validate-address'
    return await this.client.sendRequest<any, AddressTag>('GET', path, {
      tokenIndex, address
    })
  }

  async send_tx(params: SendTxEntry) {
    const path = '/wallet/pre-transaction/broadcast-transaction'
    return await this.client.sendRequest<SendTxEntry, { orderId: string }>('POST', path, params)
  }

  async get_send_tx(params: QueryTxsEntry) {
    const path = '/wallet/post-transaction/orders'
    // 设置默认值
    const defaultParams: Required<Pick<QueryTxsEntry, 'cursor' | 'limit'>> = {
      cursor: '1',
      limit: '50',
    };
    // 合并参数，使用传入的参数覆盖默认值
    const mergedParams = { ...defaultParams, ...params };

    // 验证 address 和 accountId 必须存在其中一个
    if (!mergedParams.address && !mergedParams.accountId) {
      throw new Error('Either address or accountId must be provided.');
    }
    return await this.client.sendRequest<QueryTxsEntry, OrderStatus>('GET', path, params)
  }
}
