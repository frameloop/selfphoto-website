'use client'

import React, { useState } from 'react'
import { Calendar } from './Calendar'
import { HourSelectorController as HourSelector } from './HourSelector.controller'
import { Column, Row } from '@/app/ui/components/primitives'
import { SchedulerProps } from '@/types/calendar'
import moment from 'moment'
moment.locale('es')

const COLUMNS_COUNT = 5
const columnsCalc = (columns: number) => (100 / COLUMNS_COUNT) * columns

export const Scheduler: React.FC<SchedulerProps> = ({
    events,
    isLoadingEvents,
    refetchEvents
}) => {
    const [currentDate, setCurrentDate] = useState<string>()
    const [selectedDate, setSelectedDate] = useState<
        moment.Moment | undefined
    >()

    const handleDateSelection = (date: moment.Moment | string | undefined) => {
        setSelectedDate(typeof date === 'string' ? moment(date) : date)
    }

    return (
        <>
            <Row>
                <Column
                    size={columnsCalc(3)}
                    padding={{ horizontal: 'base', vertical: 'base' }}
                >
                    <Calendar
                        events={events}
                        currentDate={currentDate || ''}
                        setCurrentDate={setCurrentDate}
                        selectedDate={selectedDate}
                        setSelectedDate={handleDateSelection}
                    />
                </Column>
                <Column
                    size={columnsCalc(2)}
                    padding={{ horizontal: 'base', vertical: 'base' }}
                >
                    {selectedDate ? (
                        <HourSelector
                            events={events}
                            currentDate={currentDate}
                            selectedDate={selectedDate}
                            isLoadingEvents={isLoadingEvents}
                            refetchEvents={refetchEvents}
                        />
                    ) : (
                        <></>
                    )}
                </Column>
            </Row>
        </>
    )
}
