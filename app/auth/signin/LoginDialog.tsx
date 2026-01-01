"use client";

import { createClient } from "@/lib/supabase/client";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
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
      <Button
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </Button>

      <DialogContent sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          Sign In to BookHive
        </Typography>

        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <EmailLoginForm onSuccess={onClose} />

          <Divider sx={{ mt: 1 }} />

          <Typography variant="body1" textAlign="center">
            Or sign in with
          </Typography>

          <GithubButton onClick={handleGitHubSignIn} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
