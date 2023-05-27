import { Axios, Response } from './axios'
import { Note } from '../../../store/slices/noteSlice'
import { Api } from '../../../utils/consts'

class NoteApi extends Axios {

  async getNotes(userId: number, questionId: number): Promise<Response<Note[]>> {
    return await this.post(Api.getNotes, { userId, questionId })
  }

  async addNote(newNote: Note): Promise<Response<Note>> {
    return await this.post(Api.addNote, newNote)
  }
}

export const noteApi = new NoteApi()
