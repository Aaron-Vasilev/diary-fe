import Router from 'next/router'
import { useEffect } from 'react'
import { Question } from '../../components/Question'
import { NotesHistory } from '../../components/NotesHistory'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { Calendar } from '../../components/Calendar'
import { CreateNote } from '../../components/CreateNote'

export default function Note() {
  const userId = useSelector((state: RootState) => state.main.userId)

  useEffect(() => {
    if (userId === 0)
      Router.push('/login')
  }, [userId])

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

