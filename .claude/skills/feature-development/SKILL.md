---
name: feature-development
description: Use when implementing a new feature or nontrivial enhancement of medium or large scope, spanning any layer of the project. Analyzes, plans (only if requested), and implements the feature, then stops for review — code review, security/accessibility checks, verification (tests/QA/regression), and documentation sync run only once the user explicitly approves the implementation and asks for that step.
---

# Feature Development

## When to Use

A new feature or nontrivial enhancement — not a one-line fix, not a pure refactor. If the change is small and low-risk (a typo, a copy tweak, a trivial markup addition), skip this Skill and just make the change directly.

For a change scoped entirely to the UI, prefer the more targeted `frontend-development` Skill instead — this Skill is the general-purpose pipeline for anything broader (spans multiple pages/sections, touches build/hosting config, or doesn't cleanly fit UI-only work).

This Skill follows [WORKFLOW.md § Default Development Workflow](../../WORKFLOW.md#default-development-workflow): analyze → plan only if requested → implement → **stop for review**. Everything after implementation runs only once the user explicitly approves it and asks for that specific step.

## Participating Agents

**Phase 1 (automatic):** `impact-analyzer`, `file-reader`, `architect`, `researcher` (if needed), `ui-engineer`, `dependency-auditor`.

**Phase 2 (on request only):** `code-reviewer`, `security-reviewer`, `accessibility-reviewer`, `performance-reviewer`, `test-runner`, `playwright-tester`, `qa-tester`, `regression-checker`, `docs-maintainer`, `context-manager`.

See [`../../AGENTS.md`](../../AGENTS.md) for what each one does.

## Execution Order

### Phase 1 — Analyze, plan, implement (runs by default)

1. **`impact-analyzer`** — scope the blast radius: affected pages/sections/scripts/styles/docs, regression risk, estimated complexity.
2. **`file-reader`** — pull the minimum context needed to act, if the parent doesn't already have it.
3. **`architect`** — review/design the implementation approach before code is written.
4. **`researcher`** (if needed) — resolve any unfamiliar library/API/approach question the architecture review surfaced.
5. **If the user asked for an implementation plan**, present it (e.g. via Plan mode) and get explicit approval before writing code. If no plan was requested, skip straight to implementation.
6. **`ui-engineer`** — implement the change.
7. **`dependency-auditor`** (only if a new vendor library is being added) — vet it before it's added. This still runs automatically — it gates an irreversible action, not a post-hoc quality check.
8. **Stop.** Report what was built and explicitly hand control back to the user — do not continue into Phase 2 uninvited.

### Phase 2 — Review, verification, docs (only once the user approves and asks for it)

9. **`code-reviewer`** — independent review of the implementation.
10. **`security-reviewer`** (if user input, embeds, or third-party scripts changed) — check input-handling/secret/vulnerability risk.
11. **`accessibility-reviewer`** (if interactive UI changed) — dedicated a11y pass.
12. **`performance-reviewer`** (if requested or performance-sensitive) — rendering/asset/script-loading cost.
13. **`test-runner`** — lint/build, where the project has such checks configured.
14. **`playwright-tester`** (if UI changed and E2E coverage exists) — run relevant E2E tests.
15. **`qa-tester`** — functional/negative/edge-case validation of the new feature.
16. **`regression-checker`** — confirm adjacent/shared code wasn't broken.
17. **`docs-maintainer`** — sync `CLAUDE.md`/`docs/` with what changed.
18. **`context-manager`** (if requested, or for a long-running session) — recommend what's worth persisting.

Within Phase 2, skip steps that don't apply (e.g. no security-sensitive code touched, no Playwright suite exists), and run independent agents concurrently rather than serially. The user can ask for a subset ("just run the tests") rather than the whole phase — honor exactly what's requested.

## Completion Criteria

**Phase 1:** implementation matches the reviewed architecture/plan; any new dependency was reviewed before being added; the user has explicit control back.

**Phase 2 (once requested):** `code-reviewer` findings resolved or explicitly deferred; `test-runner`/`playwright-tester` (where applicable) pass; `qa-tester` and `regression-checker` surfaced no unresolved issues; documentation reflects the shipped behavior.

## Expected Output

**After Phase 1:** a concise summary of what was analyzed/planned and built, ending with an explicit handoff — e.g. "Implementation complete; let me know when you'd like review, tests, or docs updated." Do not proceed further unprompted.

**After Phase 2 (on request):** a concise summary of which agents ran, what they found, what was fixed vs. explicitly deferred, and which docs were updated. Do not relay each agent's full raw output — synthesize.
