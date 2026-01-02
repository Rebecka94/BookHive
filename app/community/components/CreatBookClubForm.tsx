"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createBookClub } from "../actions/createClub";

const IMAGE_OPTIONS = [
  { src: "/fantasy.png", label: "Fantasy icon" },
  { src: "/drama.png", label: "Drama icon" },
  { src: "/sci-fi.png", label: "Sci-fi icon" },
  { src: "/romantik.png", label: "Romance icon" },
  { src: "/sjalvbiografi.png", label: "Biography icon" },
  { src: "/krim.png", label: "Crime icon" },
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
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Create a Book Club
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="create-bookclub-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: { xs: 2, sm: 3 },
          },
        }}
      >

        <DialogContent>
          {errorMessage && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Typography id="create-bookclub-dialog-title" variant="h3" sx={{mb: 2}}>Create a Book Club</Typography>
          <form id="club-form" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Stack spacing={3}>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  required
                  variant="standard"
                />

                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  required
                  minRows={3}
                  variant="standard"
                />
              </Stack>

              {/* Image selector */}
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Choose an image
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
                    gap: 2,
                  }}
                >
                  {IMAGE_OPTIONS.map((img) => {
                    const isSelected = selectedImage === img.src;

                    return (
                      <Box
                        key={img.src}
                        onClick={() => setSelectedImage(img.src)}
                        sx={{
                          borderRadius: 3,
                          cursor: "pointer",
                          border: "2px solid",
                          borderColor: isSelected ? "black" : "transparent",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Image
                          src={img.src}
                          alt=""
                          width={200}
                          height={200}
                          style={{
                            borderRadius: 10,
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Stack>
          </form>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpen(false)} variant="text">
            Cancel
          </Button>
          <Button
            type="submit"
            form="club-form"
            variant="contained"
            disabled={isPending}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
