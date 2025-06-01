import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { setGoogleAccessTokenCookie } from '@/actions/user/actions'
import moment from 'moment'

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies()
        let dateFrom = moment().utcOffset(120).toJSON()

        // Manejar posible JSON vacío en el body
        let body
        try {
            body = await req.json()
        } catch (error) {
            console.warn('Error parsing request body JSON:', error)
            body = {}
        }

        if (body && body.dateFrom) {
            dateFrom = body.dateFrom
        }

        const refreshToken = process.env.GOOGLE_OAUTH_REFRESH
        const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
        const clientSecret = process.env.GOOGLE_OAUTH_SECRET

        if (!refreshToken || !clientId || !clientSecret) {
            return NextResponse.json(
                { error: 'Missing Google OAuth credentials' },
                { status: 500 }
            )
        }

        let googleAccessToken = cookieStore.get('calendar-token')?.value

        if (!googleAccessToken) {
            const tokenRequest = {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            }

            const response = await fetch(
                'https://oauth2.googleapis.com/token',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tokenRequest)
                }
            )

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                console.error('Error fetching token:', errorData)
                throw new Error(
                    `Error fetching token: ${
                        response.statusText
                    } - ${JSON.stringify(errorData)}`
                )
            }

            const data = await response.json()
            googleAccessToken = data.access_token

            if (!googleAccessToken) {
                throw new Error('Failed to get access token from Google')
            }

            cookieStore.set({
                name: 'calendar-token',
                value: googleAccessToken,
                maxAge: 3500,
                path: '/'
            })
            setGoogleAccessTokenCookie(googleAccessToken)
        }

        const calendarId =
            'aa0e50e8b97b9d8044747ed3a2f2c9c5392a7916322b6c7485ea52244ddf3dea@group.calendar.google.com'
        const events = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${dateFrom}`,
            {
                headers: {
                    Authorization: `Bearer ${googleAccessToken}`
                }
            }
        )

        if (!events.ok) {
            const errorData = await events.json().catch(() => ({}))
            console.error('Error fetching calendar events:', errorData)
            throw new Error(
                `Error fetching events: ${events.statusText} - ${JSON.stringify(
                    errorData
                )}`
            )
        }

        const data = await events.json()
        return NextResponse.json({ items: data.items || [] }, { status: 200 })
    } catch (error: unknown) {
        console.error(
            'Error in get-calendar-events:',
            error instanceof Error ? error.message : String(error)
        )
        return NextResponse.json(
            {
                error:
                    'Failed to fetch calendar events: ' +
                    (error instanceof Error ? error.message : String(error))
            },
            { status: 500 }
        )
    }
}
