import { createClient } from "@/lib/supabase/server";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import FavoriteBooksList from "./components/FavoriteBooksList";
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
    .select("book_clubs(id, name, description, creator_id, image_url)")
    .eq("user_id", user.id)) as { data: ClubMemberRow[] | null };

  const clubs: BookClub[] = data?.map((row) => row.book_clubs) ?? [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: { xs: 4, lg: 3 },
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, md: 6 },
        mb: 12,
        mt: 2,
         maxWidth: 1300,
    mx: "auto",     
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "30%" },
          flexShrink: 0,
        }}
      >
        <Typography variant="h1" sx={{ mb: 3 }}>
          My Profile
        </Typography>

        <Card sx={{ backgroundColor: "#345B49", color: "text.secondary" }}>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Avatar
              src={user.user_metadata?.avatar_url}
              alt={`User image of ${user.user_metadata?.name || user.email}`}
              sx={{
                width: 96,
                height: 96,
                mx: "auto",
                mb: 2,
              }}
            >
              {user.email?.[0]?.toUpperCase()}
            </Avatar>

            <Typography variant="body1">
              {user.user_metadata?.name || user.email?.split("@")[0]}
            </Typography>

            <Typography variant="body2">{user.email}</Typography>
          </CardContent>
        </Card>

        <FavoriteBooksList />
      </Box>
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
        }}
      >
        <Typography variant="h2" sx={{ mt: 1 ,mb: 4 }}>
          My Book Clubs
        </Typography>

        <Card>
          <CardContent>
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
  );
}
