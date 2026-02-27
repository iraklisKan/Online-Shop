import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Container, CssBaseline } from "@mui/material";
import Header from "./header/header";
import authenticated from "./auth/authenticated";
import logout from "./auth/logout";
import { cookies } from "next/headers";
import type { UserRole } from "./auth/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoppy — Modern Online Store",
  description: "Discover and shop the best products at Shoppy.",
};

function parseJwtRole(token?: string): UserRole {
  if (!token) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString(),
    );
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await authenticated();
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("Authentication");
  const role = parseJwtRole(authCookie?.value);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers authenticated={isAuthenticated} role={role}>
          <CssBaseline />
          <Header logout={logout} />
          <Container maxWidth="lg" className={isAuthenticated ? "pt-12 pb-16" : ""}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
