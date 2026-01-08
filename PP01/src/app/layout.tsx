import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { AuthProvider } from "@/hooks/use-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt Pro - AI Prompt Management & Collaboration",
  description: "Central hub for managing and collaborating on AI prompts. Refine, organize, and share prompts with your team.",
  keywords: ["AI prompts", "prompt management", "collaboration", "AI tools", "Gemini", "prompt engineering"],
  authors: [{ name: "Prompt Pro Team" }],
  openGraph: {
    title: "Prompt Pro - AI Prompt Management",
    description: "Central hub for managing and collaborating on AI prompts",
    url: "https://promptpro.ai",
    siteName: "Prompt Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Pro - AI Prompt Management",
    description: "Central hub for managing and collaborating on AI prompts",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}