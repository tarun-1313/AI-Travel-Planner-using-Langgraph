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
  title: "Wander - Your Perfect Trip Awaits",
  description: "Plan your dream vacation with AI-powered recommendations. Discover destinations, book flights & hotels, and create unforgettable travel memories.",
  keywords: "travel, vacation, planning, flights, hotels, destinations, trip planner",
  openGraph: {
    title: "Wander - Your Perfect Trip Awaits",
    description: "Plan your dream vacation with AI-powered recommendations",
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
        <meta name="theme-color" content="#0066ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-foreground">{children}</body>
    </html>
  );
}
