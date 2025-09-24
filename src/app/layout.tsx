import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VITJOY - Качественные витамины и добавки",
  description:
    "Магазин качественных витаминов и пищевых добавок VITJOY. Лучшие цены в Казахстане.",
  keywords: "витамины, добавки, здоровье, Kaspi, VITJOY",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 mx-auto">
            <Header />
            <main className="container py-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
