'use client'

import { useWindowSize } from '../../hooks/useWindowWidth'
import { SelectiveSpacing } from '../../styles/constants'
import { toSpacing } from '../../styles/mixins'

interface Props {
    margin?: SelectiveSpacing
    padding?: SelectiveSpacing
    children: React.ReactNode
    align?: 'left' | 'center' | 'right'
    verticalAlign?: 'flex-start' | 'flex-end' | 'center'
    gap?: SelectiveSpacing
    fullHeight?: boolean
}

interface Styles {
    margin?: string
    padding?: string
    display: 'flex'
    justifyContent: 'left' | 'center' | 'right'
    flexDirection: 'row' | 'column'
    alignItems: 'flex-start' | 'flex-end' | 'center'
    gap?: string
    height?:
        | 'auto'
        | `${string}px`
        | `${string}em`
        | `${string}rem`
        | `${string}%`
}

export const Row = ({
    margin,
    padding,
    fullHeight = false,
    align = 'left',
    gap = 'none',
    verticalAlign = 'flex-start',
    children
}: Props) => {
    const { isSmallDevice } = useWindowSize()

    const styles: Styles = {
        display: 'flex',
        justifyContent: align,
        flexDirection: !isSmallDevice ? 'row' : 'column',
        alignItems: verticalAlign,
        gap: toSpacing(gap)
    }
    if (fullHeight) styles.height = '100%'
    if (margin) styles.margin = toSpacing(margin)
    if (padding) styles.padding = toSpacing(padding)

    return <div style={styles}>{children}</div>
}
