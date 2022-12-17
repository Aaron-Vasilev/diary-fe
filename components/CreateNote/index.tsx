import { createRef, RefObject, useEffect } from 'react'
import _ from 'lodash'
import { useAppDispatch } from '../../store/store'
import { addNote } from '../../store/slices/noteSlice'
import { Button } from '../../components/Button'
import { noteApi } from '../../pages/api/noteApi'

export function CreateNote() {
  const textAreaRef: RefObject<HTMLInputElement> = createRef()
  const dispatch = useAppDispatch()

  async function add() {
    const text = textAreaRef.current.innerText.trim()
    
    if (text.length > 0) {
      const result = await dispatch(addNote(text))

      if (result.meta.requestStatus === 'fulfilled') {
        textAreaRef.current.innerHTML = ''
        noteApi.removeFromStorage(noteApi.newNote)
      }
    }
  }

  function saveToStorage() {
    _.debounce(() => {
      noteApi.setToStorage(noteApi.newNote, textAreaRef.current.innerHTML)
    }, 10000)()
  }

  useEffect(() => {
    const dataFromStorage = noteApi.getFromStorage(noteApi.newNote)

    if (dataFromStorage) {
      textAreaRef.current.innerHTML = dataFromStorage
    }
  }, [dispatch, textAreaRef])

  return (
    <>
      <div 
        className="col-span-2 row-start-3 resize-none border-8 border-solid border-primary bg-emerald-50 p-4 shadow-xl outline-none" 
        // @ts-ignore
        ref={textAreaRef}
        onInput={saveToStorage}
        contentEditable
      />
      <Button handler={add} label={'Add'} size="M"/>
    </>
  )
}