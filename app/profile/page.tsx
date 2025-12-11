import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Typography, List, ListItem } from "@mui/material";
import Link from "next/link";

interface BookClub {
  id: string;
  name: string;
  description: string | null;
}

interface ClubMemberRow {
  book_clubs: BookClub;
}

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data } = await supabase
    .from("club_members")
    .select("book_clubs(*)")
    .eq("user_id", user.id) as { data: ClubMemberRow[] | null };

  const clubs: BookClub[] = data?.map((row) => row.book_clubs) ?? [];

  return (
    <div>
      <Typography variant="h3">My Profile</Typography>
      <Typography>Email: {user.email}</Typography>

      <Typography variant="h4" sx={{ mt: 2 }}>
        My Book Clubs
      </Typography>

      {clubs.length === 0 && (
        <Typography>You are not a member of any clubs.</Typography>
      )}

      <List>
        {clubs.map((club) => (
          <ListItem key={club.id}>
            <Link href={`/bookclub/${club.id}`} style={{ textDecoration: 'none' }}>
            <Typography>
              {club.name} — {club.description ?? "No description"}
            </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
