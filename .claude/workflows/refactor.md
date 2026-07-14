# Workflow: Refactor

## Purpose
Improve maintainability — of code, architecture, reusable components/services, or the AI ecosystem itself (Agents, Skills, Workflows, documentation) — without changing observable behavior, unless a behavior change is explicitly requested.

## Trigger
- "Refactor this service to remove duplication."
- "Clean up the architecture of X."
- "This agent's prompt is bloated, tighten it up."
- "Restructure the workflows for consistency."
- "The docs for Y are a mess, refactor them."
- Only when refactoring is explicitly requested — never bundled into feature work uninvited. Covers two scopes:
  - **Application scope**: code, architecture, reusable components, services.
  - **AI ecosystem scope**: `.claude/agents/*`, `.claude/skills/*`, `.claude/workflows/*`, `.claude/*.md`, `docs/*` — a deliberate, requested restructuring for clarity/consistency/deduplication, distinct from [`maintenance.md`](./maintenance.md)'s periodic drift-and-duplication sweep.

## Parent Assistant Responsibilities
- Identify scope (application vs. AI-ecosystem vs. both) first.
- **Application scope**: delegate to the `refactoring` Skill rather than editing code directly.
- **AI-ecosystem scope**: the parent edits the *content* of individual `agents/*.md`/`skills/*/SKILL.md`/`workflows/*.md`/`.claude/*.md` files directly — this is the [Agent First Policy](../CLAUDE.md#agent-first-policy)'s "no suitable agent exists" exception, not a default: no existing agent owns restructuring a definition file's content (`docs-maintainer`'s boundary explicitly excludes them, it only keeps the catalogs in sync with them).
- Scope AI-ecosystem edits with `file-reader`'s survey first, and check them against [AGENTS.md § Adding a New Agent](../AGENTS.md#adding-a-new-agent) / [SKILLS.md § Adding a New Skill](../SKILLS.md#adding-a-new-skill) / [WORKFLOW.md § Adding a New Workflow](../WORKFLOW.md#adding-a-new-workflow) for consistency.
- Reuse existing components/services/agents/Skills wherever the refactor touches something that already has one — never introduce a parallel implementation.

## Required Agents
**Application scope** (run automatically via the `refactoring` Skill's Phase 1):
- [`architect`](../agents/architect.md) — validate the refactor approach before touching code.
- [`impact-analyzer`](../agents/impact-analyzer.md) — scope callers/consumers of what's being refactored.
- [`refactorer`](../agents/refactorer.md) — apply the refactor.

**AI-ecosystem scope**:
- [`file-reader`](../agents/file-reader.md) — survey which agent/skill/workflow/doc files are actually affected before editing anything.
- [`docs-maintainer`](../agents/docs-maintainer.md) — sync `docs/` content and the `.claude/` catalog files (`CLAUDE.md`, `AGENTS.md`, `SKILLS.md`, `WORKFLOW.md`) once the parent's direct edits to `workflows/*`/`agents/*`/`skills/*` land.

## Optional Agents
- the `documentation` Skill's `context-manager` step — only if this refactor pass is also closing out a long session.

## Required Skills
- `refactoring` — invoke directly for application-scope refactors (code/architecture/components/services); it owns the validate → refactor → stop-for-review sequence.
- `documentation` — for the documentation portion of an AI-ecosystem refactor, once `docs-maintainer` identifies what needs to change.

## Execution Steps
1. Identify scope: application code, the AI ecosystem (`.claude/`/`docs/`), or both.
2. **Application scope**: invoke the `refactoring` Skill — `architect` validates the approach → `impact-analyzer` scopes callers → `refactorer` applies it → stops for review.
3. **AI ecosystem scope**: `file-reader` surveys the actually-affected agent/skill/workflow/doc files → the parent restructures those files directly for clarity/consistency/deduplication → `docs-maintainer` (directly, or via the `documentation` Skill) syncs the catalog files and `docs/`.
4. Never change an Agent's/Skill's/Workflow's actual responsibilities or boundaries as a side effect of a clarity refactor — only reorganize/tighten what's already there, unless a behavior/responsibility change was explicitly requested.
5. Never delete a file without asking first.
6. Stop for review — report what was restructured and why.

## Expected Outputs
A summary of all refactoring performed: files touched, what was extracted/renamed/deduplicated/reused, and explicit confirmation that observable behavior (application scope) or documented responsibilities (AI ecosystem scope) are unchanged — unless a change was explicitly requested.

## User Confirmation Points
- **Required**: before deleting any file.
- Before refactoring shared/reusable code or a widely-used Agent/Skill, confirm scope if `impact-analyzer`/`file-reader` surfaces a large blast radius.
- Before applying a restructure that would change an Agent's/Skill's/Workflow's stated responsibilities, as opposed to just its wording/organization.
