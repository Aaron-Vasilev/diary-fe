import jwt from 'jsonwebtoken'
import { PoolClient } from 'pg'
import { decrypt, Hash, validStrings } from '../../../lib'
import { Roles, STATUS_CODES } from '../../../utils/consts'
import { pool } from '../../../utils/db.js'
import { NextRequest, NextResponse } from 'next/server'

interface User {
  id: number
  email: string
  role: Roles
}

export async function GET() {
  return Response.json({ a: 10 })
}

export async function POST(req: NextRequest) {
  let db: PoolClient
  let status = STATUS_CODES.SUCCESS
  let user: User

  try {
    db = await pool.connect()
    const db_hash: Hash = { iv: '', passwordHash: '' }
    const { email, password } = await req.json()

    if (!validStrings(email, password)) {
      status = STATUS_CODES.NOT_ACCETABLE
    }

    if (status === STATUS_CODES.SUCCESS) {
      const { rows } = await db.query(
        "SELECT * FROM private.user_account WHERE email=$1 LIMIT 1;", [email]
      )

      if (rows.length === 0) {
        status = STATUS_CODES.NOT_FOUND
      }

      if (status === STATUS_CODES.SUCCESS) {
        db_hash.iv = rows[0].iv
        db_hash.passwordHash = rows[0].password_hash

        if (decrypt(db_hash) !== password) {
          status = STATUS_CODES.UNAUTHORIZED
        } else {
          user = rows[0]
        }
      }
    }

    if (status === STATUS_CODES.SUCCESS) {
      const userQuery = await db.query(`SELECT id, first_name AS "firstName", 
                                        second_name AS "secondName"
                                        FROM  diary.user
                                        WHERE id=$1 LIMIT 1;`, [user.id])

      const token = jwt.sign({
        userId: user.id,
        role: user.role,
        firstName: userQuery.rows[0].firstName,
        secondName: userQuery.rows[0].secondName,
      }, process.env.JWT_SECRET)

      
      return Response.json({ token }, { status })
    }

//    res.status(status).json({ error: true })

  } catch (err) {
    console.error('† line 64 err', err)
    return Response.json({ error: err })
  } finally {
    db && db.release()
  }
}
