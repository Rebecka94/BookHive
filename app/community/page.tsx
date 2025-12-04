import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import FormDialog from "./components/CreatBookClubForm";

export default async function CommunityPage() {
  const supabase = await createClient();

  const { data: clubs, error } = await supabase.from("book_clubs").select("*");

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Klubbar</h1>
      <FormDialog />

      {clubs?.map((c) => (
        <div key={c.id}>
          <Link href={`/community/${c.id}`}>
            <h3>{c.name}</h3>
            <p>{c.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
