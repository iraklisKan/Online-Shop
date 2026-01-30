import { cookies } from "next/dist/server/request/cookies";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

const getHeaders = async () => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("Authentication");
  return {
    Cookie: authCookie ? `Authentication=${authCookie.value}` : "",
  };
};

export const post = async (path: string, formData: FormData) => {
  const headers = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
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
};

export const get = async (path: string) => {
  const headers = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...headers },
  });
  return res.json();
};
