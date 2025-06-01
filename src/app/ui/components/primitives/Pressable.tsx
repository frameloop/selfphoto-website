import React from 'react'
import { Container } from './Container/Container'

interface Props {
    onClick: () => void
    verticalAlign?: 'flex-start' | 'flex-end' | 'center'
    horizontalAlign?: 'center'
    children: React.ReactNode
    fullWidth?: boolean
}
export const Pressable = ({
    onClick,
    children,
    verticalAlign = 'flex-start',
    horizontalAlign,
    fullWidth = false
}: Props) => {
    return (
        <Container>
            <a
                className={`cursor-pointer w-full text-center ${
                    fullWidth ? 'w-full' : ''
                }`}
                suppressHydrationWarning
                style={{
                    alignSelf: verticalAlign,
                    width: fullWidth ? '100%' : 'auto',
                    margin: horizontalAlign ? 'auto' : '0'
                }}
                onClick={onClick}
            >
                {children}
            </a>
        </Container>
    )
}
