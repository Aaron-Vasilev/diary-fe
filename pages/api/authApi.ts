import jwt from 'jsonwebtoken'
import { Login } from '../../store/slices/mainSlice'
import { Api } from './axios'

interface UserData {
  userId: number
  firstName: string
  secondName: string
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
