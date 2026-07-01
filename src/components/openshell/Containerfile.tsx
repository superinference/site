import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

export default function Containerfile() {
  return (
      <Section id="os-containerfile" title="Containerfile" subtitle="AMI extends the OpenShell Community base with a single binary.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <CodeBlock lang="dockerfile" code={`# openshell-ami: SuperInference AMI agent on OpenShell Community base
# The base provides Node.js 26, Python 3.14 (uv), build-essential,
# git, gh, npm — everything a coding agent typically needs.
# Additional deps installed on demand into writable /sandbox.

ARG BASE_IMAGE=ghcr.io/nvidia/openshell-community/sandboxes/base:latest
FROM \${BASE_IMAGE}

# Passwordless sudo for system package management
USER root
RUN echo "ALL ALL=(root) NOPASSWD: /usr/bin/apt-get, \\
      /usr/bin/apt-get *, /usr/bin/dpkg, /usr/bin/dpkg *" \\
      > /etc/sudoers.d/sandbox-apt && \\
    chmod 0440 /etc/sudoers.d/sandbox-apt

# OpenShift: allow entrypoint to add passwd entry for arbitrary UIDs
RUN chmod g+w /etc/passwd

# sandbox-install: agents can install system packages without sudo
RUN printf '#!/bin/bash\\nset -euo pipefail\\n\\
    sudo apt-get update -qq 2>/dev/null\\n\\
    exec sudo apt-get install -y -qq "$@"\\n' \\
      > /usr/local/bin/sandbox-install && \\
    chmod +x /usr/local/bin/sandbox-install

# AMI-specific directories
USER sandbox
RUN mkdir -p /sandbox/.config/superinference \\
             /sandbox/.superinference

# Install AMI binary (Apache 2.0)
RUN curl -fsSL https://www.superinference.org/install.sh | bash

USER root
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
COPY policy.yaml /etc/openshell/policy.yaml

# OpenShift: writable /sandbox for arbitrary UIDs (GID 0)
RUN chgrp -R 0 /sandbox && chmod -R g=u /sandbox

LABEL io.openshell.sandbox.harness="ami" \\
      io.openshell.sandbox.license="Apache-2.0"

USER sandbox
WORKDIR /sandbox
ENV PATH="/sandbox/.local/bin:\${PATH}" HOME=/sandbox \\
    AGENT_NAME=ami UV_NO_SANDBOX=1 \\
    PIP_NO_BUILD_ISOLATION=1
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["ami"]`} />
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-base/7">
            <p>The Containerfile follows the <strong>Agent Runtime Contract (ARC)</strong> conventions and builds on the OpenShell Community base:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Community base</strong> provides <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sandbox</code> user, <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">supervisor</code> user, Node.js, Python, uv, npm, git, build-essential</li>
              <li>AMI adds the binary (~30 MB), config dirs, and <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sandbox-install</code> for system packages</li>
              <li><strong>OpenShift-ready</strong>: arbitrary UID support (GID 0 group-writable), passwd entry generation at startup</li>
              <li><code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">UV_NO_SANDBOX=1</code> and <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">PIP_NO_BUILD_ISOLATION=1</code> — package installs work without SYS_ADMIN</li>
              <li>Passwordless <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sudo</code> scoped to apt-get/dpkg only — agents install system packages via <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">sandbox-install</code></li>
              <li><code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/sandbox/.venv</code> pre-created by base, writable, in PATH — uv/pip install packages here</li>
              <li><code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/sandbox/.local/bin</code> in PATH — CLI tools and standalone binaries go here</li>
              <li>Policy at <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/etc/openshell/policy.yaml</code>, startup probe at <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">/tmp/agent-ready</code>, OCI labels for kagenti</li>
            </ul>
          </div>
        </div>
      </Section>
  );
}
