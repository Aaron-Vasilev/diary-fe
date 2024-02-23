"use client"

import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAppDispatch } from '@/store/store'
import { setUser } from '@/store/slices/noteSlice'
import { auth } from '@/utils/firebase'
import { Button } from '@/components/Button'
import { useEffect, useState } from 'react'
import Loading from './loading'
import { ACCESS_TOKEN } from '@/utils/consts'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  async function googleSignIn() {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const credentials = await signInWithPopup(auth, provider)
      //@ts-ignore
      const googleToken = credentials.user.accessToken

      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: googleToken })
      })

      if (res.ok) {
        const { user, token } = await res.json()
        localStorage.setItem(ACCESS_TOKEN, token)
        dispatch(setUser(user))
        toDiary()
      } else {
        localStorage.removeItem(ACCESS_TOKEN)
      }
    } catch (e) {
      console.log('† line 36 e', e)
      localStorage.removeItem(ACCESS_TOKEN)
    }
    setLoading(false)
  }

  function toDiary() {
    router.push('/diary')
  }

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN))
      toDiary()
  }, [])

  if (loading) return (<Loading/>)

  return (
    <div className="flex w-screen justify-center">
      <div className="flex flex-col gap-2 border-sky-400">
        <Button
          handler={googleSignIn}
          label="Login with GOOGLE"
        />
        <Button 
          label='or continue without login'
          handler={toDiary}
          type='secondary'
        />
      </div>
    </div>
  )
}
