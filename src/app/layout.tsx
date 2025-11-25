import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Helper to add basePath to static asset paths
// For GitHub Pages: uses basePath prefix (/site/logo.svg)
// For main domain: uses absolute path from root (/logo.svg)
const assetPath = (path: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // If basePath is set, use it (GitHub Pages)
  // If basePath is empty, use absolute path from root (main domain)
  return basePath ? `${basePath}${path}` : path;
};

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
    icon: assetPath("/logo.svg"),
    shortcut: assetPath("/logo.svg"),
    apple: assetPath("/logo.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-neutral-950 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(236,72,153,0.12),transparent),radial-gradient(1000px_500px_at_10%_10%,rgba(34,197,94,0.12),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(236,72,153,0.12),transparent),radial-gradient(1000px_500px_at_10%_10%,rgba(34,197,94,0.12),transparent)]`}
      >
        {children}
      </body>
    </html>
  );
}
