import {afterEach, describe, expect, it, vi} from 'vitest'
import createOkxOsApi from '../src/api'
import {AssetType, defineEndpoint, defineModule} from '../src'

const baseConfig = {
  apiKey: process.env.OKX_API_KEY ?? 'test-key',
  secretKey: process.env.OKX_SECRET_KEY ?? 'test-secret',
  passphrase: process.env.OKX_PASSPHRASE ?? 'test-pass',
  project: process.env.OKX_PROJECT ?? 'test-project',
}

afterEach(() => {
  vi.restoreAllMocks()
})

const createApiWithSpy = () => {
  const api = createOkxOsApi(baseConfig)
  const spy = vi
    .spyOn(api.client, 'sendRequest')
    .mockResolvedValue({} as any)
  return { api, spy }
}

describe('wallet module', () => {
  it('creates nested endpoint functions', async () => {
    const { api, spy } = createApiWithSpy()

    expect(typeof api.wallet.token_price.current_price).toBe('function')
    expect(typeof api.wallet.asset_address.total_value).toBe('function')

    await api.wallet.token_price.current_price([])
    expect(spy).toHaveBeenCalled()
  })

  it('applies preprocess defaults for asset total_value', async () => {
    const { api, spy } = createApiWithSpy()

    await api.wallet.asset_address.total_value({
      address: '0xabc',
      chains: ['1', '2'],
      assetType: AssetType.all,
      excludeRiskToken: false
  })

    expect(spy).toHaveBeenCalledWith('GET', '/wallet/asset/total-value-by-address', {
      address: '0xabc',
      chains: '1,2',
      assetType: '0',
      excludeRiskToken: true,
    })
  })

  it('validates required address/accountId for get_send_tx', async () => {
    const { api } = createApiWithSpy()

    await expect(async () => {
      await api.wallet.transaction.get_send_tx({})
    }).rejects.toThrow(/address or accountId must be provided/i)
  })

  it('merges defaults for get_send_tx pagination', async () => {
    const { api, spy } = createApiWithSpy()

    await api.wallet.transaction.get_send_tx({ address: '0xabc' })

    expect(spy).toHaveBeenCalledWith('GET', '/wallet/post-transaction/orders', {
      address: '0xabc',
      cursor: '1',
      limit: '50',
    })
  })

  it('throws when utxos limit exceeds cap', async () => {
    const { api } = createApiWithSpy()

    await expect(async () =>
      api.wallet.asset_address.utxos({
        chainIndex: '1',
        address: '0xabc',
        limit: '200',
      })
    ).rejects.toThrow(/max exceed limit 100/i)
  })
})

describe('marketplace module', () => {
  it('builds ordinals listings endpoint', async () => {
    const { api, spy } = createApiWithSpy()

    await api.marketplace.ordinalsOrder.listings({})

    expect(spy).toHaveBeenCalledWith(
      'GET',
      '/marketplace/nft/ordinals/listings',
      {}
    )
  })
})

describe('dex module', () => {
  it('builds crossChain build_tx endpoint', async () => {
    const { api, spy } = createApiWithSpy()

    await api.dex.crossChain.build_tx({
      fromChainId: '1',
      toChainId: '2',
      fromTokenAddress: 'a',
      toTokenAddress: 'b',
      amount: '1',
      slippage: '0.5',
      userWalletAddress: '0xabc',
    })

    expect(spy).toHaveBeenCalledWith(
      'GET',
      '/dex/cross-chain/build-tx',
      expect.objectContaining({
        fromChainId: '1',
        toChainId: '2',
      })
    )
  })
})

describe('custom module with extend', () => {
  it('supports ad-hoc module creation', async () => {
    const { api, spy } = createApiWithSpy()
    const custom = defineModule({
      endpoints: {
        ping: defineEndpoint<void, { pong: boolean }>({
          method: 'GET',
          path: '/ping',
        }),
      },
    })

    const customApi = api.extend(custom)
    await customApi.ping()

    expect(spy).toHaveBeenCalledWith('GET', '/ping', undefined)
  })
})
