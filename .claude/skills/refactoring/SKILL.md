---
name: refactoring
description: Use when improving existing code's maintainability (duplication, naming, structure, extraction) without changing observable behavior. Validates the approach and applies the refactor, then stops for review — code/performance/accessibility review, behavior-verification, and documentation updates run only once the user explicitly approves the refactor and asks for that step.
---

# Refactoring

## When to Use

Only when refactoring is explicitly requested — not proactively bundled into feature work. Behavior must remain unchanged; proving that is Phase 2's job, run once the user asks for it.

This Skill follows [WORKFLOW.md § Default Development Workflow](../../WORKFLOW.md#default-development-workflow): analyze (validate approach) → plan only if requested → refactor → **stop for review**. Everything after the refactor runs only once the user explicitly approves it and asks for that specific step.

## Participating Agents

**Phase 1 (automatic):** `architect`, `impact-analyzer`, `refactorer`.

**Phase 2 (on request only):** `code-reviewer`, `performance-reviewer`, `accessibility-reviewer`, `test-runner`, `regression-checker`, `docs-maintainer`.

See [`../../AGENTS.md`](../../AGENTS.md).

## Execution Order

### Phase 1 — Validate, plan, refactor (runs by default)

1. **`architect`** — validate the refactoring approach before touching code.
2. **`impact-analyzer`** — scope which callers/consumers of the code being refactored exist.
3. **If the user asked for an implementation plan**, present it and get explicit approval before refactoring. Otherwise skip straight to the refactor.
4. **`refactorer`** — implement the refactor.
5. **Stop.** Report what was restructured and hand control back to the user — do not continue into Phase 2 uninvited.

### Phase 2 — Review, verification, docs (only once the user approves and asks for it)

6. **`code-reviewer`** — check the refactored code itself for quality/correctness.
7. **`performance-reviewer`** — check for any performance regression introduced by the restructuring, if relevant.
8. **`accessibility-reviewer`** (if the refactor restructures interactive UI markup) — confirm no a11y regression.
9. **`test-runner`** — confirm lint/build pass, where such checks are configured.
10. **`regression-checker`** — confirm every other consumer of the refactored code is unaffected.
11. **`docs-maintainer`** — update documentation only if the refactor changed a documented interface/pattern.

The user can ask for a subset of Phase 2 rather than all of it (e.g. "just run the tests") — honor exactly what's requested.

## Completion Criteria

**Phase 1:** the refactor matches the validated approach; the user has explicit control back.

**Phase 2 (once requested):** observable behavior is confirmed unchanged — markup, styling, and UI behavior all match pre-refactor; `code-reviewer` and `regression-checker` findings resolved or explicitly deferred; `test-runner` passes.

## Expected Output

**After Phase 1:** a concise summary of what was extracted/renamed/restructured and why, ending with an explicit handoff for review. Do not proceed further unprompted — and do not claim behavior is proven unchanged until Phase 2 verification has actually run.

**After Phase 2 (on request):** verification performed and explicit confirmation that behavior is unchanged, with the evidence for that claim.
