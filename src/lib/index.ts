import { SignJWT, jwtVerify } from "jose"
import { ACCESS_TOKEN, AUTHORIZATION, Roles } from "../utils/consts"
import { OAUTH_URL, SUB_URL } from "@/utils/consts"

export interface DecodedToken {
  userId: number
  name: string
  role: Roles
  subscribed: boolean
  iat: number
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function call<R>(
  url: string,
  method: Method = 'GET',
  data?: any
): Promise<R> {
  try {
    let res: Response

    const token = localStorage.getItem(ACCESS_TOKEN)
    const headers = {}

    if (token) headers[AUTHORIZATION] = token

    if (method === 'GET' || method === 'DELETE') {
      res = await fetch(url, { 
        headers,
        method
      })

    } else {
      res = await fetch(url, {
        method,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }

    return await res.json()
  } catch (e) {
    console.log('† line 44 e', e)
  }
}

export function today(delimiter = '-'): string {
  const date = new Date()
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()

  return yyyy + delimiter + mm + delimiter + dd
}

export function validDate(date: string): boolean {
  let isValid = true
  const [year, month, day] = date.split('-')

  if (typeof year  !== 'string' ||
      typeof month !== 'string' ||
      typeof day   !== 'string') {
    isValid = false
  } else if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
    isValid = false
  }

  return isValid
}

export function validStrings(...strs: string[]): boolean {
  let isValid = true 

  strs.map(str => {
    if (typeof str !== 'string' || str === undefined || str.length === 0)
      isValid = false
  })

  return isValid
}

export async function validatePayPalSub(subId: string): Promise<boolean> {
  try {
    const oauthRes = await fetch(OAUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' })
    })

    const { access_token } = await oauthRes.json()

    const paypalRes = await fetch(SUB_URL + subId, {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    })
    const { status } = await paypalRes.json()

    if (status === 'ACTIVE') return true
  } catch (e) {
    console.log('† line 76 e', e)
  }

  return false
}

export async function verifyJWT(token: string): Promise<DecodedToken> {
  const decoded = await jwtVerify<DecodedToken>(token, 
    new TextEncoder().encode(process.env.JWT_SECRET))

  return decoded.payload
}

const alg = 'HS256'

export async function signJWT(decoded: any): Promise<string> {
  const token = await new SignJWT(decoded)
    .setProtectedHeader({ alg })
    .setExpirationTime('21d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))

  return token
}
