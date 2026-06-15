"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import GitHubIcon from "./GitHubIcon";
import ThemeToggle from "./ThemeToggle";
import { mainNavItems } from "@/data/nav";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-neutral-950/50 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/logo.svg" alt="SuperInference" width={28} height={28} />
            <span className="font-semibold tracking-tight text-neutral-900 dark:text-white">SuperInference</span>
          </Link>
        </div>
        <nav className="hidden lg:flex gap-3 text-sm text-neutral-700 dark:text-neutral-300 items-center">
          {mainNavItems.map((link) => {
            const norm = pathname.replace(/\/$/, "");
            const linkNorm = link.href.replace(/\/$/, "");
            const active = norm === linkNorm;
            return (
              <Link key={link.href} href={link.href} className={`hover:text-neutral-900 dark:hover:text-white transition-colors ${active ? "text-neutral-900 dark:text-white underline underline-offset-4" : ""}`}>
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
            <GitHubIcon />
          </a>
        </nav>
        <button
          className="lg:hidden text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white focus:outline-none transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-neutral-200 dark:border-white/10 bg-white/95 dark:bg-neutral-950/95 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            {mainNavItems.map((link) => {
              const norm = pathname.replace(/\/$/, "");
              const linkNorm = link.href.replace(/\/$/, "");
              const active = norm === linkNorm;
              return (
                <Link key={link.href} href={link.href} className={`block text-sm hover:text-neutral-900 dark:hover:text-white py-2 transition-colors ${active ? "text-neutral-900 dark:text-white font-medium underline underline-offset-4" : "text-neutral-600 dark:text-neutral-400"}`} onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              );
            })}
            <a href="https://github.com/superinference" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
