"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { deleteClub } from "../actions/deleteClub";

interface BookClub {
  id: string;
  name: string;
  description: string | null;
  creator_id?: string;
}

interface Props {
  clubs: BookClub[];
  userId: string;
}

export default function MyClubsList({ clubs, userId }: Props) {
  const handleDelete = async (clubId: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this book club?"
    );
    if (!confirmed) return;

    const result = await deleteClub(clubId);

    if (result?.error) {
      alert(result.error);
      return;
    }

    window.location.reload();
  };

  return (
    <Stack spacing={2}>
      {clubs.map((club) => {
        const isCreator = club.creator_id === userId;

        return (
          <Card key={club.id} variant="outlined">
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Box>
                <Link
                  href={`/bookclub/${club.id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography variant="body1">
                    {club.name}
                  </Typography>

                  <Typography variant="body2">
                    {club.description || "No description"}
                  </Typography>
                </Link>
              </Box>

              {isCreator && (
                <IconButton
                  size="small"
                  onClick={() => handleDelete(club.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
