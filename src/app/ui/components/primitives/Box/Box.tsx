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
    justifyContent: 'left' | 'center' | 'right'
    background?: string
    borderRadius?: number | string
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
        flexDirection: flexDirection ? 'column' : 'row',
        justifyContent: align,
        background: toColor(background),
        borderRadius: toSpacing(borderRadius),
        width: toSize(width)
    }

    margin ? (style.margin = toSpacing(margin)) : null
    padding?.vertical ? (style.paddingTop = toSpacing(padding.vertical)) : null
    padding?.vertical
        ? (style.paddingBottom = toSpacing(padding.vertical))
        : null
    padding?.horizontal
        ? (style.paddingLeft = toSpacing(padding.horizontal))
        : null
    padding?.horizontal
        ? (style.paddingRight = toSpacing(padding.horizontal))
        : null
    maxWidth ? (style.maxWidth = toWidth(maxWidth)) : null

    return (
        <div className={`${styles.box} ${className}`} style={style}>
            <>{children}</>
        </div>
    )
}
