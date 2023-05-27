import { FormEvent, useEffect, useState } from 'react'
import Router from 'next/router'
import { Input } from '../../components/Input'
import { RootState, useAppDispatch } from '../../store/store'
import { login } from '../../store/slices/authSlice'
import { useSelector } from 'react-redux'
import { Button } from '../../components/Button'

function Login() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setValid] = useState(true)

  async function logIn(event: FormEvent) {
    event.preventDefault()
    const result = await dispatch(login({ email, password }))
    
    if (result.meta.requestStatus === 'rejected') {
      setValid(false)
      setPassword('')
    } else if (result.meta.requestStatus === 'fulfilled') {
      Router.push('/diary')
    }
  }

  function toRegister() {
    Router.push({
      pathname: '/register',
      query: {
        email,
        password
      }
    })
  }

  useEffect(() => {
    if (userId !== 0) {
      Router.push('diary')
    }
  }, [userId])

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
              handler={toRegister}
              size="S"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
