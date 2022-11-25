import { createSlice } from '@reduxjs/toolkit'

interface Note {
  id: number
  text: string
}

interface InitialState {
  prevNotes: Array<Note>
}

const initialState: InitialState = {
  prevNotes: [],
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.prevNotes = [...state.prevNotes, action.payload]
    },
  },
})

export const { addNote } = noteSlice.actions
