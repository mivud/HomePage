# ROT.md — Review, Optimize & Tidy

The maintenance guide for this project's AI ecosystem (`.claude/agents/`, `.claude/skills/`, `.claude/*.md`, `docs/`). Development workflow lives in [WORKFLOW.md](./WORKFLOW.md) and the runbooks under [`workflows/`](./workflows/); this document is about keeping the tooling that runs that workflow itself clean.

## 1. Purpose

- Keep agents, skills, workflows, prompts, and documentation clean, consistent, and reusable across projects.
- Prevent duplicated, obsolete, or unused AI assets from accumulating silently.
- Give maintenance a defined cadence instead of leaving it to happen "eventually."

## 2. Maintenance Schedule

| Cadence | Scope |
|---|---|
| **Every session end** | Quick pass — only if the session added/changed an agent, skill, or doc. Skip entirely for sessions that didn't touch `.claude/` or `docs/`. |
| **Weekly** | Review TODOs and recently added agents/skills for drift or duplication. |
| **Monthly** | Full checklist below — agents, skills, workflows, CLAUDE.md, docs, reusable components. |
| **Before release** | Full checklist below, plus confirm `docs/` matches shipped behavior (see [Implementation Is the Source of Truth](./CLAUDE.md#implementation-is-the-source-of-truth)). |

Skip a cycle if nothing changed since the last pass — this schedule is a trigger for review, not a mandate to edit something every time.

## 3. Checklist

- **Review Agents** (`.claude/agents/`) — every agent still referenced in [AGENTS.md](./AGENTS.md)? Any two agents with overlapping responsibility that should be merged?
- **Review Skills** (`.claude/skills/`) — every skill still referenced in [SKILLS.md](./SKILLS.md)? Does its orchestration still match the agents it invokes?
- **Review Workflows** ([WORKFLOW.md](./WORKFLOW.md) and [`workflows/`](./workflows/)) — do the described lifecycle stages and runbooks still reflect what's actually in `agents/` and `skills/`?
- **Review CLAUDE.md** — still free of project-specific knowledge (per its own stated purpose)? Documentation Index still accurate?
- **Review docs/** — any file describing behavior that no longer matches the code? Any fact duplicated across two docs instead of cross-referenced?
- **Review TODOs** — anything stale, already done, or no longer relevant? Update the task list directly rather than leaving it to rot.
- **Remove duplicate/obsolete files** — identify candidates, but **always ask for confirmation before deleting anything**.
- **Check reusable components and prompts** — are shared components/services (see [`docs/COMPONENTS.md`](../docs/COMPONENTS.md)) still being reused rather than reimplemented? Any agent prompt duplicating instructions already covered in `docs/`?

## 4. Optimization Rules

- Keep documentation concise — prefer a cross-reference over restating a fact that already lives elsewhere.
- Avoid duplicated information: every fact has exactly one canonical home (see [WORKFLOW.md § Documentation Synchronization Rules](./WORKFLOW.md#documentation-synchronization-rules)).
- Reuse existing agents and skills before creating new ones — a new agent needs a responsibility no existing agent covers.
- Minimize context and token usage — this review itself should stay targeted (see [Context Optimization Principles](./WORKFLOW.md#context-optimization-principles)), not a full re-read of every file every time.
- Keep everything reusable across projects — avoid baking project-specific knowledge into `.claude/` files that are meant to be portable (agents, skills, CLAUDE.md, WORKFLOW.md).

## 5. Output

Each ROT pass reports back:

- **Maintenance summary** — what was reviewed and what was found.
- **Updated files** — what actually changed, if anything.
- **Remaining TODOs** — anything flagged but deferred, and why.
- **Recommendations** — anything that needs a human decision (e.g. a deletion) or a follow-up session.
