import type { NextApiRequest, NextApiResponse } from 'next'
import { PoolClient } from 'pg'
import { validateJWT, validStrings } from '../../lib'
import { Roles, STATUS_CODES } from '../../utils/consts'
import { pool } from '../../utils/db.js'

async function updateQuestionHandler(req: NextApiRequest, res: NextApiResponse) {
  let db: PoolClient
  let status = STATUS_CODES.SUCCESS

  try {
    db = await pool.connect()
    const [_year, month, day] = req.body.shownDate.split('-')

    if (!validStrings(day, month, req.body.text)) {
      status = STATUS_CODES.NOT_ACCETABLE
    }

    if (status === STATUS_CODES.SUCCESS) {
      const { role } = await validateJWT(req.headers.authorization)

      if (role !== Roles.Admin) {
        status = STATUS_CODES.UNAUTHORIZED
      }
    }

    if (status === STATUS_CODES.SUCCESS) {
      const date = `2024-${month}-${day}`
      const result = await db.query(`UPDATE diary.question SET text=$1 WHERE shown_date=$2;`, 
                                    [req.body.text, date])
      status = STATUS_CODES.CREATED

      res.json(result.rows[0])
    }

    res.status(status)

  } catch (err) {
    console.error('† line 24 err', err)
    res.status(500).json({ error: err })
  } finally {
    db.release()
  }
}

export default updateQuestionHandler
