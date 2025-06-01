export type IconsId =
    | 'arrow_left'
    | 'check'
    | 'chevron_left'
    | 'close'
    | 'location'
    | 'menu-01'
    | 'menu'
    | 'minus'
    | 'play'
    | 'plus'
    | 'shopping-cart'
    | 'user'

export type IconsKey =
    | 'ArrowLeft'
    | 'Check'
    | 'ChevronLeft'
    | 'Close'
    | 'Location'
    | 'Menu_01'
    | 'Menu'
    | 'Minus'
    | 'Play'
    | 'Plus'
    | 'ShoppingCart'
    | 'User'

export enum Icons {
    ArrowLeft = 'arrow_left',
    Check = 'check',
    ChevronLeft = 'chevron_left',
    Close = 'close',
    Location = 'location',
    Menu_01 = 'menu-01',
    Menu = 'menu',
    Minus = 'minus',
    Play = 'play',
    Plus = 'plus',
    ShoppingCart = 'shopping-cart',
    User = 'user'
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
    [Icons.ArrowLeft]: '61697',
    [Icons.Check]: '61698',
    [Icons.ChevronLeft]: '61699',
    [Icons.Close]: '61700',
    [Icons.Location]: '61701',
    [Icons.Menu_01]: '61702',
    [Icons.Menu]: '61703',
    [Icons.Minus]: '61704',
    [Icons.Play]: '61705',
    [Icons.Plus]: '61706',
    [Icons.ShoppingCart]: '61707',
    [Icons.User]: '61708'
}
