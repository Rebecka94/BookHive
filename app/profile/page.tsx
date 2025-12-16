import { createClient } from "@/lib/supabase/server";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import MyClubsList from "./components/myClubsList";

interface BookClub {
  id: string;
  name: string;
  description: string | null;
  creator_id: string;
}

interface ClubMemberRow {
  book_clubs: BookClub;
}

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data } = (await supabase
    .from("club_members")
    .select("book_clubs(id, name, description, creator_id)")
    .eq("user_id", user.id)) as { data: ClubMemberRow[] | null };

  const clubs: BookClub[] = data?.map((row) => row.book_clubs) ?? [];

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 6,
      }}
    >
      <Typography variant="h3">
        My Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Avatar
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.name || user.email}
                sx={{
                  width: 96,
                  height: 96,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {user.email?.[0]?.toUpperCase()}
              </Avatar>

              <Typography variant="h4">
                {user.user_metadata?.name || user.email?.split("@")[0]}
              </Typography>

              <Typography variant="body2">{user.email}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h4">
                My Book Clubs
              </Typography>

              {clubs.length === 0 ? (
                <Typography variant="body2">
                  You are not a member of any clubs yet.
                </Typography>
              ) : (
                <MyClubsList clubs={clubs} userId={user.id} />
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
