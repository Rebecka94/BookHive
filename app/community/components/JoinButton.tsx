"use client";

import { Alert, Button, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { joinClub } from "../actions/joinClub";

export default function JoinButton({
  clubId,
  alreadyMember,
}: {
  clubId: string;
  alreadyMember: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  if (alreadyMember) {
    return (
      <Button variant="contained" disabled sx={{ borderRadius: 2 }}>
        You are a member
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={isPending}
        sx={{ borderRadius: 2 }}
        onClick={() =>
          startTransition(async () => {
            const res = await joinClub(clubId);

            if (res.error) {
              setError(res.error);
            } else {
              setOpenSnackbar(true);

              setTimeout(() => {
                router.refresh();
              }, 500);
            }
          })
        }
      >
        Join Club
      </Button>

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Welcome to the club!
        </Alert>
      </Snackbar>
    </>
  );
}
