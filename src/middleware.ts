import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DecodedToken, verifyJWT } from './lib'
import { Roles } from './utils/consts'

export const config = {
  matcher: ['/diary/', '/login/', '/update-question/', '/subscribe/:path*']
}

const notProtectedRoutes = ['/login/', '/diary/']
const adminRoutes = ['/update-question/']

function isProtectedRoute(path: string) {
  for (let i = 0; i < notProtectedRoutes.length; i++) {
    if (notProtectedRoutes[i].startsWith(path))
      return false
  }

  return true
}

function forAdmins(path:string) {
  for (let i = 0; i < adminRoutes.length; i++) {
    if (adminRoutes[i].startsWith(path))
      return true
  }

  return false
}

export async function middleware(request: NextRequest) {
//  const path = request.nextUrl.pathname
//  const token = request.cookies.get('token')
//
//  if (isProtectedRoute(path)) {
//    if (!token) return NextResponse.redirect(new URL('/login', request.url))
//    let decodedToken: DecodedToken
//
//    try {
//      decodedToken = await verifyJWT(token.value)
//    } catch (_e) {
//      const response = NextResponse.redirect(new URL('/login', request.url))
//      response.cookies.delete('token')
//
//      return response
//    }
//
//    if (forAdmins(path) && decodedToken.role !== Roles.Admin)
//      return NextResponse.redirect(new URL('/diary', request.url))
//  }
//
//
//  if (token && path.startsWith('/login')) {
//    return NextResponse.redirect(new URL('/diary', request.url))
//  }

  return NextResponse.next()
}
