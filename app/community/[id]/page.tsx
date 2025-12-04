import { createClient } from "@/lib/supabase/server";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import JoinButton from "../components/JoinButton";

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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "2.5rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: "100%", sm: "45%" },
            height: { xs: "220px", sm: "320px" },
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Image
            src={club.image_url}
            alt={club.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
            {club.name}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
            {club.description}
          </Typography>

          <JoinButton clubId={club.id} alreadyMember={alreadyMember} />
        </Box>
      </Box>
    </Box>
  );
}
