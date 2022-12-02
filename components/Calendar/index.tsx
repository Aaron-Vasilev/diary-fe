import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";

export function Calendar() {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.main.userId)

  useEffect(() => {
  }, [dispatch])

  return (
    <>
      <h3 className="text-base">Calendar</h3>
    </>
  )
}
