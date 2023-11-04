export enum STATUS_CODES {
  OK                    = 200,
  CREATED               = 201,
  UNAUTHORIZED          = 401,
  NOT_FOUND             = 404,
  NOT_ACCETABLE         = 406,
  INTERNAL_SERVER_ERROR = 500
}

export const NO_ERROR = 0
export const ERROR = 1

export const GET_QUESTION_ROUTE = '/get-qestion'
export const UPDATE_QUESTION_ROUTE = '/update-question'

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
