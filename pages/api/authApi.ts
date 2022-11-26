import jwt from 'jsonwebtoken'
import { Login } from '../../store/slices/main'
import { Api } from './axios'

interface LoginResponse {
  userId: number
  name: string
}

class AuthApi extends Api {

  accessToken = 'accessToken'

  init(): LoginResponse {
    const token = this.getFromStorage(this.accessToken)

    if (token) {
      this.setHeader('Authorization', token)
      // @ts-ignore
      const { userId } = jwt.decode(token.split(' ')[1])

      return { userId, name: '' }
    }

    return { userId: 0, name: '' }
  }

  async login(data: Login): Promise<LoginResponse> {
    const { userId, name, token } = await this.post('login', data)

    this.setHeader('Authorization', token)
    this.setToStorage(this.accessToken, token)

    return { userId, name }
  }

  getFromStorage(key: string) {
    return localStorage.getItem(key)
  }

  setToStorage(key: string, token: string) {
    localStorage.setItem(key, token)
  }
}

export const authApi = new AuthApi()