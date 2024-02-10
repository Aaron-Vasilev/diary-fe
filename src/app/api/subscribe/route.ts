import { NextRequest, NextResponse } from "next/server"
import { decodeJwt } from "jose"
import { DecodedToken, signJWT, validatePayPalSub } from "@/lib"
import { AUTHORIZATION, STATUS_CODES } from "@/utils/consts"
import { db } from "@/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    let token = req.headers.get(AUTHORIZATION)

    if (token) token = token.slice(7)
    else throw Error('No token for subscription')

    const decoded = decodeJwt<DecodedToken>(token)

    const validSub = await validatePayPalSub(body.subscriptionID)

    if (validSub) {
      await db.query(`UPDATE diary.user SET subscribed=true, sub_id=$1 
                      WHERE id=$2;`, [body.subscriptionID, decoded.userId])

      decoded.subscribed = validSub

      token = await signJWT(decoded)
    }

    const res = NextResponse.json(decoded)

    res.cookies.set({
      name: 'token',
      value: token,
      path: '/'
    })

    return res
  } catch (e) {
    console.log('† line 95 e', e)
    return NextResponse.json({}, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
