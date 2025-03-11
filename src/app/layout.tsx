import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TC MotorFest",
  description: "Join us at MotorFest",
  keywords: [
    "cars",
    "automotive",
    "festival",
    "car show",
    "motor",
    "vehicles",
    "car enthusiasts",
  ],
  openGraph: {
    title: "TC MotorFest",
    description: "Join us at MotorFest",
    url: "https://motorfe.st",
    siteName: "MotorFest",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
            <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <section className="bg-white min-h-screen">
      <Header />
      {children}
    </section>
      </body>
    </html>
  );
}
