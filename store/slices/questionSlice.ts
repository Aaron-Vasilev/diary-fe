import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetQuestionRes, questionApi } from '../../pages/api/questionApi'
import { Action, RootState } from '../store'

interface InitialState {
  questionId: number
  text: string
  questionDate: string
  selectedDate: string
}

export const getQuestion = createAsyncThunk<void, string, { state: RootState }>(
  '/getQuestion',
  async (shownDate, thunkApi) => {
    const data = await questionApi.getQuestion({ shownDate })

    thunkApi.dispatch({ type: 'question/setQuestion', payload: data })
  }
)

const initialState: InitialState = {
  questionId: 0,
  text: 'Daily question',
  questionDate: '',
  selectedDate: '',
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestion: (state, action: Action<GetQuestionRes>) => {
      state.questionId = action.payload.id
      state.questionDate = action.payload.shownDate
      state.text = action.payload.text
    },
  },
})

export const { setQuestion } = questionSlice.actions
