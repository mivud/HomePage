# Workflow: Bug Fix

## Purpose
Root-cause a reported failure and fix the actual cause, not the symptom.

## Trigger
- "This is throwing an error when I do X."
- "Test Y started failing and I don't know why."
- A pasted stack trace or failed CI log.
- A bug report, stack trace, console error, or unexpected test/build failure, at any point in a session.

## Parent Assistant Responsibilities
- Never skip straight to a patch without an established root cause.
- Confirm the approach with the user before applying a fix that's non-obvious or touches shared code.
- Let `bug-investigator` establish the cause once; don't re-investigate from scratch in a follow-up agent.

## Required Agents
Run automatically via the `bug-fixing` Skill's Phase 1:
- [`bug-investigator`](../agents/bug-investigator.md) — always first, to establish root cause before any fix.

## Optional Agents
- [`impact-analyzer`](../agents/impact-analyzer.md) — only if the fix isn't obviously localized to one file.
- [`file-reader`](../agents/file-reader.md) — targeted context beyond what the investigation already surfaced.

## Required Skills
- `bug-fixing` — invoke it directly once root cause is understood; it owns the fix-and-stop sequence.

## Execution Steps
1. Invoke `bug-fixing`, which runs `bug-investigator` first — never skip straight to a patch.
2. `impact-analyzer`/`file-reader` fill in scope/context only if the fix isn't obviously contained to one file/function.
3. If the root cause and fix approach are non-obvious or touch shared code, confirm the approach before it's applied.
4. The Skill implements the fix and stops for review on its own.

## Expected Outputs
Root cause (with evidence and confidence level) + the fix + a handoff summary. Verification (does the original failure now reproduce-fail?) happens only once requested, via [`testing.md`](./testing.md). Documentation is updated only if the fix changes documented behavior and the user asks for a docs sync.

## User Confirmation Points
- Before applying a fix whose approach is non-obvious or touches shared/reusable code.
