import { Api } from './axios'

interface LoginResponse {
  userId: number
  name: string
}

class AuthApi extends Api {

  accessToken = 'accessToken'

  async login(email: string, password: string): Promise<LoginResponse> {
    const options = { email, password }
    const { userId, name, token } = await this.post('login', options)

    this.setHeader('Authorization', token)
    this.setToken(this.accessToken, token)

    return { userId, name }
  }

  setToken(type: string, token: string) {
    localStorage.setItem(type, token)
  }
}

export const authApi = new AuthApi()