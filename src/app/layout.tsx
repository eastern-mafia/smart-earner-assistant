import "@/styles/globals.css";
import type { Metadata } from "next";

import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend-deca",
});

const DEPLOY_URL = "https://smart-earner-assistant.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(DEPLOY_URL),
  title: "DriveNet",
  description: "AI-powered co-pilot for Uber drivers",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
