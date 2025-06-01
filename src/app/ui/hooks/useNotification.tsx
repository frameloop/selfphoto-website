'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Absolute, Button, Container, Stack } from '../components/primitives'
import { Title, Text, Separator } from '../components/molecules'

interface Button {
    text: string
    onClick: () => void
}

interface NotificationProps {
    title: string
    message: string
    type: 'success' | 'error'
    buttons: Button[]
}

interface NotificationContextType {
    showNotification: (props: NotificationProps) => void
    hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [notificationData, setNotificationData] =
        useState<NotificationProps | null>(null)

    const showNotification = (props: NotificationProps) => {
        setNotificationData(props)
        setIsVisible(true)
    }

    const hideNotification = () => {
        setIsVisible(false)
        setNotificationData(null)
    }

    return (
        <NotificationContext.Provider
            value={{ showNotification, hideNotification }}
        >
            {children}
            {isVisible && notificationData && (
                <Absolute fullWidth fullHeight>
                    <Container
                        align="center"
                        verticalAlign="center"
                        fullHeight
                        width="fullWidth"
                        maxWidth="none"
                        padding={{ vertical: 'base', horizontal: 'base' }}
                        background="translucidBlack"
                    >
                        <Container
                            maxWidth="large"
                            background="lightBackground"
                            padding={{
                                vertical: 'base',
                                horizontal: 'base'
                            }}
                            borderRadius="base"
                        >
                            <Title
                                hierarchy="titleS"
                                tag="h2"
                                textAlign="center"
                            >
                                {notificationData.title}
                            </Title>
                            <Stack gap="base">
                                <Text hierarchy="base" textAlign="center">
                                    {notificationData.message}
                                </Text>
                                {notificationData.buttons.map(
                                    ({ onClick, text }, index) => (
                                        <Button
                                            key={index}
                                            hierarchy="base"
                                            onClick={() => {
                                                onClick()
                                                hideNotification()
                                            }}
                                        >
                                            {text}
                                        </Button>
                                    )
                                )}
                            </Stack>
                        </Container>
                    </Container>
                </Absolute>
            )}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error(
            'useNotification debe ser usado dentro de un NotificationProvider'
        )
    }
    return context
}
