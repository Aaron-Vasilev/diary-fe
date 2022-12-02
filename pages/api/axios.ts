import axios, { AxiosRequestConfig } from "axios"

export class Api {
  instance = axios.create({
    baseURL: 'http://localhost:8080/'
  })

  accessToken = 'accessToken'

  async makeRequest(method: string, url: string, options: any = {}) {
    const config: AxiosRequestConfig = {
      data: {
        ...options
      },
      method,
      url,
      headers: {
        Authorization: this.getFromStorage(this.accessToken)
      }
    }

    const { data } = await this.instance(url, config )

    return data
  }

  async get(url: string) {
    return this.makeRequest('get', url)
  }

  async post(url: string, options: any) {
    return this.makeRequest('post', url, options)
  }

  getFromStorage(key: string) {
    return localStorage.getItem(key)
  }

  setToStorage(key: string, token: string) {
    localStorage.setItem(key, token)
  }

}