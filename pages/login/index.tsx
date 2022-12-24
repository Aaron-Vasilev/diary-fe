import { useEffect, useState } from 'react'
import Router from 'next/router'
import { Input } from '../../components/Input'
import { RootState, useAppDispatch } from '../../store/store'
import { login } from '../../store/slices/mainSlice'
import { useSelector } from 'react-redux'
import { Button } from '../../components/Button'

function Login() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setValid] = useState(true)

  async function logIn() {
    const result = await dispatch(login({ email, password }))
    
    if (result.meta.requestStatus === 'rejected') {
      setValid(false)
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
    if (userId !== 0)
      Router.push('/diary')
  },[userId])

  return (
    <>
      <div className="flex w-screen justify-center">
        <div className="flex flex-col gap-2 border-sky-400">
          <label>
            <p>Login</p>
            <Input value={email} hander={setEmail} isValid={isValid}/> 
          </label>
          <label>
            <p>Password</p>
            <Input value={password} hander={setPassword} isValid={isValid} type="password"/> 
          </label>
          <div className="mt-2 flex gap-4 self-center">
            <Button
              label="Login"
              handler={logIn}
              size="S"
            />
            <Button
              label="Register"
              handler={toRegister}
              size="S"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
