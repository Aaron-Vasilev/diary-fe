import { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Input } from '../../components/Input'
import { authApi } from '../api/authApi'

function Auth() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  function loginHandler(value: string) {
    setLogin(value)
  }

  function passwordHandler(value: string) {
    setPassword(value)
  }

  function logIn() {
    authApi.login('@@@', '123')
  }

  return (
    <Layout>
      <div className="w-screen flex justify-content-center pt-2">
        <div className="flex flex-col border-sky-400">
          <label>
            <p>Login</p>
            <Input value={login} hander={loginHandler}/> 
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