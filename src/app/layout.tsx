"use client";

import Header from "@/components/Header";
import { env } from "@/env";
import "@/styles/globals.css";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "next-themes";

import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="h-screen overflow-hidden">
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
              <Header />
              <div className="h-full overflow-auto">{children}</div>
            </ConvexProviderWithClerk>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
