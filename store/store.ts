import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { mainSlice } from './slices/main'
import { noteSlice } from './slices/note'

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    note: noteSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
