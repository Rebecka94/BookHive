"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { createClient } from "@/lib/supabase/client";
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
      console.error("Login error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{ borderRadius: 2 }}
    >
      <Box sx={{ bgcolor: "background.paper" }}>
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          <Typography variant="body1" color="text.secondary">
            Welcome to BookHive
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <GithubButton onClick={handleGitHubSignIn} />
          </Box>

          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ display: "block", textAlign: "center", mt: 3 }}
          >
            By continuing, you agree to our terms of service and privacy policy.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}