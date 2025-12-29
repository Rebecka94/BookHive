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
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    setLoading(true);

    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

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
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button variant="contained" onClick={handleAuth} disabled={loading}>
        {isSignup ? "Create account" : "Sign in"}
      </Button>

      <Button variant="text" onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Sign in here"
          : "Don't have an account? Create one here"}
      </Button>
    </Box>
  );
}
