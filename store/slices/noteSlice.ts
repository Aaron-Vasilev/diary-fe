import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { noteApi } from '../../pages/api/noteApi'
import { RootState } from '../store'

export interface Note {
  noteId: number
  text: string
  createdDate: string
  questionId: number
}

interface InitialState {
  notes: Array<Note>
  currentDate: string
}

const initialState: InitialState = {
  notes: [],
  currentDate: '',
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    pushNote: (state, action) => {
      state.notes = [...state.notes, action.payload]
    },
    setCurrDate: (state, action) => {
      state.currentDate = action.payload
    },
  },
})

export const { pushNote, setCurrDate } = noteSlice.actions

export const getNotes = createAsyncThunk<void, null, { state: RootState }>(
  '/getNotes',
  async (_, thunkApi) => {
    const questionId = thunkApi.getState().question.questionId
    const data = await noteApi.getNotes(questionId)

    thunkApi.dispatch({ type: 'note/pushNote', payload: data })
  }
)

export const addNote = createAsyncThunk<void, string, { state: RootState }>(
  '/addNote',
  async (text, thunkApi) => {
    const questionId = thunkApi.getState().question.questionId
    const createdDate = thunkApi.getState().note.currentDate

    const newNote: Note = { 
      noteId: 0, 
      text, 
      createdDate, 
      questionId,
    }

    const data = await noteApi.addNote(newNote)

    thunkApi.dispatch({ type: 'note/pushNote', payload: data })
  }
)