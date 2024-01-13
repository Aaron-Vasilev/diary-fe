export enum STATUS_CODES {
  OK                    = 200,
  CREATED               = 201,
  UNAUTHORIZED          = 401,
  NOT_FOUND             = 404,
  NOT_ACCETABLE         = 406,
  INTERNAL_SERVER_ERROR = 500
}

export enum Api {
  login = 'login',
  getQuestion = 'getQuestion',
  updateQuestion = 'updateQuestion',
  getNotes = 'getNotes',
  addNote = 'addNote',
}

export enum Roles {
  Admin = 'admin',
  User = 'user',
  Unauthorized = 'unauthorized'
}

export const PLANS = {
  month: process.env.NEXT_PUBLIC_PAYPAL_SUB_MONTH,
  year: process.env.NEXT_PUBLIC_PAYPAL_SUB_YEAR
}

const Paypal_prod = "https://api-m.paypal.com"
const Paypal_sandbox = "https://api-m.sandbox.paypal.com"
const PAYPAL_URL = process.env.NODE_ENV === "production" ? Paypal_prod : Paypal_sandbox
export const OAUTH_URL = PAYPAL_URL + '/v1/oauth2/token/'
export const SUB_URL = PAYPAL_URL + '/v1/billing/subscriptions/'
