import { useEffect } from 'react'
import { useAppDispatch } from '../../store/store'
import { init } from '../../store/slices/authSlice'
import { Layout } from '../../components/Layout'
import { setCurrentDate, setSelectedDate } from '../../store/slices/noteSlice'
import { today } from '../../lib'

export function Main({ Component, pageProps }) {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const date = today()
    dispatch(init())
    dispatch(setCurrentDate(date))
    dispatch(setSelectedDate(date))
  }, [dispatch])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
