import CodeBlock from "@/components/CodeBlock";
import DocSection from "@/components/DocSection";

export default function Sessions() {
  return (
    <DocSection id="sessions" title="Sessions">
      <p>AMI automatically saves conversation sessions. Resume a previous session with:</p>
      <CodeBlock lang="bash" code={`# Resume the most recent session
ami --resume

# Resume a specific session by ID
ami --resume abc123`} />
      <p>Sessions store the full conversation history including tool invocations and their results, allowing you to continue exactly where you left off.</p>
    </DocSection>
  );
}
