import React from 'react'
import style from './Separator.module.css'
import { toColor, toSpacing } from '@/app/ui/styles/mixins'
import { Colors, SelectiveSpacing } from '@/app/ui/styles/constants'

interface Props {
    color?: Colors
    width?: SelectiveSpacing
    height?: SelectiveSpacing
    margin?: SelectiveSpacing
    offset?: { left: SelectiveSpacing; right?: SelectiveSpacing }
    absolute?: boolean
}

export const Separator = ({
    color = 'transparent',
    width = 'fullWidth',
    height = 'line',
    margin = 'none',
    absolute = false
}: Props) => {
    const separatorStyles = {
        backgroundColor: toColor(color),
        height: toSpacing(height),
        width: toSpacing(width),
        margin: toSpacing(margin),
        position: absolute ? ('absolute' as const) : ('relative' as const)
    }

    return <div className={style.separator} style={separatorStyles}></div>
}
