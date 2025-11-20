// 新增类型：InscriptionInfo
export interface InscriptionInfos {
  amount: string // 数量
  inscriptionId: string // 铭文 ID
  nftId: string // NFT ID
  ticker: string // 代币符号
  tickerId: string // 代币 ID
}

export interface RequestValidInscriptions {
  slug: string
  cursor?: string
  limit?: string
  sort?: string
  isBrc20?: boolean
  walletAddress: string
}
// 更新 ResponseValidInscriptions 接口
export interface ResponseValidInscriptions {
  cursor: string
  inscriptions: InscriptionInfos[]
}

// 新增类型：OrderItem
export interface OrderItem {
  inscriptionId: string // 铭文 ID
  nftId: number // NFT ID
  orderType: number // 订单类型
  totalPrice: number // 总价格
  unitPrice: number // 单价
  psbt: string // PSBT 数据
}

export interface RequestMakeOrders {
  brc20: boolean
  items: OrderItem[]
}

export interface ResponseMakeOrders {
  nftID: string
  errorMsg: string
  success: boolean
}

// 新增接口：RequestGetCollections
export interface RequestCollections {
  slug?: string // 合集 slug 名称，即合集的唯一标识
  cursor?: string // 指向要检索的页面的游标
  limit?: string // 分页大小（默认值 100，最大 300）
  isBrc20?: boolean // 获取全部 BTC NFT 或 Brc20 合集的列表
}

// 新增接口：CollectionInfo
export interface CollectionInfo {
  slug: string // 合集 slug 名称，即合集的唯一标识
  totalVolume: string // 合集总交易额，BTC 计价
  floorPrice: string // 合集地板价，BTC 计价
  inscriptionNumRange: string // 合集铭文编号范围
  volume24h: string // 合集24小时交易额，BTC 计价
  isBrc20: boolean // 用于区分 Ordinals 铭文类型：Brc20 或者 BTC NFT
}

// 更新 ResponseCollections 接口
export interface ResponseCollections {
  cursor: string // 游标
  data: CollectionInfo[] // 集合信息数组
}

// 新增接口：RequestOrdinalsListings
export interface RequestOrdinalsListings {
  slug?: string // 合集 slug 名称，即合集的唯一标识
  cursor?: string // 指向要检索的页面的游标
  limit?: string // 分页大小（默认值 10，最大 100）
  sort?: string // 挂单排序规则
  isBrc20?: boolean // 获取全部 BTC NFT 或 Brc20 合集的订单
}

// 新增接口：OrdinalsOrder
export interface OrdinalsOrder {
  inscriptionId: string // 铭文编号
  listingTime: number // 挂单时间
  listingUrl: string // 订单所在页面链接
  ownerAddress: string // 订单所有者
  price: string // 订单价格，BTC 计价
  unitPrice: string // 订单单价，BTC 计价
  amount: string // 订单中的铭文数量
  isBrc20: boolean // 用于区分 Ordinals 铭文类型：Brc20 或者 BTC NFT
}

// 新增接口：ResponseOrdinalsListings
export interface ResponseOrdinalsListings {
  cursor: string // 游标
  data: OrdinalsOrder[] // Ordinals 订单模型的对象数组
}

// 新增接口：RequestOrdinalsTradeHistory
export interface RequestOrdinalsTradeHistory {
  slug: string // 合集 slug 名称，即合集的唯一标识
  cursor?: string // 指向要检索的页面的游标
  limit?: string // 分页大小（默认值 10，最大 100）
  sort?: string // 排序规则
  isBrc20?: boolean // 获取全部 BTC NFT 或 Brc20 合集的交易历史
  orderSourceList?: number[] // 获取某些平台的订单
  tradeWalletAddress?: string // 交易涉及的钱包地址
  type?: string // 交易类型
}

// 新增接口：OrdinalsTradeHistory
export interface OrdinalsTradeHistory {
  fromAddress: string // 交易 From 地址
  inscriptionId: string // 铭文编号
  price: string // 交易价格，BTC 计价
  timestamp: number // 交易时间戳
  toAddress: string // 交易 To 地址
  unitPrice: string // 订单单价，BTC 计价
  amount: string // 订单中的铭文数量
  isBrc20: boolean // 用于区分 Ordinals 铭文类型：Brc20 或者 BTC NFT
  orderSource: number // 订单来源
  orderSourceName: string // 订单来源名称
  type: string // 交易类型
}

// 新增接口：ResponseOrdinalsTradeHistory
export interface ResponseOrdinalsTradeHistory {
  cursor: string // 游标
  data: OrdinalsTradeHistory[] // Ordinals 交易历史模型的对象数组
}
