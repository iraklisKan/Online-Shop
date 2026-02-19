"use client";

import NextLink from "next/link";
import { Stack, TextField, Button, Link, Typography } from "@mui/material";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import createUser from "./create-user";
import type { FormResponse } from "../../common/interfaces/form-response.interface";

export default function Signup() {
  const router = useRouter();
  const [state, formAction] = useActionState<FormResponse, FormData>(createUser, {});

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <form action={formAction}>
      <Stack spacing={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
          Create account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: -1 }}>
          Get started with Shoppy
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          helperText={state.emailError}
          error={!!state.emailError}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          helperText={state.passwordError}
          error={!!state.passwordError}
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" fullWidth>
          Create Account
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link component={NextLink} href="/auth/login" sx={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </Typography>
      </Stack>
    </form>
  );
}
