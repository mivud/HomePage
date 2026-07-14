# Workflow: Feature Implementation

## Purpose
Build an approved (or self-evidently scoped) feature, then stop for review — never continue on to verification or cleanup uninvited.

## Trigger
- "Build this."
- "Go ahead and implement the plan."
- "Add a small X to Y" (no planning workflow needed first).
- Once a plan is approved via [`feature-planning.md`](./feature-planning.md), or the feature is small/clear enough not to need a separate planning pass.

## Parent Assistant Responsibilities
- Pick the narrowest-fit Skill below and invoke it; relay its handoff summary.
- Per [WORKFLOW.md § Agent Delegation](../WORKFLOW.md#agent-delegation), this is the clearest "always prefer delegation" case in the whole lifecycle — do not implement the feature directly in the main conversation when a Skill/agent chain can do it, even for a small feature, unless the change is trivial enough that delegation is genuinely unnecessary.
- Don't re-derive scope/architecture here if `feature-planning.md` already ran this session — carry its findings into the Skill invocation instead of re-analyzing.

## Required Agents
Exactly one Skill (below) is required, and each Skill's Phase 1 runs these agents automatically — listed here so the required agent set is explicit, not deferred to "the Skill decides":
- **`feature-development`**: `impact-analyzer`, `file-reader`, `architect`, `researcher` (if needed), `ui-engineer`, `dependency-auditor` (if a vendor library is added).
- **`frontend-development`**: `impact-analyzer`, `file-reader`, `ui-engineer`, `dependency-auditor` (if a vendor library is added).

## Optional Agents
None additional at this workflow layer — the invoked Skill's own conditional agents (marked "if" above) are the only optional ones, and are already listed under Required Agents rather than re-derived here.

## Required Skills
Exactly one, picked by scope (see [`WORKFLOW.md § Skill Selection`](../WORKFLOW.md#skill-selection) for the full decision criteria):
- `frontend-development` — UI work: markup, styles, client-side scripting, layout (the default here, since this project has no backend).
- `feature-development` — broader than a UI-only change (spans multiple pages/sections, touches build/hosting config), or doesn't cleanly fit `frontend-development`.

## Execution Steps
1. Pick the narrowest-fit Skill above.
2. Invoke it. It runs its own analyze → implement sequence (its Required Agents above) and stops for review on its own — this workflow adds no extra steps around it.
3. Don't skip the Skill's own irreversible-action gate (`dependency-auditor` before a new/upgraded vendor library lands) — it stays automatic inside the Skill.
4. Relay the Skill's handoff summary to the user.

## Expected Outputs
A working implementation plus the invoked Skill's own handoff summary (files touched, what was reused vs. new, follow-ups). Per the Skill's own Default Development Workflow gate: no lint/build/tests, no code/security/accessibility review, no docs sync — all wait for explicit request after implementation, via [`feature-review.md`](./feature-review.md) / [`testing.md`](./testing.md) / [`documentation.md`](./documentation.md).

## User Confirmation Points
- Before any irreversible action the Skill surfaces (migration, dependency change) — per [WORKFLOW.md § Command Execution Policy](../WORKFLOW.md#command-execution-policy).
- After implementation: none required to *stop* (the Skill stops on its own) — but continuing to `feature-review.md`/`testing.md` needs the user to ask for it.
