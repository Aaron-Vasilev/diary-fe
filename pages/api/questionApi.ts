import { Api } from './axios'


export interface GetQuestionRes {
 id: number
 text: string
 shownDate: string
}

class QuestionApi extends Api {

  async getQuestion(shownDate : { shownDate : string }): Promise<GetQuestionRes> {
    return await this.post('question', shownDate)
  }
}

export const questionApi = new QuestionApi()