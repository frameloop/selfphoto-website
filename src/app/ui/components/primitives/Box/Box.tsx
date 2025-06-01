'use client'

import {
    DirectionSpacing,
    MaxWidth,
    SelectiveSpacing,
    Size
} from '../../../styles/constants'
import { toColor, toSpacing, toWidth, toSize } from '../../../styles/mixins'
import styles from './Box.module.css'
import { Colors } from '@/app/ui/styles/constants'
interface Props {
    margin?: SelectiveSpacing
    padding?: DirectionSpacing
    borderRadius?: SelectiveSpacing
    maxWidth?: MaxWidth
    children: React.ReactNode
    align?: 'left' | 'center' | 'right'
    flexDirection?: 'column' | 'row'
    className?: string
    background?: Colors
    width?: Size
}

interface Styles {
    margin?: string
    paddingTop?: string
    paddingBottom?: string
    paddingLeft?: string
    paddingRight?: string
    maxWidth?: string
    flexDirection?: 'column' | 'row'
    justifyContent: 'flex-start' | 'center' | 'flex-end'
    background?: string
    borderRadius?: string
    width?: string
}

export const Box = ({
    margin,
    padding,
    align = 'left',
    background = 'transparent',
    borderRadius = 'none',
    maxWidth,
    flexDirection,
    children,
    className = '',
    width = 'auto'
}: Props) => {
    const style: Styles = {
        flexDirection: flexDirection || 'row',
        justifyContent:
            align === 'left'
                ? 'flex-start'
                : align === 'right'
                ? 'flex-end'
                : 'center',
        background: toColor(background),
        borderRadius: toSpacing(borderRadius),
        width: toSize(width)
    }

    if (margin) style.margin = toSpacing(margin)
    if (padding?.vertical) {
        style.paddingTop = toSpacing(padding.vertical)
        style.paddingBottom = toSpacing(padding.vertical)
    }
    if (padding?.horizontal) {
        style.paddingLeft = toSpacing(padding.horizontal)
        style.paddingRight = toSpacing(padding.horizontal)
    }
    if (maxWidth) style.maxWidth = toWidth(maxWidth)

    return (
        <div className={`${styles.box} ${className}`} style={style}>
            {children}
        </div>
    )
}
