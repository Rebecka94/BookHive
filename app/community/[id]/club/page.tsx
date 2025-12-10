import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClubView from "../../components/ClubView";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClubPage({ params }: Props) {
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

  return <ClubView club={club} alreadyMember={true} />;
}
