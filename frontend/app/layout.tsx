import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Travel OS - AI-Powered Journey Planning",
  description: "A futuristic AI travel planning operating system that orchestrates your perfect journey with intelligent itinerary generation, real-time flight tracking, and comprehensive destination insights.",
  keywords: "travel, AI, planning, itinerary, flights, destinations",
  openGraph: {
    title: "Nexus Travel OS",
    description: "AI-Powered Journey Planning",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <head>
        <meta name="theme-color" content="#00d9ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
