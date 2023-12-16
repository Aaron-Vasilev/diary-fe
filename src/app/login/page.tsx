"use client"

import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAppDispatch } from '@/store/store'
import { setUser } from '@/store/slices/noteSlice'
import { auth } from '@/utils/firebase'
import { Button } from '@/components/Button'

export default function Login() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  async function googleSignIn() {
    const provider = new GoogleAuthProvider()
    const credentials = await signInWithPopup(auth, provider)

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //@ts-ignore
      body: JSON.stringify({ token: credentials.user.accessToken })
    })

    if (res.ok) {
      const user = await res.json()
      dispatch(setUser(user))
      router.push('/diary')
    }
  }

  return (
    <>
      <div className="flex w-screen justify-center">
        <div className="flex flex-col gap-2 border-sky-400">
          <Button
            handler={googleSignIn}
            label="Login with GOOGLE"
          />
        </div>
      </div>
    </>
  )
}
