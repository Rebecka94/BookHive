import { createClient } from "@/lib/supabase/server";
import { Box, Typography } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        py: { xs: 4, sm: 6 },
        mb: 12,
        mt: 2,
        px: { xs: 2, sm: 4}
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: "0 1rem",
        }}
      >
        <Typography sx={{mb: 2}} variant="h2">Join a bookclub or start your own</Typography>

        <CreateBookClubForm user={user} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
            justifyContent: "start",
            mt: 3,
          }}
        >
          {clubs?.map((c) => (
            <Link
              href={`/community/${c.id}`}
              key={c.id}
              style={{ textDecoration: "none" }}
            >
              <ContentBox
                name={c.name}
                description={c.description}
                image={c.image_url}
              />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
