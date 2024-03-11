import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { Note } from "@/store/slices/noteSlice"
import { DecodedToken, verifyJWT } from "@/lib"
import { decodeJwt } from "jose";
import { AUTHORIZATION, STATUS_CODES } from "@/utils/consts";

export async function GET(req: NextRequest) {
  const question = req.nextUrl.searchParams.get('question')
  let token = req.headers.get(AUTHORIZATION)

  if (token) token = token.slice(7)
  else return NextResponse.json({ notes: [] })

  const decoded = decodeJwt<DecodedToken>(token)

  const result = await db.query<Note[]>(
    `SELECT id, text, created_date AS "createdDate" FROM diary.note WHERE
     question_id=$1 AND user_id=$2;`, [question, decoded.userId])

  return NextResponse.json({
    ...decoded,
    notes: result.rows, 
  })
}

export async function POST(req: NextRequest) {
  try {
    let token = req.headers.get(AUTHORIZATION)
    if (token) token = token.slice(7)

    const { userId, subscribed } = await verifyJWT(token)
    const { text, createdDate, questionId } = await req.json()

    if (!subscribed) throw new Error("Unsubscribed")

    const res = await db.query(
      `INSERT into diary.note (user_id, text, created_date, question_id) VALUES
       ($1, $2, $3, $4) RETURNING id, text, question_id AS "questionId",
       created_date AS "createdDate";`, [userId, text, createdDate, questionId],
    )

    return NextResponse.json(res.rows[0], {
      status: STATUS_CODES.CREATED
    })
  } catch (e) {
    console.log('† line 35 e', e)
    return NextResponse.json([], { status: STATUS_CODES.NOT_ACCETABLE })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    let token = req.headers.get(AUTHORIZATION)
    if (token) token = token.slice(7)

    const { userId, subscribed } = await verifyJWT(token)
    const id = req.nextUrl.searchParams.get('id')

    if (!subscribed) throw new Error("Unsubscribed")

    const res = await db.query(
      `DELETE FROM diary.note WHERE id=${id} AND user_id=${userId}`
    )

    if (res.rowCount) return NextResponse.json(id)
    else return NextResponse.error()
  } catch (e) {
    console.log('† line 48 e', e)
    return NextResponse.error()
  }
}

export async function PUT(req: NextRequest) {
  try {
    let token = req.headers.get(AUTHORIZATION)
    if (token) token = token.slice(7)

    const { userId, subscribed } = decodeJwt<DecodedToken>(token) as DecodedToken
    const { id, text } = await req.json()

    if (!subscribed) throw new Error("Unsubscribed")

    const res = await db.query(
      `UPDATE diary.note SET text=$1 WHERE id=$2 AND user_id=$3;`, [text, id, userId]
    )

    if (res.rowCount) return NextResponse.json({
      id,
      text
    })
    else return NextResponse.error()
  } catch (e) {
    console.log('† line 68 e', e)
    return NextResponse.error()
  }
}
