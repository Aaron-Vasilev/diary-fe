import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { useDispatch } from 'react-redux'
import { noteSlice } from './slices/noteSlice'
import { questionSlice } from './slices/questionSlice'

export const store = configureStore({
  reducer: {
    [noteSlice.name]: noteSlice.reducer,
    [questionSlice.name]: questionSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development'
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
