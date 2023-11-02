import type { NextApiRequest, NextApiResponse } from 'next'
import { PoolClient } from 'pg'
import { pool } from '../../utils/db.js'

async function getNotesHander(req: NextApiRequest, res: NextApiResponse) {
  let db: PoolClient

  try {
    db = await pool.connect()

    const result = await db.query(`SELECT id AS "noteId", text, created_date AS "createdDate"  
                                   FROM diary.note WHERE question_id=$1 AND user_id=$2;`,
                                  [req.body.questionId, req.body.userId])

    res.status(200).json(result.rows)
  } catch (err) {
    console.error('† line 16 err', err)
    res.status(500).json({ error: err })
  } finally {
    db.release()
  }
}

export default getNotesHander 
