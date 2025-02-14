import { Request } from '../types'
import { RequestValidInscriptions, ResponseValidInscriptions } from './types'

export class ordinalsOrder {
  private client: Request
  constructor(client: Request) {
    this.client = client
  }
  async get_alid_inscriptions(params: RequestValidInscriptions) {
    const path = '/marketplace/ordinals/valid-inscriptions'
    return await this.client.sendRequest<
      RequestValidInscriptions,
      ResponseValidInscriptions
    >('GET', path, params)
  }
}
