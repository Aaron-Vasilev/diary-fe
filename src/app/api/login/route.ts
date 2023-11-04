import jwt from 'jsonwebtoken'
import { decrypt, Hash, validStrings } from '../../../lib'
import { Roles, STATUS_CODES } from '../../../utils/consts'
import { db } from '@/db'
import { NextRequest, NextResponse } from 'next/server'

interface User {
  id: number
  email: string
  role: Roles
}

export async function POST(req: NextRequest) {
  let status = STATUS_CODES.OK
  let user: User

  try {
    const db_hash: Hash = { iv: '', passwordHash: '' }
    const { email, password } = await req.json()

    if (!validStrings(email, password)) {
      status = STATUS_CODES.NOT_ACCETABLE
    }

    if (status === STATUS_CODES.OK) {
      const { rows } = await db.query(
        "SELECT * FROM private.user_account WHERE email=$1 LIMIT 1;", [email]
      )

      if (rows.length === 0) {
        status = STATUS_CODES.NOT_FOUND
      }

      if (status === STATUS_CODES.OK) {
        db_hash.iv = rows[0].iv
        db_hash.passwordHash = rows[0].password_hash

        if (decrypt(db_hash) !== password) {
          status = STATUS_CODES.UNAUTHORIZED
        } else {
          user = rows[0]
        }
      }
    }

    if (status === STATUS_CODES.OK) {
      const userQuery = await db.query(`SELECT id, first_name AS "firstName", 
                                        second_name AS "secondName"
                                        FROM  diary.user
                                        WHERE id=$1 LIMIT 1;`, [user.id])

      const data = {
        userId: user.id,
        role: user.role,
        firstName: userQuery.rows[0].firstName,
        secondName: userQuery.rows[0].secondName,
      } 
      const token = jwt.sign(data, process.env.JWT_SECRET)

      
      const res = NextResponse.json(data, { status })
      res.cookies.set({
        name: 'token',
        value: token,
        path: '/'
      })

      return res
    }

    return NextResponse.json('Unauthorized', { status })

  } catch (err) {
    console.error('† line 64 err', err)
    status = STATUS_CODES.INTERNAL_SERVER_ERROR
    return NextResponse.json('Server Error', { status })
  }
}
