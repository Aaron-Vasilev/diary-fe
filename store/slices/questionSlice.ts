import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetQuestionRes, questionApi } from '../../pages/api/questionApi'
import { Action, RootState } from '../store'

interface InitialState {
  questionId: number
  text: string
  questionDate: string
}

export const getQuestion = createAsyncThunk<void, null, { state: RootState }>(
  '/getQuestion',
  async (_, thunkApi) => {
    const shownDate = thunkApi.getState().note.selectedDate
    const data = await questionApi.getQuestion(shownDate)

    thunkApi.dispatch({ type: 'question/setQuestion', payload: data })
  }
)

const initialState: InitialState = {
  questionId: 0,
  text: 'Daily question',
  questionDate: '',
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestion: (state, action: Action<GetQuestionRes>) => {
      state.questionId = action.payload.id
      state.questionDate = action.payload.shownDate
      state.text = action.payload.text ?? state.text
    },
  },
})

export const { setQuestion } = questionSlice.actions
