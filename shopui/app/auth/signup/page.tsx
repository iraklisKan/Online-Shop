"use client";

import NextLink from "next/link";
import { Stack, TextField, Button, Link } from "@mui/material";
import { useActionState } from "react";
import createUser from "./create-user";

export default function Signup() {
  const [state, formAction] = useActionState(createUser, {
    emailError: "",
    passwordError: "",
  });

  return (
    <form action={formAction}>
      <Stack spacing={2} className="w-full max-w-xs">
        <TextField
          placeholder="Email"
          variant="outlined"
          type="email"
          name="email"
          helperText={state.emailError}
          error={!!state.emailError}
          required
        />
        <TextField
          placeholder="Password"
          variant="outlined"
          type="password"
          name="password"
          helperText={state.passwordError}
          error={!!state.passwordError}
          required
        />
        <Button type="submit" variant="contained">
          Signup
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center">
          Login
        </Link>
      </Stack>
    </form>
  );
}
