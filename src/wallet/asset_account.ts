import {Request} from "../types";
import {AddressEntry, AirdropRisk, AssetType, BalancesByAddress, TotalValue} from "./types";


export class AssetByAccount {
  private client: Request
  constructor(client: Request) {
    this.client = client
  }
  async total_value(accountId: string, chains: string[], assetType = AssetType.all, excludeRiskToken = true) {
    const path = '/wallet/asset/total-value'
    return await this.client.sendRequest<any, TotalValue>('GET', path, {
      accountId,
      chains: chains.join(','),
      assetType,
      excludeRiskToken
    })
  }

  async all_balances(accountId: string, chains: string[], filter = AirdropRisk.filter) {
    const path = '/wallet/asset/wallet-all-token-balances'
    return await this.client.sendRequest<any, BalancesByAddress>('GET', path, {
      accountId,
      chains: chains.join(','),
      filter
    })
  }

  async balances(accountId: string, tokenAddresses: AddressEntry[]) {
    const path = '/wallet/asset/token-balances'
    return await this.client.sendRequest<any, BalancesByAddress>('POST', path, {
      accountId,
      tokenAddresses
    })
  }

}
