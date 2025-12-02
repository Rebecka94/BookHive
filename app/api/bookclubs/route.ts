import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // Hämta inloggad användare
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description } = body;

  const { data: bookClub, error } = await supabase
    .from('book_clubs')
    .insert({
      name,
      description,
      creator_id: user.id
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(bookClub);
}

export async function GET() {
  const supabase = await createClient();
  
  const { data: bookClubs, error } = await supabase
    .from('book_clubs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(bookClubs);
}