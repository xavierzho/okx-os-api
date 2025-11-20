## OKX OS API
[![npm version](https://img.shields.io/npm/v/okx-os-api.svg)](https://www.npmjs.com/package/okx-os-api)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![build](https://img.shields.io/badge/build-rollup-brightgreen.svg)](#)
[![docs](https://img.shields.io/badge/docs-OKX%20Web3-blue)](https://www.okx.com/zh-hans/web3/build/docs/waas/okx-waas-what-is-waas)

## Features

- [x] Wallet API
- [x] DEX API
- [x] Marketplace API

## Install

```bash
npm install okx-os-api
# or
yarn add okx-os-api
```

## Quick start

```ts
import createOkxOsApi, {
  defineModule,
  defineEndpoint,
  defaultApiConfig,
} from 'okx-os-api'

const api = createOkxOsApi({
  apiKey: 'your-api-key',
  secretKey: 'your-secret-key',
  passphrase: 'your-passphrase',
  project: 'your-project-id',
})

// call built-in endpoints
const prices = await api.wallet.token_price.current_price([
  { chainIndex: '1', tokenAddress: '0x...' },
])

// extend with custom endpoint via config
const custom = api.extend(
  defineModule({
    endpoints: {
      server_time: defineEndpoint<void, { now: string }>({
        method: 'GET',
        path: '/api/v5/public/time',
      }),
    },
  })
)

const time = await custom.server_time()
```

## Config-driven APIs

- All APIs are defined in `src/apiConfig.ts`. Add/override endpoints by composing modules with `defineModule`/`defineEndpoint`.
- Type exports live under `src/types/` (wallet, marketplace, dex) for tree-shaken imports.

## Notes

- Requests are signed per OKX OS spec; `createOkxOsApi` accepts an optional `apiConfig` if you want to swap the entire API tree.
- Build with `npm run build`. The CLI may time out in some environments despite successful emits; rerun locally if you need a zero exit code.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).
