"use client";

import { signIn } from "@/lib/auth-client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import GithubButton from "./providers/GithubButton";
import GoogleButton from "./providers/GoogleButton";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const handleGitHubSignIn = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        borderRadius: 2,
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        <Typography variant="body1" color="text.secondary">
          Welcome to BookHive
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <GithubButton onClick={handleGitHubSignIn} />
          <GoogleButton />
        </Box>

        <Typography
          variant="body2"
          sx={{ display: "block", textAlign: "center", mt: 3 }}
        >
          By continuing, you agree to our terms of service and privacy policy.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Avbryt
        </Button>
      </DialogActions>
    </Dialog>
  );
}
