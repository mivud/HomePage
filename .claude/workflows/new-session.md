# Workflow: New Session

## Purpose
Prime a fresh session with just enough context to route the incoming task correctly, without reading more than necessary.

## Trigger
- First message of a new conversation.
- "Let's pick up where we left off."
- "I need you to work on X" as the opening ask of a session.
- Picking up a task after a long gap, before any analysis or implementation begins.

## Parent Assistant Responsibilities
- Perform the fixed-order bootstrap reads directly (Execution Steps 1-4) — no agent owns this fixed sequence, so this is the [Agent First Policy](../CLAUDE.md#agent-first-policy)'s "no suitable agent exists" case.
- Identify which `workflows/*.md` runbook matches the incoming task and hand off to it, using the invocation format in [WORKFLOW.md § Workflow Invocation](../WORKFLOW.md#workflow-invocation).
- Never read all of `docs/` — only the index-matched file(s) for the task at hand — and never re-read a file already covered earlier in the same session.

## Required Agents
None. This workflow is a fixed reading order, not agent orchestration.

## Optional Agents
- [`file-reader`](../agents/file-reader.md) — only if the task needs targeted codebase context beyond what `CLAUDE.md`/`AI_CONTEXT.md`/`FRAMEWORK_NOTES.md` already provide. Prefer it over reading broadly yourself.

## Required Skills
None. Session bootstrap always precedes picking a Skill; it does not invoke one itself.

## Execution Steps
1. Read `.claude/CLAUDE.md` (bootstrap — never project knowledge itself).
2. Read `docs/AI_CONTEXT.md` (current status, key decisions, known limitations, priorities).
3. Read `docs/FRAMEWORK_NOTES.md` before touching any framework/platform-specific API.
4. Read only the specific `docs/*.md` file(s) relevant to the incoming task, per `CLAUDE.md`'s Documentation Index — not the whole set.
5. Identify which `workflows/*.md` runbook matches the task (see [WORKFLOW.md § The AI Development Lifecycle](../WORKFLOW.md#the-ai-development-lifecycle)) and hand off to it. Do not start implementing, and do not run tests/builds/lint, before this bootstrap completes.

## Expected Outputs
No file changes. A session that knows current project status, the applicable doc(s), and which workflow to run next.

## User Confirmation Points
None — this is read-only orientation.
