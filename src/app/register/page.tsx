"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPass, setRepeatPass] = useState('')

  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [repeatPassValid, setRepeatPassValid] = useState(true)

  function emailHandler(value: string) {
    const isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    setEmail(value)
    setEmailValid(true)

    if (value.length === 0 || !isValid) 
      setEmailValid(false)
  }
  
  function passwordHandler(value: string) {
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&-_]{8,}$/.test(value)
    setPassword(value)
    setPasswordValid(true)

    if (!isValid)
      setPasswordValid(false)
  }

  function repeatPassHandler(value: string) {
    const isValid = password === value
    setRepeatPass(value)
    setRepeatPassValid(true)

    if (!isValid)
      setRepeatPassValid(false)
  }

  function toLogin() {
    router.push('/login')
  }

  async function registerUser() {
    if (emailValid === false || passwordValid === false || repeatPassValid === false) {
      return 
    }

      toLogin()
    }


  return (
    <>
      <div className="flex w-screen justify-center">
        <div className="flex flex-col gap-2 border-sky-400">
          <label>
            <p>Email*</p>
            <Input value={email} handler={emailHandler} isValid={emailValid} /> 
          </label>
          <label>
            <p>First Name</p>
            <Input value={firstName} handler={setFirstName}/> 
          </label>
          <label>
            <p>Second Name</p>
            <Input value={secondName} handler={setSecondName}/> 
          </label>
          <label>
            <p>Password*</p>
            <Input value={password} handler={passwordHandler} type="password" isValid={passwordValid} /> 
          </label>
          <label>
            <p>Repeat Password*</p>
            <Input value={repeatPass} handler={repeatPassHandler} type="password" isValid={repeatPassValid}/> 
          </label>
          <div className="mt-2 flex gap-4 self-center">
            <Button
              label="Back"
              handler={toLogin}
              size="S"
            />
            <Button
              label="Register"
              handler={registerUser}
              size="S"
            />
          </div>
        </div>
      </div>
    </>
  )
}
