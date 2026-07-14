# Skill Catalog

Every Skill under [`skills/`](./skills/) in one place. Skills coordinate agents; agents perform the work. This catalog summarizes purpose and high-level shape — the exact agent sequence, completion criteria, and expected output for each Skill live in its own `SKILL.md`, not here.

See [WORKFLOW.md](./WORKFLOW.md) for which Skill to reach for given a task, how the agents inside a Skill collaborate, and the [`workflows/`](./workflows/) runbooks that invoke these Skills at the right moment in a session. See [AGENTS.md](./AGENTS.md) for what each agent a Skill invokes actually does.

### `feature-development`
- **Purpose:** End-to-end pipeline for a new feature or nontrivial enhancement, general-purpose beyond what `frontend-development` covers.
- **When to use:** Medium/large scope, or a change that doesn't cleanly fit `frontend-development` (e.g. touches build/hosting config or spans multiple pages/sections).
- **High-level workflow:** Scope impact → architecture review → plan (if requested) → implement → dependency safety check where relevant → **stop for review**. Only once approved and asked: review from multiple angles (code, security, accessibility where relevant) → verify (tests, QA, regression) → sync docs.
- **Expected outcome:** A working, reviewed feature — review/verification/docs happen on request, per [WORKFLOW.md § Default Development Workflow](./WORKFLOW.md#default-development-workflow).
→ [`skills/feature-development/SKILL.md`](./skills/feature-development/SKILL.md)

### `frontend-development`
- **Purpose:** UI feature work.
- **When to use:** Components, sections, pages, layout, styling — the default Skill for this project, since it has no backend.
- **High-level workflow:** Scope impact → implement UI (reusing existing components) → **stop for review**. Only once approved and asked: code/performance/accessibility review → verify → sync docs.
- **Expected outcome:** UI consistent with the existing design system, all states handled — verification happens on request.
→ [`skills/frontend-development/SKILL.md`](./skills/frontend-development/SKILL.md)

### `bug-fixing`
- **Purpose:** Root-cause and fix a reported failure.
- **When to use:** A bug report, stack trace, or unexpected test/build failure.
- **High-level workflow:** Investigate root cause → scope impact → fix → **stop for review**. Only once approved and asked: code review → verify → confirm no regression.
- **Expected outcome:** The actual root cause is fixed (not the symptom) — verification and docs updates happen on request.
→ [`skills/bug-fixing/SKILL.md`](./skills/bug-fixing/SKILL.md)

### `testing`
- **Purpose:** Validate existing or just-implemented behavior without building anything new.
- **When to use:** Standalone validation, always on explicit request — this is what a development Skill's implementation phase hands off to once the user approves it and asks for verification, never automatically.
- **High-level workflow:** Run automated verification → generate/execute test scenarios → check for regressions.
- **Expected outcome:** A concise pass/fail report with concrete evidence, never raw logs.
→ [`skills/testing/SKILL.md`](./skills/testing/SKILL.md)

### `refactoring`
- **Purpose:** Improve maintainability without changing behavior.
- **When to use:** Only when refactoring is explicitly requested.
- **High-level workflow:** Validate approach → refactor → **stop for review**. Only once approved and asked: review → verify behavior is unchanged → confirm no regression.
- **Expected outcome:** Cleaner code with identical observable behavior — proof of that comes once verification is requested.
→ [`skills/refactoring/SKILL.md`](./skills/refactoring/SKILL.md)

### `documentation`
- **Purpose:** Sync docs with an already-shipped change.
- **When to use:** Only when explicitly requested — after a change lands via another Skill or directly, or as a standalone drift audit. This is the Skill the "update documentation" step of [WORKFLOW.md § Default Development Workflow](./WORKFLOW.md#default-development-workflow) resolves to; it is never chained on automatically.
- **High-level workflow:** Compare docs against implementation → fix drift → eliminate duplication → summarize.
- **Expected outcome:** `.claude/CLAUDE.md`/`docs/` accurately reflect the current implementation, with no new duplication introduced.
→ [`skills/documentation/SKILL.md`](./skills/documentation/SKILL.md)

### `release`
- **Purpose:** Final readiness gate before a set of changes ships.
- **When to use:** Only when explicitly requested, before release — not a substitute for per-change verification, and not run automatically after any single change.
- **High-level workflow:** Full code/security/performance/accessibility review, plus a final pass on any new dependency → full test run → regression check → docs check.
- **Expected outcome:** A go/no-go summary with any accepted risk explicitly reasoned, not silently ignored.
→ [`skills/release/SKILL.md`](./skills/release/SKILL.md)

## Design Principles

- **Skills orchestrate, agents execute.** A `SKILL.md` reads like a runbook — it doesn't re-implement what an agent already does.
- **Generic and reusable.** Skills describe a workflow shape; project-specific detail comes from agents reading `.claude/CLAUDE.md`/`docs/` at execution time.
- **Concise by default.** The parent conversation should receive summarized results, not raw agent output.
- **Scale to the task.** Every Skill's steps can be skipped when they don't apply to a small or narrowly-scoped change.

## Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md` with frontmatter (`description` at minimum) covering: when to use it, participating agents, execution order, completion criteria, expected output.
2. Keep it generic — reference `.claude/CLAUDE.md`/`docs/` for project-specific detail.
3. Add a catalog entry above.
4. Update [WORKFLOW.md](./WORKFLOW.md) if it changes which Skill should be picked for a given task type, and the relevant `workflows/*.md` runbook if it changes which workflow invokes it.
