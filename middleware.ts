import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  if (request.headers) {
    request
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/auth',
}