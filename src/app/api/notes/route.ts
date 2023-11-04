import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { db } from "@/db"
import { Note } from "@/store/slices/noteSlice"
import { DecodedToken } from "@/lib"


export async function GET(req: NextRequest) {
  const question = req.nextUrl.searchParams.get('question')
  const token = req.cookies.get('token').value
  const decoded = jwt.decode(token) as DecodedToken

  const res = await db.query<Note[]>(
    `SELECT id, text, created_date AS "createdDate" FROM diary.note WHERE
     question_id=$1 AND user_id=$2;`, [question, decoded.userId])

  return NextResponse.json({
    ...decoded,
    notes: res.rows, 
  })
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token').value
  const { userId } = jwt.decode(token) as DecodedToken
  const { text, createdDate, questionId } = await req.json()

  const res = await db.query(
    `INSERT into diary.note (user_id, text, created_date, question_id) VALUES
     ($1, $2, $3, $4) RETURNING id, text, question_id AS "questionId",
     created_date AS "createdDate";`, [userId, text, createdDate, questionId],
  )

  return NextResponse.json(res.rows[0])
}
