import type { Metadata } from "next";
import { agent } from "@/config/agent";
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
    title: `${agent.company} | Application Payment`,
  description: `Secure rental application fee payment for ${agent.company}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <head>

        {/* GOOGLE ADSENSE */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8256382899629440"
          crossOrigin="anonymous"
        ></script>

      </head>

      <body className="min-h-full flex flex-col">

        {children}

      </body>

    </html>
  );
}