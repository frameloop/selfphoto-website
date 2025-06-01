'use client'

import { useRouter } from 'next/navigation'

export const useNavigate = () => {
    const router = useRouter()

    const navigateToHome = () => router.push('/')
    const refreshPage = () => router.refresh()

    return {
        navigateToHome,

        refreshPage
    }
}
