import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DecodedToken, today } from '@/lib'
import { RootState } from '../store'
import { STATUS_CODES } from '@/utils/consts'

export interface Note {
  id: number
  text: string
  createdDate: string
}

const initialState = {
  userId: 0,
  firstName: '',
  loading: false,
  notes: [],
  selectedDate: '',
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.firstName = action.payload.firstName
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload.notes
        state.userId = action.payload.userId
        state.firstName = action.payload.firstName
        state.loading = false
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
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload)
        state.loading = false
      })
      .addCase(deleteNote.rejected, (state) => {
        state.loading = false
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.notes = state.notes.map(note => {
          if (note.id === action.payload.id) {
            note.text = action.payload.text
            return note
          }
          return note
        })
      })
  },
})

export const { setSelectedDate, setUser } = noteSlice.actions

export const getNotes = createAsyncThunk<{notes: Note[]} & DecodedToken , null, { state: RootState }>(
  '/getNotes',
  async (_, thunkApi) => {
    const question = thunkApi.getState().question.id
    const res = await fetch(`/api/notes?question=${question}`)

    return await res.json()
  }
)

export const addNote = createAsyncThunk<Note, string, { state: RootState }>(
  '/addNote',
  async (text, thunkApi) => {
    const createdDate = today()
    const res = await fetch(`/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text, 
        createdDate,
        questionId:  thunkApi.getState().question.id 
      })
    })

    if (res.status !== STATUS_CODES.CREATED) {
      return await res.json()
    }
  }
)

export const deleteNote = createAsyncThunk<number, number, { state: RootState }>(
  '/deleteNote',
  async (id, _thunkApi) => {
    const res = await fetch(`/api/notes?id=${id}`, {
      method: 'DELETE',
    })

    if (res.status === STATUS_CODES.OK) {
      return id
    }
  }
)

export const editNote = createAsyncThunk<Note, Note, { state: RootState }>(
  '/editNote',
  async (note, _thunkApi) => {
    const res = await fetch(`/api/notes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })

    if (res.status === STATUS_CODES.OK) {
      return note
    }
  }
)
