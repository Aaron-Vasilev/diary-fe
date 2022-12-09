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
  selectedDate: string
}

const initialState: InitialState = {
  notes: [
    {
      noteId: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime vero perspiciatis ab ratione quisquam excepturi sed cumque eius voluptatibus deserunt?',
      createdDate: '2022-12-09',
      questionId: 1
    }, {
      noteId: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime vero perspiciatis ab ratione quisquam excepturi sed cumque eius voluptatibus deserunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi et nisi cum quibusdam deserunt dolorum unde officia voluptates eligendi aspernatur doloremque quidem temporibus sed, impedit ad aut quia ratione nobis, natus quas praesentium repudiandae? Illo beatae placeat accusamus repellat quae tempora consectetur animi itaque aliquam distinctio, quidem quod laboriosam ut ducimus aliquid voluptatem ipsam? Vero cum qui natus ex! Laborum, delectus iusto tempore reiciendis sed consequatur accusantium eum saepe vel porro quibusdam atque id aperiam itaque quia modi sequi quidem quod! Repudiandae voluptates sapiente nemo, quae aspernatur quas quod alias aliquid, officia officiis accusantium, molestias quisquam sed aperiam reprehenderit ex.dd',
      createdDate: '2021-12-09',
      questionId: 1
    }
  ],
  selectedDate: '',
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    pushNote: (state, action) => {
      state.notes = [...state.notes, action.payload]
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
  },
})

export const { pushNote, setSelectedDate } = noteSlice.actions

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
    const createdDate = thunkApi.getState().note.selectedDate

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