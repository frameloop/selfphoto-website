'use client'

import React, { useState } from 'react'
import { Button, Container } from '@/app/ui/components/primitives'
import { Text, Title } from '@/app/ui/components/molecules'
import moment from 'moment'
import { HourSelectorProps } from '@/types/calendar'

moment.locale('es')

export const HourSelector: React.FC<HourSelectorProps> = ({
    slots,
    onSelectSlot,
    onReserve,
    date,
    selectedSlot,
    events,
    isLoading,
    isLoadingEvents,
    error
}) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const isFormValid =
        isValidEmail(email) && name.length > 0 && selectedSlot !== undefined

    const handleReserve = () => {
        onReserve({ email, name })
    }

    console.log('events in HourSelector', events)
    return (
        <>
            {/* <div>{date}</div> */}
            <Container gap="extraSmall">
                <Title
                    bold
                    text="Selecciona una hora disponible"
                    hierarchy="base"
                    tag="h2"
                    textAlign="center"
                />
                <>
                    <div className="flex flex-col gap-4 mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`p-2 border rounded text-center ${
                                email && !isValidEmail(email)
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                        />
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 border rounded text-center"
                        />
                        {email && !isValidEmail(email) && (
                            <Text
                                textAlign="center"
                                hierarchy="base"
                                color="error"
                            >
                                Por favor, introduce un email válido
                            </Text>
                        )}
                    </div>
                    {slots.length > 0 &&
                        slots.map((slot, index) => {
                            const notAvailable = events?.some((event) => {
                                const eventDay = moment(event?.start).format(
                                    'DD/MM/YYYY'
                                )
                                if (eventDay !== date) return false
                                const eventHour = moment(event?.start).format(
                                    'HH:mm'
                                )
                                return (
                                    eventHour ===
                                    moment(slot, 'H:mm').format('HH:mm')
                                )
                            })

                            const renderBackgroundColor = () => {
                                if (notAvailable) {
                                    return 'grey3'
                                }
                                if (selectedSlot === index) {
                                    return 'lightBackground'
                                }
                                return 'transparent'
                            }

                            return (
                                <Button
                                    key={index}
                                    borderRadius="rounded"
                                    onClick={() =>
                                        onSelectSlot({
                                            slotIndex: index,
                                            notAvailable
                                        })
                                    }
                                    isOutline={
                                        selectedSlot === index ? true : false
                                    }
                                    color={renderBackgroundColor()}
                                    text={notAvailable ? 'grey2' : 'principal'}
                                    padding={{
                                        horizontal: 'base',
                                        vertical: 'extraSmall'
                                    }}
                                >
                                    {slot}
                                </Button>
                            )
                        })}
                    {error && (
                        <Title
                            text={error}
                            color="grey2"
                            hierarchy="small"
                            tag="h6"
                            bold
                        />
                    )}
                    <Button
                        borderRadius="rounded"
                        isLoading={isLoading || isLoadingEvents}
                        onClick={handleReserve}
                        disabled={isFormValid}
                        text="white"
                    >
                        Reservar
                    </Button>
                </>
            </Container>
        </>
    )
}
