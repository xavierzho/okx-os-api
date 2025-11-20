export interface Chain {
  chainId?: string
}
export interface FromChain {
  fromChainId: string
}

export interface DexSupportedChain {
  chainId: string
  chainName: string
  dexTokenApproveAddress: string
}

export interface Token {
  decimals: string
  tokenContractAddress: string
  tokenLogoUrl: string
  tokenName: string
  tokenSymbol: string
}

export interface Bridge {
  bridgeName: string // 跨链桥名称 (如: cBridge)
  bridgeId: number // 跨链桥 ID (如: 211)
  requireOtherNativeFee: boolean // 该跨链桥是否要求NativeFee
  logo: string // 跨链桥标志 URL
  supportedChains: string[] // 该跨链桥支持的链ID

}

export interface QuoteRequest {
  fromChainId: string
  toChainId: string
  fromTokenAddress: string
  toTokenAddress: string
  amount: string
  slippage:string
  sort:number
  dexIds: string
  feePercent: string
  allowBridge?: string[]
  denyBridge?: string[]
  priceImpactProtectionPercentage: string
}

export interface TokenReply {
  decimals: string
  tokenContractAddress: string
  tokenSymbol: string
}
export interface SwapToken extends TokenReply{
  isHoneyPot: boolean
  taxRate: string
  tokenUnitPrice:string
}
export interface DexProtocol {
  dexName: string
  percent: string
}
export interface RouterInfo {
  router: string
  routerPercent: string
  subRouterList: {
    dexProtocol: DexProtocol[]
    fromToken: TokenReply
    toToken: TokenReply
  }[]
}
export interface QuoteCompare {
  amountOut: string
  dexLogo: string
  dexName: string
  tradeFee: string
}
export interface SwapRouterInfo {
  router: string
  routerPercent: string
  subRouterList: {
    dexProtocol: DexProtocol[]
    fromToken: SwapToken
    toToken: SwapToken
  }
}
export interface QuoteResponse {
  fromChainId: string
  toChainId: string
  fromTokenAmount: string
  fromToken: TokenReply
  toToken: TokenReply
  toDexRouterList: {
    percent: string
    router: string
  }[]
  subRouterList: {
    dexName: string
    fromToken: TokenReply
    toToken: TokenReply
  }[]
  routerList: {
    estimateTime: string
    minimumReceived: string
    needApprove: string
    toTokenAmount: string
    router: {
      bridgeId: number
      bridgeName: string
      crossChainFee: string
      otherNativeFee: string
      crossChainFeeTokenAddress: string
    }
    fromDexRouterList: RouterInfo[]
    toDexRouterList: RouterInfo[]
  }[]
}

export interface ApproveRequest {
  chainId: string
  tokenContractAddress: string
  approveAmount: string
}

export interface ApproveResponse {
  data: string
  dexContractAddress: string
  gasLimit: string
  gasPrice: string
}

export interface BuildTxRequest {
  fromChainId: string
  toChainId: string
  fromTokenAddress: string
  toTokenAddress: string
  amount: string
  slippage: string
  sort?: string
  dexIds?:string
  userWalletAddress: string
  allowBridge?: number[]
  denyBridge?: number[]
  receiveAddress?: string
  feePercent?: string
  referrerAddress?: string
  priceImpactProtectionPercentage?: string
  onlyBridge?: boolean
  memo?: string
}

export interface BuildTxResponse {
  fromTokenAmount: string
  toTokenAmount: string
  minmumReceive: string
  router: {
    bridgeId: number
    bridgeName: string
    otherNativeFee: string
    crossChainFee: string
    crossChainFeeTokenAddress: string
  }
  tx: {
    data: string
    from: string
    to: string
    value: string
    gasLimit: string
    gasPrice: string
    maxPriorityFeePerGas: string
    randomKeyAccount: string[]
    signatureData: string[]
  }
}

export interface TxStatusRequest {
  hash: string
  chainId: string
  isFromMyProject?: boolean
}
export type DexTxType = 'Approve' | 'Wrap' | 'Unwrap' | 'Swap'
export type DexTxStatus = 'pending' | 'success' | 'failure'
export interface TokenDetail {
  amount: string
  symbol: string
  tokenAddress: string
}
export interface SwapTxStatus{
  chainId: string
  txHash: string
  height:string
  txTime: string
  status: DexTxStatus
  txType: DexTxType
  fromAddress: string
  dexrouter: string
  toAddress: string
  fromTokenDetails: TokenDetail
  toTokenDetails: TokenDetail
  referalAmount: string
  errorMsg: string
  gasLimit: string
  gasUsed: string
  gasPrice: string
  txFee: string
}
export interface TxStatusResponse {
  fromChainId: string
  toChainId: string
  fromTxHash: string
  toTxHash: string
  fromAmount: string
  fromTokenAddress: string
  toAmount: string
  toTokenAddress: string
  errorMsg: string
  bridgeHash: string
  refundChainId: string
  refundTokenAddress: string
  refundTxHash: string
  sourceChainGasfee: string
  crossChainFee: {
    symbol: string
    address: string
    amount: string
  }
  crossChainInfo: {}
  detailStatus: string
  status: string
  memo: string
  destinationChainGasfee: string
}


export interface DexProtocolMeta {
  id: string
  logo: string
  name: string
}

export interface SwapQuoteRequest {
  chainId: string
  amount: string
  fromTokenAddress: string
  toTokenAddress: string
  dexIds?: string
  directRoute?:boolean
  priceImpactProtectionPercentage?: string
  feePercent?: string
}

export interface SwapQuoteResponse {
  chainId: string
  dexRouterList: SwapRouterInfo[]
  estimateGasFee: string
  tradeFee: string
  fromToken: SwapToken
  toToken: SwapToken
  fromTokenAmount: string
  originToTokenAmount: string
  priceImpactPercentage: string
  toTokenAmount: string
  quoteCompareList: QuoteCompare[]
}

export interface SwapInstructionRequest {
  chainId: string
  amount: string
  fromTokenAddress: string
  toTokenAddress: string
  slippage: string
  userWalletAddress: string
  swapReceiverAddress?: string
  feePercent?: string
  fromTokenReferrerWalletAddress?: string
  toTokenReferrerWalletAddress?: string
  dexIds?: string
  priceImpactProtectionPercentage?: string
  computeUnitPrice?: string
  computeUnitLimit?: string
}

export interface SwapInstructionResponse {
  addressLookupTableAddresses: string[]
  instructionLists: {
    data: string
    accounts: {
      isSigner: boolean
      isWritable: boolean
      pubkey: string
    }[]
    programId: string
  }[]
}

export interface SwapRequest {
  chainId: string
  amount: string
  fromTokenAddress: string
  toTokenAddress: string
  slippage: string
  userWalletAddress: string
  swapReceiverAddress?: string
  feePercent?: string
  fromTokenReferrerWalletAddress?: string
  toTokenReferrerWalletAddress?: string
  enablePositiveSlippage?: boolean
  gaslimit?: string
  gasLevel?: number
  dexIds?: string
  directRoute?: boolean
  priceImpactProtectionPercentage?: string
  callDataMemo?: string
  computeUnitPrice?: string
  computeUnitLimit?: string
  autoSlippage?: boolean
  maxAutoSlippage?: string
}

export interface SwapResponse {
  routerResult: {
    chainId: string
    dexRouterList: SwapRouterInfo[]
    estimateGasFee: string
    tradeFee: string
    fromToken: SwapToken
    toToken: SwapToken
    fromTokenAmount: string
    toTokenAmount: string
    priceImpactPercentage: string
    quoteCompareList: QuoteCompare[]
  }
  tx:{
    data: string
    from: string
    to: string
    value: string
    gas: string
    gasPrice: string
    maxPriorityFeePerGas: string
    minReceiveAmount: string
    signatureData: string[]
  }
}

export interface CreateLimitOrderRequest {
  orderHash: string
  signature: string
  chainId: string
  data: {
    salt: string
    makingAmount: string
    takingAmount: string
    makerToken: string
    takerToken: string
    maker: string
    deadLine: string
    allowedSender: string
    receiver: string
    minReturn: string
    partiallyAble: boolean
  }
}
export interface ListLimitOrderRequest {
  chainId: string
  page?: string
  limit?: string
  statuses?: string[] //用于筛选限价订单的状态数组。状态包括 1 - 有效订单，2 - 暂时失效订单，3 - 被占用订单（正在上链），4 - 过期，5 - 取消，6 - 成功， 7 - 失败订单。
  takerAsset?: string
  makerAsset?: string
}

export interface ListLimitOrderResponse {
  chainId: string
  createTime: string
  expireTime: string
  makerAssetAddress: string
  makerRate: string
  makerTokenAddress: string
  makingAmount: string
  orderHash: string
  receiver: string
  remainingMakerAmount: string
  salt: string
  signature: string
  status: string
  takerTokenAddress: string
  takingAmount: string
  takerRate: string
  takerAssetAddress: string
}

export interface LimitOrderRequest {
  orderHash: string
}

export interface LimitOrderDetail {
  createTime: string
  expireTime: string
  failureReason: string
  orderHash: string
  signature:string
  chainId: string
  makerAssetAddress: string
  makerTokenAddress: string
  makingAmount: string
  takerTokenAddress: string
  takingAmount: string
  makerRate: string
  takerRate: string
  receiver: string
  remainingMakerAmount: string
  salt: string
  status: string
  takerAssetAddress: string
}
