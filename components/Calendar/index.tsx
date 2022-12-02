import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { today } from "../../lib/currentDate";
import { setSelectedDate } from "../../store/slices/noteSlice";
import { RootState, useAppDispatch } from "../../store/store";

export function Calendar() {
  const dispatch = useAppDispatch()
  const selectedDate = useSelector((state: RootState) => state.note.selectedDate)

  const dateHandler = useCallback((newDate: string) => {
    dispatch(setSelectedDate(newDate))
  }, [dispatch])

  useEffect(() => {
    dateHandler(today())
  }, [dispatch, dateHandler])

  return (
    <>
      <input type="date" value={selectedDate} onChange={(e) => dateHandler(e.target.value)} />
      {/* <button onClick={setTodaysDate}>Set Today&apos;s Date</button> */}
    </>
  )
}
