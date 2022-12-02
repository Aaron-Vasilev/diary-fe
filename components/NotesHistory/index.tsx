import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getNotes } from "../../store/slices/noteSlice";
import { RootState, useAppDispatch } from "../../store/store";

export function NotesHistory() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)

  useEffect(() => {
    if (userId !== 0) {
      dispatch(getNotes())
    } 
  }, [userId, dispatch])

  return (
    <>
      <h3 className="text-base">NotesHistory</h3>
    </>
  )
}
