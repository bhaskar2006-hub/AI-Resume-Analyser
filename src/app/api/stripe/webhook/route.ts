import { NextResponse } from 'next/server'
import { stripe } from '@/utils/stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed.', error.message)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  // To interact with the database in a webhook (which is unauthenticated), 
  // we use the Service Role Key to bypass RLS.
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

  const session = event.data.object as any

  switch (event.type) {
    case 'checkout.session.completed': {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
      const userId = session.metadata.userId

      // Update or insert into user_profiles
      await supabaseAdmin.from('user_profiles').upsert({
        id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscription.id,
        subscription_status: subscription.status,
        price_id: subscription.items.data[0].price.id,
      })
      break
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = await stripe.subscriptions.retrieve(session.id)

      // We need to find the user via customer id
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('id')
        .eq('stripe_customer_id', subscription.customer as string)
        .single()

      if (profile) {
        await supabaseAdmin.from('user_profiles').update({
          stripe_subscription_id: subscription.id,
          subscription_status: subscription.status,
          price_id: subscription.items.data[0].price.id,
        }).eq('id', profile.id)
      }
      break
    }
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new NextResponse('Webhook handled successfully', { status: 200 })
}
