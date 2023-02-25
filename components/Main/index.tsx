import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store/store'
import { init, logout } from '../../store/slices/mainSlice'
import { Layout } from '../../components/Layout'
import { setCurrentDate, setSelectedDate } from '../../store/slices/noteSlice'
import { today } from '../../lib/currentDate'
import { Button } from '../Button'

export function Main({ Component, pageProps }) {
  const dispatch = useAppDispatch()
  const isLoading = useSelector((state: RootState) => state.main.isLoading)
  
  useEffect(() => {
    const date = today()
    dispatch(init())
    dispatch(setCurrentDate(date))
    dispatch(setSelectedDate(date))
  }, [dispatch])

  return (
    <Layout>
      {isLoading ? <h1>Loading...</h1> : <Component {...pageProps} /> }
    </Layout>
  )
}
