---
name: documentation
description: Use to synchronize project documentation with an already-shipped change — detects drift between CLAUDE.md/docs/ and the actual implementation, updates it, and summarizes the session for future context.
---

# Documentation

## When to Use

After a change has already landed (via another Skill or directly) and documentation needs to catch up, or as a standalone audit when docs are suspected to be stale. Per [WORKFLOW.md § Default Development Workflow](../../WORKFLOW.md#default-development-workflow), this Skill runs only when the user explicitly asks for docs to be synced — never automatically right after a change. Implementation is always the source of truth — this Skill never edits it.

## Participating Agents

`docs-maintainer`, `context-manager`. See [`../../AGENTS.md`](../../AGENTS.md).

## Execution Order

1. **`docs-maintainer`** — compare `CLAUDE.md`/`docs/` against the current implementation, fix drift, fill genuine gaps, and eliminate duplication (cross-reference instead of repeating).
2. **`context-manager`** (if this is closing out a long session or a major task) — summarize what happened, flag what's worth persisting beyond what `docs-maintainer` already wrote down, and recommend whether a fresh session would help going forward.

## Completion Criteria

- No factually wrong statement remains in `CLAUDE.md`/`docs/` for the area reviewed.
- Every fact has exactly one canonical home; duplicates were replaced with cross-references.
- Planned/aspirational behavior is marked as such, not documented as already implemented.

## Expected Output

A concise summary: which files were changed and why, any gaps identified but intentionally deferred, and any inconsistency that needed human judgment to resolve.
