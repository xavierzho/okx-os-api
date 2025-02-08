import {
  AddressEntry,
  AirdropRisk, ApprovalProject,
  AssetType,
  BalancesByAddress,
  BalancesByAddressEntry, CursorItem, Inscriptions,
  TotalValue,
  TotalValueEntry, UtxoEntry, Utxos
} from "./types";
import {Request} from "../types";

export class AssetByAddress {
  client: Request
  constructor(client: Request) {
    this.client = client
  }

  // https://www.okx.com/zh-hans/web3/build/docs/waas/walletapi-api-total-token-value-address
  async total_value(address: string, chains: string[], assetType = AssetType.all, excludeRiskToken = true) {
    const path = '/wallet/asset/total-value-by-address'
    return await this.client.sendRequest<TotalValueEntry, TotalValue>('GET', path, {
      address,
      chains: chains.join(','),
      assetType,
      excludeRiskToken
    })
  }

  // https://www.okx.com/api/v5/wallet/asset/all-token-balances-by-address
  async all_balances(address: string, chains: string[], filter = AirdropRisk.filter) {
    const path = '/wallet/asset/all-token-balances-by-address'
    return await this.client.sendRequest<any, BalancesByAddress>('GET', path, {
      address,
      chains: chains.join(','),
      filter
    })
  }

  // https://www.okx.com/zh-hans/web3/build/docs/waas/walletapi-api-specific-token-balance-by-address
  async balances(params: BalancesByAddressEntry) {
    const path = '/wallet/asset/token-balances-by-address';
    return await this.client.sendRequest<BalancesByAddressEntry, BalancesByAddress>(
      'POST',
      path,
      params,
    );
  }

  // https://www.okx.com/zh-hans/web3/build/docs/waas/walletapi-api-utxos
  async utxos(params: AddressEntry, cursor = '1', limit = '50') {
    const path = '/wallet/utxo/utxos'
    if (Number(limit) > 100) {
      throw new Error('max exceed limit 100')
    }
    return await this.client.sendRequest<any, Utxos & CursorItem>('GET', path, {
      ...params,
      cursor,
      limit
    })
  }

  async inscriptions(params: UtxoEntry) {
    const path = '/wallet/utxo/utxo-detail'
    return await this.client.sendRequest<UtxoEntry, Inscriptions>('GET', path, params)
  }

  async approvals(addresses: AddressEntry[], cursor = '1', limit = '50') {
    const path = '/wallet/security/approvals'
    if (Number(limit) > 100) {
      throw new Error('max exceed 100')
    }
    return await this.client.sendRequest<any, CursorItem & ApprovalProject>('POST', path, {
      addresses,
      cursor,
      limit
    })
  }

}
