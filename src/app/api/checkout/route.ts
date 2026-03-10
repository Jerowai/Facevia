import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    // Lazy initialize to avoid crashing on build if keys are missing
    const stripeKey = process.env.STRIPE_SECRET_KEY || '';
    if (!stripeKey) {
      return NextResponse.json(
        { error: 'Stripe is not configured on this server.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2026-02-25.clover' as any, // Bypass TS definition bounds if library expects older version
    });

    const body = await req.json();
    const { tier } = body; // 'starter', 'pro', or 'elite'

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Check auth
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    // Determine pricing and content
    let price = 0;
    let name = '';
    let description = '';

    if (tier === 'starter') {
      price = 2900; // $29
      name = 'Starter Plan';
      description = '1 AI Model training, 50+ AI Generated photos.';
    } else if (tier === 'pro') {
      price = 4900; // $49
      name = 'Pro Plan - Most Popular';
      description = '2 AI Model trainings, 120+ photos, Premium presets.';
    } else if (tier === 'elite') {
      price = 7900; // $79
      name = 'Elite Plan';
      description = '5 AI Model trainings, 300+ photos, Commercial license.';
    } else {
      return NextResponse.json({ error: 'Invalid tier selected' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name,
              description,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment/cancel`,
      metadata: {
        userId: user.id,
        tier,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message || 'An error occurred during checkout.' }, { status: 500 });
  }
}
