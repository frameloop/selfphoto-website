'use client';

import { useQuery } from '@tanstack/react-query';
import { Scheduler } from '@/app/ui/components/Calendar/Scheduler';
import { fetchEvents } from '@/actions/calendar/calendar-actions';
import { FormattedCalendarEvent, CalendarResponse } from '@/types/calendar';

interface ScheduleClientProps {
  initialEvents: FormattedCalendarEvent[];
}

export function ScheduleClient({ initialEvents }: ScheduleClientProps) {
  const {
    data: events = initialEvents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = (await fetchEvents()) as CalendarResponse;
      return (
        response?.items?.map((event) => ({
          start: event.start.dateTime,
          title: event.summary,
          available: false,
        })) || []
      );
    },
    initialData: initialEvents,
  });

  return (
    <Scheduler
      events={events}
      isLoadingEvents={isLoading}
      refetchEvents={refetch}
    />
  );
}
