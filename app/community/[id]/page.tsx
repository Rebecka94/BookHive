import { createClient } from "@/lib/supabase/server";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";

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
  if (!club) return <div>Club not found</div>;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "2.5rem",
        marginY: 7
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

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
          >
            {club.name}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              mb: 4,
              color: "text.primary",
            }}
          >
            {club.description}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              py: 1.2,
              fontSize: "1rem",
              alignSelf: "flex-start"
            }}
          >
            Join Club
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
