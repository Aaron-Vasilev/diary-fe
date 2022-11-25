import { Provider } from 'react-redux'
import { Main } from './main'
import { store, RootState } from '../store/store'
import '../styles/globals.css'

function MyApp(props) {
  return (
    <Provider store={store}>
      <Main { ...props } />
    </Provider>
  )
}

export default MyApp