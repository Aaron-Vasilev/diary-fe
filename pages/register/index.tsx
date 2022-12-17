import { Fragment, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { Input } from '../../components/Input'
import { RootState, useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { Button } from '../../components/Button'

function Auth() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)

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
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
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
    Router.push('/login')
  }

  function register() {
    Router.push('/register')
  }

  useEffect(() => {
    if (userId !== 0)
      Router.push('/diary')

    if (Router.query.email) {
      emailHandler(Router.query.email.toString())
    }
    if (Router.query.password) {
      passwordHandler(Router.query.password.toString())
    }
  },[userId])

  return (
    <Fragment>
      <div className="flex w-screen justify-center">
        <div className="flex flex-col gap-2 border-sky-400">
          <label>
            <p>Email*</p>
            <Input value={email} hander={emailHandler} isValid={emailValid} /> 
          </label>
          <label>
            <p>First Name</p>
            <Input value={firstName} hander={setFirstName}/> 
          </label>
          <label>
            <p>Second Name</p>
            <Input value={secondName} hander={setSecondName}/> 
          </label>
          <label>
            <p>Password*</p>
            <Input value={password} hander={passwordHandler} type="password" isValid={passwordValid} /> 
          </label>
          <label>
            <p>Repeat Password*</p>
            <Input value={repeatPass} hander={repeatPassHandler} type="password" isValid={repeatPassValid}/> 
          </label>
          <div className="mt-2 flex gap-4 self-center">
            <Button
              label="Back"
              handler={toLogin}
              size="S"
            />
            <Button
              label="Register"
              handler={register}
              size="S"
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Auth