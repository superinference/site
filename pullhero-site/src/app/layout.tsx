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
  title: "SuperInference",
  description: "SuperInference — a stylized single-page showcasing architecture and animated diagrams.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "SuperInference",
    description: "Architecture, embeddings, and feedback loops visualized.",
    url: "https://example.com",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperInference",
    description: "Architecture, embeddings, and feedback loops visualized.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(236,72,153,0.12),transparent),radial-gradient(1000px_500px_at_10%_10%,rgba(34,197,94,0.12),transparent)]`}
      >
        {children}
      </body>
    </html>
  );
}
