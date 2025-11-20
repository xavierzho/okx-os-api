import { defineEndpoint, defineModule } from './apiBuilder'
import {
  AccountDetailQuery,
  AccountTxsEntry,
  AddressEntry,
  AddressIndex,
  AddressTxsEntry,
  AddressTag,
  ApprovalProject,
  AirdropRisk,
  AssetType,
  BalancesByAddress,
  BalancesByAddressEntry,
  CursorPage,
  EvmGasPrice,
  EvmSignData,
  HistoryPrice,
  HistoryPriceEntry,
  HistoryTxs,
  Inscriptions,
  InscriptionDetailRequest,
  InscriptionTxs,
  Nonce,
  OrderStatus,
  PreTxEntry,
  Price,
  QueryTxsEntry,
  SendTxEntry,
  SolanaSignData,
  SuiObject,
  SuiObjectEntry,
  WalletProtocol,
  WalletSupportedChain,
  TokenInfo,
  TotalValue,
  TotalValueEntry,
  TransactionDetail,
  UpdateAccountEntry,
  TronSignData,
  UtxoEntry,
  UtxoGasPrice,
  Utxos,
  SwapQuoteResponse,
  SwapQuoteRequest,
  SwapInstructionRequest,
  SwapInstructionResponse,
  SwapRequest,
  SwapResponse,
  SwapTxStatus,
  CreateLimitOrderRequest,
  ListLimitOrderRequest,
  ListLimitOrderResponse,
  LimitOrderRequest,
  LimitOrderDetail,
} from './types'
import {
  RequestCollections,
  RequestMakeOrders,
  RequestOrdinalsListings,
  RequestOrdinalsTradeHistory,
  RequestValidInscriptions,
  ResponseCollections,
  ResponseMakeOrders,
  ResponseOrdinalsListings,
  ResponseOrdinalsTradeHistory,
  ResponseValidInscriptions,
} from './types'
import {
  ApproveRequest,
  ApproveResponse,
  Bridge,
  BuildTxRequest,
  BuildTxResponse,
  Chain,
  DexSupportedChain,
  FromChain,
  QuoteRequest,
  QuoteResponse,
  Token,
  TxStatusRequest,
  TxStatusResponse,
  DexProtocolMeta,
} from './types'

const withCursorAndLimit = <T extends { cursor?: string; limit?: string }>(
  params?: T,
  defaults: { cursor?: string; limit?: string } = { cursor: '1', limit: '50' },
  limitCap = 100
) => {
  const nextParams = {
    ...(params ?? ({} as T)),
    cursor: params?.cursor ?? defaults.cursor,
    limit: params?.limit ?? defaults.limit,
  }
  const limitNum = Number(nextParams.limit ?? defaults.limit ?? 0)
  if (limitCap && limitNum > limitCap) {
    throw new Error(`max exceed limit ${limitCap}`)
  }
  return nextParams
}

export const walletModuleConfig = defineModule({
  endpoints: {
    supported_chains: defineEndpoint<void, WalletSupportedChain[]>({
      method: 'GET',
      path: '/wallet/chain/supported-chains',
    }),
  },
  modules: {
    token_price: defineModule({
      endpoints: {
        current_price: defineEndpoint<AddressEntry[], Price[]>({
          method: 'POST',
          path: '/wallet/token/current-price',
        }),
        real_time_price: defineEndpoint<AddressEntry[], Price[]>({
          method: 'POST',
          path: '/wallet/token/real-time-price',
        }),
        history_price: defineEndpoint<
          HistoryPriceEntry,
          (HistoryPrice & CursorPage)[]
        >({
          method: 'POST',
          path: '/wallet/token/historical-price',
        }),
        token_info: defineEndpoint<AddressEntry[], TokenInfo[]>({
          method: 'GET',
          path: '/wallet/token/token-detail',
        }),
      },
    }),
    asset_address: defineModule({
      endpoints: {
        total_value: defineEndpoint<
          Omit<TotalValueEntry, 'chains'> & { chains: string[] },
          TotalValue[]
        >({
          method: 'GET',
          path: '/wallet/asset/total-value-by-address',
          preprocess: (params) => ({
            address: params?.address,
            chains: (params?.chains ?? []).join(','),
            assetType: params?.assetType ?? AssetType.all,
            excludeRiskToken: params?.excludeRiskToken ?? true,
          }),
        }),
        all_balances: defineEndpoint<
          { address: string; chains: string[]; filter?: AirdropRisk },
          BalancesByAddress[]
        >({
          method: 'GET',
          path: '/wallet/asset/all-token-balances-by-address',
          preprocess: (params) => ({
            address: params?.address,
            chains: (params?.chains ?? []).join(','),
            filter: params?.filter ?? AirdropRisk.filter,
          }),
        }),
        balances: defineEndpoint<BalancesByAddressEntry, BalancesByAddress[]>({
          method: 'POST',
          path: '/wallet/asset/token-balances-by-address',
        }),
        utxos: defineEndpoint<
          AddressIndex & { cursor?: string; limit?: string },
          (Utxos & CursorPage)[]
        >({
          method: 'GET',
          path: '/wallet/utxo/utxos',
          preprocess: (params) => withCursorAndLimit(params, undefined, 100),
        }),
        inscriptions: defineEndpoint<UtxoEntry, Inscriptions[]>({
          method: 'GET',
          path: '/wallet/utxo/utxo-detail',
        }),
        approvals: defineEndpoint<
          { addresses: AddressEntry[]; cursor?: string; limit?: string },
          CursorPage & ApprovalProject[]
        >({
          method: 'POST',
          path: '/wallet/security/approvals',
          preprocess: (params) =>
            withCursorAndLimit(params ?? { cursor: '1', limit: '50' }, undefined, 100),
        }),
      },
    }),
    asset_account: defineModule({
      endpoints: {
        total_value: defineEndpoint<
          Omit<TotalValueEntry, 'address' | 'chains'> & {
            accountId: string
            chains: string[]
          },
          TotalValue[]
        >({
          method: 'GET',
          path: '/wallet/asset/total-value',
          preprocess: (params) => ({
            accountId: params?.accountId,
            chains: (params?.chains ?? []).join(','),
            assetType: params?.assetType ?? AssetType.all,
            excludeRiskToken: params?.excludeRiskToken ?? true,
          }),
        }),
        all_balances: defineEndpoint<
          { accountId: string; chains: string[]; filter?: AirdropRisk },
          BalancesByAddress[]
        >({
          method: 'GET',
          path: '/wallet/asset/wallet-all-token-balances',
          preprocess: (params) => ({
            accountId: params?.accountId,
            chains: (params?.chains ?? []).join(','),
            filter: params?.filter ?? AirdropRisk.filter,
          }),
        }),
        balances: defineEndpoint<
          { accountId: string; tokenAddresses: AddressEntry[] },
          BalancesByAddress[]
        >({
          method: 'POST',
          path: '/wallet/asset/token-balances',
        }),
      },
    }),
    post_transaction: defineModule({
      endpoints: {
        address_history: defineEndpoint<AddressTxsEntry, HistoryTxs>({
          method: 'GET',
          path: '/wallet/post-transaction/transactions-by-address',
        }),
        account_history: defineEndpoint<AccountTxsEntry, HistoryTxs>({
          method: 'GET',
          path: '/wallet/post-transaction/transactions',
        }),
        tx: defineEndpoint<
          { txHash: string; chainIndex: string; iType?: string },
          TransactionDetail[]
        >({
          method: 'GET',
          path: '/wallet/post-transaction/transaction-detail-by-txhash',
          preprocess: (params) => ({
            txHash: params?.txHash,
            chainIndex: params?.chainIndex,
            iType: params?.iType ?? '0',
          }),
        }),
        inscription: defineEndpoint<
          InscriptionDetailRequest,
          InscriptionTxs
        >({
          method: 'GET',
          path:
            '/wallet/post-transaction/inscription-transaction-detail-by-txhash',
          preprocess: (params) =>
            withCursorAndLimit(
              {
                ...params,
                protocol: params?.protocol ?? WalletProtocol.BRC20,
              },
              { cursor: '1', limit: '20' },
              100
            ),
        }),
      },
    }),
    account_manager: defineModule({
      endpoints: {
        create: defineEndpoint<
          AddressEntry[],
          {
            accountId: string
          }[]
        >({
          method: 'POST',
          path: '/wallet/account/create-wallet-account',
        }),
        update: defineEndpoint<UpdateAccountEntry, null>({
          method: 'POST',
          path: '/wallet/account/update-wallet-account',
        }),
        delete: defineEndpoint<{ accountId: string }, null>({
          method: 'POST',
          path: '/wallet/account/delete-account',
        }),
        accounts: defineEndpoint<
          { cursor?: string; limit?: string },
          CursorPage[]
        >({
          method: 'GET',
          path: '/wallet/account/accounts',
          preprocess: (params) => withCursorAndLimit(params, undefined, 100),
        }),
        addresses: defineEndpoint<AccountDetailQuery, CursorPage[]>({
          method: 'GET',
          path: '/wallet/account/account-detail',
          preprocess: (params) => withCursorAndLimit(params),
        }),
      },
    }),
    transaction: defineModule({
      endpoints: {
        getPreSign: defineEndpoint<
          PreTxEntry,
          (EvmSignData | UtxoGasPrice | SolanaSignData | TronSignData)[]
        >({
          method: 'POST',
          path: '/wallet/pre-transaction/sign-info',
        }),
        gasPrice: defineEndpoint<{ chainIndex: string }, (EvmGasPrice | UtxoGasPrice)[]>({
          method: 'GET',
          path: '/wallet/pre-transaction/gas-price',
        }),
        gasLimit: defineEndpoint<
          PreTxEntry,
          {
            gasLimit: string
          }[]
        >({
          method: 'GET',
          path: '/wallet/pre-transaction/gas-limit',
        }),
        nonce: defineEndpoint<AddressEntry, Nonce[]>({
          method: 'GET',
          path: '/wallet/pre-transaction/nonce',
        }),
        sui_object: defineEndpoint<
          SuiObjectEntry & { cursor?: string; limit?: string },
          (SuiObject & CursorPage)[]
        >({
          method: 'POST',
          path: '/wallet/pre-transaction/sui-object',
          preprocess: (params) => withCursorAndLimit(params),
        }),
        isBlacklist: defineEndpoint<
          { tokenIndex: string; address: string },
          AddressTag[]
        >({
          method: 'GET',
          path: '/wallet/pre-transaction/validate-address',
        }),
        send_tx: defineEndpoint<SendTxEntry, { orderId: string }[]>({
          method: 'POST',
          path: '/wallet/pre-transaction/broadcast-transaction',
        }),
        get_send_tx: defineEndpoint<QueryTxsEntry, OrderStatus[]>({
          method: 'GET',
          path: '/wallet/post-transaction/orders',
          validate: (params) => {
            if (!params?.address && !params?.accountId) {
              throw new Error('Either address or accountId must be provided.')
            }
          },
          preprocess: (params) =>
            withCursorAndLimit(
              params ?? { cursor: '1', limit: '50' },
              { cursor: '1', limit: '50' }
            ),
        }),
      },
    }),
  },
})

export const marketplaceModuleConfig = defineModule({
  modules: {
    ordinalsOrder: defineModule({
      endpoints: {
        get_valid_inscriptions: defineEndpoint<
          RequestValidInscriptions,
          ResponseValidInscriptions
        >({
          method: 'GET',
          path: '/marketplace/ordinals/get-valid-inscriptions',
        }),
        collections: defineEndpoint<
          RequestCollections,
          ResponseCollections
        >({
          method: 'GET',
          path: '/marketplace/nft/ordinals/collections',
        }),
        listings: defineEndpoint<
          RequestOrdinalsListings,
          ResponseOrdinalsListings
        >({
          method: 'GET',
          path: '/marketplace/nft/ordinals/listings',
        }),
        make_orders: defineEndpoint<
          RequestMakeOrders,
          ResponseMakeOrders
        >({
          method: 'POST',
          path: '/marketplace/nft/ordinals/okx/make-orders',
        }),
        trade_history: defineEndpoint<
          RequestOrdinalsTradeHistory,
          ResponseOrdinalsTradeHistory
        >({
          method: 'POST',
          path: '/marketplace/nft/ordinals/trade-history',
        }),
      },
    }),
  },
})

export const dexModuleConfig = defineModule({
  modules: {
    crossChain: defineModule({
      endpoints: {
        get_cross_chain_tokens: defineEndpoint<Chain, Token[]>({
          method: 'GET',
          path: '/dex/cross-chain/supported/tokens',
        }),
        get_bridge_tokens: defineEndpoint<FromChain, Token[]>({
          method: 'GET',
          path: '/dex/cross-chain/supported/bridge-tokens-pairs',
        }),
        get_bridges: defineEndpoint<Chain, Bridge[]>({
          method: 'GET',
          path: '/dex/cross-chain/supported/bridges',
        }),
        quote: defineEndpoint<QuoteRequest, QuoteResponse>({
          method: 'GET',
          path: '/dex/cross-chain/quote',
        }),
        build_tx: defineEndpoint<BuildTxRequest, BuildTxResponse>({
          method: 'GET',
          path: '/dex/cross-chain/build-tx',
        }),
        tx_status: defineEndpoint<TxStatusRequest, TxStatusResponse>({
          method: 'GET',
          path: '/dex/cross-chain/status',
        }),
      },
    }),
    swap: defineModule({
      endpoints: {
        get_liquidity: defineEndpoint<
          Chain,
          DexProtocolMeta[]
        >({
          method: 'GET',
          path: '/dex/aggregator/liquidity',
        }),
        quote: defineEndpoint<SwapQuoteRequest, SwapQuoteResponse[]>({
          method: 'GET',
          path: '/v5/dex/aggregator/quote'
        }),
        instruction: defineEndpoint<SwapInstructionRequest,SwapInstructionResponse[]>({
          method: 'GET',
          path:'/dex/aggregator/swap-instruction'
        }),
        swap: defineEndpoint<SwapRequest,SwapResponse[]>({
          method: 'GET',
          path: '/v5/dex/aggregator/swap',
        }),
        tx_status: defineEndpoint<TxStatusRequest, SwapTxStatus[]>({
          method: 'GET',
          path: '/dex/aggregator/history',
        })
      }
    }),
    limitOrder: defineModule({
      endpoints:{
        create: defineEndpoint<CreateLimitOrderRequest,{}>({
          method:'POST',
          path: '/dex/aggregator/limit-order/save-order'
        }),
        list: defineEndpoint<ListLimitOrderRequest, ListLimitOrderResponse[]>({
          method: 'GET',
          path: '/dex/aggregator/limit-order/all'
        }),
        cancel: defineEndpoint<LimitOrderRequest, string>({
          method:'GET',
          path:'/dex/aggregator/limit-order/cancel/calldata'
        }),
        detail: defineEndpoint<LimitOrderRequest,LimitOrderDetail>({
          method: 'GET',
          path: '/dex/aggregator/limit-order/detail'
        })
      }
    })
  },
  endpoints: {
    get_supported_chains: defineEndpoint<
      Chain,
      DexSupportedChain[]
    >({
      method: 'GET',
      path: '/dex/cross-chain/supported/chain',
    }),
    get_all_tokens: defineEndpoint<Chain, Token[]>({
      method: 'GET',
      path: '/dex/aggregator/all-tokens',
    }),
    approves: defineEndpoint<ApproveRequest, ApproveResponse[]>({
      method: 'GET',
      path: '/dex/aggregator/approve-transaction',
    }),
  }
})

export const defaultApiConfig = defineModule({
  modules: {
    wallet: walletModuleConfig,
    marketplace: marketplaceModuleConfig,
    dex: dexModuleConfig,
  },
})
