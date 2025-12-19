"use client";

import { createClient } from "@/lib/supabase/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import EmailLoginForm from "./EmailLogin";
import GithubButton from "./providers/GithubButton";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const supabase = createClient();

  const handleGitHubSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("GitHub login error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle textAlign="center">
        <Typography variant="h6">Welcome to BookHive</Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <EmailLoginForm onSuccess={onClose} />

          <Divider sx={{mt: 1}} />

          <Typography variant="body1" textAlign="center">
            Or sign in with
          </Typography>

          <GithubButton onClick={handleGitHubSignIn} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
