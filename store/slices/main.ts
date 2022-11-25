import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../pages/api/authApi'

interface InitialState {
  userId: number
  userName: string
}

const initialState: InitialState = {
  userId: 0,
  userName: '',
}

export interface Login {
  email: string
  password: string
}

export const login = createAsyncThunk(
  '/login',
  async (loginData: Login, thunkApi) => {
    const data = await authApi.login(loginData)

    thunkApi.dispatch({ type: 'main/setUser', payload: data  })
  }
)

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {})
  }
})

export const { setUser } = mainSlice.actions

