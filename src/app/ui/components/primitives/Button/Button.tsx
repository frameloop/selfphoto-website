'use client'

import { Colors, Hierarchy, Padding, Spacing } from '../../../styles/constants'
import { toColor, toHierarchy, toSpacing } from '../../../styles/mixins'
import { LoaderIcon } from './LoaderIcon'
import { useNotification } from '@/app/ui/hooks/useNotification'
import { useEffect, useState } from 'react'

interface Props {
    isLoading?: boolean
    isOutline?: boolean
    size?: Spacing
    padding?: Padding
    color?: Colors
    text?: Colors
    hierarchy?: Hierarchy
    children: React.ReactNode
    borderRadius?: Spacing
    indexKey?: number | string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void // temporal optional
    disabled?: boolean
}

export const Button = ({
    isLoading = false,
    isOutline = false,
    padding = { horizontal: 'small', vertical: 'small' },
    color = 'molon',
    text = 'background',
    hierarchy = 'base',
    borderRadius = 'none',
    children,
    onClick = () => {},
    disabled = true,
    type = 'button'
}: Props) => {
    const [loading, setLoading] = useState(isLoading)
    const [isPressed, setIsPressed] = useState(false)

    const fontStyle = toHierarchy(hierarchy)
    const buttonPadding: React.CSSProperties = {
        paddingLeft: padding.horizontal && toSpacing(padding.horizontal),
        paddingRight: padding.horizontal && toSpacing(padding.horizontal),
        paddingTop: padding.vertical && toSpacing(padding.vertical),
        paddingBottom: padding.vertical && toSpacing(padding.vertical)
    }
    const buttonStyle: React.CSSProperties = {
        ...buttonPadding,
        backgroundColor: toColor(color),
        border: `solid 2px ${toColor(isOutline ? text : color)}`,
        color: toColor(text),
        fontSize: fontStyle.size,
        fontWeight: fontStyle.fontWeight,
        width: '100%',
        borderRadius: toSpacing(borderRadius),
        opacity: disabled ? (isPressed ? 0.5 : 1) : 0.5
    }
    const { showNotification } = useNotification()

    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading])

    const handleClick = async () => {
        try {
            setLoading(true)
            setIsPressed(true)

            // La redirección no debería ser tratada como un error
            await onClick()
        } catch (error) {
            // Solo mostrar notificación si NO es un error de redirección
            if (
                !(error instanceof Error) ||
                !error.message.includes('NEXT_REDIRECT')
            ) {
                console.log('error in button', error)
                showNotification({
                    title: 'Error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Ha ocurrido un error',
                    type: 'error',
                    buttons: [{ text: 'Ok', onClick: () => {} }]
                })
            }
        } finally {
            setLoading(false)
            setIsPressed(false)
        }
    }
    const handleMouseDown = () => {
        setIsPressed(true)
    }

    const handleMouseUp = () => {
        setIsPressed(false)
    }

    return (
        <button
            disabled={!disabled || loading}
            type={type}
            onClick={handleClick}
            className="button rounded-sm font-bold flex justify-center"
            style={buttonStyle}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={isPressed ? handleMouseUp : undefined}
        >
            {loading ? (
                <div role="status">
                    <LoaderIcon />
                </div>
            ) : (
                children
            )}
        </button>
    )
}
