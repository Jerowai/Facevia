import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Webhook payload Replicate:', body.id, body.status);

    const supabase = await createClient();

    // Map the Replicate status to our DB status
    // Replicate statuses: starting, processing, succeeded, failed, canceled
    let dbStatus = 'training';
    if (body.status === 'succeeded') {
      dbStatus = 'ready';
    } else if (body.status === 'failed' || body.status === 'canceled') {
      dbStatus = 'failed';
    } else if (body.status === 'starting' || body.status === 'processing') {
      dbStatus = 'training'; // you can add 'processing' to DB checks if you want
    }

    const { error } = await supabase
      .from('models')
      .update({
        status: dbStatus,
        error_message: body.error || null,
      })
      .eq('replicate_model_id', body.id);

    if (error) {
      console.error('Webhook error updating model:', error.message);
      return NextResponse.json({ error: 'Failed to update model' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
