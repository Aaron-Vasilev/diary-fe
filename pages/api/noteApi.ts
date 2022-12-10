import { Api } from './axios'
import { Note } from '../../store/slices/noteSlice'

class NoteApi extends Api {

  async getNotes(userId: number, questionId: number): Promise<Note[]> {
    return await this.post('get-notes', { userId, questionId })
  }

  async addNote(newNote: Note): Promise<Note> {
    return await this.post('add-note', newNote)
  }
}

export const noteApi = new NoteApi()