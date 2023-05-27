import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UPDATE_QUESTION_API, UPDATE_QUESTION_ROUTE } from './utils/consts'

export function middleware(request: NextRequest) {
  const { url, headers } = request

  if (url.includes(UPDATE_QUESTION_ROUTE)) {
  } else {
  }

  
  return NextResponse.next()
}

export const config = {
  matcher: ['/update-question']
}
