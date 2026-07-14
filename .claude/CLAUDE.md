# CLAUDE.md — AI Bootstrap

Read this file first in every session. It orients you and tells you where to look next — it deliberately contains no project knowledge itself, so it never goes stale and never competes with `docs/` as a source of truth.

## How to Initialize

1. Read this file.
2. Read [`docs/AI_CONTEXT.md`](../docs/AI_CONTEXT.md) — the compact restore point (current status, key architectural decisions, known limitations, priorities).
3. Read [`docs/FRAMEWORK_NOTES.md`](../docs/FRAMEWORK_NOTES.md) before touching any framework/platform-specific API (routing, build config, etc.) — the installed framework version(s) may not match training data.
4. Read only the specific `docs/` file(s) relevant to the task at hand (see the index below) — not the whole set.
5. When deciding how to approach the task, consult [WORKFLOW.md](./WORKFLOW.md) to identify the matching runbook under [`workflows/`](./workflows/) — invoked using the format in [WORKFLOW.md § Workflow Invocation](./WORKFLOW.md#workflow-invocation) — then follow that runbook, applying the [Agent First Policy](#agent-first-policy) throughout. Each runbook names its own required/optional agents directly; [AGENTS.md](./AGENTS.md) and [SKILLS.md](./SKILLS.md) are the catalogs you look an agent/Skill up in once the runbook names it, not a separate place to re-derive which ones apply.

## Documentation Index

All project knowledge lives under `docs/` — this file references it rather than duplicating it.

| Topic | Document |
|---|---|
| Project overview, tech stack, folder structure, current status at a glance | [`docs/PROJECT.md`](../docs/PROJECT.md) |
| Site structure, page composition, script/style loading order, design decisions | [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) |
| Reusable page sections, vendor plugin usage | [`docs/COMPONENTS.md`](../docs/COMPONENTS.md) |
| Design system, responsive rules, accessibility, styling conventions | [`docs/UI_GUIDELINES.md`](../docs/UI_GUIDELINES.md) |
| Coding standards, naming, folder conventions | [`docs/DEVELOPER_GUIDE.md`](../docs/DEVELOPER_GUIDE.md) |
| Current implementation status, architectural decisions, known limitations, priorities | [`docs/AI_CONTEXT.md`](../docs/AI_CONTEXT.md) |
| Planned features, technical improvements | [`docs/ROADMAP.md`](../docs/ROADMAP.md) |
| Vendored library versions/quirks, hosting/deploy notes, platform-specific gotchas | [`docs/FRAMEWORK_NOTES.md`](../docs/FRAMEWORK_NOTES.md) |

This project has no backend, database, or API, so there are no `AUTHENTICATION.md`/`AUTHORIZATION.md`/`API.md` docs — if one of those layers gets added later, `docs-maintainer` should create the matching doc and add a row here.

## Default Development Workflow

Every development task follows the same shape by default: analyze → plan (only if requested) → implement → **stop and wait for review**. Verification, review, and documentation steps run only once the user explicitly approves the implementation and asks for that specific step — never automatically. See [WORKFLOW.md § Default Development Workflow](./WORKFLOW.md#default-development-workflow) for the full policy.

## Agent First Policy

The parent assistant is primarily a **coordinator**, not the default implementer. **Workflows are the only place that orchestrate agents** — a workflow runbook under [`workflows/`](./workflows/) is what decides which agents a given task needs; the parent's job is to identify the matching workflow, run it, gate on user confirmation where required, and merge the results agents return, not to redo that work itself in the main conversation or re-derive agent selection outside a workflow.

- **A suitable agent should always be preferred whenever the workflow being run requires or offers one.** Each workflow runbook explicitly lists its Required Agents and Optional Agents (see [AGENTS.md](./AGENTS.md) for what each one does) — invoke them rather than performing that step inline.
- **The parent merges, it doesn't duplicate.** Synthesize and relay what agents returned; don't re-derive the same analysis or re-implement the same change yourself alongside them.
- **Perform work directly only when:**
  - the active workflow explicitly says no suitable agent exists for that step (its runbook will say so — e.g. `new-session.md`'s fixed bootstrap reads, or an AI-ecosystem refactor's direct file edits),
  - delegation fails or an invoked agent cannot complete the task, or
  - the user has explicitly disabled agent delegation for this conversation/task.

This policy governs *who* performs a step once it's triggered — it does not change *when* a step runs. The automatic-vs-on-request gating in [WORKFLOW.md § Default Development Workflow](./WORKFLOW.md#default-development-workflow) still applies unchanged: a review/verification/documentation step still waits for explicit approval, it just runs via a delegated agent once requested rather than inline.

## AI Ecosystem

This `.claude/` directory is reusable AI configuration — portable to another project with only minimal adjustment (project name, doc index, a handful of stack-specific agents). The chain of responsibility is linear: `CLAUDE.md` → `WORKFLOW.md` → `workflows/*` → `AGENTS.md` → `SKILLS.md` — each layer answers one question and hands off to the next, with no layer's responsibility duplicated in another (see [WORKFLOW.md § Responsibilities Matrix](./WORKFLOW.md#responsibilities-matrix) for the full breakdown).

- [WORKFLOW.md](./WORKFLOW.md) — the single source of truth for the AI development lifecycle: the workflow stages (indexing the runnable procedures under [`workflows/`](./workflows/)), the invocation format, Skill-selection guidance, and the collaboration/context-optimization principles that apply across all of them.
- [`workflows/*`](./workflows/) — the runnable procedures. Each one names its own Required/Optional Agents and Required Skills directly — this is where agent orchestration actually happens, not in a separate policy document.
- [AGENTS.md](./AGENTS.md) — the agent catalog: what each sub-agent under `agents/` does, looked up once a workflow names it.
- [SKILLS.md](./SKILLS.md) — the Skill catalog: what each Skill under `skills/` orchestrates, looked up once a workflow names it.
- [ROT.md](./ROT.md) — the standard maintenance guide for this AI ecosystem itself (agents, skills, workflows, docs). Use it before ending a session that touched `.claude/`/`docs/`, before a release, and during periodic project reviews — [`workflows/maintenance.md`](./workflows/maintenance.md) is its runnable entry point.

## Context Optimization

Read only what the task requires — a targeted `docs/` lookup or a scoped agent (`file-reader`, `impact-analyzer`) beats reading broadly. Delegate to Skills/agents for anything nontrivial so verification and review happen off the main context, and expect concise, summarized results back, not raw logs. Full principles: [WORKFLOW.md § Context Optimization Principles](./WORKFLOW.md#context-optimization-principles).

## Implementation Is the Source of Truth

When documentation and code disagree, the code wins and the documentation gets corrected — never the reverse. Don't document planned or aspirational behavior as if it already exists.
