import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { noteApi } from '../../app/api/helper/noteApi'
import { ERROR, NO_ERROR } from '../../utils/consts'
import { RootState } from '../store'

export interface Note {
  noteId: number
  text: string
  createdDate: string
  questionId: number
}

interface InitialState {
  loading: boolean
  notes: Array<Note>
  currentDate: string
  selectedDate: string
}

const initialState: InitialState = {
  loading: false,
  notes: [],
  currentDate: '',
  selectedDate: '',
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        action.payload
        state.notes = action.payload
        state.loading = false
      })
      .addCase(getNotes.rejected, (state) => {
        console.log('† line 48 rejected')
        state.loading = false
      })
      .addCase(addNote.pending, (state) => {
        state.loading = true
      })
      .addCase(addNote.fulfilled, (state, action) => {
        action.payload
        state.notes = [...state.notes, action.payload] 
        state.loading = false
      })
      .addCase(addNote.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setCurrentDate, setSelectedDate } = noteSlice.actions

export const getNotes = createAsyncThunk<Note[], null, { state: RootState }>(
  '/getNotes',
  async (_, thunkApi) => {
    const res = await noteApi.getNotes(
      thunkApi.getState().main.userId,
      thunkApi.getState().question.questionId
    )

    if (res.error === ERROR) {
      thunkApi.rejectWithValue(res.error)
    } else {
      return res.data
    }
  }
)

export const addNote = createAsyncThunk<Note, string, { state: RootState }>(
  '/addNote',
  async (text, thunkApi) => {
    const newNote: Note = { 
      noteId: 0, 
      text, 
      createdDate: thunkApi.getState().note.currentDate, 
      questionId: thunkApi.getState().question.questionId,
    }

    const res = await noteApi.addNote(newNote)

    if (res.error === ERROR) {
      thunkApi.rejectWithValue(res.error)
    } else {
      return res.data
    }
  }
)
