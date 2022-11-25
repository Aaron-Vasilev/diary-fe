import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { noteApi } from '../../pages/api/noteApi'
import { RootState } from '../../store/store'

export function NotesHistory() {

  useEffect(() => {
    noteApi.getNotes(1)
  },[])
  return (
    <h1>NotesHistory</h1>
  )
}
