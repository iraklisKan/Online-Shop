import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Container, CssBaseline } from "@mui/material";
import Header from "./header/header";
import authenticated from "./auth/authenticated";
import logout from "./auth/logout";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await authenticated();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers authenticated={isAuthenticated}>
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
