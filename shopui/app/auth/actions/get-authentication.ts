"use server";

import { cookies } from "next/dist/server/request/cookies";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

export default async function getAuthentication() {
    return (await cookies()).get(AUTHENTICATION_COOKIE);
}   