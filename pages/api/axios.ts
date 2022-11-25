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
    const { data } = await this.instance({
      data: {
        ...options
      },
      method,
      url,
      headers: {
        ...this.headers
      }
    })

    return data
  }

  async post(url: string, options: any) {
    return this.makeRequest('post', url, options)
  }
}