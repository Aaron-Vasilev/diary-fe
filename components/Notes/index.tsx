import { Note as NoteT } from "../../store/slices/noteSlice";

interface Props {
  notes: NoteT[]
}

interface Prop {
  note: NoteT
}

export function Notes({ notes }: Props) {

  return (
    <div
      className="grid gap-4"
    >
      {notes.map(note => <Note key={note.noteId} note={note} />)}
    </div>
  )
}

function Note({ note }: Prop) {

  return (
    <div className="whitespace-pre border-8 border-solid border-primary p-2 shadow-xl selection:bg-secondary selection:text-white">
      <h2 className="font-Lilita text-lg underline decoration-dashed underline-offset-4">
        <span className="mr-1 text-2xl">
          Date: 
        </span>
        {note.createdDate}
      </h2>
      <p className="p-2 text-base">
        {note.text}
      </p>
    </div>
  )
}
