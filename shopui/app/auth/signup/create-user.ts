"use server";

import { API_URL } from "@/app/common/constants/api";
import { redirect } from "next/dist/client/components/navigation";
import { getErrorMessage } from "@/app/common/util/errors";
import { post } from "@/app/common/util/fetch";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";

export default async function createUser(_prevState: FormResponse, formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = await post("users", formData);
  if (result) {
    return result;
  }
  redirect("/");
}
