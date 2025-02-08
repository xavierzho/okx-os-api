import {Request} from "../types";
import {SupportedChain} from "./types";
import {TokenPrice} from "./token_price";
import {AssetByAddress} from "./asset_address";
import {AssetByAccount} from "./asset_account";
import {PostTransaction} from "./post_transaction";
import {AccountManager} from "./account_manager";
import {Transaction} from "./transaction";


export class WalletAPI {
  client: Request;
  readonly token_price: TokenPrice
  readonly asset_address: AssetByAddress
  readonly asset_account: AssetByAccount
  readonly post_transaction: PostTransaction
  readonly account_manager: AccountManager
  readonly transaction: Transaction
  constructor(client: Request) {
    this.client = client;
    this.token_price = new TokenPrice(this.client)
    this.asset_account = new AssetByAccount(this.client)
    this.asset_address = new AssetByAddress(this.client)
    this.post_transaction = new PostTransaction(this.client)
    this.account_manager = new AccountManager(this.client)
    this.transaction = new Transaction(this.client)
  }

  async supported_chains() {
    const path = '/wallet/chain/supported-chains';
    return await this.client.sendRequest<null, SupportedChain>('GET', path);
  }

}
