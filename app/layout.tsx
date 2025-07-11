import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import { ChatButton } from "@/components/chat/chat-button";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikesh Tamang | Portfolio",
  description: "Portfolio of Nikesh Tamang - Web Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add environment variable check for OpenRouter API key
  if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
    console.warn('Warning: NEXT_PUBLIC_OPENROUTER_API_KEY is not set. Chat functionality will be disabled.');
  }
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} font-sans`}>
        {children}
        <ChatButton />
      </body>
    </html>
  );
}
