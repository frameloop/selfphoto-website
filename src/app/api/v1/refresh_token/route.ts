'use server'

import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    try {
        const { user } = await req.json()
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            const payload = { sub: user.id }
            const token = jwt.sign(payload, process.env.JWT_SECRET!, {
                expiresIn: +process.env.JWT_EXPIRATION!
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

            return response
        }

        return NextResponse.json(
            { ok: false, message: 'Not logged in' },
            { status: 401 }
        )
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Failed to fetch user token:', error.message)
        } else {
            console.error('Failed to fetch user token:', error)
        }
        return NextResponse.json(
            {
                error: 'Failed to fetch user token' + (error as Error).message
            },
            { status: 500 }
        )
    }
}
