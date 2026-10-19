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

const fallbackReviews = [
  { id: "1", name: "Sarah Jenkins", rating: 5, tags: ["Friendly", "Adventure"], message: "The best tour guide we could ask for! Took us to hidden waterfalls we never would have found alone." },
  { id: "2", name: "Mike T.", rating: 5, tags: ["Safe Travel", "Local Expert"], message: "Felt incredibly safe and well taken care of. 10/10 recommendation." },
  { id: "3", name: "Emily & John", rating: 4, tags: ["Comfortable", "Flexible"], message: "Loved how flexible the itinerary was. We changed plans mid-trip and it was no problem." },
  { id: "4", name: "David L.", rating: 5, tags: ["Trustworthy", "Fun"], message: "Driving was excellent, very smooth. Great conversation and food tips!" },
];

// GET - Fetch approved reviews with timeout and graceful fallback
export async function GET() {
  try {
    const supabase = getSupabaseClient();
    
    // Timeout promise (2.5 seconds max) to prevent long 10s hangs
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase request timed out')), 2500)
    );

    const queryPromise = supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    const { data, error } = (await Promise.race([queryPromise, timeoutPromise])) as {
      data: unknown[] | null;
      error: Error | null;
    };

    if (error || !data || data.length === 0) {
      return NextResponse.json(fallbackReviews);
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.warn("Reviews API fallback activated:", err instanceof Error ? err.message : err);
    return NextResponse.json(fallbackReviews);
  }
}

// POST - Submit a new review
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name: body.name,
        rating: body.rating,
        message: body.message,
        tags: body.tags || [],
        status: body.status || 'pending'
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

// PUT - Update a review (for admin approval/rejection)
export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('reviews')
      .update({ status: body.status })
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

// DELETE - Delete a review
export async function DELETE(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
