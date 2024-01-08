import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { Question } from "@/store/slices/questionSlice"
import { Roles, STATUS_CODES } from "@/utils/consts"
import { verifyJWT } from "@/lib"

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  const [_year, month, day] = date.split('-')
  const res = await db.query<Question>(`
    SELECT id, text, shown_date AS "shownDate" FROM 
    diary.question WHERE extract(month from shown_date)=$1 AND 
    extract(day from shown_date)=$2 LIMIT 1;`, [month, day])

  return NextResponse.json(res.rows[0])
}

export async function PUT(req: NextRequest) {
  try {
    const { text, questionId } = await req.json()
    const token = req.cookies.get('token')
    const decodedToken = await verifyJWT(token.value)

    if (decodedToken.role !== Roles.Admin)
      return NextResponse.json({}, { status: STATUS_CODES.UNAUTHORIZED })

    await db.query(`UPDATE diary.question SET text=$1 WHERE id=$2;`, 
                    [text, questionId])

    return NextResponse.json({}, { status: STATUS_CODES.OK })
  } catch (e) {
    console.log('† line 23 e', e)
    return NextResponse.json({}, { status: STATUS_CODES.UNAUTHORIZED })
  }
}
