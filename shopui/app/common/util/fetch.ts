import { cookies } from "next/dist/server/request/cookies";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { parseFieldError } from "./parse-error";

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
    return parseFieldError(errorMessage);
  }
  return {};
};

export const postJson = async (path: string, data: object) => {
  const headers = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  if (!res.ok) {
    const errorMessage = getErrorMessage(resData);
    return parseFieldError(errorMessage);
  }
  return {};
};

export const get = async <T>(path: string) => {
  const headers = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...headers },
  });
  return res.json() as T;
};
