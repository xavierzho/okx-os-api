import { Request } from './types'

export type HttpMethod = 'GET' | 'POST'

export interface EndpointDefinition<Params = unknown, Return = unknown> {
  method: HttpMethod
  path: string
  preprocess?: (params: Params | undefined) => unknown
  validate?: (params: Params | undefined) => void
}

export interface ApiModuleDefinition {
  /** A collection of endpoints that hang off this module level */
  endpoints?: Record<string, EndpointDefinition<any, any>>
  /** Child modules that should be generated recursively */
  modules?: Record<string, ApiModuleDefinition>
}

export type EndpointParams<E extends EndpointDefinition> =
  E extends EndpointDefinition<infer P, any> ? P : never

export type EndpointReturn<E extends EndpointDefinition> =
  E extends EndpointDefinition<any, infer R> ? R : never

type EndpointHandler<E extends EndpointDefinition> = (
  params?: EndpointParams<E>
) => Promise<EndpointReturn<E>>

export type ApiTreeFromDefinition<T extends ApiModuleDefinition> = (T['endpoints'] extends Record<
  string,
  EndpointDefinition
>
  ? {
      [K in keyof T['endpoints']]: EndpointHandler<T['endpoints'][K]>
    }
  : {}) &
  (T['modules'] extends Record<string, ApiModuleDefinition>
    ? {
        [K in keyof T['modules']]: ApiTreeFromDefinition<T['modules'][K]>
      }
    : {})

export const defineEndpoint = <P, R>(definition: EndpointDefinition<P, R>) =>
  definition

export const defineModule = <T extends ApiModuleDefinition>(definition: T) =>
  definition

export function buildApiFromConfig<T extends ApiModuleDefinition>(
  client: Request,
  config: T
): ApiTreeFromDefinition<T> {
  const api: Record<string, unknown> = {}

  if (config.modules) {
    for (const [name, moduleConfig] of Object.entries(config.modules)) {
      api[name] = buildApiFromConfig(client, moduleConfig)
    }
  }

  if (config.endpoints) {
    for (const [name, endpoint] of Object.entries(config.endpoints)) {
      api[name] = (params?: unknown) => {
        endpoint.validate?.(params as never)
        const payload =
          endpoint.preprocess?.(params as never) ?? params
        return client.sendRequest(endpoint.method, endpoint.path, payload)
      }
    }
  }

  return api as ApiTreeFromDefinition<T>
}
