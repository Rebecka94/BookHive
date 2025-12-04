"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createBookClub } from "../actions";

export default function CreateBookClubForm({ user }: { user: User | null }) {
    const router = useRouter();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create a Book Club</DialogTitle>

        <DialogContent>
          {!user && (
            <DialogContentText color="error" sx={{ mb: 2 }}>
              You must be logged in to create a book club.
            </DialogContentText>
          )}

          {errorMessage && (
            <DialogContentText color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </DialogContentText>
          )}

          <form id="club-form" onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              required
              variant="standard"
              sx={{
                "& .MuiInputBase-input": { color: "text.primary" },
                "& .MuiInputLabel-root": { color: "text.primary" },
                "& .MuiInputLabel-root.Mui-focused": { color: "text.primary" },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "text.primary",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "text.primary",
                },
              }}
            />

            <TextField
              name="description"
              label="Description"
              fullWidth
              required
              variant="standard"
              sx={{
                "& .MuiInputBase-input": { color: "text.primary" },
                "& .MuiInputLabel-root": { color: "text.primary" },
                "& .MuiInputLabel-root.Mui-focused": { color: "text.primary" },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "text.primary",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "text.primary",
                },
              }}
            />
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
