import { Roles } from "../utils/consts"

export interface DecodedToken {
  userId: number
  name: string
  role: Roles
  iat: number
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
