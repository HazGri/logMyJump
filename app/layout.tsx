import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Syncopate } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const display = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://log-my-jump.vercel.app"),
  title: "LogMyJump · Carnet de sauts pour parachutistes",
  description:
    "Carnet de sauts numérique pour parachutistes : enregistre tes sauts, cumule ton altitude, suis ton escadrille et ta progression, de la PAC au wingsuit.",
  openGraph: {
    type: "website",
    siteName: "LogMyJump",
    locale: "fr_FR",
    url: "https://log-my-jump.vercel.app",
    title: "LogMyJump · Carnet de sauts pour parachutistes",
    description:
      "Enregistre tes sauts, cumule ton altitude et suis ta progression. De la PAC au wingsuit.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LogMyJump" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LogMyJump · Carnet de sauts pour parachutistes",
    description: "Enregistre tes sauts, cumule ton altitude et suis ta progression.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body className="antialiased">
        <div className="app-atmosphere" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
