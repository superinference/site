import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  description: "AMI — an open-source AI coding agent. Terminal and editor. Model-agnostic. Free.",
  metadataBase: new URL("https://www.superinference.org"),
  openGraph: {
    title: "SuperInference",
    description: "AMI — an open-source AI coding agent. Terminal and editor. Model-agnostic. Free.",
    url: "https://www.superinference.org",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperInference",
    description: "AMI — an open-source AI coding agent. Terminal and editor. Model-agnostic. Free.",
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
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-P6HFTRRZ5K" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-P6HFTRRZ5K');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white dark:bg-neutral-950 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(236,72,153,0.12),transparent),radial-gradient(1000px_500px_at_10%_10%,rgba(34,197,94,0.12),transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(236,72,153,0.12),transparent),radial-gradient(1000px_500px_at_10%_10%,rgba(34,197,94,0.12),transparent)]`}
      >
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
