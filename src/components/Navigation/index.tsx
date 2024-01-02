"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navigation() {
  const path = usePathname()
  const isDiary = path.startsWith('/diary')
  const isLogin = path.startsWith('/login')

  async function logout() {
    await fetch('/api/auth')
  }

  if (isLogin) return null

  return (
    <nav
      className="flex gap-3 justify-end "
    >
      {isDiary ?
        <Link
          className='underline leading-8'
          href="/subscribe"
        >
          Subscribe
        </Link> 
        :
        <Link
          className='underline leading-8'
          href="/diary"
        >
          Diary
        </Link>
      }
      <Link
        className='underline leading-8'
        href="/"
        onClick={logout}
      >
        Logout
      </Link>
    </nav>
  )
}
