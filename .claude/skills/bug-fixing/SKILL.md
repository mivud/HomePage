---
name: bug-fixing
description: Use when a bug is reported or a test/build fails unexpectedly. Root-causes and applies the fix, then stops for review — code review, verification (tests/regression), and documentation updates run only once the user explicitly approves the fix and asks for that step.
---

# Bug Fixing

## When to Use

Any reported failure or unexpected behavior — a stack trace, a console error, a failing test, a user-reported defect. Root-cause it before fixing; don't patch the symptom.

This Skill follows [WORKFLOW.md § Default Development Workflow](../../WORKFLOW.md#default-development-workflow): analyze (investigate root cause) → plan only if requested → fix → **stop for review**. Everything after the fix runs only once the user explicitly approves it and asks for that specific step.

## Participating Agents

**Phase 1 (automatic):** `bug-investigator`, `impact-analyzer`, `file-reader`.

**Phase 2 (on request only):** `code-reviewer`, `test-runner`, `regression-checker`, `docs-maintainer`, `context-manager`.

See [`../../AGENTS.md`](../../AGENTS.md).

## Execution Order

### Phase 1 — Investigate, plan, fix (runs by default)

1. **`bug-investigator`** — identify the likely root cause from the available evidence (stack trace, console log, error message, repro steps).
2. **`impact-analyzer`** — scope what else touches the code implicated in the root cause, if the fix isn't obviously localized.
3. **`file-reader`** — pull minimum relevant context if not already in hand.
4. **If the user asked for an implementation plan**, present the proposed fix and get explicit approval before applying it. Otherwise skip straight to the fix.
5. **Implement the fix**, addressing the root cause identified in step 1 — not just the symptom.
6. **Stop.** Report the root cause and the fix, and hand control back to the user — do not continue into Phase 2 uninvited.

### Phase 2 — Review, verification, docs (only once the user approves and asks for it)

7. **`code-reviewer`** — review the fix.
8. **`test-runner`** — confirm lint/build pass (where such checks are configured), including a manual regression check for the original failure where feasible.
9. **`regression-checker`** — confirm the fix didn't break adjacent/shared code.
10. **`docs-maintainer`** — update documentation only if the fix changed documented behavior (not for a pure internal correction).
11. **`context-manager`** (if requested, or for a long-running debugging session) — recommend what's worth persisting.

The user can ask for a subset of Phase 2 rather than all of it — honor exactly what's requested.

## Completion Criteria

**Phase 1:** the fix addresses the root cause identified by `bug-investigator`, not a workaround for the symptom; the user has explicit control back.

**Phase 2 (once requested):** `code-reviewer` findings resolved or explicitly deferred; `test-runner` passes and the original failure no longer reproduces; `regression-checker` found no new breakage.

## Expected Output

**After Phase 1:** a concise summary of the root cause and the fix applied, ending with an explicit handoff for review. Do not proceed further unprompted.

**After Phase 2 (on request):** verification results and whether documentation changed.
