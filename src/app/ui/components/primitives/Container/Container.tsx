'use client'

import { useWindowSize } from '@/app/ui/hooks/useWindowWidth'
import { toColor, toSize, toSpacing, toWidth } from '../../../styles/mixins'
import { ContainerProps, Styles } from '../model'
import style from './Container.module.css'

export const Container = ({
    margin,
    id,
    padding = { vertical: 'none', horizontal: 'none' },
    gap,
    display = 'flex',
    borderRadius,
    background = 'transparent',
    maxWidth = 'fixed',
    width = 'fullWidth',
    direction = 'vertical',
    align = 'left',
    verticalAlign = 'left',
    className = '',
    wrap = false,
    fitContent = false,
    fullHeight = false,
    shrink = false,
    shadow = false,
    ref = null,
    children
}: ContainerProps) => {
    const { isSmallDevice } = useWindowSize()

    const styles: Styles = {
        display,
        justifyContent: align,
        alignItems: verticalAlign,
        flexDirection:
            direction === 'vertical'
                ? 'column'
                : !isSmallDevice
                ? 'row'
                : 'column',
        maxWidth: toWidth(maxWidth),
        flexWrap: wrap ? 'wrap' : 'nowrap',
        width: toSize(width),
        height: fullHeight
            ? '100%'
            : fitContent
            ? 'fit-content'
            : shrink
            ? '100%'
            : 'auto',
        ...(padding.vertical && {
            paddingTop: toSpacing(padding.vertical),
            paddingBottom: toSpacing(padding.vertical)
        }),
        ...(padding.horizontal && {
            paddingLeft: toSpacing(padding.horizontal),
            paddingRight: toSpacing(padding.horizontal)
        }),
        ...(margin && { margin: toSpacing(margin) }),
        ...(gap && { gap: toSpacing(gap) }),
        ...(background && { backgroundColor: toColor(background) }),
        ...(borderRadius && {
            borderRadius: toSpacing(borderRadius),
            overflow: 'hidden'
        }),
        ...(shadow && { boxShadow: '0 0 14px rgba(0,0,0,0.14)' })
    }

    return (
        <div
            id={id}
            ref={ref}
            className={`${style.container} ${className}`}
            style={styles}
        >
            {children}
        </div>
    )
}
