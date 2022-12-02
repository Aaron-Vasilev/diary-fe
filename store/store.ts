import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { mainSlice } from './slices/mainSlice'
import { noteSlice } from './slices/noteSlice'
import { questionSlice } from './slices/questionSlice'

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    note: noteSlice.reducer,
    question: questionSlice.reducer,
  },
  devTools: true
})

export type Action<T> = {
  type: string
  payload: T
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch