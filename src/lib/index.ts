import jwt from "jsonwebtoken"
import { Roles } from "../utils/consts"
import crypto from "crypto"

const ALGORITHM = 'aes-256-ctr'

export interface Hash {
  iv: string
  passwordHash: string
}

export interface DecodedToken {
  userId: number
  firstName: string
  secondName: string
  iat: number
  role: Roles
}

export function today(delimiter = '-'): string {
  const date = new Date()
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()

  return yyyy + delimiter + mm + delimiter + dd
}

export function combineUrl(url: string, ...args: string[]) {

  for (const str of args) {
    url += '/' + str
  }

  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${url}`
}

export function validDate(date: string): boolean {
  let isValid = true
  const [year, month, day] = date.split('-')

  if (typeof year  !== 'string' ||
      typeof month !== 'string' ||
      typeof day   !== 'string') {
    isValid = false
  } else if (year.length !== 4 || month.length !== 2 || day.length !==2) {
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

export async function validateJWT(token: string): Promise<DecodedToken> {
  let decodedToken: DecodedToken
  const JWT_SECRET = process.env.JWT_SECRET

  if (JWT_SECRET === undefined) {
    throw new Error('JWT is missing')
  }

  token = token.slice(7)

  jwt.verify(token, JWT_SECRET, (err, decoded: DecodedToken) => {
    if (err) {
      throw new Error('JWT is invalid')
    } else {
      decodedToken = decoded
    }
  })

  return decodedToken
}

export function encrypt(text: string): Hash {
  const iv = crypto.randomBytes(16)
  const key = process.env.JWT_SECRET
  
  if (key === undefined) {
    throw new Error('PASSWOR_KEY is missing')
  }

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return {
    iv: iv.toString('hex'),
    passwordHash: encrypted.toString('hex')
  }
}

export function decrypt(hash: Hash): string {
  const key = process.env.JWT_SECRET
  
  if (key === undefined) {
    throw new Error('PASSWOR_KEY is missing')
  }
  const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(hash.iv, 'hex'))

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.passwordHash, 'hex')), decipher.final()])

  return decrpyted.toString()
}

