import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import ContentBox from "../components/ContentBox";
import CreateBookClubForm from "./components/CreatBookClubForm";

export default async function CommunityPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: clubs, error } = await supabase.from("book_clubs").select("*");

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Book Clubs</h1>

      <CreateBookClubForm user={user} />

      {clubs?.map((c) => (
        <Link
          href={`/community/${c.id}`}
          key={c.id}
          style={{ textDecoration: "none" }}
        >
          <ContentBox
            name={c.name}
            description={c.description}
            image="/book-sharing.png"
          />
        </Link>
      ))}
    </div>
  );
}
