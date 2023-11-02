import type { NextApiRequest, NextApiResponse } from 'next'
import { PoolClient } from 'pg'
import { validateJWT, validDate, validStrings } from '../../lib'
import { Note } from '../../store/slices/noteSlice'
import { Roles, STATUS_CODES } from '../../utils/consts'
import { pool } from '../../utils/db.js'

async function addNoteHandler(req: NextApiRequest, res: NextApiResponse) {
  let db: PoolClient
  let status = STATUS_CODES.SUCCESS

  try {
    const { text, createdDate, questionId } = req.body as Note
    db = await pool.connect()

    if (!validDate(createdDate)) {
      status = STATUS_CODES.NOT_ACCETABLE
    }

    if (status === STATUS_CODES.SUCCESS) {
      const { userId } = await validateJWT(req.headers.authorization)

      const result = await db.query(`INSERT into diary.note 
                                    (user_id, text, created_date, question_id)
                                     VALUES ($1, $2, $3, $4) RETURNING id 
                                     AS "noteId", text, question_id 
                                     AS "questionId", created_date AS "createdDate";`, 
                                    [+userId, text, createdDate, questionId])

      status = STATUS_CODES.CREATED

      res.status(status).json(result.rows[0])
    }

    res.status(status)

  } catch (err) {
    console.error('† addNoteHandler', err)
    res.status(500).json({ error: err })
  } finally {
    db.release()
  }
}

export default addNoteHandler
