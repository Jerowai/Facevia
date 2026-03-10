import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: Request) {
  // Initialize Stripe lazily to avoid build-time crash when env var is missing
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2026-02-25.clover',
  })

  const payload = await req.text()
  const sig = req.headers.get('stripe-signature') || ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }


  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const tier = session.metadata?.tier

    if (userId && tier) {
      console.log(`Payment successful for user: ${userId}, Tier: ${tier}`)

      const supabase = await createClient()

      try {
        let addedCredits = 0;
        if (tier === 'starter') addedCredits = 20;
        if (tier === 'pro') addedCredits = 60;
        if (tier === 'elite' || tier === 'premium') addedCredits = 120;

        if (addedCredits > 0) {
          // Grant credits to user via Supabase RPC or direct update
          // Since user_credits row is created on signup, we can just update it
          // OR upsert if missing
          const { error: creditsError } = await supabase.rpc('increment_user_credits', {
            u_id: userId,
            c_amount: addedCredits
          });

          // Fallback if RPC isn't created: manually fetch and update
          if (creditsError) {
            console.log('RPC failed, falling back to manual update', creditsError);
            const { data: currentCtx } = await supabase
              .from('user_credits')
              .select('credits')
              .eq('user_id', userId)
              .single();

            const newTotal = (currentCtx?.credits || 0) + addedCredits;

            await supabase
              .from('user_credits')
              .upsert({ user_id: userId, credits: newTotal }, { onConflict: 'user_id' });
          }
          console.log(`Successfully added ${addedCredits} credits to user ${userId}`);
        }
      } catch (err) {
        console.error('Failed to parse and add credits:', err)
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
