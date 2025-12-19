"use client";

import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { deleteClub } from "../actions/deleteClub";
import { leaveClub } from "../actions/leaveClub";

interface BookClub {
  id: string;
  name: string;
  description: string | null;
  creator_id?: string;
  image_url?: string | null;
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
    if (result?.error) alert(result.error);
    else window.location.reload();
  };

  const handleLeave = async (clubId: string) => {
    const confirmed = confirm(
      "Are you sure you want to leave this club?"
    );
    if (!confirmed) return;

    const result = await leaveClub(clubId);
    if (result?.error) alert(result.error);
    else window.location.reload();
  };

  return (
    <Stack spacing={2}>
      {clubs.map((club) => {
        const isCreator = club.creator_id === userId;

        return (
          <Card
            key={club.id}
            variant="outlined"
            sx={{
              position: "relative",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "action.hover",
                transform: "translateY(-2px)",
                boxShadow: 2,
              },
            }}
          >
            <Link
              href={`/bookclub/${club.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  pr: 6,
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    position: "relative",
                    borderRadius: 1,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {club.image_url ? (
                    <Image
                      src={club.image_url}
                      alt={club.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "divider",
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1">
                    {club.name}
                  </Typography>

                  <Typography variant="body2">
                    {club.description || "No description"}
                  </Typography>
                </Box>
              </CardContent>
            </Link>
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                gap: 0.5,
                zIndex: 2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {isCreator ? (
                <IconButton
                  size="small"
                  onClick={() => handleDelete(club.id)}
                  aria-label="Delete club"
                  sx={{
                    "&:hover": {
                      backgroundColor: "error.light",
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton
                  size="small"
                  onClick={() => handleLeave(club.id)}
                  aria-label="Leave club"
                  sx={{
                    "&:hover": {
                      backgroundColor: "warning.light",
                    },
                  }}
                >
                  <ExitToAppIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Card>
        );
      })}
    </Stack>
  );
}
