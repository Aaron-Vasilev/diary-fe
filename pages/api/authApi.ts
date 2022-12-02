import jwt from 'jsonwebtoken'
import { Login } from '../../store/slices/mainSlice'
import { Api } from './axios'

interface LoginResponse {
  userId: number
  name: string
}

class AuthApi extends Api {

  async login(data: Login): Promise<LoginResponse> {
    const { userId, name, token } = await this.post('login', data)

    this.setToStorage(this.accessToken, token)

    return { userId, name }
  }

  init() {
    const token = this.getFromStorage(this.accessToken)

    if (token) {
      // @ts-ignore
      const { userId } = jwt.decode(token.split(' ')[1])

      return { userId, name: '' }
    }

    return { userId: 0, name: '' }
  }
}

export const authApi = new AuthApi()