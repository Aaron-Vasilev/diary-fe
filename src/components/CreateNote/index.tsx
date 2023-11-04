"use client"

import { createRef, RefObject, useEffect } from 'react'
import _ from 'lodash'
import { useAppDispatch } from '@/store/store'
import { addNote } from '@/store/slices/noteSlice'
import { Button } from '@/components/Button'

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
    _.debounce(() => {
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
      <div 
        className="col-span-2 resize-none border-8 border-solid border-primary bg-emerald-50 p-4 shadow-xl outline-none" 
        ref={inputRef}
        onInput={saveToStorage}
        contentEditable
      />
      <Button handler={add} label={'Add'} size="M"/>
    </>
  )
}
