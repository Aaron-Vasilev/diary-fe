import { NextRequest, NextResponse } from "next/server"
import admin from "firebase-admin"
import { SignJWT } from "jose"
import { db } from "@/db"
import { Roles, STATUS_CODES, alg } from "@/utils/consts"
import { validatePayPalSub } from "@/lib"

const { private_key } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      //@ts-ignore
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    })
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = body.token
    const googleToken = await admin.auth().verifyIdToken(token)

    const { rows } = 
      await db.query(`INSERT INTO diary.user (email, name)
                      VALUES ($1,$2) ON CONFLICT (email) 
                      DO UPDATE SET email=$1 RETURNING id,
                      role, name, subscribed, sub_id;`,
                      [googleToken.email, googleToken.name])

    let subscribed = rows[0].subscribed
    const role = rows[0].role

    if (subscribed && role !== Roles.Admin) {
      subscribed = await validatePayPalSub(rows[0].sub_id)

      if (!subscribed) {
        db.query(`UPDATE diary.user SET subscribed=false 
                  WHERE id=$1;`, [rows[0].id])
      }
    }

    const data = {
      userId: rows[0].id,
      name: rows[0].name,
      subscribed,
      role,
    }

    const jwt = await new SignJWT(data)
      .setProtectedHeader({ alg })
      .setExpirationTime('30d')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    const res = NextResponse.json(data)
    res.cookies.set({
      name: 'token',
      value: jwt,
      path: '/'
    })

    return res
  } catch (e) {
    console.log('† line 43 e', e)
    return NextResponse.json({}, { status: STATUS_CODES.NOT_ACCETABLE })
  }
}

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/login', req.url))

  res.cookies.delete('token')

  return res
}
