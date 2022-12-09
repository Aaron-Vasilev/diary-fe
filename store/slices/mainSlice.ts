import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../pages/api/authApi'

interface InitialState {
  isLoading: boolean
  userId: number
  firstName: string
  secondName: string
}

const initialState: InitialState = {
  isLoading: false,
  userId: 0,
  firstName: '',
  secondName: '',
}

export interface Login {
  email: string
  password: string
}

export const login = createAsyncThunk<void, Login>(
  '/login',
  async (loginData, thunkApi) => {
    const data = await authApi.login(loginData)

    thunkApi.dispatch({ type: 'main/setUser', payload: data })
  }
)

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    init: (state) => {
      const { userId, firstName, secondName } = authApi.init()

      state.userId = userId
      state.firstName = firstName
      state.secondName = firstName
    },
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.firstName = action.payload.firstName
      state.secondName = action.payload.secondName
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { setUser, init } = mainSlice.actions

