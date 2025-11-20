import { Client, OkxConfig } from './client'
import {
  ApiModuleDefinition,
  ApiTreeFromDefinition,
  buildApiFromConfig,
} from './apiBuilder'
import { defaultApiConfig } from './apiConfig'

export type OkxApiShape = ApiTreeFromDefinition<typeof defaultApiConfig>

export type OkxOsApiInstance = OkxApiShape & {
  client: Client
  extend<Config extends ApiModuleDefinition>(
    config: Config
  ): ApiTreeFromDefinition<Config>
}

/**
 * Create an OKX OS API client from a config tree.
 * Returns the generated API plus the underlying axios client and an extend helper.
 */
export function createOkxOsApi(
  options: OkxConfig,
  apiConfig: ApiModuleDefinition = defaultApiConfig
): OkxOsApiInstance {
  const client = new Client(options)
  const api = buildApiFromConfig(
    client,
    (apiConfig ?? defaultApiConfig) as typeof defaultApiConfig
  )

  const extend = <Config extends ApiModuleDefinition>(config: Config) =>
    buildApiFromConfig(client, config)

  return Object.assign({ client, extend }, api)
}

export default createOkxOsApi
