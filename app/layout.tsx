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
  title: "LogMyJump — Flight Journal",
  description: "Carnet de sauts en parachute — cockpit nocturne",
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
