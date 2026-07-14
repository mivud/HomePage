---
name: frontend-development
description: Use when implementing or modifying the site's HTML/CSS/JavaScript — page sections, layout, styling, interactive behavior. Implements the UI, then stops for review — code/performance/accessibility review, verification, and documentation sync run only once the user explicitly approves the implementation and asks for that step.
---

# Frontend Development

## When to Use

The default Skill for this project: it has no backend, so essentially all feature work is frontend work — markup, styles, client-side scripting, layout. Prefer `feature-development` instead only when the change is broad enough to warrant an architecture review first (spans multiple pages, restructures the build/hosting setup) or doesn't cleanly fit "UI change."

This Skill follows [WORKFLOW.md § Default Development Workflow](../../WORKFLOW.md#default-development-workflow): analyze → plan only if requested → implement → **stop for review**. Everything after implementation runs only once the user explicitly approves it and asks for that specific step.

## Participating Agents

**Phase 1 (automatic):** `impact-analyzer`, `file-reader`, `ui-engineer`, `dependency-auditor`.

**Phase 2 (on request only):** `code-reviewer`, `performance-reviewer`, `accessibility-reviewer`, `playwright-tester`, `qa-tester`, `docs-maintainer`.

See [`../../AGENTS.md`](../../AGENTS.md).

## Execution Order

### Phase 1 — Analyze, plan, implement (runs by default)

1. **`impact-analyzer`** — scope which pages/sections/shared styles or scripts are affected.
2. **`file-reader`** — pull minimum relevant context (existing markup/styles/scripts to reuse) if not already in hand.
3. **If the user asked for an implementation plan**, present it and get explicit approval before writing code. Otherwise skip straight to implementation.
4. **`ui-engineer`** — implement, reusing existing markup patterns/styles/vendor components before adding new ones.
5. **`dependency-auditor`** (only if a new vendor library/script is being added) — vet it before it's added. Still automatic — it gates an irreversible action, not a post-hoc quality check.
6. **Stop.** Report what was built and hand control back to the user — do not continue into Phase 2 uninvited.

### Phase 2 — Review, verification, docs (only once the user approves and asks for it)

7. **`code-reviewer`** — review the implementation.
8. **`performance-reviewer`** — check page-load/rendering/asset cost for anything performance-sensitive.
9. **`accessibility-reviewer`** — dedicated a11y pass on anything interactive (forms, nav, dialogs).
10. **`playwright-tester`** (if E2E coverage exists for the affected flow) — run it.
11. **`qa-tester`** — functional/negative/edge-case validation.
12. **`docs-maintainer`** — update component/UI docs if the change affects documented behavior.

Skip `dependency-auditor` if no new vendor library is involved. Skip `playwright-tester` if no relevant suite exists. The user can ask for a subset of Phase 2 rather than all of it — honor exactly what's requested.

## Completion Criteria

**Phase 1:** UI matches the project's existing design system and component conventions (no ad-hoc primitives where a shared one exists); all UI states handled (loading, empty, error, success); the user has explicit control back.

**Phase 2 (once requested):** `code-reviewer`, `accessibility-reviewer`, and `qa-tester` findings resolved or explicitly deferred.

## Expected Output

**After Phase 1:** a concise summary of what UI was built/changed and what was reused vs. newly introduced, ending with an explicit handoff for review. Do not proceed further unprompted.

**After Phase 2 (on request):** review/QA findings and their resolution, plus any follow-ups (e.g. a performance recommendation not applied).
