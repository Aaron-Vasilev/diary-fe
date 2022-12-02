import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { getQuestion } from '../../store/slices/questionSlice'

export function Question() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)
  const questionText = useSelector((state: RootState) => state.question.text)
  
  useEffect(() => {
    if (userId !== 0) {
      dispatch(getQuestion('2022-11-29'))
    } 
  }, [userId, dispatch])

  return (
    <div>
      <h1>Daily queTextn for User: #{userId}</h1>
      <h2>{questionText}</h2>
    </div>
  )
}