import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import { store, RootState } from '../store/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const userId = useSelector<RootState>(state => state.main.userId)

  useEffect(() => {

  }, [userId])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp