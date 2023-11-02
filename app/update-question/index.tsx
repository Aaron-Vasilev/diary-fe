import Router from 'next/router'
import { useState } from "react"
import { Button } from "../../components/Button"
import { Calendar } from "../../components/Calendar"
import { Question } from "../../components/Question"
import { setQuestionText, updateQuestion } from "../../store/slices/questionSlice"
import { useAppDispatch } from "../../store/store"

export default function QuestionPage() {
  const dispatch = useAppDispatch()
  const [newQuestion, setQuestion] = useState('') 
  
  function questionHandler(text: string) {
    setQuestion(text)
  }

  async function changeQuestion() {
    const result = await dispatch(updateQuestion(newQuestion))

    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(setQuestionText(newQuestion))
      setQuestion('')
    }
  }

  return (
    <div
      className="grid grid-cols-2 gap-4"
    >
      <Question />
      <Calendar />
      <textarea 
        className="border-4 border-solid border-primary bg-emerald-50 p-4 shadow-xl outline-none required:border-red-500" 
        onChange={e => questionHandler(e.target.value)}
        value={newQuestion}
      />
      <Button label="To Diary" handler={() => Router.push('/diary')}/>
      <Button label="Change Question" handler={changeQuestion}/>
    </div>
  )
}


