import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Question, questionApi } from '../../pages/api/questionApi'
import { RootState } from '../store'

interface InitialState {
  loading: boolean
  questionId: number
  text: string
  questionDate: string
}

export const getQuestion = createAsyncThunk<Question, null, { state: RootState }>(
  '/getQuestion',
  async (_, thunkApi) => {
    const shownDate = thunkApi.getState().note.selectedDate
    return await questionApi.getQuestion(shownDate)
  }
)

export const updateQuestion = createAsyncThunk<number, string, { state: RootState }>(
  '/updateQuestion',
  async (text, thunkApi) => {
    const newQuestion: Question = {
      id: thunkApi.getState().question.questionId,
      shownDate: thunkApi.getState().question.questionDate,
      text,
    }
    return await questionApi.updateQuestion(newQuestion)
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
        state.questionId = action.payload.id
        state.questionDate = action.payload.shownDate
        state.text = action.payload.text
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(HYDRATE, () => {
        console.log('† line 57 HYDRATE', HYDRATE)
      })
  },
})

export const { setQuestionText } = questionSlice.actions
