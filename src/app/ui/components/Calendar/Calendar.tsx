'use client'

import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { FormattedCalendarEvent, CalendarProps } from '@/types/calendar'
import moment from 'moment'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import { Container } from '@/app/ui/components/primitives'
import { DatesSetArg, EventClickArg, DateSelectArg } from '@fullcalendar/core'

export const Calendar: React.FC<CalendarProps> = ({
    events,
    // currentDate,
    setCurrentDate,
    // selectedDate,
    setSelectedDate
}) => {
    const [formattedEvents, setFormattedEvents] = useState<
        FormattedCalendarEvent[]
    >([])

    const handleDateClick = (info: DateSelectArg | EventClickArg) => {
        const date =
            'start' in info
                ? moment(info.start).format('YYYY-MM-DD')
                : moment(info.event.start).format('YYYY-MM-DD')
        const day = moment(date).day()

        if (day === 0) {
            return
        }

        setSelectedDate(date)
    }

    useEffect(() => {
        const formatEvents =
            events?.map((event) => ({
                start: event.start,
                title: event.title,
                available: event.available
            })) || []
        setFormattedEvents(formatEvents)
    }, [events])
    // useEffect(() => {
    //     if (day === today) {
    //         console.log('no select today')
    //         setSelectedDate('')
    //         return
    //     }
    // }, [selectedDate])

    const renderEventContent = (eventInfo: EventClickArg) => {
        return (
            <div onClick={() => handleDateClick(eventInfo)}>
                <div style={{ width: 0, height: 0 }}></div>
            </div>
        )
    }

    return (
        <Container maxWidth="xMedium4">
            <FullCalendar
                eventTextColor="#ff66aa"
                themeSystem="bootstrap5"
                plugins={[interactionPlugin, dayGridPlugin]}
                initialView="dayGridMonth"
                contentHeight="auto"
                fixedWeekCount={false}
                showNonCurrentDates={false}
                select={handleDateClick}
                unselectAuto={false}
                unselect={() => {
                    // setSelectedDate(undefined)
                }}
                firstDay={1}
                events={formattedEvents}
                duration={{ hours: 1 }}
                slotMinTime={'9:00'}
                slotMaxTime={'17:00'}
                eventContent={renderEventContent}
                selectable
                dayCellClassNames={(arg) => {
                    const isPast = moment(arg.date).unix() < moment().unix()
                    return isPast ? ['fc-day-past'] : []
                }}
                selectAllow={(selectInfo) => {
                    const day = moment(selectInfo.startStr).day()

                    return (
                        day !== 0 &&
                        moment(selectInfo.startStr).day() !== moment().day() &&
                        moment(selectInfo.startStr).unix() > moment().unix()
                    )
                }}
                datesSet={(dateInfo: DatesSetArg) => {
                    setCurrentDate(dateInfo.start.toISOString())
                }}
            />
        </Container>
    )
}
