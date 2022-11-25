import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  if (request.headers) {
    request
  }
  console.log("🚀 ~ file: middleware.ts ~ line 9 ~ middleware ~ request", request)
  
  return NextResponse.next()
}

export const config = {
  matcher: '/auth',
}