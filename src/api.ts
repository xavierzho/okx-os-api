import {Client, OkxConfig} from "./client";
import {WalletAPI} from "./wallet";

export class OkxOsApi {
  _client: Client
  _wallet: WalletAPI
  constructor(options: OkxConfig) {
    this._client = new Client(options)
    this._wallet = new WalletAPI(this._client)
  }

  get wallet() {
    return this._wallet
  }
}

export default OkxOsApi
