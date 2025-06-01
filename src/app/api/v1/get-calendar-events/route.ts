import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { setGoogleAccessTokenCookie } from '@/actions/user/actions'
import moment from 'moment'

// const REQUIRED_SCOPES = [
//     'https://www.googleapis.com/auth/calendar',
//     'https://www.googleapis.com/auth/calendar.events',
//     'https://www.googleapis.com/auth/calendar.events.readonly',
//     'https://www.googleapis.com/auth/calendar.readonly',
//     'https://www.googleapis.com/auth/calendar.settings.readonly',
//     'https://www.googleapis.com/auth/calendar.events.owned.readonly',
//     'https://www.googleapis.com/auth/calendar.events.owned',
//     'https://www.googleapis.com/auth/calendar.events.public.readonly'
// ].join(' ')

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

        console.log('refreshToken', refreshToken)
        console.log('clientId', clientId)
        console.log('clientSecret', clientSecret)

        if (!refreshToken || !clientId || !clientSecret) {
            return NextResponse.json(
                { error: 'Missing Google OAuth credentials' },
                { status: 500 }
            )
        }

        let googleAccessToken = cookieStore.get('calendar-token')?.value

        console.log('googleAccessToken', googleAccessToken)

        if (!googleAccessToken) {
            const tokenRequest = {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
                // scope: REQUIRED_SCOPES
            }

            console.log('tokenRequest', tokenRequest)

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

            console.log('response oauth', response)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                console.error('Error fetching token:', errorData)
                throw new Error(
                    `Error fetching token: ${
                        response.statusText
                    } - ${JSON.stringify(errorData)}`
                )
            }

            try {
                const data = await response.json()
                googleAccessToken = data.access_token

                console.log('googleAccessToken', googleAccessToken)

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
            } catch (error) {
                throw new Error(
                    `Error parsing token response: ${
                        error instanceof Error ? error.message : String(error)
                    }`
                )
            }
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

        try {
            const data = await events.json()
            return NextResponse.json(
                { items: data.items || [] },
                { status: 200 }
            )
        } catch (error) {
            throw new Error(
                `Error parsing events response: ${
                    error instanceof Error ? error.message : String(error)
                }`
            )
        }
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

// if (req.method === 'POST') {
//     const { iss, sub, scope, aud, exp, iat } = await req.json()
//     const tokenData = { iss, sub, scope, aud, exp, iat }

//     const token = await jwt.sign(tokenData, process.env.GOOGLE_OAUTH_SECRET!)

//     return NextResponse.json(token)

// }
