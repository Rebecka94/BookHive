import { BookClub } from "@/app/types/database";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import ActionButton from "./ActionsButton";

interface Props {
  club: BookClub;
  alreadyMember: boolean;
}

export default function DetailView({ club, alreadyMember }: Props) {
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

          <ActionButton clubId={club.id} alreadyMember={alreadyMember} />
        </Box>
      </Box>
    </Box>
  );
}
