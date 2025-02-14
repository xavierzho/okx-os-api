export interface Response<T> {
  code: string
  msg: string
  data?: T
}
export interface Request {
  sendRequest<Params, Return>(
    method: string,
    path: string,
    params?: Params
  ): Promise<Return>
}

export * from './wallet/types'
