import type { NextApiRequest, NextApiResponse } from 'next'
import { PoolClient } from 'pg'
import { STATUS_CODES } from '../../utils/consts'
import { pool } from '../../utils/db'

async function getQuestionHander(req: NextApiRequest, res: NextApiResponse) {
  let db: PoolClient

  try {
    db = await pool.connect()
    const [_year, month, day] = req.body.shownDate.split('-')
    const result = await db.query(
      `SELECT id, text, shown_date AS "shownDate" FROM diary.question 
       WHERE extract(month from shown_date)=$1
       AND extract(day from shown_date)=$2 LIMIT 1;`, [month, day])

    res.status(STATUS_CODES.OK).json(result.rows[0]);
  } catch (err) {
    console.log('† line 18 err', err)
    res.status(500).json({ error: err })
  } finally {
    db.release()
  }
}

export default getQuestionHander
