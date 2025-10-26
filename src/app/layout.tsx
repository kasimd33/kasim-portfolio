import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

import siteData from "@/data/siteData.json";

export const metadata: Metadata = {
  title: siteData.site.title,
  description: siteData.site.description,
  keywords: ["portfolio", "web development", "React", "Next.js", "TypeScript", "full-stack"],
  authors: [{ name: siteData.site.author }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteData.site.title,
    description: siteData.site.description,
    url: siteData.site.url,
    siteName: siteData.site.author,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.site.title,
    description: siteData.site.description,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=BBH+Sans+Bartle&family=Lexend:wght@100..900&family=Michroma&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased bg-background text-foreground"
        style={{ fontFamily: 'Lexend, sans-serif' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
