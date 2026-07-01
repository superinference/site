export type NavLink = {
  href: string;
  label: string;
};

export const mainNavItems: NavLink[] = [
  { href: "/", label: "Main" },
  { href: "/docs/", label: "Docs" },
  { href: "/leaderboards/", label: "Leaderboards" },
  { href: "/research/", label: "Research" },
];

export type TocItem = { href: string; label: string; children?: TocItem[] };

export const docsToc: TocItem[] = [
  {
    href: "#documentation", label: "Documentation", children: [
      { href: "#install", label: "Installation" },
      { href: "#quickstart", label: "Quick Start" },
      { href: "#cli", label: "CLI Reference" },
      { href: "#providers", label: "Providers" },
      { href: "#frito", label: "FRITO" },
      { href: "#frito-config", label: "frito.json" },
      { href: "#frito-commands", label: "Slash Commands" },
      { href: "#frito-providers", label: "Free Providers" },
      { href: "#env", label: "Environment" },
      { href: "#prompt-mode", label: "Non-Interactive" },
      { href: "#permissions", label: "Permissions" },
      { href: "#sessions", label: "Sessions" },
      { href: "#security", label: "Security" },
      { href: "#vscode", label: "VS Code" },
      { href: "#troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    href: "#openshell", label: "OpenShell", children: [
      { href: "#os-quickstart", label: "Quick Start" },
      { href: "#os-architecture", label: "Architecture" },
      { href: "#os-on-demand-deps", label: "On-Demand Deps" },
      { href: "#os-detached", label: "Detached Execution" },
      { href: "#os-multi-provider", label: "Multi-Provider" },
      { href: "#os-enterprise", label: "Air-Gapped" },
      { href: "#os-containerfile", label: "Containerfile" },
      { href: "#os-security", label: "Security Model" },
      { href: "#os-advantages", label: "Why AMI" },
      { href: "#os-use-cases", label: "Use Cases" },
    ],
  },
  {
    href: "#asdlc", label: "ASDLC", children: [
      { href: "#asdlc-overview", label: "Overview" },
      { href: "#asdlc-phases", label: "SDLC Phases" },
      { href: "#asdlc-engine", label: "Decision Engine" },
      { href: "#asdlc-integration", label: "Integration" },
    ],
  },
  {
    href: "#challenges", label: "Challenges", children: [
      { href: "#ch-overview", label: "Overview" },
      { href: "#ch-models", label: "Model Summary" },
      { href: "#ch-results", label: "Results" },
      { href: "#ch-container-evaluation", label: "Container Eval" },
    ],
  },
];

export const researchToc: TocItem[] = [
  {
    href: "#superinference", label: "SuperInference", children: [
      { href: "#abstract", label: "Abstract" },
      { href: "#background", label: "Background" },
      { href: "#pre-loop", label: "PRE Loop" },
      { href: "#architecture", label: "Architecture" },
      { href: "#retrieval", label: "Retrieval" },
      { href: "#results", label: "Formal Results" },
      { href: "#benchmarks", label: "Benchmarks" },
      { href: "#worked-example", label: "Worked Example" },
      { href: "#cite", label: "Cite" },
      { href: "#funding", label: "Acknowledgements" },
    ],
  },
  {
    href: "#ami", label: "AMI", children: [
      { href: "#ami-abstract", label: "Abstract" },
      { href: "#ami-approach", label: "Approach" },
      { href: "#ami-results", label: "Results" },
      { href: "#ami-cite", label: "Cite" },
      { href: "#ami-funding", label: "Acknowledgements" },
    ],
  },
];


export const leaderboardsToc: TocItem[] = [
  { href: "#overview", label: "Overview" },
  { href: "#swebench-live-lite", label: "SWE Bench Live Lite" },
  { href: "#dabstep", label: "DABStep" },
];

export const homeToc: TocItem[] = [
  { href: "#install", label: "Install" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#architecture", label: "Architecture" },
  { href: "#demo", label: "Demo" },
];
