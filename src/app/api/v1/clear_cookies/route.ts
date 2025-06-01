'use server'

import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'

export async function POST(req: NextRequest, res: NextResponse) {
    'use server'

    if (req.method === 'POST') {
        try {
            let { user } = await req.json()

            const getUser = () => getCookie('user', { req, res })

            if (!getUser()) {
                const payload = { sub: user.id }
                const token = jwt.sign(payload, process.env.JWT_SECRET!, {
                    expiresIn: process.env.JWT_EXPIRATION
                })
                const newUserData = {
                    name: user.name,
                    email: user.email,
                    id: token
                }

                setCookie('user', JSON.stringify(newUserData), {
                    req,
                    res,
                    httpOnly: true,
                    maxAge: 86400
                })
                const response = {
                    ok: true
                }
                return NextResponse.json({ response }, { status: 200 })
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
