"use client";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { joinClub } from "../actions/joinClub";

export default function ActionButton({
  clubId,
  alreadyMember,
}: {
  clubId: string;
  alreadyMember: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [openDialog, setOpenDialog] = useState(false);
  const [clubUsername, setClubUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (alreadyMember) {
    return (
      <>
        <Typography color="#992B15">You&apos;re already a member</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
          onClick={() => router.push(`/bookclub/${clubId}`)}
        >
          Enter Club
        </Button>
      </>
    );
  }

  const handleOpen = () => {
    setError(null);
    setClubUsername("");
    setOpenDialog(true);
  };

  const handleClose = () => {
    if (isPending) return;
    setOpenDialog(false);
  };

  const handleJoin = () => {
    setError(null);

    startTransition(async () => {
      const res = await joinClub(clubId, clubUsername);

      if (res?.error) {
        setError(res.error);
        return;
      }

      setOpenDialog(false);
      setOpenSnackbar(true);

      setTimeout(() => {
        router.refresh();
      }, 500);
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={isPending}
        sx={{ borderRadius: 2 }}
        onClick={handleOpen}
      >
        Join Club
      </Button>

      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Welcome to the club 👋</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Enter a username for this book club
          </Typography>

          <TextField
            fullWidth
            label="Club username"
            value={clubUsername}
            onChange={(e) => setClubUsername(e.target.value)}
            autoFocus
            disabled={isPending}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleJoin}
            disabled={isPending || clubUsername.trim().length < 2}
          >
            {isPending ? "Joining..." : "Join"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Welcome to the club!
        </Alert>
      </Snackbar>
    </>
  );
}
