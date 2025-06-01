import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2025-05-28.basil'
})

export async function POST(req: NextRequest) {
    const { email, name } = await req.json()
    try {
        const params: Stripe.CustomerCreateParams = {
            name,
            email
        }
        const createUser: Stripe.Customer = await stripe.customers.create(
            params
        )
        return NextResponse.json(createUser, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: 'Internal Server Error catch' },
            { status: 500 }
        )
    }
}
