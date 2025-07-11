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
  title: "Nikesh Tamang | Full Stack Developer, AI Engineer, Python & Django Specialist",
  description: "Portfolio of Nikesh Tamang – Full Stack Developer, AI Engineer, and Python/Django Specialist. Explore projects, technical expertise, and testimonials.",
  openGraph: {
    title: "Nikesh Tamang | Full Stack Developer, AI Engineer, Python & Django Specialist",
    description: "Portfolio of Nikesh Tamang – Full Stack Developer, AI Engineer, and Python/Django Specialist. Explore projects, technical expertise, and testimonials.",
    url: "https://nikeshtamangghising.github.io/portfolio", // Update to your actual domain if different
    siteName: "Nikesh Tamang Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // Place a suitable image in public/images/
        width: 1200,
        height: 630,
        alt: "Nikesh Tamang Portfolio Screenshot"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikesh Tamang | Full Stack Developer, AI Engineer, Python & Django Specialist",
    description: "Portfolio of Nikesh Tamang – Full Stack Developer, AI Engineer, and Python/Django Specialist. Explore projects, technical expertise, and testimonials.",
    images: ["/images/og-image.jpg"]
  },
  metadataBase: new URL("https://nikeshtamangghising.github.io/portfolio") // Update to your actual domain if different
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
