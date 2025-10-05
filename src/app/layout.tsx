"use client";

import "@/styles/globals.css";

import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend-deca",
});

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
        <div className="h-full overflow-auto">{children}</div>
      </body>
    </html>
  );
}
