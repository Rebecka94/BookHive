"use client";

import { createClient } from "@/lib/supabase/client";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function EmailLoginForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    onSuccess();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Email.."
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{
          "& .MuiInputLabel-root": {
            color: "rgba(64, 64, 64, 0.6)",
          },
        }}
      />
      <TextField
        label="Password.."
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{
          "& .MuiInputLabel-root": {
            color: "rgba(64, 64, 64, 0.6)",
          },
        }}
      />
      <Button
        sx={{ py: 1.5, fontSize: "1rem", mt: 1 }}
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
      >
        Sign in
      </Button>
    </Box>
  );
}
