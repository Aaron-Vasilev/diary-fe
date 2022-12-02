import { Api } from './axios'
import { Note } from '../../store/slices/noteSlice'

export interface GetNotesRes {
  noteId: number
  questionId: number
  text: string
  createdDate: string
}

class NoteApi extends Api {

  async getNotes(questionId: number): Promise<GetNotesRes> {
    return await this.post('get-notes', { questionId })
  }

  async addNote(newNote: Note): Promise<GetNotesRes> {
    return await this.post('get-notes', newNote)
  }
}

export const noteApi = new NoteApi()