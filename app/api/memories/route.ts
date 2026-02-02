import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Helper function to create Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase configuration');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

// GET - Fetch all memories with user and media
export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('memories')
      .select(`
        *,
        users (name, avatar_url),
        memory_media (media_url, media_type, order_index)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create a new memory
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    
    // First create user if doesn't exist
    let userId = body.user_id;
    
    if (!userId && body.userName) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({ name: body.userName })
        .select()
        .single();
      
      if (userError) throw userError;
      userId = userData.id;
    }
    
    // Create the memory
    const { data: memoryData, error: memoryError } = await supabase
      .from('memories')
      .insert({
        user_id: userId,
        caption: body.caption,
        location: body.location,
        type: body.type || 'image'
      })
      .select()
      .single();

    if (memoryError) throw memoryError;

    return NextResponse.json(memoryData);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete a memory
export async function DELETE(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Memory ID is required' }, { status: 400 });
    }

    // Delete associated media first
    await supabase.from('memory_media').delete().eq('memory_id', id);
    
    // Delete the memory
    const { error } = await supabase.from('memories').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
