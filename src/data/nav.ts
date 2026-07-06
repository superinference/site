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
      { href: "#background", label: "The Challenge" },
      { href: "#pre-loop", label: "How It Works" },
      { href: "#results", label: "Results" },
      { href: "#cite", label: "Cite" },
      { href: "#funding", label: "Acknowledgements" },
    ],
  },
  {
    href: "#ami", label: "AMI", children: [
      { href: "#ami-abstract", label: "Abstract" },
      { href: "#ami-challenge", label: "The Challenge" },
      { href: "#ami-approach", label: "How It Works" },
      { href: "#ami-results", label: "Results", children: [
        { href: "#ami-results-lite", label: "SWE-bench Live Lite" },
        { href: "#ami-results-rust", label: "SWE-bench Live Rust" },
      ] },
      { href: "#ami-cite", label: "Cite" },
      { href: "#ami-funding", label: "Acknowledgements" },
    ],
  },
];


export const leaderboardsToc: TocItem[] = [
  {
    href: "#superinference", label: "SuperInference", children: [
      { href: "#dabstep", label: "DABStep" },
    ],
  },
  {
    href: "#ami", label: "AMI", children: [
      { href: "#swebench-live-lite", label: "SWE Bench Live Lite" },
      { href: "#swebench-live-rust", label: "SWE Bench Live Rust" },
    ],
  },
];

export const homeToc: TocItem[] = [
  {
    href: "#getting-started", label: "Getting Started", children: [
      { href: "#install", label: "Install" },
      { href: "#features", label: "Features" },
    ],
  },
  {
    href: "#sovereignty", label: "Sovereign AI", children: [
      { href: "#sovereign-cloud", label: "Sovereign Cloud" },
      { href: "#sovereign-agents", label: "Sovereign Agents" },
    ],
  },
  {
    href: "#how-it-works", label: "How It Works", children: [
      { href: "#architecture", label: "Architecture" },
      { href: "#demo", label: "Demo" },
    ],
  },
];
