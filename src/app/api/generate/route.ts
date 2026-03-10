import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Replicate from 'replicate'
import { PHOTO_PRESETS } from '@/lib/constants/presets'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prompt, modelId, presetId } = await req.json()

    if (!modelId) {
      return NextResponse.json({ error: 'Missing model ID' }, { status: 400 })
    }

    // 1. Check User Credits
    const { data: creditsData, error: creditsError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();

    if (creditsError || !creditsData || creditsData.credits < 1) {
      return NextResponse.json({ error: 'Insufficient credits. Please upgrade your plan.' }, { status: 402 })
    }

    // 2. Determine Prompt based on preset
    const targetPreset = PHOTO_PRESETS.find(p => p.id === presetId);
    let finalPrompt = prompt || "portrait photo of a person, photorealistic, professional lighting, high quality";

    if (targetPreset) {
      finalPrompt = targetPreset.promptTemplate;
    }

    // 3. Verify user owns the model and it's ready
    const { data: modelCheck, error: modelError } = await supabase
      .from('models')
      .select('*')
      .eq('id', modelId)
      .eq('user_id', user.id)
      .single()

    if (modelError || !modelCheck || modelCheck.status !== 'ready') {
      return NextResponse.json({ error: 'Model not found or not ready' }, { status: 404 })
    }

    console.log(`[GENERATION] Using model: ${modelCheck.replicate_model_id} with preset: ${presetId || 'custom'} `);

    // 4. Run the trained model
    // In production, replicate_model_id looks like: "username/model-name:version"
    // We assume the stored ID is valid for replicate.run
    let modelString = modelCheck.replicate_model_id;
    if (!modelString.includes(':')) {
      // Just a fallback in case the ID is naked without version
      // Actual LoRA models run as "user/model:version" or "user/model"
      modelString = `${modelString}`;
    }

    // Call Replicate using the created LoRA
    const output = await replicate.run(
      modelString,
      {
        input: {
          prompt: finalPrompt,
          num_outputs: 1,
          aspect_ratio: "3:4",
          output_format: "jpg",
          output_quality: 90,
          // go_fast: true // Often not supported directly on raw trained LoRA models without specific config, safe to omit
        }
      }
    )

    // Output is typically an array of strings (URLs)
    const imageUrl = Array.isArray(output) ? output[0] : output

    // 5. Save image reference to the database and deduct credit
    if (imageUrl) {
      // Deduct credit
      await supabase.from('user_credits').update({ credits: creditsData.credits - 1 }).eq('user_id', user.id);

      const { error: insertError } = await supabase
        .from('images')
        .insert({
          user_id: user.id,
          model_id: modelId,
          image_url: imageUrl,
          prompt: finalPrompt,
        })

      if (insertError) {
        console.error('Failed to save to db', insertError.message)
      }
    }

    return NextResponse.json({ url: imageUrl })
  } catch (err: any) {
    console.error('Generation Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
