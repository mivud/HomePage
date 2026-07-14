# Workflow: Maintenance

## Purpose
Keep the AI ecosystem itself (`.claude/agents/`, `.claude/skills/`, `.claude/workflows/`, `.claude/*.md`, `docs/`) clean, consistent, and free of duplication or drift.

## Trigger
- "Run the Maintenance workflow."
- "Do a maintenance pass on the AI setup."
- "Check for stale docs/agents/skills."
- Per the schedule in [`../ROT.md`](../ROT.md): session end (only if `.claude/`/`docs/` changed), weekly, monthly, and before release.

## Parent Assistant Responsibilities
- Follow [`ROT.md`](../ROT.md)'s checklist as the orchestration script.
- Delegate exhaustive multi-file reads to `file-reader` rather than reading the whole `.claude/`/`docs/` tree directly.
- Get explicit confirmation before deleting any file.
- Skip a cycle entirely if nothing changed since the last pass.

## Required Agents
- [`docs-maintainer`](../agents/docs-maintainer.md) — docs drift and duplication.
- [`file-reader`](../agents/file-reader.md) — spot-check reusable component/prompt usage and survey affected files.

## Optional Agents
- [`context-manager`](../agents/context-manager.md) — only if this maintenance pass is also closing out a long session.

## Required Skills
- `documentation` — for the docs-sync portion of the checklist, where drift is found.

## Execution Steps
Follow [`../ROT.md`](../ROT.md) end to end — this workflow is its entry point, not a redefinition of it:
1. Review the Agents/Skills catalogs (`AGENTS.md`/`SKILLS.md`) against the actual files on disk.
2. Review `WORKFLOW.md` (including its `workflows/` catalog) and `CLAUDE.md` for accuracy.
3. Review `docs/` for drift (delegate to `docs-maintainer`, via [`documentation.md`](./documentation.md)).
4. Review TODOs, duplicate/obsolete files, and reusable-component usage per `../ROT.md § Checklist`.
5. Report per `../ROT.md § Output` (maintenance summary, updated files, remaining TODOs, recommendations).

## Expected Outputs
Exactly `../ROT.md § Output`'s shape: maintenance summary, updated files, remaining TODOs, recommendations. Application source code, tests, and builds are out of scope — only `.claude/` and `docs/` are touched.

## User Confirmation Points
- **Required**: before deleting any duplicate or obsolete file.
