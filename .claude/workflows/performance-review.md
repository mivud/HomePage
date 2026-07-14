# Workflow: Performance Review

## Purpose
A dedicated performance audit — rendering, bundling, data-fetching, framework-level concerns — outside the context of a specific feature's review cycle.

## Trigger
- "Why is this page slow?"
- "Audit our bundle size."
- "Review performance before we ship this."
- A standalone performance audit request or bundle-size concern, at any point in a session. For a performance check as part of reviewing a just-shipped feature, `performance-reviewer` is already an optional agent inside [`feature-review.md`](./feature-review.md) — use this workflow when performance is the primary ask, not a feature-review add-on.

## Parent Assistant Responsibilities
- Decide whether this is a targeted regression (root-cause first) or a general audit.
- Present findings ranked by category/severity.
- Never apply a suggested optimization without asking first.
- Reuse existing build/profiler output instead of re-running a full build if recent output already exists.

## Required Agents
- [`performance-reviewer`](../agents/performance-reviewer.md) — primary; analyzes rendering/bundling/data-fetching/caching using real tooling (bundle analyzer, build output, profiler) where available.

## Optional Agents
- [`bug-investigator`](../agents/bug-investigator.md) — only if a specific regression/slow-down needs root-causing first, rather than a general audit.
- [`test-runner`](../agents/test-runner.md) — only if build/bundle-analyzer output is needed as evidence and isn't already available.

## Required Skills
None directly — standalone agent invocation. (`release` includes `performance-reviewer` automatically as part of its own concurrent review pass — don't duplicate that separately right before a release check; use [`pre-release.md`](./pre-release.md) instead.)

## Execution Steps
1. If a specific slowdown was reported (not a general audit), root-cause it with `bug-investigator` first.
2. Invoke `performance-reviewer` to analyze rendering/bundling/data-fetching/caching.
3. `test-runner` only if fresh build/bundle-analyzer output is needed as evidence.
4. Present findings by category with severity and trade-offs. Don't chase micro-optimizations without measured evidence, and don't introduce a new library/tool to solve something the existing stack already handles.

## Expected Outputs
Findings ranked by category/severity with trade-offs. Recommendations only — no fix applied unless separately requested (the agent is write-capable but defaults to reporting).

## User Confirmation Points
- Before applying any suggested optimization.
