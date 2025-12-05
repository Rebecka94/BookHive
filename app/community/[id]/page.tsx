import { createClient } from "@/lib/supabase/server";
import ClubView from "../components/ClubView";
import DetailView from "../components/DetailView";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CommunityDetailPage({ params }: Props) {
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

  let alreadyMember = false;

  if (user) {
    const { data: member } = await supabase
      .from("club_members")
      .select("*")
      .eq("club_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    alreadyMember = !!member;
  }

  return (
  <>
    {alreadyMember ? (
      <ClubView club={club} alreadyMember={alreadyMember} />
    ) : (
      <DetailView club={club} alreadyMember={alreadyMember} />
    )}
  </>
);
}
