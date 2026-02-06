"use client";

import NextLink from "next/link";
import { Stack, TextField, Button, Link } from "@mui/material";
import { useActionState } from "react";
import createUser from "./create-user";

export default function Signup() {
  const [state, formAction] = useActionState(createUser, {});

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          helperText={state.emailError}
          error={!!state.emailError}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          helperText={state.passwordError}
          error={!!state.passwordError}
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
