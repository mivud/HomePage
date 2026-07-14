# Workflow: Documentation

## Purpose
Synchronize `.claude/CLAUDE.md` and `docs/` with an already-shipped change.

## Trigger
- "Update the docs for what we just built."
- "Docs feel stale, can you sync them?"
- "Document this before we move on."
- Only when the user explicitly asks for docs to be synced — after a change lands via another workflow, or as a standalone drift audit.

## Parent Assistant Responsibilities
- Invoke the `documentation` Skill and relay what changed, why, and any gaps or judgment calls it flagged rather than resolved.
- Never hand-edit `docs/`/`CLAUDE.md` directly in place of delegating to `docs-maintainer`.
- Let `docs-maintainer` scope which docs need re-reading rather than re-reading all of `docs/` yourself first.

## Required Agents
- [`docs-maintainer`](../agents/docs-maintainer.md) — always, via the `documentation` Skill.

## Optional Agents
- [`context-manager`](../agents/context-manager.md) — only if this is also closing out a long session (see [`end-session.md`](./end-session.md)).

## Required Skills
- `documentation` — invoke it directly; it owns the compare-fix-summarize sequence.

## Execution Steps
1. Invoke the `documentation` Skill.
2. `docs-maintainer` compares `CLAUDE.md`/`docs/` against the current implementation, fixes drift, fills genuine gaps, and eliminates duplication (cross-reference instead of repeating).
3. `context-manager` only if this is also closing out a long session.
4. Relay what changed and why, plus any gaps or judgment calls flagged rather than resolved. Don't restate the full diff of what changed — reference the relevant commit(s)/change instead.

## Expected Outputs
Files changed and why, deferred gaps, judgment-call inconsistencies surfaced for the user. Never source code — `docs-maintainer` only writes to `.claude/`/`docs/`. Never documents planned/aspirational behavior as already implemented; never introduces duplicate facts across two docs.

## User Confirmation Points
None required for doc edits (low-risk, reversible via git) — but genuine judgment calls (ambiguous intent, structural doc changes) get flagged rather than decided silently.
