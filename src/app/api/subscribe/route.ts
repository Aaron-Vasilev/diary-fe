import { NextRequest, NextResponse } from "next/server"
import { SignJWT, decodeJwt } from "jose"
import { DecodedToken, validatePayPalSub } from "@/lib"
import { STATUS_CODES, alg } from "@/utils/consts"
import { db } from "@/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    let token = req.cookies.get('token').value
    const decoded = decodeJwt<DecodedToken>(token)

    const validSub = await validatePayPalSub(body.subscriptionID)

    if (validSub) {
      await db.query(`UPDATE diary.user SET subscribed=true, sub_id=$1 
                      WHERE id=$2;`, [body.subscriptionID, decoded.userId])

      decoded.subscribed = validSub

      token = await new SignJWT(decoded)
        .setProtectedHeader({ alg })
        .setExpirationTime('30d')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
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
