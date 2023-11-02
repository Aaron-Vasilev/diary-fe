import jwt from 'jsonwebtoken'
import { Api, ERROR, Roles } from '../../../utils/consts'
import { Axios, Response } from './axios'

export interface RegisterData {
  email: string
  firstName: string
  secondName: string
  password: string
}

export type Login = Pick<RegisterData, 'email' | 'password'>
export type User = Pick<RegisterData, 'firstName' | 'secondName'> & {
  userId: number
  role: Roles
}
type Token = {
  token: string
}


class AuthApi extends Axios {

  async login(data: Login): Promise<Response<User>> {
    try {
      let user: User
      const response = await this.post<Token>(Api.login, data)

      if (response.error !== ERROR) {
        const token = 'Bearer ' + response.data.token

        this.setToStorage(this.accessToken, token)
        user = this.init()
      }

      return {
          error: response.error,
          data: user
      }
    } catch (e) {
      console.error('† line 25 Login Error', e)
    }
  }

  async register(data: RegisterData): Promise<Response<number>> {
    try {
      return await this.post<Token>('register', data)
    } catch (e) {
      console.error(e)
      return ERROR
    }
  }

  init(): User {
    const token = this.getFromStorage(this.accessToken)
    let user: User = { userId: 0, firstName: 'Anon', secondName: '', role: Roles.Unauthorized }

    if (token) {
      const { userId, firstName, secondName, role } = jwt.decode(token.split(' ')[1]) as User

      user.userId = userId
      user.role = role
      user.firstName = firstName
      user.secondName = secondName
    }

    return user
  }
}

export const authApi = new AuthApi()
