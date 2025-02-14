import * as crypto from 'node:crypto'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { BaseURL } from './constants'
import { Response, Request } from './types'

export interface OkxConfig {
  apiKey: string
  secretKey: string
  passphrase: string
  project: string
  version?: string
}

export class Client implements Request {
  private config: OkxConfig
  readonly _http: AxiosInstance

  constructor(config: OkxConfig) {
    this.config = config
    if (!config.version) {
      config.version = 'v5'
    }
    this._http = axios.create({
      baseURL: `${BaseURL}/api/${config.version}`,
      validateStatus: () => true,
    })
  }

  private preHash<Params>(
    timestamp: string,
    method: string,
    requestPath: string,
    params?: Params
  ): string {
    let queryString = ''

    if (method === 'GET' && params) {
      queryString = '?' + new URLSearchParams(params as any).toString()
    } else if (method === 'POST' && params) {
      queryString = JSON.stringify(params)
    }
    return `${timestamp}${method}/api/${this.config.version}${requestPath}${queryString}`
  }

  private sign(message: string): string {
    const hmac = crypto.createHmac('sha256', this.config.secretKey)
    hmac.update(message)
    return hmac.digest('base64')
  }

  private createSignature<Params>(
    method: string,
    requestPath: string,
    params?: Params
  ): {
    signature: string
    timestamp: string
  } {
    const timestamp = new Date().toISOString().slice(0, -5) + 'Z'
    const message = this.preHash<Params>(timestamp, method, requestPath, params)
    const signature = this.sign(message)
    return { signature, timestamp }
  }

  async sendRequest<Params, Return>(
    method: string,
    path: string,
    params?: Params
  ): Promise<Return> {
    const { signature, timestamp } = this.createSignature<Params>(
      method,
      path,
      params
    )

    const headers = {
      'OK-ACCESS-KEY': this.config.apiKey,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'OK-ACCESS-PASSPHRASE': this.config.passphrase,
      'OK-ACCESS-PROJECT': this.config.project,
      'Content-Type': 'application/json',
    }

    try {
      const response = await this._http<
        Response<Return>,
        AxiosResponse<Response<Return>>,
        Params
      >({
        method,
        headers,
        url: path,
        params: method == 'GET' ? params : undefined,
        data: method == 'POST' ? params : undefined,
      } as AxiosRequestConfig<Params>)
      const resp = response.data
      if (resp.code !== '0') {
        throw new Error(`OKX OS API RESPONSE Error(${resp.code}): ${resp.msg}`)
      }
      return resp.data as Return
    } catch (error: any) {
      // console.error('Error sending OKX request:', error);
      throw error // Re-throw for handling in calling code
    }
  }
}
