import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CommunityDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: club, error } = await supabase
    .from("book_clubs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return <div>{error.message}</div>;
  if (!club) return <div>Klubben hittades inte</div>;

  return (
    <div>
      <h1>{club.name}</h1>
      <p>{club.description}</p>
    </div>
  );
}
