import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Log My Jump",
  description: "Site de log de saut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen overflow-hidden antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
