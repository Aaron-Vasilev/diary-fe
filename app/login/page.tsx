"use client"

import { FormEvent,  useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setValid] = useState(true)

  async function logIn(event: FormEvent) {
    event.preventDefault()
      const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    const { token } = await res.json()

    if (token) router.push('/diary')
  }

  function register(event: FormEvent) {
    event.preventDefault()
    router.push(`/register?email=${email}`)
  }

  return (
    <>
      <div className="flex w-screen justify-center">
        <div className="flex flex-col gap-2 border-sky-400">
          <label>
            <p>Login</p>
            <Input value={email} handler={setEmail} isValid={isValid}/> 
          </label>
          <label>
            <p>Password</p>
            <Input value={password} handler={setPassword} isValid={isValid} type="password"/> 
          </label>
          <form className="mt-2 flex gap-4 self-center">
            <Button
              label="Login"
              handler={logIn}
              size="S"
              type="submit"
            />
            <Button
              label="Register"
              handler={register}
              size="S"
            />
          </form>
        </div>
      </div>
    </>
  )
}
