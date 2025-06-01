// import { Scheduler } from '@/app/ui/components/Calendar/Scheduler'
import { fetchEvents } from '@/actions/calendar/calendar-actions';
import {
  CalendarResponse,
  FormattedCalendarEvent,
  CalendarEvent,
} from '@/types/calendar';
import { ScheduleClient } from './ScheduleClient';

export default async function SchedulePage() {
  try {
    const response = (await fetchEvents()) as CalendarResponse;

    const formattedEvents: FormattedCalendarEvent[] =
      response?.items?.map((event: CalendarEvent) => ({
        start: event.start.dateTime,
        title: event.summary,
        available: false,
      })) || [];

    return <ScheduleClient initialEvents={formattedEvents} />;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return <ScheduleClient initialEvents={[]} />;
  }
}
