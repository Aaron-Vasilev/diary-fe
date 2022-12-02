import { Fragment, useEffect, useState } from 'react'
import { Input } from '../../components/Input'
import { RootState, useAppDispatch } from '../../store/store'
import { login } from '../../store/slices/mainSlice'
import { useSelector } from 'react-redux'
import Router from 'next/router'

function Auth() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)
  const [email, setLogin] = useState('')
  const [password, setPassword] = useState('')

  function loginHandler(value: string) {
    setLogin(value)
  }

  function passwordHandler(value: string) {
    setPassword(value)
  }

  function logIn() {
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if (userId !== 0)
      Router.push('/note')
  },[userId])

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default Auth