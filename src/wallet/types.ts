export interface AddressEntry {
  chainIndex: string;
  tokenAddress: string;
}

export interface Price {
  price: string;
  time: string;
  chainIndex: string;
  tokenAddress: string;
}

export interface SupportedChain {
  name: string;
  logoUrl: string;
  shortName: string;
  chainIndex: string;
}

export interface HistoryPriceEntry extends AddressEntry {
  limit?: string;
  cursor?: string;
  begin?: string;
  period?: string;
}

export interface CursorItem {
  cursor: string
}

export interface HistoryPrice {
  prices: {
    time: string;
    price: string;
  }[];
}

export interface BalancesByAddressEntry {
  address: string;
  tokenAddresses: AddressEntry[];
  filter?: AirdropRisk;
}

export enum AirdropRisk {
  filter = '0',
  not = '1',
}

export interface BalancesByAddress {
  tokenAssets: {
    chainIndex: string;
    tokenAddress: string;
    address: string;
    symbol: string;
    balance: string;
    rawBalance: string;
    tokenPrice: string;
    tokenType: string;
    transferAmount: string;
    availableAmount: string;
    isRiskToken: boolean;
  }[];
}


export interface TokenInfo {
  logoUrl: string
  officialWebsite: string
  socialUrls: Social,
  decimals: string
  tokenAddress: string
  chainIndex: string
  chainName: string
  symbol: string
  circulatingSupply: string
  maxSupply: string
  totalSupply: string
  volume24h: string
  marketCap: string
}

export interface Social {
  [key: string]: string[]
}

export enum AssetType {
  all = '0',
  onlyToken = '1',
  onlyDefi = '2'
}

export interface TotalValueEntry {
  address: string
  chains: string
  assetType: AssetType
  excludeRiskToken: boolean
}

export interface TotalValue {
  totalValue: string
}

export interface Utxo {
  txHash: string,
  voutIndex: string
  amount: string
  spendStatus: string
}

export interface Utxos {
  utxos: Utxo[]
}

export interface UtxoEntry {
  chainIndex: string
  txHash: string
  voutIndex: string
}

export interface Inscriptions {
  addresses: string[]
  txHash: string
  voutIndex: string
  utxoStatus: string
  unresolved: any[]
  btcAssets: {
    protocol: Protocol,
    tokenAmount: string
    eventType: string
    decimal: string
    symbol: string
    inscriptionNumber: string
    nftId: string
    nftOffset: string
  }[]
}

export enum Protocol {
  BRC20 = '1',
  ARC20 = '2',
  Runes = '3',
  OrdiNft = '4',
  SRC20 = '5'
}

export interface ApprovalProject {
  projectName: string
  projectIcon: string
  approveAddress: string
  tokens: {
    approvalNum: string
    imageUrl: string
    symbol: string
    status: string
    tokenAddress: string
  }[]
}

export interface AddressTxsEntry {
  address: string
  chains: string
  tokenAddress?: string
  begin?: string
  end?: string
  cursor?: string
  limit?: string
}

export interface AddressAmount {
  address: string
  amount: string
}

export interface Transaction {
  chainIndex: string
  txHash: string
  method: string
  nonce: string
  txTime: string
  from: AddressAmount
  to: AddressAmount
  tokenAddress: string
  amount: string
  symbol: string
  txFee: string
  txStatus: string
  hitBlacklist: boolean
  tag: string
  itype: string
}

export interface AccountTxsEntry {
  accountId: string
  chainIndex?: string
  tokenAddress?: string
  begin?: string
  end?: string
  cursor?: string
  limit?: string
}


export interface TransactionDetail {
  chainIndex: string
  height: string
  txTime: string
  txhash: string
  txStatus: string
  gasLimit: string
  gasUsed: string
  gasPrice: string
  txFee: string
  nonce: string
  amount: string
  symbol: string
  methodId: string
  fromDetails: fromDetail[]
  toDetails: toDetail[]
  internalTransactionDetails: internalTransfer[]
  tokenTransferDetails: (internalTransfer & {
    tokenContractAddress: string
    symbol: string
    amount: string
  })[]
  l1OriginHash: string
}

export interface fromDetail {
  address: string
  vinIndex: string
  preVoutIndex: string
  txHash: string
  isContract: boolean
  amount: string
}

export interface toDetail {
  address: string
  voutIndex: string
  isContract: boolean
  amount: string
}

export interface internalTransfer {
  from: string
  to: string
  isFromContract: boolean
  isToContract: boolean
  amount: string
  state?: string
}

export interface InscriptionTx {
  transactionDetails: {
    txHash: string;
    blockHash: string;
    height: string;
    txTime: string; // 或 number，如果需要进行时间计算
    from: string;
    to: string;
    amount: string; // 或 number，如果需要进行数值计算
    symbol: string;
    eventType: string;
    tokenInscriptionId: string;
    protocol: string;
    txStatus: string;
    inscriptionId: string;
    inscriptionNumber: string;
    outputIndex: string;
  }[]
}

export enum UpdateType {
  add = 'add',
  delete = 'delete'
}

export interface UpdateAccountEntry {
  accountId: string
  updateType: UpdateType
  addresses: AddressEntry[]
}


export interface PreTxEntry {
  chainIndex: string
  fromAddr: string
  toAddr: string
  txAmount?: string
  extJson: PreTxOptions
}

export interface PreTxOptions {
  inputData?: string // calldata
  protocol?: Protocol // only btc
  tokenAddress?: string // only solana
  permissionType?: string // only tron
  feeLimit?: string // only tron, contract interact must provide, default: 30000000
}

export interface EvmGasPrice {
  normal: string
  min: string
  max: string
  supportEip1559: boolean
  eip1559Protocol?: {
    baseFee: string
    proposePriorityFee: string
    safePriorityFee: string
    fastPriorityFee: string
  }
}

export interface EvmSignData {
  gasLimit: string
  nonce: string
  gasPrice: EvmGasPrice
}

export interface UtxoGasPrice {
  normalFeeRate: string
  maxFeeRate: string
  minFeeRate: string
  inscriptionOutput: string
  minOutput: string
  normalCost: string
  maxCost: string
  minCost: string
}

export interface SolanaSignData {
  baseFee: string
  priorityFee: {
    normalUnitPrice: string
    minUnitPrice: string
    maxUnitPrice: string
  }
  recentBlockHash: string
  lastValidBlockHeight: string
  fromAddressRent: string
  toAddressRent: string
  tokenAccountInfo: {
    lamports: string
    ownerAddress: string
    mintAddress: string
    tokenAccountAddress: string
    decimal: string
  }
}

export interface TronSignData {
  fee: string
  refBlockBytes: string
  refBlockHash: string
  expiration: string
  timestamp: string
}

export interface Nonce {
  nonce: string
  pendingNonce: string
}

export interface SuiObjectEntry extends AddressEntry {
  address: string
}

export interface SuiObject {
  tokenAddress: string
  objects: {
    amount: string
    digest: string
    version: string
    objectId: string
  }[]
}

export enum AddressType {
  none = '0',
  user = '1',
  contract = '2'
}

export interface AddressTag {
  addressType: AddressType
  hitBlacklist: boolean
  tag: string
}

export interface SendTxEntry {
  signedTx: string
  chainIndex: string
  address: string
  accountId?: string
}

export enum TxStatus {
  pending = '1',
  success = '2',
  failed = '3'
}

export interface QueryTxsEntry {
  address?: string
  accountId?: string
  chainIndex?: string
  txStatus?: TxStatus
  orderId?: string
  cursor?: string
  limit?: string
}

export interface OrderStatus {
  chainIndex: string
  address: string
  accountId: string
  orderId: string
  txHash: string
  txStatus: TxStatus
}


export interface BroadcastEntry {
  signedTx: string;
  chainIndex: string;
  address: string;
  accountId?: string;
}

export interface OrderListEntry {
  address?: string;
  accountId?: string;
  chainIndex?: string;
  txStatus?: string;
  orderId?: string;
  cursor?: string;
  limit?: string;
}

export interface Ordered {
  chainIndex: string;
  accountId: string;
  orderId: string;
  address: string;
  txHash: string;
  txstatus: string;
}

export interface AddressIndex {
  chainIndex: string;
  address: string;
}
