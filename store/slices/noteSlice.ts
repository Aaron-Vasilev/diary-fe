import { createSlice } from '@reduxjs/toolkit'

interface Note {
  noteId: number
  noteText: string
  createdDate: string
  questionId: number
}

interface InitialState {
  notes: Array<Note>
}

const initialState: InitialState = {
  notes: [],
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload]
    },
  },
})

export const { addNote } = noteSlice.actions
