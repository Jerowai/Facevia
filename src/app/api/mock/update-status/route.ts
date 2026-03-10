import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { modelId } = await req.json();
    
    if (!modelId) {
      return NextResponse.json({ error: 'Model ID is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify model belongs to user and is currently training
    const { data: model, error: fetchError } = await supabase
      .from('models')
      .select('*')
      .eq('id', modelId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    if (model.status !== 'training') {
       return NextResponse.json({ error: 'Model is not training' }, { status: 400 });
    }

    // Simulate training completion
    const { error: updateError } = await supabase
      .from('models')
      .update({ status: 'ready' })
      .eq('id', modelId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ error: 'Failed to update model status' }, { status: 500 });
    }

    console.log(`[MOCK TRAINING] Model ${modelId} marked as 'ready'.`);
    return NextResponse.json({ success: true, status: 'ready' });

  } catch (error: any) {
    console.error('Error updating mock status:', error);
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 500 });
  }
}
