import { Api } from '../../../utils/consts'
import { Axios, Response } from './axios'

export interface Question {
  id: number
  text: string
  shownDate: string
}

class QuestionApi extends Axios {

  async getQuestion(shownDate: string): Promise<Response<Question>> {
    return await this.post(Api.getQuestion, { shownDate })
  }

  async updateQuestion(newQuestion: Question): Promise<Response<number>> {
    return await this.post(Api.updateQuestion, newQuestion)
  }

}

export const questionApi = new QuestionApi()
