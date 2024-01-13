"use client"

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export function Navigation() {
  const router = useRouter()
  const userId = useSelector((state: RootState) => state.note.userId)
  const path = usePathname()
  const isLogin = path.startsWith('/login')

  async function logout() {
    await fetch('/api/auth')
  }

  function toLogin() {
    router.push('/login')
  }

  if (isLogin) return null

  return (
    <nav
      className="flex flex-col gap-3 justify-end md:flex-row"
    >
      <Link
        className='underline leading-8'
        href="/diary"
      >
        Diary
      </Link>
      <Link
        className='underline leading-8'
        href="/subscribe"
      >
        Subscribe
      </Link> 
      {userId ? 
        <Link
          className='underline leading-8'
          href="/"
          onClick={logout}
        >
          Logout
        </Link>
      :
        <Link
          className='underline leading-8'
          href="/"
          onClick={toLogin}
        >
          Login
        </Link>
      }
    </nav>
  )
}
