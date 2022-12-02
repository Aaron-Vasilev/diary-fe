import Router from 'next/router'
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Question } from '../../components/Question'
import { NotesHistory } from '../../components/NotesHistory'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

export default function Home() {
  const userId = useSelector((state: RootState) => state.main.userId)
  const [newNote, setNote] = useState<string>('')
  const [date, setDate] = useState<string>('')

  const textareaRef = useRef<HTMLTextAreaElement>()
  function add(): void {
    setNote('')
  }

  function onTextareaChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setNote(e.target.value)
  }

  function setTodaysDate(): void {
    const date = new Date()
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth()).padStart(2, '0')
    const yyyy = date.getFullYear()
    const today = `${yyyy}-${mm}-${dd}`
    setDate(today)
  }

  useEffect(() => {
    if (userId === 0)
      Router.push('/auth')
  }, [userId])

  return (
    <Fragment>
      <Question/>
      <NotesHistory/>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <textarea 
        className="border-sky-400 border-solid border-2 resize-none roundedw-full" 
        value={newNote} 
        onInput={onTextareaChange}
        ref={textareaRef}
      />
      <button onClick={add}>Add</button>
      <button onClick={setTodaysDate}>Set Today&apos;s Date</button>
    </Fragment>
  )
}

