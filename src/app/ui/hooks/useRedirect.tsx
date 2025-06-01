import { redirect } from 'next/navigation'

export const routeRedirect = () => {
    const redirectToHome = () => redirect('/')

    return {
        redirectToHome
    }
}
