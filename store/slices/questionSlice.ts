import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetQuestionRes, questionApi } from '../../pages/api/questionApi'
import { Action, RootState } from '../store'

interface InitialState {
  loading: boolean
  questionId: number
  text: string
  questionDate: string
}

export const getQuestion = createAsyncThunk<GetQuestionRes, null, { state: RootState }>(
  '/getQuestion',
  async (_, thunkApi) => {
    const shownDate = thunkApi.getState().note.selectedDate
    return await questionApi.getQuestion(shownDate)
  }
)

const initialState: InitialState = {
  loading: false,
  questionId: 0,
  text: 'Daily question',
  questionDate: '',
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestion.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      state.questionId = action.payload.id
      state.questionDate = action.payload.shownDate
      state.text = action.payload.text
    })
    builder.addCase(getQuestion.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const { } = questionSlice.actions
