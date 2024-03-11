import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { call } from '@/lib'

export interface Question {
  id: number
  text: string
  shownDate: string
}

type InitialState = Question & {
  loading: boolean
} 

export const getQuestion = createAsyncThunk<Question, null, { state: RootState }>(
  '/getQuestion',
  async (_, thunkApi) => {
    const date = thunkApi.getState().note.selectedDate

    const res = await call(`/api/question?date=${date}`)

    if (res.ok) return await res.json()
    else return thunkApi.rejectWithValue(null)
  }
)

export const updateQuestion = createAsyncThunk<number, string, { state: RootState }>(
  '/updateQuestion',
  async (text, thunkApi) => {
    const res = await call(`/api/question`, 'PUT', {
      text, 
      questionId:  thunkApi.getState().question.id 
    })

    if (res.ok) return await res.json()
    else return thunkApi.rejectWithValue(null)
  }
)

const initialState: InitialState = {
  loading: true,
  id: 0,
  text: '',
  shownDate: '',
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionText: (state, action) => {
      state.text = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.id = action.payload.id
        state.shownDate = action.payload.shownDate
        state.text = action.payload.text
        state.loading = false
      })
      .addCase(getQuestion.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setQuestionText } = questionSlice.actions
