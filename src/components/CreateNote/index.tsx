'use client'

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
  const userId = useSelector((state: RootState) => state.note.userId)
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

  function dialogHandler() {
    if (userId === 0) router.push('/login')
    else router.push('/subscribe')
  }

  function dialogText() {
    if (userId === 0) return 'To add your note, you need to login.<br/>Login?'
    return 'To add more notes you need to subscribe.<br/>Subscribe?'
  }

  useEffect(() => {
    const noteFromStorage = localStorage.getItem('note')

    if (noteFromStorage && inputRef.current !== null) {
      inputRef.current.innerText = noteFromStorage
    }
  }, [dispatch])

  return (
    <>
      <InputArea 
        outterRef={inputRef}
        handler={saveToStorage}
      />
      <Button
        handler={add}
        label="Add"
        size="M"
      />
      <Dialog
        acceptHandler={dialogHandler}
        rejectHandler={() => setShowDialog(false)}
        isShown={showDialog}
      >
        <h1
          className={style.header + ' text-5xl'}
          dangerouslySetInnerHTML={{ __html: dialogText()}}
        />
      </Dialog>
    </>
  )
}
