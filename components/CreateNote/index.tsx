import { createRef, RefObject } from 'react'
import { useAppDispatch } from '../../store/store'
import { addNote } from '../../store/slices/noteSlice'
import { Button } from '../../components/Button'

export function CreateNote() {
  const textAreaRef: RefObject<HTMLInputElement> = createRef()
  const dispatch = useAppDispatch()

  async function add() {
    const text = textAreaRef.current.innerText.trim()
    
    if (text.length > 0) {
      const result = await dispatch(addNote(text))
      if (result.meta.requestStatus === 'fulfilled') {
        textAreaRef.current.innerHTML = ''
      }
    }
  }

  return (
    <>
      <div 
        className="col-span-2 row-start-3 resize-none border-8 border-solid border-primary bg-emerald-50 p-4 shadow-xl outline-none" 
        // @ts-ignore
        ref={textAreaRef}
        contentEditable
      />
      <Button handler={add} label={'Add'}/>
    </>
  )
}