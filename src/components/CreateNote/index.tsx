import { createRef, RefObject, useEffect } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch } from '@/store/store'
import { addNote } from '@/store/slices/noteSlice'
import { Button } from '@/components/Button'
import { InputArea } from '../InputArea'

export function CreateNote() {
  const inputRef: RefObject<HTMLDivElement> = createRef()
  const dispatch = useAppDispatch()

  async function add() {
    const text = inputRef.current.innerText.trim()
    
    if (text.length > 0) {
      const result = await dispatch(addNote(text))

      if (result.meta.requestStatus === 'fulfilled') {
        inputRef.current.innerText = ''
        localStorage.removeItem('note')
      }
    }
  }

  function saveToStorage() {
    debounce(() => {
      localStorage.setItem('note', inputRef.current.innerText)
    }, 10000)()
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
    </>
  )
}
