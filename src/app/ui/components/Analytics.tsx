'use client'

import { useEffect } from 'react'
import { initializeGA } from '../../lib/analytics'

export default function Analytics() {
    useEffect(() => {
        // Asegurarse de que gtag está disponible
        if (typeof window !== 'undefined' && !window.gtag) {
            initializeGA()
        }
    }, [])

    return null
}
