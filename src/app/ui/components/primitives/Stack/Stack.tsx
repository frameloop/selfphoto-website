import { toColor, toSpacing, toWidth } from '../../../styles/mixins'
import { StackProps, Styles } from '../model'
import style from './Stack.module.css'
export const Stack = ({
    margin,
    // padding,
    fullHeight = false,
    gap,
    background = 'transparent',
    borderRadius,
    maxWidth = 'fixed',
    width,
    direction = 'vertical',
    align = 'left',
    fitContent = false,
    shadow = false,
    ref = null,
    className = '',
    wrap = false,
    children
}: StackProps) => {
    const styles: Styles = {
        justifyContent: align,
        flexDirection: direction === 'vertical' ? ('column' as 'column') : ('row' as 'row'),
        maxWidth: toWidth(maxWidth),
        width: '100%',
        flexWrap: wrap ? ('wrap' as 'wrap') : ('nowrap' as 'nowrap')
    }

    margin ? (styles.margin = toSpacing(margin)) : null
    // padding ? styles.padding = toSpacing(padding) : null
    gap ? (styles.gap = toSpacing(gap)) : null
    background ? (styles.backgroundColor = toColor(background)) : null
    borderRadius ? (styles.borderRadius = toSpacing(borderRadius)) : null
    borderRadius ? (styles.overflow = 'hidden') : null
    width ? (styles.width = width) : null
    fitContent ? (styles.height = 'fit-content') : null
    shadow ? (styles.boxShadow = '0 0 14px rgba(0,0,0,0.14)') : null
    fullHeight ? (styles.height = '100%') : null

    return (
        <>
            <div ref={ref} className={`${style.container} ${className} `} style={styles}>
                <>{children}</>
            </div>
        </>
    )
}
