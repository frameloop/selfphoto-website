import React from 'react'
import { Colors, MaxWidth, SelectiveSpacing } from '../../../styles/constants'
import { toColor, toSpacing, toWidth } from '../../../styles/mixins'
import style from './Section.module.css'
interface Props {
    maxWidth: MaxWidth
    children: React.ReactNode
    spacing: { horizontal: SelectiveSpacing; vertical: SelectiveSpacing }
    fullHeight?: boolean
    gap?: SelectiveSpacing
    background?: Colors
    direction?: 'horizontal' | 'vertical'
    align?: 'left' | 'right' | 'center'
}
export const Section = ({
    maxWidth,
    fullHeight = false,
    spacing,
    background = 'white',
    direction = 'vertical',
    align = 'center',
    gap = 'none',
    children
}: Props) => {
    const width = toWidth(maxWidth)
    const styles = {
        backgroundColor: toColor(background),
        paddingTop: toSpacing(spacing.vertical),
        paddingBottom: toSpacing(spacing.vertical),
        paddingLeft: toSpacing(spacing.horizontal),
        paddingRight: toSpacing(spacing.horizontal),
        maxWidth: width,
        height: fullHeight ? '100%' : 'auto',
        flexDirection: direction === 'vertical' ? ('column' as 'column') : ('row' as 'row'),
        gap: toSpacing(gap),
        justifyContent: direction === 'horizontal' ? (align as typeof align) : 'flex-start',
        alignItems: direction === 'vertical' ? (align as typeof align) : 'flex-start'
    }

    return (
        <div className={style.section} style={styles}>
            {children}
        </div>
    )
}
