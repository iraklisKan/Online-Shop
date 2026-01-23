"use server";

import { API_URL } from "@/app/constants/api";
import { redirect } from "next/dist/client/components/navigation";
import { getErrorMessage } from "@/app/util/errors";

export default async function createUser(_prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);

  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
  redirect("/");
}
