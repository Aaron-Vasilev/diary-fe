import { NextResponse } from 'next/server'
import { decodeJwt, jwtVerify } from 'jose'
import { db } from "@/db"
import type { NextRequest } from 'next/server'
import { DecodedToken } from './lib'
import { Roles } from './utils/consts'

export const config = {
  matcher: ['/diary/', '/login/', '/update-question/']
}

const protectedRoutes = ['/diary/', '/update-question/']
const adminRoutes = ['/update-question/']

function isProtectedRoute(path: string) {
  for (let i = 0; i < protectedRoutes.length; i++) {
    if (protectedRoutes[i].startsWith(path))
      return true
  }

  return false
}

function forAdmins(path:string) {
  for (let i = 0; i < adminRoutes.length; i++) {
    if (adminRoutes[i].startsWith(path))
      return true
  }

  return false
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')

  if (isProtectedRoute(path)) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    try {
      await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET))
    } catch (_e) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('token')

      return response
    }

    if (forAdmins(path)) {
      const decodedToken = decodeJwt<DecodedToken>(token.value)

      if (decodedToken.role !== Roles.Admin)
        return NextResponse.redirect(new URL('/diary', request.url))
    }
  }


  if (token && path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/diary', request.url))
  }

  return NextResponse.next()
}
