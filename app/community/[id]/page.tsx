import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DetailView from "../components/DetailView";

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

  if (user) {
    const { data: member } = await supabase
      .from("club_members")
      .select("*")
      .eq("club_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (member) {
      redirect(`/community/${id}/club`);
    }
  }

  return <DetailView club={club} alreadyMember={false} />;
}
