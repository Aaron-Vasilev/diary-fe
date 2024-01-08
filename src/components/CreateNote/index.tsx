import style from './style.module.css'
import { createRef, RefObject, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store/store'
import { addNote } from '@/store/slices/noteSlice'
import { Button } from '@/components/Button'
import { InputArea } from '../InputArea'
import { Dialog } from '../Dialog'

export function CreateNote() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const inputRef: RefObject<HTMLDivElement> = createRef()
  const [showDialog, setShowDialog] = useState(false)
  const subscribed = useSelector((state: RootState) => state.note.subscribed)

  async function add() {
    if (subscribed) {
      const text = inputRef.current.innerText.trim()

      if (text.length > 0) {
        const result = await dispatch(addNote(text))

        if (result.meta.requestStatus === 'fulfilled') {
          inputRef.current.innerText = ''
          localStorage.removeItem('note')
        }
      }
    } else {
      setShowDialog(true)
    }
  }

  function saveToStorage() {
    debounce(() => {
      localStorage.setItem('note', inputRef.current.innerText)
    }, 5000)()
  }

  useEffect(() => {
    const noteFromStorage = localStorage.getItem('note')

    if (noteFromStorage && inputRef.current !== null) {
      inputRef.current.innerText = noteFromStorage
    }
  }, [dispatch, inputRef])

  return (
    <>
      <InputArea 
        outterRef={inputRef}
        handler={saveToStorage}
      />
      <Button handler={add} label={'Add'} size="M"/>
      <Dialog
        acceptHandler={() => router.push('/subscribe')}
        rejectHandler={() => setShowDialog(false)}
        isShown={showDialog}
      >
        <h1
          className={style.header + ' text-5xl'}
        >
          Subscribe?
        </h1>
      </Dialog>
    </>
  )
}
