import axios from "axios"

export class Api {
  instance = axios.create({
    baseURL: 'http://localhost:8080/'
  })

  headers = {}

  setHeader(key: string, value: string) {
    this.headers[key] = value
  }

  async makeRequest(method: string, url: string, options: any = {}) {
    const config = {
      data: {
        ...options
      },
      method,
      url,
      headers: {
        ...this.headers
      }
    }
    const { data } = await this.instance(config)
    return data
  }

  async get(url: string) {
    return this.makeRequest('get', url)
  }

  async post(url: string, options: any) {
    return this.makeRequest('post', url, options)
  }
}