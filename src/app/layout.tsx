import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/app/globals.css'
import { ReactQueryProvider } from './providers/react-query-provider'
import { NotificationProvider } from './ui/hooks/useNotification'
import Script from 'next/script'

// Configuración de la fuente con fallback
const poppins = localFont({
    src: [
        {
            path: '/ui/fonts/poppins/poppins-regular.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '/ui/fonts/poppins/poppins-500.woff2',
            weight: '500',
            style: 'normal'
        },
        {
            path: '/ui/fonts/poppins/poppins-700.woff2',
            weight: '700',
            style: 'normal'
        }
    ],
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
    title: 'Fotógrafo en Tarragona | Estudio Fotográfico Self·Photo Studio',
    description:
        'Estudio fotográfico en Tarragona especializado en fotografía profesional, foto DNI, retratos, sesiones familiares y más. ¡Reserva tu sesión con un fotógrafo experto!',
    openGraph: {
        title: 'Fotógrafo en Tarragona | Estudio Fotográfico Self·Photo Studio',
        description:
            'Fotografía profesional, retratos, foto DNI y sesiones familiares en Tarragona.',
        images: [
            {
                url: 'https://www.selfphotostudio.es/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Self·Photo Studio'
            }
        ],
        url: 'https://www.selfphotostudio.es',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fotógrafo en Tarragona | Estudio Fotográfico Self·Photo Studio',
        description:
            'Fotografía profesional, retratos, foto DNI y sesiones familiares en Tarragona.',
        images: ['https://www.selfphotostudio.es/images/og-image.jpg']
    },
    robots: {
        index: true,
        follow: true
    },
    alternates: {
        canonical: 'https://www.selfphotostudio.es/'
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es" className={poppins.className}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
                />
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                        `
                    }}
                />
            </head>
            <body className={`${poppins.className} flex h-screen flex-col`}>
                <ReactQueryProvider>
                    <NotificationProvider>{children}</NotificationProvider>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
