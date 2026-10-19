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

const fallbackVideoFiles = [
  { id: "2", title: "Sri Lanka Journey", video_url: "/videos/2.mp4", duration: 15 },
  { id: "3", title: "Sri Lanka Journey", video_url: "/videos/3.mp4", duration: 15 },
  { id: "4", title: "Sri Lanka Journey", video_url: "/videos/4.mp4", duration: 15 },
  { id: "5", title: "Sri Lanka Journey", video_url: "/videos/5.mp4", duration: 15 },
  { id: "6", title: "Sri Lanka Journey", video_url: "/videos/6.mp4", duration: 15 },
  { id: "7", title: "Sri Lanka Journey", video_url: "/videos/7.mp4", duration: 15 },
  { id: "8", title: "Sri Lanka Journey", video_url: "/videos/8.mp4", duration: 15 },
  { id: "9", title: "Sri Lanka Journey", video_url: "/videos/9.mp4", duration: 15 },
  { id: "10", title: "Sri Lanka Journey", video_url: "/videos/10.mp4", duration: 15 },
  { id: "11", title: "Sri Lanka Journey", video_url: "/videos/11.mp4", duration: 15 },
  { id: "12", title: "Sri Lanka Journey", video_url: "/videos/12.mp4", duration: 15 },
  { id: "13", title: "Sri Lanka Journey", video_url: "/videos/13.mp4", duration: 15 },
  { id: "14", title: "Sri Lanka Journey", video_url: "/videos/14.mp4", duration: 15 },
  { id: "15", title: "Sri Lanka Journey", video_url: "/videos/15.mp4", duration: 15 },
  { id: "16", title: "Sri Lanka Journey", video_url: "/videos/16.mp4", duration: 15 },
  { id: "17", title: "Sri Lanka Journey", video_url: "/videos/17.mp4", duration: 15 },
  { id: "18", title: "Sri Lanka Journey", video_url: "/videos/18.mp4", duration: 15 },
  { id: "19", title: "Sri Lanka Journey", video_url: "/videos/19.mp4", duration: 15 },
  { id: "20", title: "Sri Lanka Journey", video_url: "/videos/20.mp4", duration: 15 },
];

// GET - Fetch active vibe videos with timeout and graceful fallback
export async function GET() {
  try {
    const supabase = getSupabaseClient();
    
    // Timeout promise (2.5 seconds max) to prevent long 10s hangs
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase request timed out')), 2500)
    );

    const queryPromise = supabase
      .from('vibe_videos')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    const { data, error } = (await Promise.race([queryPromise, timeoutPromise])) as {
      data: unknown[] | null;
      error: Error | null;
    };

    if (error || !data || data.length === 0) {
      return NextResponse.json(fallbackVideoFiles);
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.warn("Vibe videos API fallback activated:", err instanceof Error ? err.message : err);
    return NextResponse.json(fallbackVideoFiles);
  }
}

// POST - Add a new vibe video
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('vibe_videos')
      .insert({
        title: body.title,
        video_url: body.video_url,
        thumbnail_url: body.thumbnail_url || null,
        duration: body.duration || 15,
        order_index: body.order_index || 0,
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update a vibe video (toggle active status)
export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('vibe_videos')
      .update({ is_active: body.is_active })
      .eq('id', body.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete a vibe video
export async function DELETE(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    const { error } = await supabase.from('vibe_videos').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
