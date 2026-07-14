# Workflow: End Session

## Purpose
Close out a session cleanly: persist what's worth persisting, and point to any follow-up work without doing it uninvited.

## Trigger
- "Let's wrap up for today."
- "Summarize this session."
- "What's left before we stop?"
- Only when the user explicitly asks to wrap up, summarize, or asks what's left — never automatically when a task finishes.

## Parent Assistant Responsibilities
- Update the task list directly (no agent owns TODO-list maintenance).
- Surface `documentation.md`/`maintenance.md` as suggested next steps without running them.
- Invoke `context-manager` only when the user explicitly asks for a summary.
- Don't re-read the full session transcript yourself when `context-manager` already covers it; don't fabricate session history if it has no transcript access — ask the parent context for a recap instead of inferring from repo state alone.

## Required Agents
None.

## Optional Agents
- [`context-manager`](../agents/context-manager.md) — only when explicitly asked for a session summary.

## Required Skills
None directly. May recommend (not invoke) `documentation` or [`maintenance.md`](./maintenance.md) as a follow-up if this session changed shipped behavior or `.claude/`/`docs/` content.

## Execution Steps
1. If asked for a summary: invoke `context-manager` for the session summary, durable decisions worth persisting, and a next-session starting point.
2. Update the task list directly (not via an agent) for anything left open.
3. If this session touched `.claude/agents/`, `.claude/skills/`, `.claude/workflows/`, or `docs/`, surface `maintenance.md` as a suggested next step — don't run it.
4. If shipped behavior changed and docs weren't already synced this session, surface `documentation.md` as a suggested next step — don't run it.

## Expected Outputs
A session summary (if requested), an up-to-date task list, and explicit suggestions for follow-up workflows — not their execution. Never modifies source code.

## User Confirmation Points
None — this workflow only reads/summarizes/suggests.
