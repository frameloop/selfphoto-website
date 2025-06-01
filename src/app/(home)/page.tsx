import TabSection from '@/app/ui/components/TabSection'
import Footer from '@/app/ui/components/Footer'
import CookieBanner from '@/app/ui/components/CookieBanner'
import Analytics from '@/app/ui/components/Analytics'
import {
    CalendarResponse,
    FormattedCalendarEvent,
    CalendarEvent
} from '@/types/calendar'

import { fetchEvents } from '@/actions/calendar/calendar-actions'

export default async function Home() {
    try {
        const response = (await fetchEvents()) as CalendarResponse

        const formattedEvents: FormattedCalendarEvent[] =
            response?.items?.map((event: CalendarEvent) => ({
                start: event.start.dateTime,
                title: event.summary,
                available: false
            })) || []

        return (
            <div className="container">
                <Analytics />
                <TabSection formattedEvents={formattedEvents} />
                <Footer />
                <CookieBanner />
            </div>
        )
    } catch (error) {
        console.error('Error fetching calendar events:', error)
    }
}
