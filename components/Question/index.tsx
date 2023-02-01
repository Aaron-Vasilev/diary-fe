import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store/store"
import { getQuestion } from "../../store/slices/questionSlice"
import style from "./Question.module.css"

export function Question() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)
  const firstName = useSelector((state: RootState) => state.main.firstName)
  const questionText = useSelector((state: RootState) => state.question.text)
  const selectedDate = useSelector((state: RootState) => state.note.selectedDate)
  
  useEffect(() => {
    if (userId !== 0 && selectedDate !== '') {
      dispatch(getQuestion())
    } 
  }, [dispatch, userId, selectedDate])

  return (
    <div className={style.question}>
      <h3 className="text-xl underline underline-offset-4">#{userId} {firstName}&apos;s daily question</h3>
      <h2 className="pl-4 text-2xl">{questionText}</h2>
    </div>
  )
}
