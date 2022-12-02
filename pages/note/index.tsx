import Router from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Question } from '../../components/Question'
import { NotesHistory } from '../../components/NotesHistory'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { Calendar } from '../../components/Calendar'

export default function Note() {
  const userId = useSelector((state: RootState) => state.main.userId)
  const [newNote, setNote] = useState<string>('')

  const textareaRef = useRef<HTMLTextAreaElement>()
  function add(): void {
    setNote('')
  }

  function onTextareaChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setNote(e.target.value)
  }

  useEffect(() => {
    if (userId === 0)
      Router.push('/auth')
  }, [userId])

  return (
    <>
      <Calendar/>
      <Question/>
      <NotesHistory/>
      <textarea 
        className="border-sky-400 border-solid border-2 resize-none roundedw-full" 
        value={newNote} 
        onInput={onTextareaChange}
        ref={textareaRef}
      />
      <button onClick={add}>Add</button>
    </>
  )
}

