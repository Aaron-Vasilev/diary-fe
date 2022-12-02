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
      dispatch(getQuestion())
    } 
  }, [userId, dispatch])

  return (
    <div>
      <h3 className="text-base">Daily question for User: #{userId}</h3>
      <h2 className="text-lg pl-4">{questionText}</h2>
    </div>
  )
}