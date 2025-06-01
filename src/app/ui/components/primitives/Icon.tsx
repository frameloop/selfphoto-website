import React from 'react'
import Icons from 'next/font/local'
import { Icon as ICON, toColor, toIconSize } from '../../styles/mixins'
import { IconsId } from '../../styles/icons'
import { Colors, IconSize } from '../../styles/constants'

const icons = Icons({ src: '../../fonts/icons/icons.woff2' })

interface Props {
    icon: IconsId
    color: Colors
    size?: IconSize
}

export const Icon = ({ icon, color, size = 'base' }: Props) => {
    const _icon = Number(ICON(icon))
    const _color = toColor(color)
    const _size = toIconSize(size)
    return (
        <span className={`${icons.className} antialiased self-center`} style={{ color: _color, fontSize: _size }}>
            {String.fromCharCode(_icon)}
        </span>
    )
}
