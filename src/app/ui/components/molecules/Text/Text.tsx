'use client'

import {
    Colors,
    Hierarchy,
    SelectiveSpacing,
    TextAlign
} from '../../../styles/constants'
import { toColor, toHierarchy, toSpacing } from '../../../styles/mixins'

interface Props {
    hierarchy: Hierarchy
    tag?: 'p' | 'span'
    color?: Colors
    textAlign?: TextAlign
    children: React.ReactNode
    paddingTop?: SelectiveSpacing
    paddingBottom?: SelectiveSpacing
    paddingLeft?: SelectiveSpacing
    paddingRight?: SelectiveSpacing
    uppercase?: boolean
    bold?: boolean
    isHtml?: boolean
}

export const Text = ({
    bold = false,
    textAlign = 'left',
    uppercase = false,
    hierarchy = 'titleL',
    tag = 'p',
    color = 'primary',
    paddingTop = 'none',
    paddingBottom = 'none',
    paddingLeft = 'none',
    paddingRight = 'none',
    isHtml = false,
    children,
    ...props
}: Props) => {
    const fontStyle = toHierarchy(hierarchy)
    const textStyle = {
        color: toColor(color),
        fontSize: fontStyle.size,
        fontWeight: bold ? 700 : fontStyle.fontWeight,
        lineHeight: fontStyle.lineHeight,
        textAlign: textAlign,
        paddingTop: paddingTop ? toSpacing(paddingTop) : 0,
        paddingBottom: toSpacing(paddingBottom),
        paddingLeft: paddingLeft ? toSpacing(paddingLeft) : 0,
        paddingRight: paddingRight ? toSpacing(paddingRight) : 0,
        textTransform: uppercase ? ('uppercase' as const) : ('none' as const)
    }
    const Tag = tag

    // Si i18n no está listo, mostrar esqueleto

    // Si no es HTML y estamos listos
    if (!isHtml) {
        return (
            <Tag suppressHydrationWarning style={textStyle} {...props}>
                {children}
            </Tag>
        )
    }

    // Si es HTML y estamos listos
    const content =
        typeof children === 'string'
            ? children
            : Array.isArray(children)
            ? children.join('')
            : String(children)

    return (
        <Tag
            suppressHydrationWarning
            style={textStyle}
            {...props}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}
