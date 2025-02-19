import {
  AccountTxsEntry,
  AddressTxsEntry,
  Protocol,
  TransactionDetail,
  HistoryTxs,
  InscriptionDetailRequest,
  InscriptionTxs,
  Request
} from '../types'

export class PostTransaction {
  client: Request

  constructor(client: Request) {
    this.client = client
  }

  async address_history(params: AddressTxsEntry) {
    const path = '/wallet/post-transaction/transactions-by-address'
    return await this.client.sendRequest<AddressTxsEntry, HistoryTxs>(
      'GET',
      path,
      params
    )
  }

  async account_history(params: AccountTxsEntry) {
    const path = '/wallet/post-transaction/transactions'
    return await this.client.sendRequest<any, HistoryTxs>(
      'GET',
      path,
      params
    )
  }

  async tx(txHash: string, chainIndex: string, iType = '0') {
    const path = '/wallet/post-transaction/transaction-detail-by-txhash'
    return await this.client.sendRequest<any, TransactionDetail[]>(
      'GET',
      path,
      {
        txHash,
        chainIndex,
        iType,
      }
    )
  }

  async inscription(
    chainIndex: string,
    txHash: string,
    protocol: Protocol = Protocol.BRC20,
    limit = '20',
    cursor = '1',
  ) {
    const path =
      '/wallet/post-transaction/inscription-transaction-detail-by-txhash'
    if (Number(limit) > 100) throw new Error('max exceed limit 100')
    return await this.client.sendRequest<InscriptionDetailRequest, InscriptionTxs>('GET', path, {
      chainIndex,
      txHash,
      protocol,
      cursor,
      limit,
    })
  }
}
