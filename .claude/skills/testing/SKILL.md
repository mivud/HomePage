---
name: testing
description: Use to validate existing or just-implemented behavior without building anything new — running the verification suite, generating test scenarios, and checking for regressions. Returns a concise summary, never raw logs.
---

# Testing

## When to Use

Validating that something works — a completed feature, a fix, or just "is the project healthy right now" — without implementing new functionality. Per [WORKFLOW.md § Default Development Workflow](../../WORKFLOW.md#default-development-workflow), a development Skill's Phase 1 stops after implementation without running this — invoke this Skill (or the specific agent) once the user explicitly approves the implementation and asks for verification.

## Participating Agents

`test-runner`, `playwright-tester`, `qa-tester`, `accessibility-reviewer`, `regression-checker`. See [`../../AGENTS.md`](../../AGENTS.md).

## Execution Order

1. **`test-runner`** — run lint/build (whichever checks are configured for this project); report pass/fail and only the errors/warnings that matter.
2. **`playwright-tester`** (if a Playwright suite exists and the scope is UI/E2E) — run the relevant tests, capture failure evidence.
3. **`qa-tester`** — generate and, where possible, execute functional/negative/edge-case scenarios for the feature/area in scope.
4. **`accessibility-reviewer`** (if the scope is interactive UI) — dedicated a11y validation.
5. **`regression-checker`** — check adjacent/shared code for unintended breakage, if the scope includes a recent change to shared code.

Skip `playwright-tester` if no E2E suite exists for the area in question, `accessibility-reviewer` if the scope isn't UI, and `regression-checker` if the scope is a fresh, isolated feature with no shared-code touchpoints. `test-runner` and `playwright-tester` don't depend on each other's output — invoke them together rather than sequentially. Command execution itself (batching, approval, output contract) follows [WORKFLOW.md § Command Execution Policy](../../WORKFLOW.md#command-execution-policy).

## Completion Criteria

- Every agent invoked reports its results (pass/fail, findings) with concrete evidence, not just a confidence statement.
- Failures are attributed to a specific file/line/scenario where possible, not just described in the abstract.

## Expected Output

A concise summary: what was tested, pass/fail per check, concrete failures with evidence, and recommended next steps for any failure. Never return long terminal logs — summarize; offer to fetch full output only if asked.
