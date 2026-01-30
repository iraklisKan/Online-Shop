"use server";

import { API_URL } from "@/app/common/constants/api";
import { FormError } from "@/app/common/interfaces/form-error.interface";
import { getErrorMessage } from "@/app/common/util/errors";
import { redirect } from "next/navigation";
import { cookies } from "next/dist/server/request/cookies";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

export default async function login(_prevState: FormError, formData: FormData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const resData = await res.json();
  if (!res.ok) {
    const errorMessage = getErrorMessage(resData);
    const lowerMessage = errorMessage.toLowerCase();

    if (lowerMessage.includes("email")) {
      return { emailError: errorMessage, passwordError: "" };
    }
    if (lowerMessage.includes("password")) {
      return { emailError: "", passwordError: errorMessage };
    }
    return { emailError: errorMessage, passwordError: "" };
  }

  // Set auth cookie before redirect
  const setCookieHeader = res.headers.get("Set-Cookie");

  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    const decoded = jwtDecode<{ exp: number }>(token);
    const cookieStore = await cookies();
    cookieStore.set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      httpOnly: true,
      secure: false,
      path: "/",
      expires: new Date(decoded.exp * 1000),
    });
  }

  redirect("/");
}
