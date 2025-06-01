'use server'

import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { getCookie, setCookie } from 'cookies-next'

export async function POST(req: NextRequest, res: NextResponse) {
    'use server'

    if (req.method === 'POST') {
        try {
            let { user } = await req.json()
            const token = getCookie('token', { req, res })
            if (!token) {
                const payload = { sub: user.id }
                const token = jwt.sign(payload, process.env.JWT_SECRET!, {
                    expiresIn: process.env.JWT_EXPIRATION
                })
                const newUserData = {
                    name: user.name,
                    email: user.email,
                    id: token
                }

                const response = NextResponse.json(
                    { success: true },
                    { status: 200 }
                )

                response.cookies.set({
                    name: 'token',
                    value: JSON.stringify(newUserData),
                    path: '/',
                    maxAge: 86400
                })

                response.cookies.set({
                    name: 'mikel',
                    value: 'fcsh',
                    path: '/',
                    maxAge: 86400
                })

                return response
            }

            const response = {
                ok: false,
                message: 'Not logged in'
            }

            return NextResponse.json({ response }, { status: 401 })
        } catch (error: any) {
            console.error('Failed to fetch user token:', error.message)
            return NextResponse.json(
                { error: 'Failed to fetch user token' + error.message },
                { status: 500 }
            )
        }
    }
}
