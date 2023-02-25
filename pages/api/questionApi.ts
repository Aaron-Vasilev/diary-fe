import { Api } from './axios'


export interface Question {
 id: number
 text: string
 shownDate: string
}

class QuestionApi extends Api {

  async getQuestion(shownDate: string): Promise<Question> {
    return await this.post('get-question', { shownDate })
  }

  async updateQuestion(newQuestion: Question): Promise<number> {
    return await this.post('update-question', newQuestion)
  }

}

export const questionApi = new QuestionApi()
