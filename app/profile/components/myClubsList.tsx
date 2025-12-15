"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
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
 // Debugging logs
  console.log("Current userId:", userId);
  console.log("Clubs:", clubs.map(c => ({ 
    id: c.id, 
    name: c.name, 
    creator: c.creator_id,
    isCreator: c.creator_id === userId 
  })));

  const handleDelete = async (clubId: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this book club?"
    );
    if (!confirmed) return;

    const result = await deleteClub(clubId);

    if (result?.error) {
      alert(result.error);
      console.error(result.error);
      return;
    }

    window.location.reload();
  };

  return (
  <List>
    {clubs.map((club) => {
      const isCreator = club.creator_id === userId;

      return (
        <ListItem
          key={club.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Link
              href={`/bookclub/${club.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography fontWeight={600}>{club.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {club.description ?? "No description"}
              </Typography>
            </Link>
          </Box>

          <IconButton
            onClick={() => handleDelete(club.id)}
            aria-label="Delete club"
            color={isCreator ? "default" : "warning"}
          >
            <CloseIcon />
          </IconButton>
        </ListItem>
      );
    })}
  </List>
)}