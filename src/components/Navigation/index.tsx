"use client"

import { usePathname, useRouter } from 'next/navigation'
import { Button } from "../Button"

export function Navigation() {
  const router = useRouter()
  const path = usePathname()
  const isDiary = path.startsWith('/diary')
  const isLogin = path.startsWith('/login')

  async function logout() {
    await fetch('/api/auth')
    router.push('/login')
  }


  return (
    <nav
      className="flex gap-3 justify-end "
    >
      {!isDiary && !isLogin && <Button
          label="Diary"
          handler={() => router.push('/diary')}
        />
      }
      {isDiary && <Button
          label="Subscribe"
          handler={() => router.push('/subscribe')}
        />
      }
      {!isLogin && <Button
          label="Logout"
          handler={logout}
        />
      }
    </nav>
  )
}
