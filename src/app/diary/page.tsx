'use client'

import { Question } from '../../components/Question'
import { NotesHistory } from '../../components/NotesHistory'
import { Calendar } from '../../components/Calendar'
import { CreateNote } from '../../components/CreateNote'

export default function Diary() {

  return (
    <div
      className="grid grid-cols-2 gap-4"
    >
      <Question/>
      <Calendar/>
      <NotesHistory/>
      <CreateNote />
    </div>
  )
}
