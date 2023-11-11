import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUS_CODES } from '@/utils/consts'
import { RootState } from '../store'

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
    const res = await fetch(`/api/question?date=${date}`)

    return await res.json()
  }
)

export const updateQuestion = createAsyncThunk<number, string, { state: RootState }>(
  '/updateQuestion',
  async (text, thunkApi) => {
    const res = await fetch(`/api/question`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text, 
        questionId:  thunkApi.getState().question.id 
      })})

    if (res.status !== STATUS_CODES.CREATED) {
      return await res.json()
    }

    return thunkApi.rejectWithValue(null)
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
