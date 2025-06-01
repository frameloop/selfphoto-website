export const spacing = {
    none: '0px',
    line: '1px',
    mini: '4px',
    extraSmall: '8px',
    small: '12px',
    base: '16px',
    medium: '20px',
    large: '24px',
    xLarge: '28px',
    xLarge2: '34px',
    xLarge3: '42px',
    xLarge4: '58px',
    xLarge5: '64px',
    fullWidth: '100%',
    rounded: '999px'
}
export const iconSize = {
    extraSmall: '8px',
    small: '12px',
    base: '16px',
    medium: '20px',
    large: '24px',
    xLarge: '28px',
    xLarge2: '34px',
    xLarge3: '42px',
    xLarge4: '58px',
    xLarge5: '64px'
}
export const hierarchy = {
    extraSmall: {
        size: '12px',
        fontWeight: '400',
        lineHeight: 'inherit'
    },
    small: {
        size: '12px',
        fontWeight: '400',
        lineHeight: 'inherit'
    },
    base: {
        size: '16px',
        fontWeight: '400',
        lineHeight: 'inherit'
    },
    bold: {
        size: '16px',
        fontWeight: '700',
        lineHeight: 'inherit'
    },
    medium: {
        size: '20px',
        fontWeight: '400',
        lineHeight: 'inherit'
    },
    mediumBold: {
        size: '20px',
        fontWeight: '700',
        lineHeight: 'inherit'
    },
    large: {
        size: '24px',
        fontWeight: '400',
        lineHeight: 'inherit'
    },
    titleS: {
        size: '28px',
        fontWeight: '700',
        lineHeight: 'inherit'
    },
    titleM: {
        size: '32px',
        fontWeight: '700',
        lineHeight: 'inherit'
    },
    titleL: {
        size: '38px',
        fontWeight: '700',
        lineHeight: 'inherit'
    },
    titleXL: {
        size: '42px',
        fontWeight: '700',
        lineHeight: 'inherit'
    },
    title2XL: {
        size: '50px',
        fontWeight: '700',
        lineHeight: 1
    },
    title3XL: {
        size: '65px',
        fontWeight: '700',
        lineHeight: 1
    },
    currencyLarge: {
        size: '40px',
        fontWeight: '400',
        lineHeight: 1
    },
    priceLarge: {
        size: '40px',
        fontWeight: '700',
        lineHeight: 1
    },
    title4XL: {
        size: '85px',
        fontWeight: '700',
        lineHeight: 1
    },
    button: {
        size: '16px',
        fontWeight: '600',
        lineHeight: 'inherit'
    },
    buttonLight: {
        size: '16px',
        fontWeight: '400',
        lineHeight: 'inherit'
    }
}

export const colors = {
    primary: '#A30036',
    secondary: '#E28D9A',
    orange: '#FFA585',
    background: '#FFDBC2',
    lightBackground: '#ffeee0',
    white: '#fff',
    grey1: '#1E1C1D',
    grey2: '#717171',
    grey3: '#F6F6F6',
    black: '#000',
    translucidBlack: 'rgba(30,28,29,.4)',
    transparent: 'transparent',
    principal: '#1a1a1a',
    secundario: '#fff',
    molon: '#ff4000',
    error: '#ff0000',
    gris: '#f5f5f5'
}
export const maxWidth = {
    none: 'none',
    small: '100px',
    medium: '200px',
    xMedium: '250px',
    xMedium2: '300px',
    xMedium3: '350px',
    xMedium4: '380px',
    large: '400px',
    xLarge: '450px',
    xLarge1: '500px',
    xLarge2: '600px',
    xLarge3: '700px',
    xLarge4: '900px',
    xLarge5: '1200px',
    xLarge6: '1400px',
    percent10: '10%',
    percent20: '20%',
    percent30: '30%',
    percent40: '40%',
    percent50: '50%',
    percent60: '60%',
    percent70: '70%',
    percent80: '80%',
    percent90: '90%',
    fullWidth: '100%',
    fixed: '1120px'
}
export const size = {
    none: 'none',
    small: '100px',
    medium: '200px',
    large: '300px',
    xLarge: '500px',
    xLarge2: '700px',
    xLarge3: '900px',
    xLarge4: '1200px',
    xLarge5: '1400px',
    percent10: '10%',
    percent20: '20%',
    percent30: '30%',
    percent40: '40%',
    percent50: '50%',
    percent60: '60%',
    percent70: '70%',
    percent80: '80%',
    percent90: '90%',
    fullWidth: '100%',
    auto: 'auto',
    fixed: '1120px'
}
export const textAlign = {
    fullWidth: '100%',
    fixed: '1120px'
}

export type Spacing = keyof typeof spacing
export type IconSize = keyof typeof iconSize
export type Padding = { horizontal: Spacing; vertical: Spacing }
export type SelectiveSpacing = Spacing
export type DirectionSpacing = { horizontal: Spacing; vertical?: Spacing }
export type Colors = keyof typeof colors
export type Hierarchy = keyof typeof hierarchy
export type MaxWidth = keyof typeof maxWidth
export type Size = keyof typeof size
export type TextAlign = 'left' | 'center' | 'right'
