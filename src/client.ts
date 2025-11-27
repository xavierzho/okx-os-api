import * as crypto from 'node:crypto'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Response, Request } from './types'

export interface OkxConfig {
  apiKey: string
  secretKey: string
  passphrase: string
  project: string
  version?: string
}
export const BaseURL = 'https://www.okx.com'

export class Client implements Request {
  private readonly config: OkxConfig
  private readonly apiPrefix: string
  private readonly baseHeaders: {
    'OK-ACCESS-KEY': string
    'OK-ACCESS-PASSPHRASE': string
    'OK-ACCESS-PROJECT': string
    'Content-Type': string
  }
  readonly _http: AxiosInstance

  constructor(config: OkxConfig) {
    const version = config.version ?? 'v5'
    this.config = { ...config, version }
    this.apiPrefix = `/api/${version}`
    this.baseHeaders = {
      'OK-ACCESS-KEY': config.apiKey,
      'OK-ACCESS-PASSPHRASE': config.passphrase,
      'OK-ACCESS-PROJECT': config.project,
      'Content-Type': 'application/json',
    }
    this._http = axios.create({
      baseURL: `${BaseURL}${this.apiPrefix}`,
      validateStatus: () => true,
    })
  }

  private preHash<Params>(
    timestamp: string,
    method: string,
    requestPath: string,
    params?: Params
  ): string {
    if (!params) {
      return `${timestamp}${method}${this.apiPrefix}${requestPath}`
    }
    const stringifyParams =
      method === 'GET' && params
        ? `?${new URLSearchParams(params as any).toString()}`
        : JSON.stringify(params)
    return `${timestamp}${method}${this.apiPrefix}${requestPath}${stringifyParams}`
  }

  private sign(message: string): string {
    return crypto
      .createHmac('sha256', this.config.secretKey)
      .update(message)
      .digest('base64')
  }

  private createSignature<Params>(
    method: string,
    requestPath: string,
    params?: Params
  ) {
    const timestamp = new Date().toISOString().slice(0, -5) + 'Z'
    const signature = this.sign(
      this.preHash<Params>(timestamp, method, requestPath, params)
    )
    return { signature, timestamp }
  }

  async sendRequest<Params, Return>(
    method: string,
    path: string,
    params?: Params
  ): Promise<Return> {
    const { signature, timestamp } = this.createSignature(method, path, params)
    const headers = {
      ...this.baseHeaders,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
    }

    const requestConfig: AxiosRequestConfig<Params> = {
      method,
      headers,
      url: path,
      ...(method === 'GET' ? { params } : { data: params }),
    }

    const response = await this._http<
      Response<Return>,
      AxiosResponse<Response<Return>>,
      Params
    >(requestConfig)
    const resp = response.data
    if (resp.code !== '0') {
      throw new Error(`OKX OS API RESPONSE Error(${resp.code}): ${resp.msg}`)
    }
    return resp.data as Return
  }
}
