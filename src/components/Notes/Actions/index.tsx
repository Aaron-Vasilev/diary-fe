import { RefObject, useRef, useState } from "react"
import { Note, deleteNote, editNote } from "@/store/slices/noteSlice"
import { useAppDispatch } from "@/store/store"
import EditIcon from "../../../../public/edit.svg"
import DeleteIcon from "../../../../public/delete.svg"
import { Dialog } from "@/components/Dialog"
import { InputArea } from "@/components/InputArea"

interface Props {
  note: Note
}

export function NotesAction({ note }: Props) {
  const dispatch = useAppDispatch()
  const inputRef: RefObject<HTMLDivElement> = useRef()
  const [showDelDialog, setShowDelDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
               
  function delNote() {
    dispatch(deleteNote(note.id))
    setShowDelDialog(false)
  }

  function editNoteHandler() {
    dispatch(editNote({
      id: note.id,
      createdDate: note.createdDate,
      text: inputRef.current.innerText
    }))
    setShowEditDialog(false)
  }

  function openEditDialog() {
    inputRef.current.innerText = note.text
    setShowEditDialog(true)
  }

  return (
    <div
      className="flex gap-2"
    >
      <EditIcon 
        className="cursor-pointer"
        onClick={openEditDialog} 
      />
      <DeleteIcon
        className="cursor-pointer"
        onClick={() => setShowDelDialog(true)} 
      />
      <Dialog
        acceptHandler={delNote}
        rejectHandler={() => setShowDelDialog(false)}
        isShown={showDelDialog}
      >
        <h2 className="font-Lilita text-2xl">
          Do I really want to delete the note?
        </h2>
      </Dialog>
      <Dialog
        acceptHandler={editNoteHandler}
        rejectHandler={() => setShowEditDialog(false)}
        isShown={showEditDialog}
      >
        <InputArea
          outterRef={inputRef}
          handler={() => {}}
        />
      </Dialog>
    </div>
  )
}
