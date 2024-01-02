import { NextRequest, NextResponse } from "next/server"
import admin from "firebase-admin"
import { SignJWT } from "jose"
import { db } from "@/db"
import { STATUS_CODES } from "@/utils/consts"

const alg = 'HS256'
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
    const decoded = await admin.auth().verifyIdToken(token)

    const { rows } = 
      await db.query(`INSERT INTO diary.user (email, name)
                      VALUES ($1,$2) ON CONFLICT (email) 
                      DO UPDATE SET email=$1 RETURNING id, role, name;`,
                      [decoded.email, decoded.name])

    const data = {
      userId: rows[0].id,
      role: rows[0].role,
      name: rows[0].name,
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
