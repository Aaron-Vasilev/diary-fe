import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { useDispatch } from 'react-redux'
import { mainSlice } from './slices/mainSlice'
import { noteSlice } from './slices/noteSlice'
import { questionSlice } from './slices/questionSlice'

const store = configureStore({
  reducer: {
    [mainSlice.name]: mainSlice.reducer,
    [noteSlice.name]: noteSlice.reducer,
    [questionSlice.name]: questionSlice.reducer,
  },
  devTools: true
})

const makeStore = () => store

export const wrapper = createWrapper<AppStore>(makeStore)

export type Action<T> = {
  type: string
  payload: T
}
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
