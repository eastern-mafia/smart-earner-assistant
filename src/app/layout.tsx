"use client";

import { env } from "@/env";
import "@/styles/globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";

import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend-deca",
});

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lexendDeca.variable}`}
      suppressHydrationWarning
    >
      <body className="h-screen overflow-hidden">
        <ConvexProvider client={convex}>
          <div className="h-full overflow-auto">{children}</div>
        </ConvexProvider>
      </body>
    </html>
  );
}
