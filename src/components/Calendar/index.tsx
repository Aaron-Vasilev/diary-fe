'use client'

import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import styles from './Calendar.module.css'
import { today } from "../../lib";
import { setSelectedDate } from "../../store/slices/noteSlice"
import { RootState, useAppDispatch } from "../../store/store"

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
    <input 
      className={styles.calendar + " justify-self-start bg-secondary border-2 border-black shadow-xl font-Lilita text-3xl outline-primary md:justify-self-end md:col-start-2"}
      type="date"
      value={selectedDate} 
      onChange={(e) => dateHandler(e.target.value)}
    />
  )
}
