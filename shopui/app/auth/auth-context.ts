import { createContext } from "react";

export type UserRole = "ADMIN" | "BUYER" | null;

export interface AuthState {
  authenticated: boolean;
  role: UserRole;
}

export const AuthContext = createContext<AuthState>({
  authenticated: false,
  role: null,
});
