import { ChangeEvent, createRef, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Question } from '../components/Question'
import { Layout } from '../components/Layout'
import { NotesHistory } from '../components/NotesHistory'
import { addNote } from '../store/slices/note'
import { RootState } from '../store/store'

export default function Home() {
  //const dispatch = useDispatch()
  const [newNote, setNote] = useState<string>('')
  const [date, setDate] = useState<string>('')

  const textareaRef = useRef<HTMLTextAreaElement>()
  function add(): void {
    //dispatch(addNote(newNote))
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


  }, [])

  return (
    <Layout>
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
      <button onClick={() => console.log(textareaRef.current.scrollHeight)}>LOG</button>
    </Layout>
  )
}
