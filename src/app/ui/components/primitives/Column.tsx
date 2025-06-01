'use client'

import { useWindowSize } from '../../hooks/useWindowWidth'
import {
    Colors,
    DirectionSpacing,
    SelectiveSpacing
} from '../../styles/constants'
import { toColor, toSpacing } from '../../styles/mixins'

interface Props {
    margin?: SelectiveSpacing
    padding?: DirectionSpacing
    children: React.ReactNode
    align?: 'flex-start' | 'center' | 'flex-end'
    verticalAlign?: 'flex-start' | 'center' | 'flex-end'
    gap?: 0 | `${string}px` | `${string}em` | `${string}rem`
    fullHeight?: boolean
    size?: number
    background?: Colors
}

interface Styles {
    margin?: string
    paddingTop?: string
    paddingBottom?: string
    paddingLeft?: string
    paddingRight?: string
    position: 'relative'
    height?:
        | 'auto'
        | `${string}px`
        | `${string}em`
        | `${string}rem`
        | `${string}%`
    display: 'flex'
    justifyContent: 'flex-start' | 'center' | 'flex-end'
    flexDirection: 'column'
    gap?: 0 | `${string}px` | `${string}em` | `${string}rem`
    alignSelf?: 'flex-start' | 'flex-end' | 'center'
    alignItems?: 'flex-start' | 'flex-end' | 'center'
    flexBasis?: `${number}%`
    width?: `${number}%` | '100%'
    background: string
}

export const Column = ({
    background = 'transparent',
    size = 1,
    margin,
    padding = { vertical: 'none', horizontal: 'none' },
    align = 'flex-start',
    fullHeight = false,
    gap = 0,
    verticalAlign = 'flex-start',
    children
}: Props) => {
    const { isSmallDevice } = useWindowSize()

    const styles: Styles = {
        display: 'flex',
        position: 'relative',
        justifyContent: align,
        flexDirection: 'column',
        alignSelf: verticalAlign,
        alignItems: verticalAlign,
        gap: gap,
        flexBasis: !isSmallDevice ? `${size}%` : '100%',
        width: !isSmallDevice ? `${size}%` : '100%',
        background: toColor(background)
    }
    if (padding?.vertical) {
        styles.paddingTop = toSpacing(padding.vertical)
        styles.paddingBottom = toSpacing(padding.vertical)
    }
    if (padding?.horizontal) {
        styles.paddingLeft = toSpacing(padding.horizontal)
        styles.paddingRight = toSpacing(padding.horizontal)
    }
    if (margin) styles.margin = toSpacing(margin)
    if (fullHeight) styles.height = '100%'

    return (
        <>
            <div style={styles}>{children}</div>
        </>
    )
}
