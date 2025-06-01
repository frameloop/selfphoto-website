'use server'

import { fetchApi } from '@/utils/fetch'

export const fetchEvents = async () => {
    try {
        const response = await fetchApi({
            apiVersion: '/api/v1/',
            endpoint: 'get-calendar-events',
            method: 'POST'
        })

        return response
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching calendar events:', error.message)
        } else {
            console.error('Error fetching calendar events:', error)
        }
        throw error
    }
}
