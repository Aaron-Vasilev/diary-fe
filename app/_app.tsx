import { Provider } from 'react-redux'
import { Main } from '../components/Main'
import { wrapper } from '../store/store'
import '../styles/globals.css'

function MyApp(rest: any) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Main {...props} />
    </Provider>
  )
}
