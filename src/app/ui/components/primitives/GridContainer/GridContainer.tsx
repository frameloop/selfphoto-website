import { toColor, toSpacing, toWidth } from '../../../styles/mixins'
import { ContainerProps, Styles } from '../model'
import style from './GridContainer.module.css'
export const GridContainer = ({
    margin,
    padding,
    gap,
    borderRadius,
    background = 'transparent',
    maxWidth = 'fixed',
    width = 'fullWidth',
    direction = 'vertical',
    align = 'left',
    className = '',
    wrap = false,
    fitContent = false,
    fullHeight = false,
    shrink = false,
    shadow = false,
    ref = null,
    children
}: ContainerProps) => {
    const styles: Styles = {
        justifyContent: align,
        flexDirection:
            direction === 'vertical'
                ? ('column' as 'column')
                : ('row' as 'row'),
        maxWidth: toWidth(maxWidth),
        flexWrap: wrap ? ('wrap' as 'wrap') : ('nowrap' as 'nowrap'),
        width,
        height: shrink ? '100%' : 'auto',
        display: 'grid'
    }

    margin ? (styles.margin = toSpacing(margin)) : null
    gap ? (styles.gap = toSpacing(gap)) : null
    background ? (styles.backgroundColor = toColor(background)) : null
    borderRadius ? (styles.borderRadius = toSpacing(borderRadius)) : null
    borderRadius ? (styles.overflow = 'hidden') : null
    fitContent ? (styles.height = 'fit-content') : null
    fullHeight ? (styles.height = '100%') : null
    shadow ? (styles.boxShadow = '0 0 14px rgba(0,0,0,0.14)') : null
    padding?.vertical ? (styles.paddingTop = toSpacing(padding.vertical)) : null
    padding?.vertical
        ? (styles.paddingBottom = toSpacing(padding.vertical))
        : null
    padding?.horizontal
        ? (styles.paddingLeft = toSpacing(padding.horizontal))
        : null
    padding?.horizontal
        ? (styles.paddingRight = toSpacing(padding.horizontal))
        : null

    return (
        <>
            <div
                ref={ref}
                className={`${style.container} ${className}`}
                style={styles}
            >
                <>{children}</>
            </div>
        </>
    )
}
