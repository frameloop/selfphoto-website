'use client'

import React, { useEffect, useState } from 'react'

import moment from 'moment'
import { AllowedDuration, OWNER_AVAILABILITY } from '../../../../../config'
import { fetchApi } from '@/utils/fetch'
import { HourSelectorControllerProps, SlotInfo } from '@/types/calendar'
import { HourSelector } from './HourSelector'

moment.locale('es')

interface CheckoutSessionBody {
    date: string
    userName: string
    userEmail: string
    stripeId: string
    duration: AllowedDuration
}

export const HourSelectorController: React.FC<HourSelectorControllerProps> = ({
    selectedDate,
    events,
    isLoadingEvents
}) => {
    const [slots, setSlots] = useState<string[]>([])
    const [date, setDate] = useState<string>(
        moment(selectedDate).format('DD-MM-YYYY')
    )
    const [selectedSlot, setSelectedSlot] = useState<number>(-1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const availability = () => {
        const SLOTS: string[] = []
        const weekDay = moment(selectedDate, 'YYYY-MM-DD').day()
        const dayAvailability = OWNER_AVAILABILITY[weekDay]

        setDate(moment(selectedDate).format('DD/MM/YYYY'))
        if (dayAvailability[0]?.start.hour && dayAvailability[0].end.hour) {
            for (
                let i = dayAvailability[0].start.hour;
                i < dayAvailability[0].end.hour;
                i++
            ) {
                SLOTS.push(i.toString() + ':00')
            }
        }
        setSlots(SLOTS)
    }

    useEffect(() => {
        availability()
        setSelectedSlot(-1) // Reset selected slot when date changes
        setError(null) // Reset error when date changes
    }, [selectedDate])

    const onSelectSlot = ({ slotIndex, notAvailable }: SlotInfo) => {
        if (notAvailable) {
            return
        }
        setSelectedSlot(slotIndex)
        setError(null) // Reset error when selecting a new slot
    }

    const onReserve = async ({
        email,
        name
    }: {
        email: string
        name: string
    }) => {
        const DATE = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
        const selectedDate = `${DATE} ${slots[selectedSlot]}:00`
        setIsLoading(true)
        setError(null)

        const userStripeId = await fetchApi<{ id: string }>({
            apiVersion: '/api/v1/',
            endpoint: 'create-stripe-user',
            method: 'POST',
            body: {
                name,
                email
            }
        })

        try {
            const checkout = await fetchApi<{ data: { url: string } }>({
                apiVersion: '/api/v1/',
                endpoint: 'checkout_sessions',
                method: 'POST',
                body: {
                    date: selectedDate,
                    userName: name,
                    userEmail: email,
                    stripeId: userStripeId.id,
                    duration: 120
                } satisfies CheckoutSessionBody
            })
            console.log('checkout in hour selector controller', checkout)
            if (checkout.data?.url) {
                const url = new URL(checkout.data.url)
                url.searchParams.append('prefilled_email', email)
                window.location.href = url.toString()
            } else {
                setError(
                    'No se pudo iniciar el proceso de pago. Por favor, inténtalo de nuevo.'
                )
            }
            // const reserve = await fetchApi({
            //     apiVersion: '/api/v1/',
            //     endpoint: 'create-calendar-event',
            //     method: 'POST',
            //     body: {
            //         date: selectedDate,
            //         userName: name,
            //         userEmail: email,
            //         stripeId: userStripeId.id
            //     }
            // })

            // if (reserve) {
            //     refetchEvents()
            //     setSelectedSlot(-1)
            // } else {
            //     setError(
            //         'No se pudo realizar la reserva. Por favor, inténtalo de nuevo.'
            //     )
            // }
        } catch (error: unknown) {
            setError(
                'Ha ocurrido un error al realizar la reserva. Por favor, inténtalo de nuevo.' +
                    (error instanceof Error ? error.message : String(error))
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <HourSelector
            slots={slots}
            onSelectSlot={onSelectSlot}
            onReserve={onReserve}
            date={date}
            selectedSlot={selectedSlot}
            events={events}
            isLoading={isLoading}
            isLoadingEvents={isLoadingEvents}
            error={error}
        />
    )
}
