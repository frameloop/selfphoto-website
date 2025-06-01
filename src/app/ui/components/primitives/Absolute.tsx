import React from 'react'

interface Props {
    left?: `${number}px` | `${number}rem` | `${number}em` | `${number}%` | 0
    top?: `${number}px` | `${number}rem` | `${number}em` | `${number}%` | 0
    right?: `${number}px` | `${number}rem` | `${number}em` | `${number}%` | 0
    bottom?: `${number}px` | `${number}rem` | `${number}em` | `${number}%` | 0
    children: React.ReactNode
    fullWidth?: boolean
    fullHeight?: boolean
}
export const Absolute = ({
    left,
    top,
    right,
    bottom,
    fullWidth,
    fullHeight,
    children
}: Props) => {
    return (
        <div
            className="absolute"
            style={{
                left: left ?? left,
                top: top ?? top,
                right: right ?? right,
                bottom: bottom ?? bottom,
                width: fullWidth ? '100%' : undefined,
                height: fullHeight ? '100%' : undefined
            }}
        >
            {children}
        </div>
    )
}
