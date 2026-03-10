import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Replicate from 'replicate';
import archiver from 'archiver';
import { PassThrough } from 'stream';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const maxDuration = 60; // Next.js serverless config

export async function POST(req: Request) {
  try {
    const { filePaths } = await req.json();
    if (!filePaths || filePaths.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Prepare zip stream
    const archive = archiver('zip', { zlib: { level: 9 } });
    const chunks: Buffer[] = [];
    
    // We can't easily pipe directly to Supabase upload in standard node without custom streams,
    // so we'll buffer it in memory. 20 images * ~3MB max = 60MB max, safe enough for serverless if max is 100MB.
    
    archive.on('data', chunk => chunks.push(Buffer.from(chunk)));
    
    // Create a promise to wait for archive to finish
    const archivePromise = new Promise((resolve, reject) => {
      archive.on('end', () => resolve(Buffer.concat(chunks)));
      archive.on('error', err => reject(err));
    });

    for (const filePath of filePaths) {
      const { data, error } = await supabase.storage.from('user-training-images').download(filePath);
      if (error) {
         console.error(`Error downloading ${filePath}:`, error);
         continue;
      }
      
      const arrayBuffer = await data.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = filePath.split('/').pop() || `img_${Math.random()}.jpg`;
      
      archive.append(buffer, { name: fileName });
    }
    
    archive.finalize();
    const zipBuffer = await archivePromise as Buffer;

    // Upload zip buffer to Supabase
    const zipFileName = `${user.id}/${Math.random().toString(36).substring(7)}-training.zip`;
    const { error: uploadError } = await supabase.storage
      .from('user-training-images')
      .upload(zipFileName, zipBuffer, {
        contentType: 'application/zip'
      });

    if (uploadError) {
      console.error('Error uploading zip:', uploadError);
      return NextResponse.json({ error: 'Failed to upload zip' }, { status: 500 });
    }

    // Get public URL for zip
    const { data: publicUrlData } = supabase.storage.from('user-training-images').getPublicUrl(zipFileName);
    const zipUrl = publicUrlData.publicUrl;

    // MOCK TRAINING FLOW
    // Because billing is disabled, we skip calling Replicate completely.
    // This allows the user to test the UI flow without 402 Payment Errors.
    const mockReplicateId = `mock_training_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    console.log(`[MOCK TRAINING] Bypassed Replicate. Created mock Job ID: ${mockReplicateId}`);
    
    // Simulate slight network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Write to models table
    const { data: modelRecord, error: insertError } = await supabase
      .from('models')
      .insert({
        user_id: user.id,
        replicate_model_id: mockReplicateId,
        status: 'training' // Initial status
      })
      .select()
      .single();

    if(insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json({ error: 'Failed to save model to database' }, { status: 500 });
    }

    return NextResponse.json({ success: true, replicateId: mockReplicateId, model: modelRecord });

  } catch (error: any) {
    console.error('Error starting training:', error);
    return NextResponse.json({ error: error.message || 'Error occurred' }, { status: 500 });
  }
}
