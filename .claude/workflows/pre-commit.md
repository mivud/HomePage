# Workflow: Pre-Commit

## Purpose
A lightweight safety gate immediately before creating a git commit — catches lint/type errors and obvious correctness issues on the actual diff being committed. Distinct from [`feature-review.md`](./feature-review.md) (the full scope-dependent review roster) and [`pre-release.md`](./pre-release.md) (the full ship-readiness gate across a whole changeset) — this is a fast, always-the-same-shape check scoped to what's about to be committed.

## Trigger
- "Run the Pre-Commit workflow."
- "Let's commit this."
- "Ready to commit?"
- Immediately before the user asks to create a git commit, once implementation (and any requested review/testing) is otherwise done.

## Parent Assistant Responsibilities
- Identify the actual diff about to be committed (staged changes, or the working tree changes the user intends to stage).
- Invoke `test-runner` and `code-reviewer` concurrently against that diff.
- Determine whether `security-reviewer` applies, based on what the diff touches.
- Relay a pass/fail gate result; resolve or explicitly defer any finding before treating the diff as commit-ready.
- Never run `git commit` (or `git add`) itself as part of this workflow — this workflow only assesses readiness; creating the commit is a separate, explicitly-requested action per the Git Safety Protocol.

## Required Agents
- [`test-runner`](../agents/test-runner.md) — lint/type-check (and unit tests, if fast) on the diff about to be committed.
- [`code-reviewer`](../agents/code-reviewer.md) — a quick correctness/quality pass over the same diff.

## Optional Agents
- [`security-reviewer`](../agents/security-reviewer.md) — if the diff touches user input, secrets, or third-party embeds/scripts and hasn't already been security-reviewed this change cycle.

## Required Skills
None directly — standalone agent invocation, not owned by a development Skill's own Phase 2.

## Execution Steps
1. Identify the diff about to be committed.
2. Invoke `test-runner` and `code-reviewer` concurrently against that diff — they don't depend on each other's output.
3. Invoke `security-reviewer` only if its condition above is met and it hasn't already run this change cycle.
4. Consolidate findings; resolve or explicitly defer each one before calling the diff commit-ready — never drop a finding silently.
5. Stop. Report the gate result and hand control back — do not run `git add`/`git commit` as part of this workflow, even if the gate passes cleanly.

## Expected Outputs
A pass/fail gate result: lint/test status, code-review findings (and security findings where applicable), each resolved or explicitly deferred with reasoning. No commit is created by this workflow.

## User Confirmation Points
- Before applying any fix a reviewer recommends.
- Before treating a finding as "deferred" rather than fixed.
- **Required**: this workflow never performs the actual `git add`/`git commit` — that stays a separate, explicitly-requested action.
