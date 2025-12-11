import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClubView from "./components/ClubView";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();  
  const { data: club } = await supabase
    .from("book_clubs")
    .select("name")
    .eq("id", id)
    .single();

  return {
    title: club ? `${club.name} - Book Club` : "Book Club",
  };
}

export default async function BookClubPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: club } = await supabase
    .from("book_clubs")
    .select("*")
    .eq("id", id)
    .single();

  if (!club) return <div>Club not found</div>;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/community/${id}`);
  }

  const { data: member } = await supabase
    .from("club_members")
    .select("*")
    .eq("club_id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!member) {
    redirect(`/community/${id}`);
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("club_id", id)
    .order("created_at", { ascending: false });

  return <ClubView club={club} posts={posts || []} />;
}