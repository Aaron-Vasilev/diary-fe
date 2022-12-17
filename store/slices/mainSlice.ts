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

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    init: (state) => {
      const { userId, firstName, secondName } = authApi.init()

      state.userId = userId
      state.firstName = firstName
      state.secondName = secondName
    },
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.firstName = action.payload.firstName
      state.secondName = action.payload.secondName
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { setUser, init } = mainSlice.actions

export const login = createAsyncThunk<void, Login>(
  '/login',
  async (loginData, thunkApi) => {
    const data = await authApi.login(loginData)
    
    if (data) {
      thunkApi.dispatch({ type: 'main/setUser', payload: data })
    } else {
      return thunkApi.rejectWithValue(data)
    }
  }
)