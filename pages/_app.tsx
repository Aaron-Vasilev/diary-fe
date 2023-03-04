import { Provider } from 'react-redux'
import { Main } from '../components/Main'
import { wrapper } from '../store/store'
import '../styles/globals.css'

export default function MyApp(rest) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Main {...props} />
    </Provider>
  )
}
