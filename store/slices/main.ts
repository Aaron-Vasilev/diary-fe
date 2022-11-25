import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  userId: number
  userName: string
}

const initialState: InitialState = {
  userId: 0,
  userName: '',
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
    },
  },
})

export const { setUser } = mainSlice.actions

