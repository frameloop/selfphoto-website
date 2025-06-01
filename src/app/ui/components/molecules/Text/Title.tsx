'use client'

import { toColor, toHierarchy } from '@/app/ui/styles/mixins'
import { Colors, TextAlign, Hierarchy } from '@/app/ui/styles/constants'

interface Props {
    hierarchy: Hierarchy
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    color?: Colors
    textAlign?: TextAlign
    text?: string | Promise<string>
    children?: React.ReactNode
    bold?: boolean
}

export const Title = ({
    text,
    bold = false,
    textAlign = 'left',
    hierarchy = 'titleL',
    tag = 'h1',
    color = 'molon',
    children,
    ...props
}: Props) => {
    const content = text || children
    const fontStyle = toHierarchy(hierarchy)
    const textStyle = {
        color: toColor(color),
        fontSize: fontStyle.size,
        fontWeight: bold ? 700 : fontStyle.fontWeight,
        lineHeight: fontStyle.lineHeight,
        textAlign: textAlign
    }
    const Tag = tag

    return (
        <Tag suppressHydrationWarning style={textStyle} {...props}>
            {content}
        </Tag>
    )
}
