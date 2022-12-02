import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store'
import { init } from '../store/slices/mainSlice'
import { Layout } from '../components/Layout'

export function Main({ Component, pageProps }) {
  const dispatch = useAppDispatch()
  const isLoading = useSelector((state: RootState) => state.main.isLoading)
  
  useEffect(() => {
    dispatch(init())
  }, [dispatch])

  return (
    <Layout>
      {isLoading ? <h1>Loading...</h1> : <Component {...pageProps} /> }
    </Layout>
  )
}