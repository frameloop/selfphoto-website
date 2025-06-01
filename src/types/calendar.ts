export interface CalendarResponse {
    kind: string
    etag: string
    summary: string
    description: string
    updated: string
    timeZone: string
    accessRole: string
    defaultReminders: { method: string; minutes: number }[]
    nextSyncToken: string
    items: CalendarEvent[]
}

export interface CalendarEvent {
    kind: string
    etag: string
    id: string
    status: string
    htmlLink: string
    created: string
    updated: string
    summary: string
    creator: {
        email: string
    }
    organizer: {
        email: string
        displayName: string
        self: boolean
    }
    start: {
        dateTime: string
        timeZone: string
    }
    end: {
        dateTime: string
        timeZone: string
    }
    transparency?: string
    iCalUID: string
    sequence: number
    reminders: {
        useDefault: boolean
    }
    eventType: string
}

export interface FormattedCalendarEvent {
    start: string
    title: string
    available: boolean
}
export interface CalendarProps {
    events: {
        start: string
        title: string
        available: boolean
    }[]
    currentDate: string
    setCurrentDate: (date: string) => void
    selectedDate: string | moment.Moment | undefined
    setSelectedDate: (date: string | moment.Moment | undefined) => void
}

// Evento del calendario formateado
export interface FormattedCalendarEvent {
    start: string
    title: string
    available: boolean
}

// Props para el componente Scheduler
export interface SchedulerProps {
    events: FormattedCalendarEvent[]
    isLoadingEvents: boolean
    refetchEvents: () => void
}

export interface HourSelectorControllerProps {
    selectedDate: string | moment.Moment | undefined
    currentDate?: string
    events: FormattedCalendarEvent[]
    isLoadingEvents: boolean
    refetchEvents: () => void
}
export interface HourSelectorProps {
    slots: string[]
    onSelectSlot: ({ slotIndex, notAvailable }: SlotInfo) => void
    onReserve: ({ email, name }: { email: string; name: string }) => void
    date: string
    selectedSlot: number
    isLoading: boolean
    error: string | null
    events: FormattedCalendarEvent[]
    isLoadingEvents: boolean
}

export interface SlotInfo {
    slotIndex: number
    notAvailable: boolean
}
