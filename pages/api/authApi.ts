import jwt from 'jsonwebtoken'
import { ERROR } from '../../utils/consts'
import { Api } from './axios'

interface UserData {
  userId: number
  firstName: string
  secondName: string
}

export interface Login {
  email: string
  password: string
}

export interface Register {
  email: string
  firstName: string
  secondName: string
  password: string
}

class AuthApi extends Api {

  async login(data: Login): Promise<UserData | void> {
    try {
      const { token } = await this.post('login', data)

      this.setToStorage(this.accessToken, token)
      return this.init()
    } catch (e) {
    }
  }

  async register(data: Register): Promise<number> {
    try {
      return await this.post('register', data)
    } catch (e) {
      console.error(e)
      return ERROR
    }
  }

  init(): UserData {
    const token = this.getFromStorage(this.accessToken)
    const userData = { userId: 0, firstName: '', secondName: '' }

    if (token) {
      // @ts-ignore
      const { userId, firstName, secondName } = jwt.decode(token.split(' ')[1])

      userData.userId = userId
      userData.firstName = firstName
      userData.secondName = secondName
    }

    return userData
  }
}

export const authApi = new AuthApi()