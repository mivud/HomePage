# Workflow: Feature Review

## Purpose
Run the review pass a completed change actually needs — no more, no less — once the user asks for it.

## Trigger
- "Review this."
- "Is this safe to merge?"
- "Check what you just built for bugs/security issues."
- After [`feature-implementation.md`](./feature-implementation.md) (or any other implementation workflow), only once the user explicitly approves the implementation and asks for review.

## Parent Assistant Responsibilities
- Identify what changed and which layers/concerns it touches.
- Determine which Optional Agents below apply — don't run the full roster reflexively.
- Invoke the selected set concurrently, not serially.
- Consolidate findings ranked by severity and ensure each is resolved or explicitly deferred — never dropped silently.

## Required Agents
- [`code-reviewer`](../agents/code-reviewer.md) — always, for any nontrivial change.

## Optional Agents
Select only the ones relevant to what changed, then run the selected set **concurrently** alongside `code-reviewer`:
- [`security-reviewer`](../agents/security-reviewer.md) — if the change touches user input, embeds, or third-party scripts.
- [`accessibility-reviewer`](../agents/accessibility-reviewer.md) — if interactive UI was added/changed.
- [`performance-reviewer`](../agents/performance-reviewer.md) — if a performance concern was raised (or see [`performance-review.md`](./performance-review.md) for a dedicated pass).
- [`regression-checker`](../agents/regression-checker.md) — if shared/reusable code was touched.

## Required Skills
None directly. This is the Phase 2 review slice already defined inside `feature-development` / `frontend-development` (see each Skill's `SKILL.md`), run here as a standalone entry point when the user asks for review specifically.

## Execution Steps
1. Identify what changed and which layers/concerns it touches.
2. Select the applicable subset of Optional Agents above — don't run all of them by default.
3. Invoke `code-reviewer` plus the selected agents in parallel, not serially.
4. Consolidate findings, ranked by severity; resolve or explicitly defer each one — never drop a finding silently. Don't apply any suggested fix without asking first.

## Expected Outputs
A ranked findings list with each item resolved or explicitly deferred with reasoning. All review agents here are read-only by default — no fixes are applied unless separately requested. Running the test suite is out of scope here — that's [`testing.md`](./testing.md); touching documentation is out of scope here — that's [`documentation.md`](./documentation.md).

## User Confirmation Points
- Before applying any fix a reviewer recommends.
- Before treating a finding as "deferred" rather than fixed, when severity is ambiguous.
