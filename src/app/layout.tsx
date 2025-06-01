import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@/app/globals.css'
import { ReactQueryProvider } from './providers/react-query-provider'
import { NotificationProvider } from './ui/hooks/useNotification'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700', '900']
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
        <html lang="es">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
                />
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-Q5K5LM8VT5"
                ></script>
            </head>
            <body className={`${poppins.className} flex h-screen flex-col`}>
                <ReactQueryProvider>
                    <NotificationProvider>{children}</NotificationProvider>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
