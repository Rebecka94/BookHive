import { Box, Card, Typography } from "@mui/material";

interface Props {
  club: any;
  alreadyMember: boolean;
}

export default function ClubView({ club, alreadyMember }: Props) {
  if (!alreadyMember) return null;

  return (
    <Box
      sx={{
        paddingX: 5,
      }}
    >
      <Typography variant="h1">Welcome to {club.name}</Typography>
      <Card sx={{
        maxWidth: 600,
        height: 200
      }}></Card>
    </Box>
  );
}
