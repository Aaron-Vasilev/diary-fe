import Router from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Question } from '../../components/Question'
import { NotesHistory } from '../../components/NotesHistory'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { Calendar } from '../../components/Calendar'
import { Button } from '../../components/Button'

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
    <div
      className="grid grid-cols-2 gap-4"
    >
      <Question/>
      <Calendar/>
      <NotesHistory/>
      <textarea 
        className="col-span-2 row-start-3 resize-none border-8 border-solid border-primary shadow-xl" 
        value={newNote} 
        onInput={onTextareaChange}
        ref={textareaRef}
      />
      <Button handler={() => {}} label={'Add'}/>
    </div>
  )
}

