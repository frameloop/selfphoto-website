import { setGoogleAccessTokenCookie } from '@/actions/user/actions'
import moment from 'moment'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        const cookieStore = await cookies()

        // Manejar posible JSON vacío en el body
        let body
        try {
            body = await req.json()
        } catch (error) {
            console.warn('Error parsing request body JSON:', error)
            return NextResponse.json(
                { error: 'Invalid request body format' },
                { status: 400 }
            )
        }

        const { date, userName, userEmail, duration } = body

        // Validar campos requeridos
        if (!date || !userName || !userEmail) {
            return NextResponse.json(
                { error: 'Missing required fields: date, userName, userEmail' },
                { status: 400 }
            )
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

        try {
            let googleAccessToken = cookieStore.get('calendar-token')?.value

            if (!googleAccessToken) {
                const response = await fetch(
                    'https://oauth2.googleapis.com/token',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            client_id: clientId,
                            client_secret: clientSecret,
                            refresh_token: refreshToken,
                            grant_type: 'refresh_token'
                        })
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

                try {
                    const data = await response.json()
                    googleAccessToken = data.access_token

                    if (!googleAccessToken) {
                        throw new Error(
                            'Failed to get access token from Google'
                        )
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
                            error instanceof Error
                                ? error.message
                                : String(error)
                        }`
                    )
                }
            }

            if (!googleAccessToken) {
                throw new Error('No valid access token available')
            }

            const calendarId =
                'aa0e50e8b97b9d8044747ed3a2f2c9c5392a7916322b6c7485ea52244ddf3dea@group.calendar.google.com'
            const event = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?conferenceDataVersion=1`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${googleAccessToken}`
                    },
                    body: JSON.stringify({
                        colorId: '4',
                        summary: `Self·Session - ${userName}`,
                        start: {
                            dateTime: moment(date).format()
                        },
                        end: {
                            dateTime: moment(date)
                                .add(duration, 'minutes')
                                .format()
                        },
                        attendees: [
                            {
                                email: userEmail,
                                displayName: userName
                            }
                        ]
                    })
                }
            )

            if (!event.ok) {
                const errorData = await event.json().catch(() => ({}))
                console.error('Error creating calendar event:', errorData)
                throw new Error(
                    `Error creating event: ${
                        event.statusText
                    } - ${JSON.stringify(errorData)}`
                )
            }

            try {
                const dataEvent = await event.json()
                return NextResponse.json({ dataEvent }, { status: 200 })
            } catch (error) {
                throw new Error(
                    `Error parsing event response: ${
                        error instanceof Error ? error.message : String(error)
                    }`
                )
            }
        } catch (error: unknown) {
            console.error(
                'Error creating calendar event:',
                error instanceof Error ? error.message : String(error)
            )
            return NextResponse.json(
                {
                    error:
                        'Failed to create calendar event: ' +
                        (error instanceof Error ? error.message : String(error))
                },
                { status: 500 }
            )
        }
    }
}
