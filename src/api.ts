import { Client, OkxConfig } from './client'
import { WalletAPI } from './wallet'
import { MarketPlaceAPI } from './marketplace'
export class OkxOsApi {
  _client: Client
  _wallet: WalletAPI

  _marketPlace: MarketPlaceAPI

  constructor(options: OkxConfig) {
    this._client = new Client(options)
    this._wallet = new WalletAPI(this._client)
    this._marketPlace = new MarketPlaceAPI(this._client)
  }

  get wallet() {
    return this._wallet
  }

  get marketplace() {
    return this._marketPlace
  }
}

export default OkxOsApi
