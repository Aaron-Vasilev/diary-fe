import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getNotes } from "../../store/slices/noteSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { Notes } from "../Notes";

export function NotesHistory() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)
  const notes = useSelector((state: RootState) => state.note.notes)
  const questionId = useSelector((state: RootState) => state.question.questionId)

  useEffect(() => {
    if (userId !== 0) {
      dispatch(getNotes())
    } 
  }, [userId, dispatch, questionId])

  return (
    <div className="col-span-2">
      <h3 className="mb-4 text-xl underline underline-offset-4">Note History:</h3>
      { notes.length > 0 ? <Notes notes={notes}/> :
        <h2 className="px-4 text-xl">
          You don&apos;t have any notes... Yet 🐣
        </h2>
      }
    </div>
  )
}
