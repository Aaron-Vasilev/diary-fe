import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DecodedToken, call, today } from '@/lib'
import { RootState } from '../store'
import { STATUS_CODES } from '@/utils/consts'

export interface Note {
  id: number
  text: string
  createdDate: string
}

interface State {
  userId: number
  name: string
  loading: boolean
  notes: Note[],
  selectedDate: string
  subscribed: boolean
}

const initialState: State = {
  userId: 0,
  name: 'Anon',
  loading: false,
  notes: [],
  selectedDate: '',
  subscribed: false
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    setUser: (state, action) => {
      if (action.payload.userId) {
        state.userId = action.payload.userId
        state.name = action.payload.name
        state.subscribed = action.payload.subscribed
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload.notes
        state.loading = false
        if (action.payload.userId) {
          state.userId = action.payload.userId
          state.name = action.payload.name
          state.subscribed = action.payload.subscribed
        }
      })
      .addCase(getNotes.rejected, (state) => {
        state.loading = false
      })
      .addCase(addNote.pending, (state) => {
        state.loading = true
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes = [...state.notes, action.payload] 
        state.loading = false
      })
      .addCase(addNote.rejected, (state) => {
        state.loading = false
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        state.notes = state.notes.filter(note => note.id !== +payload)
        state.loading = false
      })
      .addCase(deleteNote.rejected, (state) => {
        state.loading = false
      })
      .addCase(editNote.fulfilled, (state, { payload }) => {
        const i = state.notes.findIndex(note => note.id === payload.id)
        state.notes[i].text = payload.text
      })
  },
})

export const { setSelectedDate, setUser } = noteSlice.actions

type GetNotes = {notes: Note[]} & DecodedToken
export const getNotes = createAsyncThunk<GetNotes, null, { state: RootState }>(
  '/getNotes',
  async (_, thunkApi) => {
    const question = thunkApi.getState().question.id
    return await call<GetNotes>(`/api/notes?question=${question}`)
  }
)

export const addNote = createAsyncThunk<Note, string, { state: RootState }>(
  '/addNote',
  async (text, thunkApi) => {
    const createdDate = today()

    return await call<Note>('/api/notes', 'POST', {
      text, 
      createdDate,
      questionId:  thunkApi.getState().question.id 
    })
  }
)

export const deleteNote = createAsyncThunk<number, number, { state: RootState }>(
  '/deleteNote',
  async (id, _thunkApi) => {
    return await call<number>(`/api/notes?id=${id}`, 'DELETE')
  }
)

export const editNote = createAsyncThunk<Note, Note, { state: RootState }>(
  '/editNote',
  async (note, _thunkApi) => {
    return await call(`/api/notes`,'PUT', note)
  }
)
