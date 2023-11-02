import axios, { AxiosRequestConfig, AxiosError } from "axios"
import { ERROR, NO_ERROR, STATUS_CODES } from "../../../utils/consts"

const URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface Response<T> {
  data?: T
  error: number
}

export class Axios {
  instance = axios.create({
    baseURL: URL,
  })

  accessToken = 'accessToken'

  async makeRequest<T>(method: string, url: string, options = {}): Promise<Response<T>> {
    try {
      const config: AxiosRequestConfig = {
        data: {
          ...options,
        },
        method,
        url,
        headers: {
          Authorization: this.getFromStorage(this.accessToken),
        },
      }
      const { data } = await this.instance(url, config)

      return { 
        data,
        error: NO_ERROR
      }
    } catch (e) {
      console.error('† line 28 e', e)
      if (axios.isAxiosError(e)) {
        return {
          error: ERROR
        }
      }
    }
  }

  async get<T>(url: string): Promise<Response<T>> {
    return this.makeRequest('get', url)
  }

  async post<T>(url: string, options: any): Promise<Response<T>> {
    return this.makeRequest('post', url, options)
  }

  getFromStorage(key: string) {
    return localStorage.getItem(key)
  }

  setToStorage(key: string, token: string) {
    localStorage.setItem(key, token)
  }

  removeFromStorage(key: string) {
    localStorage.removeItem(key)
  }
}
