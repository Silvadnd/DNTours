import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Helper function to create Supabase client
function getSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Missing Supabase configuration");
    }

    return createClient(supabaseUrl, supabaseServiceKey);
}

// GET - Fetch ALL vibe videos for admin (including inactive)
export async function GET() {
    try {
        const supabase = getSupabaseClient();

        const { data, error } = await supabase
            .from("vibe_videos")
            .select("*")
            .order("order_index", { ascending: true });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch vibe videos" },
            { status: 500 }
        );
    }
}

// POST - Create a new vibe video
export async function POST(request: Request) {
    try {
        const supabase = getSupabaseClient();
        const body = await request.json();

        const { data, error } = await supabase
            .from("vibe_videos")
            .insert({
                title: body.title,
                video_url: body.video_url,
                duration: body.duration,
                is_active: body.is_active ?? true,
                order_index: body.order_index ?? 0
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// PATCH - Update vibe video
export async function PATCH(request: Request) {
    try {
        const supabase = getSupabaseClient();
        const body = await request.json();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "Video ID is required" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("vibe_videos")
            .update(body)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// DELETE - Delete vibe video
export async function DELETE(request: Request) {
    try {
        const supabase = getSupabaseClient();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "Video ID is required" },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from("vibe_videos")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
