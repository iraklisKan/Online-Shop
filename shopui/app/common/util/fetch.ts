import { cookies } from "next/dist/server/request/cookies";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { parseFieldError } from "./parse-error";

export const getHeaders = async () => {
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
      ...headers,
      // Don't set Content-Type - browser will set it automatically with boundary for multipart/form-data
    },
    body: formData, // Send FormData directly to preserve files
  });
  const resData = await res.json();
  if (!res.ok) {
    const errorMessage = getErrorMessage(resData);
    return parseFieldError(errorMessage);
  }
  return {error:"",data: resData};
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
  return { data: resData, error: undefined };
};

export const get = async <T>(path: string, tags?: string[]) => {
  const headers = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...headers },
    next: { tags: tags },
  });
  return res.json() as T;
};
