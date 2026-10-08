import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import CommandPalette from "@/components/CommandPalette";
import AssistantSidebar from "@/components/AssistantSidebar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Janus",
  description: "Self-service developer platform: service catalog, environment provisioning, pipeline status, and a RAG assistant over internal docs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={<div className="h-14 border-b" />}>
            <Header />
          </Suspense>
          <div className="flex flex-1">
            <Suspense fallback={<div className="w-12 shrink-0 border-r" />}>
              <AssistantSidebar />
            </Suspense>
            <div className="min-w-0 flex-1">{children}</div>
          </div>
          <CommandPalette />
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
