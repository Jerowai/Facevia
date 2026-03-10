import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Replicate from 'replicate'

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

    const { prompt, modelId } = await req.json()

    if (!prompt || !modelId) {
      return NextResponse.json({ error: 'Missing prompt or model ID' }, { status: 400 })
    }

    // Verify user owns the model and it's ready
    const { data: modelCheck, error } = await supabase
      .from('models')
      .select('*')
      .eq('id', modelId)
      .eq('user_id', user.id)
      .single()

    if (error || !modelCheck || modelCheck.status !== 'ready') {
      return NextResponse.json({ error: 'Model not found or not ready' }, { status: 404 })
    }

    // MOCK GENERATION FLOW
    // Since billing is disabled & no custom LoRA was actually trained,
    // we use the free default Flux model to generate real images based on prompt.
    // When billing is re-enabled, update this to use modelCheck.replicate_model_id.
    console.log(`[MOCK GENERATION] Using default flux-schnell. Prompt: ${prompt}`);
    
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: `portrait photo of a person, ${prompt}, photorealistic, professional lighting, high quality`,
          num_outputs: 1,
          aspect_ratio: "3:4",
          output_format: "jpg",
          output_quality: 90,
          go_fast: true
        }
      }
    )

    // Output is typically an array of strings (URLs)
    const imageUrl = Array.isArray(output) ? output[0] : output

    // Save image reference to the database
    if (imageUrl) {
      const { error: insertError } = await supabase
        .from('images')
        .insert({
          user_id: user.id,
          model_id: modelId,
          image_url: imageUrl,
          prompt,
        })
      
      if(insertError) {
         console.error('Failed to save to db', insertError.message)
      }
    }

    return NextResponse.json({ url: imageUrl })
  } catch (err: any) {
    console.error('Generation Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
