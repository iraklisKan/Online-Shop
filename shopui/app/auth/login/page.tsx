"use client";

import NextLink from "next/link";
import { Stack, TextField, Button, Link } from "@mui/material";
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
