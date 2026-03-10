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

    if (userId) {
      console.log('Payment successful for user:', userId)
      
      const supabase = await createClient()

      try {
        // Fetch all user images from the storage bucket
        const { data: files, error: storageError } = await supabase
          .storage
          .from('user-training-images')
          .list(userId, { limit: 20 })

        if (storageError || !files || files.length === 0) {
          throw new Error('No images found or error fetching images')
        }

        // Normally, here you would format the files into a ZIP URL
        // and send it to Replicate to start LoRA training.
        // Example:
        // const zipUrl = await createZipUrl(userId, files)
        // const prediction = await replicate.train('ostris/flux-dev-lora-trainer', { input: { input_images: zipUrl, steps: 1000 } })
        
        // For the MVP MVP scope, we'll simulate the replicate model row insert
        const { error: insertError } = await supabase
          .from('models')
          .insert({
            user_id: userId,
            replicate_model_id: 'simulated-training-job-' + Math.random().toString(36).substring(7),
            status: 'training' // Changes to 'ready' later
          })

        if (insertError) {
           console.error('Error inserting model row:', insertError)
        }
      } catch (err) {
        console.error('Failed to trigger training:', err)
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
