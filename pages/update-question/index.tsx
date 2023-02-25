import Router from 'next/router'
import { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { Calendar } from "../../components/Calendar"
import { Input } from "../../components/Input"
import { Question } from "../../components/Question"
import { updateQuestion } from "../../store/slices/questionSlice"
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
      setQuestion('')
    }
  }

  useEffect(() => {
    
  })

  return (
    <div
      className="grid grid-cols-2 gap-4"
    >
      <Question />
      <Calendar />
      <Input value={newQuestion} handler={questionHandler} />
      <Button label="To Diary" handler={() => Router.push('/diary')}/>
      <Button label="Change Question" handler={changeQuestion}/>
    </div>
  )
}


