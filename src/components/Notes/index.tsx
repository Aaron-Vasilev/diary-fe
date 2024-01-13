import { Note as NoteT } from "../../store/slices/noteSlice";
import { NotesAction } from "./Actions";

interface Props {
  notes: NoteT[]
}

export function Notes({ notes }: Props) {

  return (
    <div
      className="grid gap-4"
    >
      {notes.map(note => <Note key={note.id} note={note} />)}
    </div>
  )
}

interface Prop {
  note: NoteT
}

function Note({ note }: Prop) {
  return (
    <div className="whitespace-pre-line border-8 border-solid border-primary p-2 shadow-xl">
      <div className="flex justify-between">
        <h2 className="font-Lilita text-lg underline decoration-dashed underline-offset-4">
          <span className="mr-1 text-2xl">
            Date: 
          </span>
          {note.createdDate}
        </h2>
        <NotesAction note={note}/>
      </div>
      <p className="p-2 text-base">
        {note.text}
      </p>
    </div>
  )
}
