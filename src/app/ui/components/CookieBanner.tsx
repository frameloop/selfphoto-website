'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Verificar si estamos en el cliente
        if (typeof window === 'undefined') return

        const cookiesAceptadas = localStorage.getItem('cookiesAceptadas')
        const fechaAceptacion = localStorage.getItem('fechaAceptacion')

        if (fechaAceptacion) {
            const fecha = new Date(fechaAceptacion)
            const seisMeses = 180 * 24 * 60 * 60 * 1000
            if (new Date().getTime() - fecha.getTime() > seisMeses) {
                localStorage.removeItem('cookiesAceptadas')
                localStorage.removeItem('fechaAceptacion')
                setVisible(true)
            } else {
                setVisible(!cookiesAceptadas)
            }
        } else {
            setVisible(!cookiesAceptadas)
        }

        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'default', {
                analytics_storage:
                    cookiesAceptadas === 'true' ? 'granted' : 'denied'
            })
        }
    }, [])

    const aceptarCookies = () => {
        console.log('🟢 Click en aceptar cookies')
        localStorage.setItem('cookiesAceptadas', 'true')
        localStorage.setItem('fechaAceptacion', new Date().toISOString())
        setVisible(false)
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                analytics_storage: 'granted'
            })
        }
    }

    const rechazarCookies = () => {
        console.log('🟠 Click en rechazar cookies')
        localStorage.setItem('cookiesAceptadas', 'false')
        setVisible(false)
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                analytics_storage: 'denied'
            })
        }
    }

    if (!visible) return null

    return (
        <div id="cookie-banner" style={{ display: 'block' }}>
            <div className="container">
                <p>
                    Utilizamos cookies para mejorar tu experiencia. Al continuar
                    navegando, aceptas nuestra{' '}
                    <Link href="/politica-cookies">política de cookies</Link>.
                </p>
                <div>
                    <button id="btn-rechazar-cookies" onClick={rechazarCookies}>
                        Rechazar
                    </button>
                    <button id="btn-aceptar-cookies" onClick={aceptarCookies}>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    )
}
