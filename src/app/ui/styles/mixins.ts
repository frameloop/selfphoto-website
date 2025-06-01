import { IconsId, ICONS_CODEPOINTS } from './icons'
import {
    Colors,
    Spacing,
    colors,
    hierarchy,
    spacing,
    Hierarchy,
    MaxWidth,
    maxWidth,
    IconSize,
    iconSize,
    Size,
    size
} from './constants'

export const toSpacing = (value: Spacing) => spacing[value]
export const toIconSize = (value: IconSize) => iconSize[value]
export const toColor = (value: Colors) => colors[value]
export const toHierarchy = (value: Hierarchy) => hierarchy[value]
export const toWidth = (value: MaxWidth) => maxWidth[value]
export const toSize = (value: Size) => size[value]
export const Icon = (value: IconsId) => ICONS_CODEPOINTS[value]
