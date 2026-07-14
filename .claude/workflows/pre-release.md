# Workflow: Pre-Release

## Purpose
The final readiness gate before a set of changes ships — confirms verification already happened, it doesn't replace it.

## Trigger
- "Are we ready to ship?"
- "Run the release check."
- "Final review before we merge to main."
- Only when explicitly requested, before a release — not automatically after any single change, and not a substitute for per-change review/testing already requested along the way.

## Parent Assistant Responsibilities
- Invoke the `release` Skill and relay its go/no-go summary.
- Get explicit user sign-off on any accepted risk before treating the release as go.
- Never perform the release action (push/tag/deploy/merge) itself — this workflow only verifies readiness.
- Don't re-run review steps the user already explicitly requested and resolved earlier in the same change cycle — let the Skill decide what's still open.

## Required Agents
The `release` Skill runs these — listed here so the required set is explicit, not deferred to "the Skill decides":
- [`code-reviewer`](../agents/code-reviewer.md) — final pass over the full changeset.
- [`security-reviewer`](../agents/security-reviewer.md) — authN/authZ, input validation, secrets across everything shipping.
- [`performance-reviewer`](../agents/performance-reviewer.md) — performance regression across the changeset.
- [`test-runner`](../agents/test-runner.md) — full lint/type-check/unit tests/build.
- [`regression-checker`](../agents/regression-checker.md) — adjacent/shared functionality across the combined changeset.
- [`docs-maintainer`](../agents/docs-maintainer.md) — documentation matches what's shipping.

## Optional Agents
- [`accessibility-reviewer`](../agents/accessibility-reviewer.md) — if interactive UI changed in this release.
- [`dependency-auditor`](../agents/dependency-auditor.md) — if a new/updated vendor library is pending in this release.
- [`playwright-tester`](../agents/playwright-tester.md) — if a Playwright suite exists.

## Required Skills
- `release` — invoke it directly; it owns sequencing all agents above (review agents concurrently, then `test-runner`/`playwright-tester` concurrently, then `regression-checker`, then `docs-maintainer`).

## Execution Steps
1. Invoke the `release` Skill.
2. Relay its go/no-go summary — consolidated, not each sub-agent's raw findings.
3. For any blocking finding the user wants to accept rather than fix, get explicit sign-off before treating it as accepted risk.

## Expected Outputs
A go/no-go summary: what was checked, what passed, what risk was explicitly accepted (with reasoning), and any remaining blockers. The Skill verifies readiness only — it does not push, tag, or deploy.

## User Confirmation Points
- **Required**: explicit sign-off on any accepted risk before treating the release as go.
- **Required**: this workflow never performs the actual release action itself.
