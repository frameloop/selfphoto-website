'use client'

import { Title } from '@/app/ui/components/molecules'
import { Container, Button } from '@/app/ui/components/primitives'
import { useNavigate } from '@/app/ui/hooks/useNavigate'
import { fetchApi } from '@/utils/fetch'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

export default function ReservaPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <ReservaContent />
        </Suspense>
    )
}

function ReservaContent() {
    const searchParams = useSearchParams()
    const success = searchParams.get('success') === 'true'
    const date = searchParams.get('date') as string
    const userName = searchParams.get('userName') as string
    const userEmail = searchParams.get('userEmail') as string
    const stripeId = searchParams.get('stripeId') as string
    const duration = searchParams.get('duration') as string

    const { navigateToHome } = useNavigate()

    useEffect(() => {
        const createReserve = async () => {
            try {
                const reserve = await fetchApi({
                    apiVersion: '/api/v1/',
                    endpoint: 'create-calendar-event',
                    method: 'POST',
                    body: {
                        date,
                        userName,
                        userEmail,
                        stripeId,
                        duration
                    }
                })

                if (!reserve) {
                    throw new Error('No se pudo realizar la reserva')
                }
            } catch (error) {
                console.error('Error al crear la reserva:', error)
            }
        }

        createReserve()
    }, [date, userName, userEmail, stripeId])

    return (
        <Container fullHeight align="center" verticalAlign="center">
            <Container maxWidth="large">
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    {success ? (
                        <>
                            <Title
                                text="¡Reserva Confirmada!"
                                hierarchy="titleM"
                                tag="h1"
                                textAlign="center"
                            />
                            <p style={{ margin: '1rem 0', fontSize: '1.2rem' }}>
                                Tu reserva se ha realizado con éxito. Te hemos
                                enviado un correo electrónico con todos los
                                detalles.
                            </p>
                        </>
                    ) : (
                        <>
                            <Title
                                text="Error en la Reserva"
                                hierarchy="titleM"
                                tag="h1"
                                textAlign="center"
                            />
                            <p style={{ margin: '1rem 0', fontSize: '1.2rem' }}>
                                Lo sentimos, ha ocurrido un error al procesar tu
                                reserva. Por favor, inténtalo de nuevo.
                            </p>
                        </>
                    )}
                    <Button onClick={navigateToHome}>Volver al inicio</Button>
                </div>
            </Container>
        </Container>
    )
}
