Mermaid charts:

Create a set of mermaid charts and graphs to explain 


# 🧠🤖Deep Agents

Using an LLM to call tools in a loop is the simplest form of an agent. 
This architecture, however, can yield agents that are “shallow” and fail to plan and act over longer, more complex tasks. 
Applications like “Deep Research”, "Manus", and “Claude Code” have gotten around this limitation by implementing a combination of four things:
a **planning tool**, **sub agents**, access to a **file system**, and a **detailed prompt**.

<img src="deep_agents.png" alt="deep agent" width="600"/>

deepagents is a Python package that implements these in a general purpose way so that you can easily create a Deep Agent for your application.

**Acknowledgements: This project was primarily inspired by Claude Code, and initially was largely an attempt to see what made Claude Code general purpose, and make it even more so.**

## Installation


bash
pip install deepagents


## Usage

(To run the example below, will need to pip install tavily-python)


python
import os
from typing import Literal

from tavily import TavilyClient
from deepagents import create_deep_agent

tavily_client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])

# Search tool to use to do research
def internet_search(
    query: str,
    max_results: int = 5,
    topic: Literal["general", "news", "finance"] = "general",
    include_raw_content: bool = False,
):
    """Run a web search"""
    return tavily_client.search(
        query,
        max_results=max_results,
        include_raw_content=include_raw_content,
        topic=topic,
    )


# Prompt prefix to steer the agent to be an expert researcher
research_instructions = """You are an expert researcher. Your job is to conduct thorough research, and then write a polished report.

You have access to a few tools.

## `internet_search`

Use this to run an internet search for a given query. You can specify the number of results, the topic, and whether raw content should be included.
"""

# Create the agent
agent = create_deep_agent(
    [internet_search],
    research_instructions,
)

# Invoke the agent
result = agent.invoke({"messages": [{"role": "user", "content": "what is langgraph?"}]})


See [examples/research/research_agent.py](examples/research/research_agent.py) for a more complex example.

The agent created with create_deep_agent is just a LangGraph graph - so you can interact with it (streaming, human-in-the-loop, memory, studio)
in the same way you would any LangGraph agent.

## Creating a custom deep agent

There are three parameters you can pass to create_deep_agent to create your own custom deep agent.

### tools (Required)

The first argument to create_deep_agent is tools.
This should be a list of functions or LangChain @tool objects.
The agent (and any subagents) will have access to these tools.

### instructions (Required)

The second argument to create_deep_agent is instructions.
This will serve as part of the prompt of the deep agent.
Note that there is a [built in system prompt](src/deepagents/prompts.py) as well, so this is not the *entire* prompt the agent will see.

### subagents (Optional)

A keyword-only argument to create_deep_agent is subagents.
This can be used to specify any custom subagents this deep agent will have access to.
You can read more about why you would want to use subagents [here](#sub-agents)

subagents should be a list of dictionaries, where each dictionary follow this schema:


python
class SubAgent(TypedDict):
    name: str
    description: str
    prompt: str
    tools: NotRequired[list[str]]
    model_settings: NotRequired[dict[str, Any]]


- **name**: This is the name of the subagent, and how the main agent will call the subagent
- **description**: This is the description of the subagent that is shown to the main agent
- **prompt**: This is the prompt used for the subagent
- **tools**: This is the list of tools that the subagent has access to. By default will have access to all tools passed in, as well as all built-in tools.
- **model_settings**: Optional dictionary for per-subagent model configuration (inherits the main model when omitted).

To use it looks like:


python
research_sub_agent = {
    "name": "research-agent",
    "description": "Used to research more in depth questions",
    "prompt": sub_research_prompt,
}
subagents = [research_subagent]
agent = create_deep_agent(
    tools,
    prompt,
    subagents=subagents
)


### model (Optional)

By default, deepagents uses "claude-sonnet-4-20250514". You can customize this by passing any [LangChain model object](https://python.langchain.com/docs/integrations/chat/).

#### Example: Using a Custom Model

Here's how to use a custom model (like OpenAI's gpt-oss model via Ollama):

(Requires pip install langchain and then pip install langchain-ollama for Ollama models)


python
from deepagents import create_deep_agent

# ... existing agent definitions ...

model = init_chat_model(
    model="ollama:gpt-oss:20b",  
)
agent = create_deep_agent(
    tools=tools,
    instructions=instructions,
    model=model,
    ...
)


#### Example: Per-subagent model override (optional)

Use a fast, deterministic model for a critique sub-agent, while keeping a different default model for the main agent and others:


python
from deepagents import create_deep_agent

critique_sub_agent = {
    "name": "critique-agent",
    "description": "Critique the final report",
    "prompt": "You are a tough editor.",
    "model_settings": {
        "model": "anthropic:claude-3-5-haiku-20241022",
        "temperature": 0,
        "max_tokens": 8192
    }
}

agent = create_deep_agent(
    tools=[internet_search],
    instructions="You are an expert researcher...",
    model="claude-sonnet-4-20250514",  # default for main agent and other sub-agents
    subagents=[critique_sub_agent],
)


## Deep Agent Details

The below components are built into deepagents and helps make it work for deep tasks off-the-shelf.

### System Prompt

deepagents comes with a [built-in system prompt](src/deepagents/prompts.py). This is relatively detailed prompt that is heavily based on and inspired by [attempts](https://github.com/kn1026/cc/blob/main/claudecode.md) to [replicate](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-code.md)
Claude Code's system prompt. It was made more general purpose than Claude Code's system prompt.
This contains detailed instructions for how to use the built-in planning tool, file system tools, and sub agents.
Note that part of this system prompt [can be customized](#instructions-required)

Without this default system prompt - the agent would not be nearly as successful at going as it is.
The importance of prompting for creating a "deep" agent cannot be understated.

### Planning Tool

deepagents comes with a built-in planning tool. This planning tool is very simple and is based on ClaudeCode's TodoWrite tool.
This tool doesn't actually do anything - it is just a way for the agent to come up with a plan, and then have that in the context to help keep it on track.

### File System Tools

deepagents comes with four built-in file system tools: ls, edit_file, read_file, write_file.
These do not actually use a file system - rather, they mock out a file system using LangGraph's State object.
This means you can easily run many of these agents on the same machine without worrying that they will edit the same underlying files.

Right now the "file system" will only be one level deep (no sub directories).

These files can be passed in (and also retrieved) by using the files key in the LangGraph State object.


python
agent = create_deep_agent(...)

result = agent.invoke({
    "messages": ...,
    # Pass in files to the agent using this key
    # "files": {"foo.txt": "foo", ...}
})

# Access any files afterwards like this
result["files"]


### Sub Agents

deepagents comes with the built-in ability to call sub agents (based on Claude Code).
It has access to a general-purpose subagent at all times - this is a subagent with the same instructions as the main agent and all the tools that is has access to.
You can also specify [custom sub agents](#subagents-optional) with their own instructions and tools.

Sub agents are useful for ["context quarantine"](https://www.dbreunig.com/2025/06/26/how-to-fix-your-context.html#context-quarantine) (to help not pollute the overall context of the main agent)
as well as custom instructions.

## MCP

The deepagents library can be ran with MCP tools. This can be achieved by using the [Langchain MCP Adapter library](https://github.com/langchain-ai/langchain-mcp-adapters).

(To run the example below, will need to pip install langchain-mcp-adapters)


python
import asyncio
from langchain_mcp_adapters.client import MultiServerMCPClient
from deepagents import create_deep_agent

async def main():
    # Collect MCP tools
    mcp_client = MultiServerMCPClient(...)
    mcp_tools = await mcp_client.get_tools()

    # Create agent
    agent = create_deep_agent(tools=mcp_tools, ....)

    # Stream the agent
    async for chunk in agent.astream(
        {"messages": [{"role": "user", "content": "what is langgraph?"}]},
        stream_mode="values"
    ):
        if "messages" in chunk:
            chunk["messages"][-1].pretty_print()

asyncio.run(main())


## Roadmap
- [ ] Allow users to customize full system prompt
- [ ] Code cleanliness (type hinting, docstrings, formating)
- [ ] Allow for more of a robust virtual filesystem
- [ ] Create an example of a deep coding agent built on top of this
- [ ] Benchmark the example of [deep research agent](examples/research/research_agent.py)
- [ ] Add human-in-the-loop support for tools
ChatGPT Plus

Here’s a set of Mermaid charts that illustrate the concepts in your writeup about 🧠🤖 Deep Agents.
I’ll break them down into different diagrams: basic agent flow, deep agent enhancements, subagent usage, and file system abstraction.

1. Basic Agent Loop (Shallow Agent)
flowchart LR
    User["🧑 User Query"] --> LLM["🤖 LLM"]
    LLM --> Tool["🔧 Tool Call"]
    Tool --> LLM
    LLM --> UserOut["📤 Response"]


This shows the simple "LLM → Tool → LLM" loop, which works for short tasks but lacks depth.

2. Deep Agent Core Architecture
flowchart TD
    User["🧑 User Request"] --> MainAgent["🧠 Deep Agent"]
    
    subgraph DeepAgent["Deep Agent Internals"]
        Planning["📝 Planning Tool"]
        SubAgents["🤖 Sub Agents"]
        FS["📂 File System (virtual)"]
        Prompt["📜 Detailed System Prompt"]
    end
    
    MainAgent --> Planning
    MainAgent --> SubAgents
    MainAgent --> FS
    MainAgent --> Prompt
    
    Planning --> MainAgent
    SubAgents --> MainAgent
    FS --> MainAgent
    Prompt --> MainAgent
    
    MainAgent --> Tools["🔧 External Tools (Search, APIs, etc.)"]
    Tools --> MainAgent
    
    MainAgent --> Response["📤 Final Answer"]
    Response --> User


This illustrates how planning, subagents, a virtual filesystem, and strong prompting combine to create a deep agent.

3. Subagents & Context Quarantine
flowchart TB
    MainAgent["🧠 Main Deep Agent"]
    Sub1["🔍 Research Subagent"]
    Sub2["✍️ Critique Subagent"]
    Sub3["💡 General-purpose Subagent"]

    MainAgent -->|delegates| Sub1
    MainAgent -->|delegates| Sub2
    MainAgent -->|delegates| Sub3

    Sub1 -->|results| MainAgent
    Sub2 -->|feedback| MainAgent
    Sub3 -->|support| MainAgent


This shows how subagents allow the main agent to offload specialized tasks while keeping the core context clean.

4. Virtual File System
flowchart LR
    MainAgent["🧠 Deep Agent"]
    FS["📂 Virtual File System"]

    FS -->|ls| MainAgent
    FS -->|read_file| MainAgent
    FS -->|edit_file| MainAgent
    FS -->|write_file| MainAgent

    MainAgent --> FS


The "filesystem" is mocked inside state, enabling persistence across tasks without touching the real machine.

5. Roadmap Overview
gantt
    title DeepAgents Roadmap
    dateFormat  YYYY-MM-DD
    section Features
    Full System Prompt Customization     :done,    des1, 2025-05-01, 2025-05-15
    Code Cleanliness (types/docs)        :active,  des2, 2025-05-15, 2025-08-01
    Virtual Filesystem Improvements      :        des3, 2025-08-01, 2025-10-01
    Deep Coding Agent Example            :        des4, 2025-09-01, 2025-11-01
    Benchmark Research Agent             :        des5, 2025-10-01, 2025-11-15
    Human-in-the-Loop Tool Support       :        des6, 2025-11-15, 2025-12-30


Would you like me to also combine all of these into a single “master diagram” (like the one you showed with deep_agents.png) that unifies the flow from user → deep agent → tools → response?

Tú dijiste:
No, I'm creating and describing the overall architecture of pull hero. Make sure to extend this on how vector embeddings can help, also call these loops feedback loop. The practical implementation will be a vscode extension mimicking cursor.com. 
ChatGPT Plus

To tailor the mermaid diagrams and architecture for Pull Hero, could you please clarify a few details:

What is Pull Hero’s primary purpose or functionality? (e.g. code review, refactoring, doc generation?)

How would you like vector embeddings to be used? For example, are they used for semantic code understanding, memory, or tool selection?

What specific feedback loops should be represented? Should we include user edits, model-generated code, critique cycles, etc.?

What specific capabilities from cursor.com should the VS Code extension emulate?

Once I have these, I can create a complete architectural set of diagrams and explanations for you.

Tú dijiste:
1 the vscode extension to help vibe coding 
2 we will like to use it to create better contexts for the LLM but not limited
3 all
4 coding tasks in agent mode, so we can talk, ask questions, or request implementations

The agent looks into the code, search, grep, filter and build a nice analysis.
ChatGPT Plus

Great, I’ll create a comprehensive set of mermaid diagrams and architectural explanations for Pull Hero — a VS Code extension designed to enhance the coding experience through a conversational deep agent interface.

I'll illustrate how it mimics Cursor.com by enabling agent-mode tasks like code navigation, analysis, search, implementation, and interactive feedback loops. I’ll also show how vector embeddings enrich LLM context, contributing to smarter and more personalized suggestions.

I’ll let you know once everything is ready for review.

Research completed in 3m· 18 fuentes· 37 búsquedas

Pull Hero Deep Agent Architecture for VS Code

PullHero Architecture Overview

PullHero is envisioned as an agentic AI assistant for coding, implemented as a VS Code extension (inspired by tools like Cursor). The extension runs in VSCode’s Extension Host, letting it parse code, invoke models, and update files without blocking the UI. In practice, PullHero provides a chat-like interface where the developer can “talk” to the agent, ask questions, or request code changes. This multi-step agent can analyze the codebase, propose edits, run commands, and loop until the task is complete
code.visualstudio.com
. For example, when given a coding task, the agent may generate code, compile or test it, observe any errors, and automatically revise the code (ReAct-style) in a feedback-driven loop until success
code.visualstudio.com
medium.com
.

Interactive VSCode Agent: PullHero’s extension connects to the code editor and language servers (LSP), so it has full access to open files, cursor position, AST parses, symbol tables, etc. It integrates with VS Code’s new “Agent mode”, using tools (e.g. search, compile, test runners) via the Model Context Protocol (MCP). In agent mode it can automatically determine relevant files, apply code edits, run terminal commands, monitor output, and iterate to fix issues
code.visualstudio.com
code.visualstudio.com
. The user sees a unified chat/edit interface where every tool call (e.g. #search, #runTests) is logged, and can steer the agent by prompting or giving feedback.

Multi-Tiered Context Understanding: To work effectively, PullHero builds a rich “mental model” of the code. This includes lexical context (the code immediately around the cursor), syntactic context (AST structure of the file), semantic context (types, symbol meanings), and project-level context (cross-file imports and dependencies)
gocodeo.com
. For example, it uses LSP queries to resolve symbol definitions and references, and parses ASTs to locate enclosing function, class, or variable scopes. This lets the agent assemble a prioritized prompt: current function code, relevant class or module definitions, imports, and any inline comments or docstrings that give intent.

Context Retrieval and Search

Beyond the immediate code, PullHero actively retrieves relevant context from the rest of the codebase. It employs a multi-pronged search pipeline that combines traditional and semantic methods
sourcegraph.com
:

Keyword/Grep Search: For precise matches, PullHero uses an indexed search engine (like Zoekt) to quickly find exact or fuzzy string matches in the repo
sourcegraph.com
. This is equivalent to grep for function names, keywords, or comments. For example, if you ask about “user authentication”, it might keyword-search for “auth” occurrences in code or docs.

Code Embedding Search: PullHero also maintains a vector index of the codebase. Every function, class, or code block can be embedded into a fixed-length vector using a code-specific embedding model
gocodeo.com
. These embeddings capture semantic meaning, so PullHero can do semantic similarity search: given the current code fragment or question, it generates an embedding and finds the nearest neighbors in the index. This retrieves conceptually related code snippets (even if they use different terminology) from any file
sourcegraph.com
gocodeo.com
. For example, editing a sorting function might retrieve another sorting implementation or utility in a different module, improving the agent’s suggestions.

Graph/Static Analysis: The agent builds (or queries) a dependency graph of the codebase. Using static analysis or build tooling, it can trace function calls, class hierarchies, and import relationships. For instance, it can find all call-sites of a method or locate where an interface is implemented
sourcegraph.com
. This “code graph” helps it include relevant functions or types that the current code depends on.

Local Context: PullHero always includes the developer’s editor state as context. It uses the open file content, the current cursor position, recent code edits, and even recent git history (e.g. the last commits) to inform its answers
sourcegraph.com
. This ensures that suggestions align with the very latest code the user is looking at.

These retrievers are complementary. For instance, a keyword match might find an exact function name, the embedding search might surface a related algorithm under a different name, and the code graph can highlight dependencies that neither text search nor embeddings would catch
sourcegraph.com
. PullHero then ranks and filters all retrieved items (respecting the LLM’s token limit) before constructing the prompt. This context pipeline – from syntax trees to semantic search – equips the LLM with a rich “reference manual” of the project
sourcegraph.com
gocodeo.com
.

Vector Embeddings for Enhanced Context

A central innovation in PullHero’s design is using vector embeddings as a persistent semantic memory of the codebase. An embedding model (trained on code) converts each code snippet or documentation text into a high-dimensional vector
gocodeo.com
. PullHero indexes these vectors (e.g. in a vector database) for fast similarity queries. When the agent needs to find context relevant to the current task, it generates an embedding for the current code or query and performs a nearest-neighbor search in the index
gocodeo.com
.

 

This enables semantic search across files: for example, if the agent is editing a data-processing function, it can pull in a related logging utility or data parser from elsewhere in the repo even if they share no exact keywords
gocodeo.com
. These retrieved code snippets are added to the LLM prompt as extra context, so the model can “see” related logic during generation. In effect, embeddings allow PullHero to grasp high-level patterns (algorithms, data flows, design patterns) that keyword search alone would miss.

 

By treating the codebase as a continuous embedding store, PullHero also supports memory and feedback loops. As code evolves (or as the agent generates new code), the embeddings can be updated, effectively “remembering” the changes. Over time, this creates a loop: user queries and the agent’s outputs populate the embedding index, which in turn feeds future queries, creating a continuously improving contextual memory. This loop of retrieve → act → update helps the agent refine its understanding of the project’s semantics and the developer’s style.

Iterative Agent Workflows and Feedback Loops

PullHero’s workflow is inherently iterative and feedback-driven. Each coding task is treated as a loop of planning, action, and observation
medium.com
. For example, if the agent is asked to implement a feature, it may:

Generate initial code or modifications using the LLM, based on the assembled context.

Execute and observe: run the code (compile, run tests, etc.) using built-in tools
code.visualstudio.com
.

If errors or failures occur, capture those error messages as feedback.

Refine the code by feeding the errors and context back to the LLM, prompting it to fix the issues.

This cycle repeats until the code meets the criteria (e.g. compiles without errors and passes tests). In other words, PullHero “auto-corrects in a loop until the task is completed”
code.visualstudio.com
. This is analogous to the ReAct architecture: after each action (like running tests), the agent reasons about the result and chooses the next action
medium.com
. In practice, PullHero might use built-in tasks (via MCP tools) such as #runTests, #lintCode, or even #deploy, each time appending the observations to the prompt.

 

User feedback is another loop: PullHero’s interface can capture explicit signals (like accepting/rejecting a suggestion) or implicit signals (like edits made by the developer). This feedback can be routed back into the model as well. For instance, if the user tweaks the generated code, PullHero can re-embed the new code or note the correction to avoid similar mistakes. Over many sessions, this feedback could even be used for offline fine-tuning (RLHF) to align the model better with the project’s standards
medium.com
medium.com
.

 

Importantly, calling these repeated interactions a “feedback loop” reflects that PullHero continually learns from its own outputs. Execution feedback (errors, performance metrics) provides objective signals, while user edits provide subjective ones
medium.com
medium.com
. Architectures like PullHero deliberately keep this loop going: they “integrate execution feedback [like test results] and user feedback into the next iteration”
medium.com
. This ensures that each round of generation is more informed than the last, steadily improving code quality and developer satisfaction in a virtuous cycle
medium.com
medium.com
.

Putting It All Together

In PullHero’s architecture, the VS Code extension ties together these components into a coherent agentic workflow. The extension manages the UI and hooks into the code editor and LSP, while a backend (local or cloud) handles embedding search and LLM calls. Upon a prompt, PullHero’s pipeline might look like this: (1) gather current code context (via AST/LSP/grep), (2) retrieve extra context (via embeddings and search)
gocodeo.com
sourcegraph.com
, (3) construct an LLM prompt and generate code, (4) apply edits and run tools, (5) collect feedback (errors/tests/user input), and (6) loop back to step (1) as needed. Over time, the continuous feedback and updated embeddings mean that the agent “remembers” the project state and gets better at solving tasks specific to that codebase
medium.com
code.visualstudio.com
.

 

PullHero’s design thus combines state-of-the-art ideas: AI agent mode (for multi-turn coding with tools), rich context engineering (AST + LSP + semantic search)
gocodeo.com
sourcegraph.com
, and iterative feedback loops that include code execution and user corrections
medium.com
code.visualstudio.com
. This holistic architecture enables a VS Code extension that not only generates code, but autonomously debugs and refines it — effectively “less chat, more efficient coding,” as the PullHero motto suggests
code.visualstudio.com
medium.com
.

 

Sources: Authoritative blog posts and docs on AI coding assistants, VSCode agent mode, and context retrieval were used to inform this architecture description
code.visualstudio.com
gocodeo.com
gocodeo.com
sourcegraph.com
medium.com
medium.com
.
