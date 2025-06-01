import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2025-05-28.basil'
})

export async function POST(req: NextRequest) {
    const { date, userName, userEmail, stripeId, duration } = await req.json()

    try {
        // Create Checkout Sessions from body params.
        const params: Stripe.Checkout.SessionCreateParams = {
            submit_type: 'pay',
            customer: stripeId.id,
            customer_email: userEmail,
            payment_method_types: ['card'],
            mode: 'payment',
            invoice_creation: {
                enabled: true,
                invoice_data: {
                    description: `Reserva ${date} Self Photo | ${userName} | ${userEmail}`
                }
            },
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        unit_amount: 20 * 100,
                        product_data: {
                            name: `Reserva ${date} Self Photo | ${userName} | ${userEmail}`
                        }
                    },
                    quantity: 1
                }
            ],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reserva?success=true&date=${date}&userName=${userName}&userEmail=${userEmail}&stripeId=${stripeId}&duration=${duration}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reserva?success=false`
        }

        const checkoutSession = await stripe.checkout.sessions.create(params)
        return NextResponse.json({ data: checkoutSession }, { status: 200 })
    } catch (error: unknown) {
        console.log(error)
        if (error instanceof Error && error.message === 'User not found') {
            return NextResponse.json({ error: error.message }, { status: 401 })
        }
        return NextResponse.json(
            { error: 'Internal Server Error catch' },
            { status: 500 }
        )
    }
}
