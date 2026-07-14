# Workflow: Feature Planning

## Purpose
Produce a reviewed approach — scope, architecture, trade-offs, risks — before any code is written.

## Trigger
- "Before you build this, what's the approach?"
- "Plan out how we'd add X."
- "I want to review the design before you touch any code."
- Before a medium/large feature, or whenever the implementation approach isn't obvious and is worth agreeing on first. Skip for trivial or obviously-scoped changes — go straight to [`feature-implementation.md`](./feature-implementation.md).

## Parent Assistant Responsibilities
- Synthesize the agents' outputs into one coherent plan rather than re-deriving the analysis inline.
- Present the plan and stop for explicit approval before handing off to `feature-implementation.md`.
- Per [WORKFLOW.md § Agent Delegation](../WORKFLOW.md#agent-delegation), always run this delegation — even for a relatively small feature — unless the change is trivial/self-evidently scoped enough that planning adds no value.

## Required Agents
- [`impact-analyzer`](../agents/impact-analyzer.md) — scopes affected modules/files and estimates complexity.
- [`file-reader`](../agents/file-reader.md) — fills in codebase context beyond what `docs/` already covers.
- [`architect`](../agents/architect.md) — produces the recommended approach and trade-offs.

## Optional Agents
- [`researcher`](../agents/researcher.md) — only if the approach depends on an unfamiliar library/API and needs verified facts rather than a guess. Skip it for settled internal patterns.

## Required Skills
None directly. This is the analysis slice that precedes Phase 1 of `feature-development` / `frontend-development` (see [SKILLS.md](../SKILLS.md)), run standalone when the user wants to stop after planning rather than continue into implementation.

## Execution Steps
1. `impact-analyzer` scopes affected modules/files and estimates complexity.
2. `file-reader` fills in any codebase context the docs don't already cover.
3. `architect` produces the recommended approach and trade-offs.
4. `researcher` only if a library/API decision needs verified facts, not a guess.
5. Present the plan and **stop** — do not write any code, scaffold any file, or run tests/build (there's nothing to verify yet). Do not proceed to `feature-implementation.md` without explicit approval.

## Expected Outputs
A plan: recommended approach, affected files/modules, trade-offs, risks, open questions. No files are modified — every agent in this workflow is read-only.

## User Confirmation Points
- **Required**: explicit approval of the plan before handing off to `feature-implementation.md`.
