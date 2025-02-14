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

export interface ResponseValidInscriptions {
  cursor: string
  inscriptions: InscriptionInfos[]
}
