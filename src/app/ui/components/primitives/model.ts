import { LegacyRef } from 'react'
import {
    SelectiveSpacing,
    Colors,
    MaxWidth,
    Size,
    DirectionSpacing
} from '../../styles/constants'

export interface Styles {
    margin?: string
    padding?: string
    paddingLeft?: string
    paddingRight?: string
    paddingBottom?: string
    paddingTop?: string
    gap?: string
    backgroundColor?: string
    borderRadius?: string
    overflow?: string
    width?: string
    flexDirection: 'column' | 'row'
    maxWidth: string
    justifyContent: 'left' | 'center' | 'right'
    alignItems?: 'left' | 'center' | 'right'
    height?: string
    boxShadow?: '0 0 14px rgba(0,0,0,0.14)'
    flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse'
    display?: 'grid' | 'flex'
}

export interface ContainerProps {
    margin?: SelectiveSpacing
    borderRadius?: SelectiveSpacing
    padding?: DirectionSpacing
    gap?: SelectiveSpacing
    children: React.ReactNode
    background?: Colors
    width?: Size
    display?: 'grid' | 'flex'
    direction?: 'horizontal' | 'vertical'
    maxWidth?: MaxWidth
    align?: 'left' | 'center' | 'right'
    verticalAlign?: 'left' | 'center' | 'right'
    fitContent?: boolean
    fullHeight?: boolean
    shadow?: boolean
    ref?: LegacyRef<HTMLDivElement> | null
    className?: string
    id?: string
    wrap?: boolean
    shrink?: boolean
}

export interface StackProps {
    margin?: SelectiveSpacing
    borderRadius?: SelectiveSpacing
    padding?: DirectionSpacing
    gap?: SelectiveSpacing
    children: React.ReactNode
    background?: Colors
    width?: Size
    display?: 'grid' | 'flex'
    direction?: 'horizontal' | 'vertical'
    maxWidth?: MaxWidth
    align?: 'left' | 'center' | 'right'
    verticalAlign?: 'left' | 'center' | 'right'
    fitContent?: boolean
    fullHeight?: boolean
    shadow?: boolean
    indexKey?: string | number
    ref?: LegacyRef<HTMLDivElement> | null
    className?: string
    wrap?: boolean
    shrink?: boolean
}
