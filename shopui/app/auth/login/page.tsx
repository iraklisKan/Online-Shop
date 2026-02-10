"use client";

import NextLink from "next/link";
import { Stack, TextField, Button, Link, Typography } from "@mui/material";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import login from "./login";



export default function Login() {
  const router = useRouter();
  const [state, formAction] = useActionState(login, { emailError: "", passwordError: "" });
  
  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <form action={formAction}>
      <Stack spacing={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: -1 }}>
          Sign in to your account
        </Typography>
        <TextField
          error={!!state.emailError}
          helperText={state.emailError}
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
        />
        <TextField
          error={!!state.passwordError}
          helperText={state.passwordError}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" fullWidth>
          Sign In
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link component={NextLink} href="/auth/signup" sx={{ fontWeight: 600 }}>
            Sign up
          </Link>
        </Typography>
      </Stack>
    </form>
  );
}
