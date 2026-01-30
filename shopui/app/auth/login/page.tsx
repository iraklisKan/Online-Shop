"use client";

import NextLink from "next/link";
import { Stack, TextField, Button, Link } from "@mui/material";
import { useActionState } from "react";
import login from "./login";



export default function Login() {
  const [state, formAction] = useActionState(login, { emailError: "", passwordError: "" });
  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          error={!!state.emailError}
          helperText={state.emailError}
          name="email"
          label="Email"
          variant="outlined"
          type="email"
        />
        <TextField
          error={!!state.passwordError}
          helperText={state.passwordError}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  );
}
