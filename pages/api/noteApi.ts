import { Api } from './axios'

class NoteApi extends Api {

  async getNotes(userId: number) {
  }
}

export const noteApi = new NoteApi()