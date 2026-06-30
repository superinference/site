export type NavLink = {
  href: string;
  label: string;
};

export const mainNavItems: NavLink[] = [
  { href: "/", label: "Main" },
  { href: "/docs/", label: "Docs" },
  { href: "/openshell/", label: "OpenShell" },
  { href: "/asdlc/", label: "ASDLC" },
  { href: "/challenges/", label: "Challenges" },
  { href: "/leaderboards/", label: "Leaderboards" },
  { href: "/abstract/", label: "Research" },
];

export type TocItem = { href: string; label: string };

export const docsToc: TocItem[] = [
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

export const openshellToc: TocItem[] = [
  { href: "#openshell", label: "Overview" },
  { href: "#quickstart", label: "Quick Start" },
  { href: "#architecture", label: "Image Architecture" },
  { href: "#on-demand-deps", label: "On-Demand Deps" },
  { href: "#detached", label: "Detached Execution" },
  { href: "#multi-provider", label: "Multi-Provider" },
  { href: "#enterprise", label: "Air-Gapped" },
  { href: "#containerfile", label: "Containerfile" },
  { href: "#security", label: "Security Model" },
  { href: "#advantages", label: "Why AMI" },
  { href: "#use-cases", label: "Use Cases" },
];

export const researchToc: TocItem[] = [
  { href: "#abstract", label: "Abstract" },
  { href: "#background", label: "Background" },
  { href: "#pre-loop", label: "PRE Loop" },
  { href: "#architecture", label: "Architecture" },
  { href: "#retrieval", label: "Retrieval" },
  { href: "#results", label: "Formal Results" },
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#worked-example", label: "Worked Example" },
  { href: "#cite", label: "Cite" },
  { href: "#funding", label: "Funding" },
];

export const asdlcToc: TocItem[] = [
  { href: "#overview", label: "Overview" },
  { href: "#phases", label: "SDLC Phases" },
  { href: "#engine", label: "Decision Engine" },
  { href: "#integration", label: "Integration" },
];

export const challengesToc: TocItem[] = [
  { href: "#overview", label: "Overview" },
  { href: "#models", label: "Model Summary" },
  { href: "#results", label: "Challenge Results" },
  { href: "#container-evaluation", label: "Container Evaluation" },
];

export const leaderboardsToc: TocItem[] = [
  { href: "#overview", label: "Overview" },
  { href: "#swebench-live-lite", label: "SWE Bench Live Lite" },
];

export const homeToc: TocItem[] = [
  { href: "#install", label: "Install" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#architecture", label: "Architecture" },
  { href: "#demo", label: "Demo" },
];
