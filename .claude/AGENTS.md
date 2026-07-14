# Agent Catalog

Every sub-agent under [`agents/`](./agents/) in one place. This catalog summarizes what each agent does so the right one can be picked quickly — it does not duplicate the full definitions (responsibilities, boundaries, workflow, input/output contract); read the linked file for that. For *when to reach for an agent as part of a larger task*, see [WORKFLOW.md](./WORKFLOW.md) — including the ready-to-run procedures under [`workflows/`](./workflows/) — and [SKILLS.md](./SKILLS.md). This document is the per-agent reference those draw on.

All agents run on **Claude Sonnet**, are read-only unless noted, and are generic/reusable across projects — project-specific conventions come from each agent reading `.claude/CLAUDE.md` and `docs/`, not from anything hardcoded in the agent file.

Per [WORKFLOW.md § Default Development Workflow](./WORKFLOW.md#default-development-workflow), analysis/design/implementation agents run proactively as part of Phase 1, but review/verification/documentation agents run only once the user explicitly approves the implementation and asks for that step — each such agent's entry below is marked **(on request)**.

## Core

### `researcher`
- **Purpose:** Research libraries, APIs, RFCs, and best practices before a decision is made.
- **Responsibilities:** Compare approaches, surface trade-offs and risks, prefer official sources.
- **Typical use cases:** Adopting a new library, calling an unfamiliar API, choosing between competing approaches.
- **When to invoke:** Before implementation, whenever the parent needs verified facts instead of a guess.
- **Expected output:** Findings, a recommendation (or explicit judgment call), risks, references.
→ [`agents/researcher.md`](./agents/researcher.md)

### `architect`
- **Purpose:** Review or design architecture before implementation.
- **Responsibilities:** Consistency with existing patterns, reuse, folder organization, state/API/auth design, scalability.
- **Typical use cases:** A medium/large feature, or choosing between structurally different implementation approaches.
- **When to invoke:** Before writing code for anything nontrivial.
- **Expected output:** Architecture overview, recommended implementation, trade-offs, risks. Advisory only — no code.
→ [`agents/architect.md`](./agents/architect.md)

### `file-reader`
- **Purpose:** Read only the minimum set of files needed to answer a specific question.
- **Responsibilities:** Locate relevant files, summarize what matters, identify dependencies, rule out irrelevant files.
- **Typical use cases:** The parent needs codebase context but wants to avoid burning its own context window.
- **When to invoke:** Any time a targeted lookup is cheaper than reading broadly in the main conversation.
- **Expected output:** Files reviewed and why, key details, dependencies, files that don't need changes.
→ [`agents/file-reader.md`](./agents/file-reader.md)

### `impact-analyzer`
- **Purpose:** Map the blast radius of a proposed change before implementation.
- **Responsibilities:** Affected modules/services/components/APIs/docs, regression risk, complexity estimate.
- **Typical use cases:** Starting a nontrivial feature, bug fix, or refactor in an unfamiliar area.
- **When to invoke:** Before implementation, especially when scope is uncertain.
- **Expected output:** Affected files/modules, regression risks, suggested order, scope estimate.
→ [`agents/impact-analyzer.md`](./agents/impact-analyzer.md)

### `code-reviewer` (on request)
- **Purpose:** Independent senior-engineer review of a diff or feature.
- **Responsibilities:** Bugs, edge cases, security, maintainability, type safety, convention consistency.
- **Typical use cases:** After any nontrivial code change, before calling a task done.
- **When to invoke:** Only once the user has approved the implementation and asks for a review — never automatically right after implementation.
- **Expected output:** Ranked findings with file/line and concrete impact. Read-only.
→ [`agents/code-reviewer.md`](./agents/code-reviewer.md)

### `qa-tester` (on request)
- **Purpose:** Validate a feature the way a QA engineer trying to break it would.
- **Responsibilities:** Functional, negative, and edge-case scenarios; auth/authz; loading/empty/error states.
- **Typical use cases:** A feature is complete or existing behavior changed.
- **When to invoke:** Only once the user asks for QA validation after approving the implementation.
- **Expected output:** Scenarios, expected vs. actual results, likely root causes for failures. Read-only.
→ [`agents/qa-tester.md`](./agents/qa-tester.md)

### `docs-maintainer` (on request)
- **Purpose:** Keep `.claude/CLAUDE.md` and `docs/` synchronized with the actual implementation.
- **Responsibilities:** Detect drift, fix it, fill genuine gaps, eliminate duplication via cross-references.
- **Typical use cases:** After a feature/refactor/architecture change lands.
- **When to invoke:** Only once the user explicitly asks for documentation to be synced — never automatically after a change lands.
- **Expected output:** Updated docs, gaps flagged, inconsistencies found. Documentation only — never source code.
→ [`agents/docs-maintainer.md`](./agents/docs-maintainer.md)

### `context-manager` (on request)
- **Purpose:** Keep long-running sessions manageable.
- **Responsibilities:** Recommend what to persist into docs, what to drop, when to start a fresh session.
- **Typical use cases:** A major task just finished, or the session has accumulated a lot of history.
- **When to invoke:** Only when the user explicitly asks for a session summary — not automatically at the end of a task.
- **Expected output:** Session summary, durable decisions, doc-update suggestions, next-session starting point. Never modifies source code.
→ [`agents/context-manager.md`](./agents/context-manager.md)

### `refactorer`
- **Purpose:** Improve maintainability without changing behavior.
- **Responsibilities:** Deduplicate, extract reusable pieces, improve naming/readability.
- **Typical use cases:** Explicitly requested cleanup of an existing area.
- **When to invoke:** Only when refactoring is explicitly requested — never bundled into feature work uninvited.
- **Expected output:** Summary of changes, files touched, verification results, confirmation behavior is unchanged.
→ [`agents/refactorer.md`](./agents/refactorer.md)

### `performance-reviewer` (on request)
- **Purpose:** Review rendering, bundling, data-fetching, and framework-level performance.
- **Responsibilities:** Memoization, lazy/dynamic loading, bundle size, API efficiency, caching.
- **Typical use cases:** A feature is functionally complete, or a specific performance concern was raised.
- **When to invoke:** Only once the user asks to optimize/review performance after approving the implementation.
- **Expected output:** Findings by category with severity; recommendations only, unless implementation is explicitly requested.
→ [`agents/performance-reviewer.md`](./agents/performance-reviewer.md)

### `test-runner` (on request)
- **Purpose:** Run lint/type-check/unit tests/build and report a concise result.
- **Responsibilities:** Execute checks, filter noise, surface only real errors/warnings.
- **Typical use cases:** After a code change, before calling a task done.
- **When to invoke:** Only once the user asks to run lint/build/tests — not automatically after every code change.
- **Expected output:** Pass/fail per check, key errors with file:line, next-step suggestions. Never raw logs by default.
→ [`agents/test-runner.md`](./agents/test-runner.md)

### `playwright-tester` (on request)
- **Purpose:** Run Playwright E2E tests and summarize results.
- **Responsibilities:** Execute tests, capture screenshots/traces/console errors on failure.
- **Typical use cases:** A UI feature was implemented and E2E coverage exists or should be run.
- **When to invoke:** Only once the user asks to run Playwright/E2E — not automatically after UI changes.
- **Expected output:** Pass/fail per test, failure evidence, likely root cause, recommended fixes. Never modifies application code.
→ [`agents/playwright-tester.md`](./agents/playwright-tester.md)

### `terminal-runner`
- **Purpose:** General-purpose CLI command execution with a concise summary.
- **Responsibilities:** Run the requested command(s), summarize results, flag destructive commands instead of running them unauthorized.
- **Typical use cases:** A one-off inspection command that doesn't fit a more specific agent.
- **When to invoke:** Any ad-hoc command the parent needs run without spending its own context on raw output.
- **Expected output:** Command(s) run, result summary, key output, follow-up suggestions.
→ [`agents/terminal-runner.md`](./agents/terminal-runner.md)

### `bug-investigator`
- **Purpose:** Root-cause a reported failure.
- **Responsibilities:** Analyze stack traces/console logs/API responses, trace the actual call path, verify via reproduction where feasible.
- **Typical use cases:** A bug report, or an unexpected test/build failure.
- **When to invoke:** Before writing a fix — root cause first, patch second.
- **Expected output:** Root cause with evidence and confidence level, alternatives ruled out, recommended fix (not applied).
→ [`agents/bug-investigator.md`](./agents/bug-investigator.md)

### `regression-checker` (on request)
- **Purpose:** Check a completed change for regressions in adjacent functionality.
- **Responsibilities:** Other consumers of changed shared code, auth/authorization paths, shared components/services.
- **Typical use cases:** A change touched shared/reusable code.
- **When to invoke:** Only once the user approves the implementation and asks for a regression check.
- **Expected output:** Affected consumers, regression risks ranked confirmed vs. theoretical, suggested regression tests. Read-only.
→ [`agents/regression-checker.md`](./agents/regression-checker.md)

### `dependency-auditor`
- **Purpose:** Vet a third-party dependency addition or upgrade before it lands.
- **Responsibilities:** Known vulnerabilities, license risk, maintenance health, bundle/footprint cost, breaking-change scope for version bumps.
- **Typical use cases:** Adding a new package, or bumping a version (especially a major).
- **When to invoke:** Before the install/upgrade is applied.
- **Expected output:** Vulnerability/license/maintenance findings, breaking-change impact, a proceed/defer/alternative recommendation. Recommendations only unless implementation is explicitly requested.
→ [`agents/dependency-auditor.md`](./agents/dependency-auditor.md)

## Frontend

### `ui-engineer`
- **Purpose:** Implement UI — components, forms, dialogs, tables, dashboards, layout.
- **Responsibilities:** Reuse existing components/primitives first, follow the design system, handle all UI states.
- **Typical use cases:** A feature requires new or modified UI.
- **When to invoke:** Any UI implementation task.
- **Expected output:** Components built/modified, what was reused vs. new, states handled, follow-ups.
→ [`agents/ui-engineer.md`](./agents/ui-engineer.md)

### `accessibility-reviewer` (on request)
- **Purpose:** Dedicated accessibility review of implemented UI.
- **Responsibilities:** Semantic structure, keyboard navigation, focus management, ARIA usage, color contrast, screen-reader behavior.
- **Typical use cases:** UI implementation complete, especially forms, dialogs, tables, navigation.
- **When to invoke:** Only once the user approves the implementation and asks for an accessibility pass.
- **Expected output:** Findings by category with WCAG reference, verified-vs-reasoned distinction, recommended fixes. Recommendations only unless implementation is explicitly requested.
→ [`agents/accessibility-reviewer.md`](./agents/accessibility-reviewer.md)

## Cross-Cutting

### `security-reviewer` (on request)
- **Purpose:** Review client-side security.
- **Responsibilities:** Input handling, secrets/keys in source, common web vulnerabilities (XSS, insecure third-party embeds), CORS/mixed-content issues, dependency vulnerabilities in vendored libraries.
- **Typical use cases:** Shipping a change that touches user input, embeds, or third-party scripts.
- **When to invoke:** Only once the user approves the implementation and asks for a security review.
- **Expected output:** Findings by category with a concrete attacker scenario per finding. Recommendations only unless implementation is explicitly requested.
→ [`agents/security-reviewer.md`](./agents/security-reviewer.md)

## Adding a New Agent

1. Create `agents/<agent-name>.md` with frontmatter (`name`, `description`, `model: sonnet`, `tools`) and the standard sections (Purpose, Responsibilities, Workflow, Boundaries, Input Expectations, Output Format).
2. Keep it generic and reusable — project-specific behavior comes from the agent reading `.claude/CLAUDE.md`/`docs/`, not from anything hardcoded in the file.
3. Grant the minimum tools needed; default to read-only.
4. Add a catalog entry here under the closest-matching category.
5. Update [WORKFLOW.md](./WORKFLOW.md), the relevant `SKILL.md`, and/or the relevant `workflows/*.md` runbook if the new agent changes a default pipeline.
