import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useRouter } from 'next/router'

export function Main({ Component, pageProps }) {
  const router = useRouter() 
  const userId = useSelector((state: RootState) => state.main.userId)

  useEffect(() => {
    if (userId == 0) {
      router.push('auth')
    } else {
      router.push('note')
    }
  }, [userId])

  return (
    <Component {...pageProps} />
  )
}