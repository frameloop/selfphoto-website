import { cookies } from 'next/headers'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2025-05-28.basil'
})

export const setGoogleAccessTokenCookie = async (token: string) => {
    try {
        const cookieStore = await cookies()
        cookieStore.set({
            name: 'calendar-token',
            value: token!,
            maxAge: 3500,
            path: '/'
        })
    } catch (error) {
        console.log('calendar-token error', error)
    }
}
export const getStripeUser = async (
    email: string
): Promise<Stripe.Customer | undefined> => {
    try {
        const customers = await stripe.customers.list({
            email: email,
            limit: 1,
            expand: ['data.default_source']
        })
        return customers.data[0]
    } catch (error) {
        console.log('user error', error)
    }
}
