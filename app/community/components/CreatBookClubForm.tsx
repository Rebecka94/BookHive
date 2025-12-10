"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Image from "next/image";
import { createBookClub } from "../actions";

const IMAGE_OPTIONS = [
  { src: "/fantasy.png", label: "Fantasy" },
  { src: "/drama.png", label: "Drama" },
  { src: "/sci-fi.png", label: "Sci-Fi" },
  { src: "/romantik.png", label: "Romance" },
  { src: "/sjalvbiografi.png", label: "Biography" },
  { src: "/krim.png", label: "Crime" },
];

export default function CreateBookClubForm({ user }: { user: User | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(IMAGE_OPTIONS[0].src);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("image_url", selectedImage);

    if (!user) {
      setErrorMessage("You must be logged in to create a book club.");
      return;
    }

    startTransition(async () => {
      const res = await createBookClub(formData);

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setErrorMessage(null);
        setOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create a Book Club
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "text.primary" }}>
          Create a Book Club
        </DialogTitle>

        <DialogContent>
          {!user && (
            <DialogContentText color="text.primary" sx={{ mb: 2 }}>
              You must be logged in to create a book club.
            </DialogContentText>
          )}

          {errorMessage && (
            <DialogContentText color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </DialogContentText>
          )}

          <form id="club-form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                required
                variant="standard"
                InputLabelProps={{ sx: { color: "text.primary" } }}
                InputProps={{ sx: { color: "text.primary" } }}
              />

              <TextField
                name="description"
                label="Description"
                fullWidth
                required
                variant="standard"
                InputLabelProps={{ sx: { color: "text.primary" } }}
                InputProps={{ sx: { color: "text.primary" } }}
              />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Choose an image
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                  gap: 2,
                }}
              >
                {IMAGE_OPTIONS.map((img) => (
                  <Box
                    key={img.src}
                    onClick={() => setSelectedImage(img.src)}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      outline:
                        selectedImage === img.src
                          ? "3px solid #1976d2"
                          : "2px solid transparent",
                      transition: "outline 0.15s ease",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      width={200}
                      height={200}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      variant="caption"
                      textAlign="center"
                      sx={{
                        display: "block",
                        mt: 0.5,
                        color:
                          selectedImage === img.src
                            ? "primary.main"
                            : "text.primary",
                      }}
                    >
                      {img.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </form>
        </DialogContent>

        <DialogActions>
          <Button type="submit" form="club-form" disabled={isPending}>
            Create
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
