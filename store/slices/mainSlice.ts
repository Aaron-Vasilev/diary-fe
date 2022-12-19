import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi, Login, Register } from '../../pages/api/authApi'
import { NO_ERROR } from '../../utils/consts'

interface InitialState {
  error: number
  isLoading: boolean
  userId: number
  firstName: string
  secondName: string
}

const initialState: InitialState = {
  error: 0,
  isLoading: false,
  userId: 0,
  firstName: '',
  secondName: '',
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
    builder.addCase(register.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(register.rejected, (state, action) => {
      console.log("🚀 ~ file: mainSlice.ts:55 ~ builder.addCase ~ action", action)
      //@ts-ignore
      state.error = action.payload
      state.isLoading = false
    }) }
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

export const register = createAsyncThunk<number, Register>(
  '/register',
  async (registerData, thunkApi) => {
    const result = await authApi.register(registerData)
    
    if (result === NO_ERROR) {
      return result
    } else {
      return thunkApi.rejectWithValue(result)
    }
  }
)