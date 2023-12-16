import { useEffect } from "react"
import { useSelector } from "react-redux"
import { getQuestion } from "../../store/slices/questionSlice"
import { RootState, useAppDispatch } from "../../store/store"
import { Spinner } from "../Spinner"
import style from "./Question.module.css"

export function Question() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.note.userId)
  const name = useSelector((state: RootState) => state.note.name)
  const questionText = useSelector((state: RootState) => state.question.text)
  const loading = useSelector((state: RootState) => state.question.loading)
  const selectedDate = useSelector((state: RootState) => state.note.selectedDate)
  
  useEffect(() => {
    if (selectedDate !== '') dispatch(getQuestion())
  }, [dispatch, selectedDate])

  if (loading) {
    return <Spinner/>
  }

  return (
    <div className={style.question}>
      <h3 className="text-xl underline underline-offset-4">
        #{userId} {name}&apos;s daily question</h3>
      <h2 className="pl-4 text-2xl">{questionText}</h2>
    </div>
  )
}
