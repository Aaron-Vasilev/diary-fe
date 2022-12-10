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
    builder.addCase(getNotes.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getNotes.fulfilled, (state, action) => {
      action.payload
      state.notes = action.payload
      state.loading = false
    })
    builder.addCase(getNotes.rejected, (state, action) => {
      state.loading = false
    })
    builder.addCase(addNote.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addNote.fulfilled, (state, action) => {
      action.payload
      state.notes = [...state.notes, action.payload] 
      state.loading = false
    })
    builder.addCase(addNote.rejected, (state, action) => {
      state.loading = false
    }) },
})

export const { setCurrentDate, setSelectedDate } = noteSlice.actions

export const getNotes = createAsyncThunk<Note[], null, { state: RootState }>(
  '/getNotes',
  async (_, thunkApi) => {
    return await noteApi.getNotes(
      thunkApi.getState().main.userId,
      thunkApi.getState().question.questionId
    )
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

    return await noteApi.addNote(newNote)
  }
)