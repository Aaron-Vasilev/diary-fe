import { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Input } from '../../components/Input'
import { useAppDispatch } from '../../store/store'
import { login } from '../../store/slices/main'

function Auth() {
  const dispatch = useAppDispatch()
  const [email, setLogin] = useState('')
  const [password, setPassword] = useState('')

  function loginHandler(value: string) {
    setLogin(value)
  }

  function passwordHandler(value: string) {
    setPassword(value)
  }

  async function logIn() {
    await dispatch(login({ email, password }))
  }

  return (
    <Layout>
      <div className="w-screen flex justify-content-center pt-2">
        <div className="flex flex-col border-sky-400">
          <label>
            <p>Login</p>
            <Input value={email} hander={loginHandler}/> 
          </label>
          <label>
            <p>Password</p>
            <Input value={password} hander={passwordHandler}/> 
          </label>
          <button onClick={logIn}>Login</button>
        </div>
      </div>

    </Layout>
  )
}

export default Auth