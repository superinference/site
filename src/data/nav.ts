export type NavLink = {
  href: string;
  label: string;
};

export const mainNavLinks: NavLink[] = [
  { href: "/abstract/", label: "Abstract" },
  { href: "/background/", label: "Background" },
  { href: "/pre-loop/", label: "PRE Loop" },
  { href: "/architecture/", label: "Architecture" },
  { href: "/retrieval/", label: "Retrieval" },
  { href: "/results/", label: "Results" },
  { href: "/challenges/", label: "Challenges" },
  { href: "/ami/", label: "AMI" },
  { href: "/cite/", label: "Cite" },
  { href: "/acknowledgements/", label: "Funding" },
  { href: "/docs/", label: "Docs" },
];

export const docsTocSections = [
  { href: "#install", label: "Installation" },
  { href: "#quickstart", label: "Quick Start" },
  { href: "#cli", label: "CLI Reference" },
  { href: "#providers", label: "Providers" },
  { href: "#frito", label: "FRITO" },
  { href: "#frito-config", label: "frito.json" },
  { href: "#frito-commands", label: "Slash Commands" },
  { href: "#frito-providers", label: "Free Providers" },
  { href: "#env", label: "Environment Variables" },
  { href: "#prompt-mode", label: "Non-Interactive Mode" },
  { href: "#permissions", label: "Permissions" },
  { href: "#sessions", label: "Sessions" },
  { href: "#security", label: "Security" },
  { href: "#vscode", label: "VS Code Extension" },
  { href: "#troubleshooting", label: "Troubleshooting" },
];
