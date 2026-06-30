export const papers = [
  {
    id: 1,
    title: "SuperInference: Supervised Inference for Partially Observable Environments",
    venue: "Software: Practice and Experience, 2026",
    doi: "https://doi.org/10.1002/spe.0000",
    summary:
      "An open-source software framework for iterative LLM reasoning with critic-gated memory and information-theoretic stopping criteria, available as a VS Code extension and CLI, with an OpenClaw plugin in development.",
    authors: "Carlos Camacho-González and Cristina Catalán-Torrecilla and Luis Llana and Alberto Núñez and Luis Tomás",
    year: "2026",
    eprint: "2506.XXXXX",
    archivePrefix: "arXiv",
    primaryClass: "cs.SE",
    get bibtexId() {
      const firstAuthor = this.authors.split(" and ")[0];
      const lastName = firstAuthor.split(" ").pop()?.toLowerCase().replace(/[^a-z]/g, "") || "superinference";
      return `superinference_${lastName}_${this.year}`;
    },
    get bibtex() {
      const doiNumber = this.doi.replace("https://doi.org/", "");
      return `@misc{${this.bibtexId},\n  title        = {${this.title}},\n  subtitle     = {${this.summary}},\n  author       = {${this.authors}},\n  year         = {${this.year}},\n  doi          = {${doiNumber}},\n  eprint       = {${this.eprint}},\n  archivePrefix= {${this.archivePrefix}},\n  primaryClass = {${this.primaryClass}}\n}`;
    },
  },
  {
    id: 2,
    title: "AMI: Agentic Multi-Step Inference for Autonomous Software Engineering",
    venue: "In preparation, 2026",
    doi: "https://doi.org/10.xxxx/ami.0000",
    summary:
      "An agentic coding system combining multi-step inference, tool-augmented reasoning, and iterative self-correction to autonomously resolve real-world software engineering tasks, achieving state-of-the-art results on SWE-bench-Live.",
    authors: "Carlos Camacho-González and Cristina Catalán-Torrecilla and Luis Llana and Alberto Núñez and Luis Tomás",
    year: "2026",
    eprint: "2507.XXXXX",
    archivePrefix: "arXiv",
    primaryClass: "cs.SE",
    get bibtexId() {
      const firstAuthor = this.authors.split(" and ")[0];
      const lastName = firstAuthor.split(" ").pop()?.toLowerCase().replace(/[^a-z]/g, "") || "ami";
      return `ami_${lastName}_${this.year}`;
    },
    get bibtex() {
      const doiNumber = this.doi.replace("https://doi.org/", "");
      return `@misc{${this.bibtexId},\n  title        = {${this.title}},\n  subtitle     = {${this.summary}},\n  author       = {${this.authors}},\n  year         = {${this.year}},\n  doi          = {${doiNumber}},\n  eprint       = {${this.eprint}},\n  archivePrefix= {${this.archivePrefix}},\n  primaryClass = {${this.primaryClass}}\n}`;
    },
  },
];
