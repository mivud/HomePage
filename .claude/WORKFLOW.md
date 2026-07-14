# AI Development Workflow

The single source of truth for how Claude should approach development work on this project: the workflow lifecycle, how to invoke a workflow, which Skill to pick for implementation, and the principles that apply across all of it. This document does not duplicate agent responsibilities (see [AGENTS.md](./AGENTS.md)), Skill orchestration steps (see [SKILLS.md](./SKILLS.md) and the `SKILL.md` files under `skills/`), or a workflow's own step-by-step procedure and agent list (see each runbook under [`workflows/`](./workflows/)) — it explains the overall shape, *when* to reach for which stage/Skill, how to invoke one, and the policy that governs all of them.

## Workflow Invocation

Invoke a workflow by naming it explicitly, in this form:

- Run the New Session workflow.
- Run the Feature Planning workflow.
- Run the Feature Implementation workflow.
- Run the Feature Review workflow.
- Run the Testing workflow.
- Run the Documentation workflow.
- Run the End Session workflow.
- Run the Maintenance workflow.
- Run the Pre-Release workflow.
- Run the Refactor workflow.
- Run the Pre-Commit workflow.

Do not rely on short aliases such as "New session," "Plan feature," or "Implement feature" — they are not guaranteed to invoke the intended workflow. Natural-language requests that clearly match a workflow's own Trigger section (in its runbook under [`workflows/`](./workflows/), indexed via [The AI Development Lifecycle](#the-ai-development-lifecycle)) still route to that workflow as before; the explicit form above is the unambiguous way to invoke one by name, and the one to use when a short phrase would be ambiguous between workflows.

The two situational workflows — [`bug-fix.md`](./workflows/bug-fix.md) and [`performance-review.md`](./workflows/performance-review.md) — support the same explicit form ("Run the Bug Fix workflow.", "Run the Performance Review workflow.") but more commonly trigger contextually, from the event itself (a bug report, a reported slowdown), rather than by name.

## Workflow Matrix

A quick command → runbook lookup. Each row's authoritative detail (purpose, trigger phrasing, agents, execution steps) lives in the linked runbook, not here — see [The AI Development Lifecycle](#the-ai-development-lifecycle) below for how these fit together in sequence.

| Invocation | Workflow |
|---|---|
| Run the New Session workflow. | [`workflows/new-session.md`](./workflows/new-session.md) |
| Run the Feature Planning workflow. | [`workflows/feature-planning.md`](./workflows/feature-planning.md) |
| Run the Feature Implementation workflow. | [`workflows/feature-implementation.md`](./workflows/feature-implementation.md) |
| Run the Feature Review workflow. | [`workflows/feature-review.md`](./workflows/feature-review.md) |
| Run the Testing workflow. | [`workflows/testing.md`](./workflows/testing.md) |
| Run the Documentation workflow. | [`workflows/documentation.md`](./workflows/documentation.md) |
| Run the End Session workflow. | [`workflows/end-session.md`](./workflows/end-session.md) |
| Run the Maintenance workflow. | [`workflows/maintenance.md`](./workflows/maintenance.md) |
| Run the Pre-Release workflow. | [`workflows/pre-release.md`](./workflows/pre-release.md) |
| Run the Refactor workflow. | [`workflows/refactor.md`](./workflows/refactor.md) |
| Run the Pre-Commit workflow. | [`workflows/pre-commit.md`](./workflows/pre-commit.md) |
| Run the Bug Fix workflow. (situational — usually contextual) | [`workflows/bug-fix.md`](./workflows/bug-fix.md) |
| Run the Performance Review workflow. (situational — usually contextual) | [`workflows/performance-review.md`](./workflows/performance-review.md) |

## Responsibilities Matrix

The architecture is a linear chain — each layer answers a different question and hands off to the next, with no two layers owning the same responsibility:

```
CLAUDE.md → WORKFLOW.md → workflows/* → AGENTS.md → SKILLS.md
```

| Layer | Role |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Entry point — session bootstrap, global rules, and the Agent First Policy. Holds no project knowledge itself. |
| `WORKFLOW.md` (this file) | Workflow lifecycle, workflow index, and the invocation format — which stage/Skill to use and when, not who does the work. |
| [`workflows/*`](./workflows/) | Workflow execution — runnable procedures that explicitly list and invoke their own Required/Optional Agents and Required Skills, in the right order, with the right gates. This is the only layer that orchestrates agents. |
| [`agents/*`](./agents/) (catalog: [AGENTS.md](./AGENTS.md)) | Agent catalog and specialized task execution — the actual work: reading, analyzing, implementing, reviewing, running commands. |
| [`skills/*`](./skills/) (catalog: [SKILLS.md](./SKILLS.md)) | Skill catalog and implementation pipelines — a reusable, ordered sequence of Agents for a specific development shape (feature, bug fix, refactor, release, etc.), not a coding-style reference. |
| [`docs/*`](../docs/) | Project knowledge — the facts about *this* codebase: architecture, API conventions, coding standards, current status. Referenced by agents/Skills at execution time, not part of the orchestration chain itself. |

- **Workflows are the only place that orchestrate agents.** A `workflows/*.md` runbook names its Required Agents and Optional Agents directly — there is no separate policy document to cross-reference for "which agents does this workflow use."
- **Agents perform the work** — reading, analyzing, writing, reviewing, running commands. **Skills provide implementation guidance** — a repeatable, ordered pipeline of Agents for a development shape; coding standards/conventions themselves live in `docs/DEVELOPER_GUIDE.md`, not in a Skill.
- **Documentation stores project knowledge.** `docs/*` holds facts about this codebase; `CLAUDE.md`/`AGENTS.md`/`SKILLS.md`/`WORKFLOW.md`/`workflows/*` stay generic and project-knowledge-free by design, so the whole `.claude/` directory ports to a new project unchanged (see [Implementation Is the Source of Truth](./CLAUDE.md#implementation-is-the-source-of-truth)).
- **No duplicated responsibilities**: `CLAUDE.md` answers "where do I start and who's in charge of doing the work," `WORKFLOW.md` answers "which stage/Skill, and how do I invoke it," `workflows/*` answers "in what order, with which agents, with what gates," `agents/*`/`AGENTS.md` answer "who does the work," `skills/*`/`SKILLS.md` answer "what's the pipeline," `docs/*` answers "what's true about this project."

## The AI Development Lifecycle

Stages, in the order a task typically moves through them. Each stage is a runnable procedure under [`workflows/`](./workflows/) that explicitly lists and invokes its own Agents/Skills — this table is the map; the linked runbook is the procedure and owns the authoritative agent list.

| # | Stage | Runbook |
|---|---|---|
| 1 | New Session | [`workflows/new-session.md`](./workflows/new-session.md) |
| 2 | Feature Planning | [`workflows/feature-planning.md`](./workflows/feature-planning.md) |
| 3 | Feature Implementation | [`workflows/feature-implementation.md`](./workflows/feature-implementation.md) |
| 4 | Feature Review | [`workflows/feature-review.md`](./workflows/feature-review.md) |
| 5 | Testing | [`workflows/testing.md`](./workflows/testing.md) |
| 6 | Documentation | [`workflows/documentation.md`](./workflows/documentation.md) |
| 7 | Pre-Commit | [`workflows/pre-commit.md`](./workflows/pre-commit.md) |
| 8 | End Session | [`workflows/end-session.md`](./workflows/end-session.md) |
| 9 | Maintenance | [`workflows/maintenance.md`](./workflows/maintenance.md) |
| 10 | Pre-Release | [`workflows/pre-release.md`](./workflows/pre-release.md) |

Not every task runs all ten, and not in strict sequence:
- **Stages 1-8 are the common per-task shape**: bootstrap → (optionally) plan → build → (on request) review/verify/document → (on request) a pre-commit gate → (on request) wrap up. Stages 4-7 only run once the user explicitly approves the implementation and asks for that step — see [Default Development Workflow](#default-development-workflow).
- **Stage 9 (Maintenance)** runs on the schedule in [`ROT.md`](./ROT.md) — session end only if `.claude/`/`docs/` changed, weekly, monthly, before release — not after every task.
- **Stage 10 (Pre-Release)** runs only when a release is imminent, not after every feature.

### Situational Workflows

Two more runbooks handle events that don't fit the linear stage order — they can trigger at any point in a session, usually contextually rather than by explicit invocation (see [Workflow Invocation](#workflow-invocation)):

- [`workflows/bug-fix.md`](./workflows/bug-fix.md) — a reported failure, at any stage.
- [`workflows/performance-review.md`](./workflows/performance-review.md) — a standalone performance audit, independent of a specific feature's review cycle.

[`workflows/refactor.md`](./workflows/refactor.md) is also situational in trigger (any point, only when explicitly requested) but is listed as its own row in the [Workflow Matrix](#workflow-matrix) since it has a canonical explicit-invocation phrase like the linear stages.

## Workflow Decision Tree

The standard per-task lifecycle (Stages 1-8), with failure routing:

```
New Session
  → Feature Planning
  → Feature Implementation
  → Feature Review           (on request)
       ├─ approved       → Testing
       └─ changes needed → back to Feature Implementation
  → Testing                  (on request)
       ├─ pass → Documentation
       └─ fail → Bug Fix → back to Testing
  → Documentation             (on request)
  → Pre-Commit                (on request)
  → End Session               (on request)
```

Maintenance and Pre-Release (Stages 9-10) sit outside this per-task tree — they run on their own schedule/trigger, not as the automatic next step after End Session (see [The AI Development Lifecycle](#the-ai-development-lifecycle) above). Performance Review and Refactor can branch off at any point when their concern — not correctness — is what's driving the request.

## Default Development Workflow

Every development Skill (`feature-development`, `frontend-development`, `bug-fixing`, `refactoring`) follows the same four-step shape by default:

1. **Analyze the request** — understand scope and affected code.
2. **Create an implementation plan, only if requested** — otherwise skip straight to implementation.
3. **Implement** the feature/fix/refactor.
4. **Stop and wait for review.** Report what was built and hand control back — do not continue on to verification or cleanup uninvited.

**After implementation, do not automatically:** run lint, build, unit tests, Playwright/E2E, code review, security/performance/accessibility review, documentation updates, a pre-commit gate, session summaries, TODO updates, or cleanup/refactoring of unrelated code. These all wait for the user to explicitly approve the implementation and ask for that specific next step.

**Once the user approves and asks for a next step**, invoke the matching workflow, which invokes the matching agent(s) — see each runbook's own Required/Optional Agents:

| Requested | Workflow |
|---|---|
| Run lint/build/tests, Playwright/E2E | [`testing.md`](./workflows/testing.md) |
| Code/security/accessibility/performance/integration/regression review | [`feature-review.md`](./workflows/feature-review.md) |
| A pre-commit safety gate before creating a commit | [`pre-commit.md`](./workflows/pre-commit.md) |
| Update documentation | [`documentation.md`](./workflows/documentation.md) |
| Summarize the session | [`end-session.md`](./workflows/end-session.md) |
| Synchronize `.claude/`/`docs/` | [`maintenance.md`](./workflows/maintenance.md) |
| Final release readiness check | [`pre-release.md`](./workflows/pre-release.md) |
| Update TODOs | update the task list directly — no workflow/agent owns this |
| Clean up obsolete files | ask for confirmation first, then clean up |

**Exception — irreversible-action safety gates stay automatic.** `dependency-auditor` (before a new/upgraded dependency lands) is not "verification after the fact" — it gates an irreversible action that's part of implementing the change itself, the same way the [Command Execution Policy](#command-execution-policy) already requires approval before any destructive step. It still runs as part of Phase 1 inside the active implementation Skill, before the irreversible action is taken, regardless of whether broader review was requested.

This default can be overridden by explicit instruction in a given conversation (e.g. "run the full pipeline on this one" or "skip the plan, just implement") — this section describes the default, not an unconditional rule.

## Skill Selection

Which Skill to invoke for Stage 3 (Feature Implementation) and the other Skill-driven stages, by scope:

### Frontend Development
UI work: markup, styles, client-side scripting, layout. Use the `frontend-development` Skill — the default on a project with no backend. Runnable via [`workflows/feature-implementation.md`](./workflows/feature-implementation.md).

### Feature Development
A new feature or nontrivial enhancement broader than a UI-only change (spans multiple pages/sections, touches build/hosting config), or on a project where other layers (backend, API) exist. Use the `feature-development` Skill. This is the general-purpose pipeline — prefer `frontend-development` when the scope cleanly fits UI-only work. Runnable via [`workflows/feature-implementation.md`](./workflows/feature-implementation.md).

### Bug Fixing
A reported failure or unexpected behavior. Use the `bug-fixing` Skill. Root-cause before fixing; never patch the symptom. Runnable via [`workflows/bug-fix.md`](./workflows/bug-fix.md).

### Refactoring
Improving existing code's maintainability without changing behavior. Use the `refactoring` Skill. Only invoke this Skill when refactoring is explicitly requested — never bundle it into feature work uninvited. Runnable via [`workflows/refactor.md`](./workflows/refactor.md), which also covers refactoring the AI ecosystem itself (Agents/Skills/Workflows/docs).

### Testing
Validating existing or just-built behavior without implementing anything new. Use the `testing` Skill. This is what "run lint/build/tests" or "run Playwright/E2E" resolves to once a user asks for it after a development Skill's implementation step — it is never chained on automatically. Runnable via [`workflows/testing.md`](./workflows/testing.md).

### Documentation
Syncing `.claude/CLAUDE.md`/`docs/` with an already-shipped change. Use the `documentation` Skill. Like `testing`, this runs only when the user explicitly asks for docs to be synced — not automatically after every change. Runnable via [`workflows/documentation.md`](./workflows/documentation.md).

### Release
The final readiness gate before a set of changes ships. Use the `release` Skill. Not a substitute for the verification each individual change should already have gone through, and — like every other post-implementation step — only runs when explicitly requested. Runnable via [`workflows/pre-release.md`](./workflows/pre-release.md).

## Agent Delegation

Workflows orchestrate agents directly — they do not perform the work themselves, and there is no separate policy document to consult for which agents apply: each `workflows/*.md` runbook states its own Required Agents, Optional Agents, and Required Skills in full.

- **Implementation should normally be delegated to agents/Skills**, not performed directly in the main conversation, per [CLAUDE.md § Agent First Policy](./CLAUDE.md#agent-first-policy). The parent's role is to run the matching workflow, gate on required confirmations, and merge what comes back.
- **Feature Planning and Feature Implementation should always prefer delegation, even for a relatively small feature**, unless delegation is genuinely unnecessary — a trivial, self-evidently-scoped change (a typo fix, a one-line formatting edit) where invoking an agent would add overhead without adding value. "Small" is not, by itself, a reason to skip delegation; "trivial" is.
- **Every other workflow stage's delegation is likewise defined in its own runbook** — consult that runbook's Required/Optional Agents sections before deciding to do a step's work inline.

## How Agents Collaborate

- **Skills orchestrate, agents execute.** A Skill invokes agents in a defined order; agents don't invoke each other.
- **Analysis and implementation are proactive; review and verification are not.** `impact-analyzer`, `file-reader`, `architect`, and the implementation agents (`ui-engineer`, etc.) run by default as part of Phase 1. `code-reviewer`, `security-reviewer`, `accessibility-reviewer`, `performance-reviewer`, `test-runner`, `playwright-tester`, `qa-tester`, `regression-checker`, `docs-maintainer`, and `context-manager` run only once the user approves the implementation and asks for that step — see [Default Development Workflow](#default-development-workflow).
- **Independent agents can run in parallel.** When two requested steps don't depend on each other's output (e.g. `test-runner` and `docs-maintainer`, once both are asked for), run them concurrently rather than serially.
- **Findings flow forward.** A review agent's (`code-reviewer`, `security-reviewer`, etc.) findings should be resolved — or explicitly deferred with reasoning — before the next verification step, not silently dropped.
- **Investigation precedes action.** `bug-investigator` and `impact-analyzer` exist to establish facts before `refactorer`/implementation touches anything; don't skip straight to a fix or a build.
- **Irreversible-by-nature changes get a dedicated gate, and it stays automatic.** `dependency-auditor` vets a new/updated dependency before it's added. It doesn't apply the change itself — it exists so the human approval step in the [Command Execution Policy](#command-execution-policy) is informed rather than blind, and it is the one exception to "post-implementation steps wait for a request" (see above).
- **The loop closes with documentation, on request.** `docs-maintainer` (via the `documentation` Skill, or as an explicitly-requested step after any development Skill) keeps `.claude/CLAUDE.md`/`docs/` from drifting out of sync with what was just shipped — but only once asked, per the Default Development Workflow.

## Command Execution Policy

Applies whenever a workflow step involves running shell commands — verification (lint/type-check/tests/build), E2E runs, or one-off inspection — across every Skill above.

- **Verification runs only once requested.** Per the [Default Development Workflow](#default-development-workflow), lint/type-check/unit tests/build/Playwright/E2E are not run automatically after implementation. They run when the user explicitly approves the implementation and asks for that step, via `test-runner`/`playwright-tester`.
- **Delegate execution, don't run it inline.** Route shell commands through the matching agent instead of invoking the shell directly from the parent conversation: `terminal-runner` for general/ad-hoc commands, `test-runner` for lint/type-check/unit tests/build, `playwright-tester` for E2E. This is what keeps noisy output out of the parent's context. See [AGENTS.md](./AGENTS.md) for each agent's exact responsibilities and output contract.
- **Batch, don't interrupt, once a step is underway.** Group related, independent commands into one agent invocation rather than stopping between each — a batch of read-only or already-authorized commands should run to completion before anything is reported back. Combine with the parallelism rule above: independent agents (e.g. `test-runner` and `playwright-tester`) run concurrently, not one-at-a-time.
- **Continue automatically within an already-requested step.** Once the user has asked for verification (or any other post-implementation step), keep going through its routine, safe, non-destructive commands without pausing between each one. If a specific command requires explicit approval, request it only for that command, then resume automatically — don't re-prompt for the rest of an already-batched, already-authorized group.
- **Stop and ask before anything destructive or irreversible**, regardless of batching: deleting files/directories, force-overwriting, destructive Git operations (force-push, `reset --hard`, `branch -D`), database schema/migration changes, production-impacting operations, or security-sensitive changes (secrets, auth/permission config). This is the same bar Claude Code's own Git Safety Protocol already applies to git specifically — it extends unchanged to any other irreversible action.
- **Route irreversible-by-nature changes through their review agent before asking for approval to apply them.** A new or upgraded dependency goes through `dependency-auditor` first. This happens automatically as part of implementation (see the exception in [Default Development Workflow](#default-development-workflow)) — the approval question the user then sees should already reflect that review, not skip straight from "here's a new dependency" to "add it?".
- **The parent receives only the output contract, never raw logs:** commands executed, success/failure, warnings, errors, and recommended next actions — exactly what `terminal-runner`/`test-runner`/`playwright-tester` already return per [AGENTS.md](./AGENTS.md). Relay that summary to the user as-is; don't paste underlying tool output unless the user explicitly asks for it.

## Collaboration Principles

- **Delegate to the workflow that owns the task, which then delegates to its listed agents/Skill — proactively for analysis/implementation and on request for everything after.** Invoke `impact-analyzer`/`architect`/implementation agents because they improve the outcome of Phase 1 — but hold `code-reviewer`, `test-runner`, `docs-maintainer`, and the rest until the user asks, per the [Default Development Workflow](#default-development-workflow). Skip delegation entirely for trivial changes (typo fixes, formatting-only edits) — see [Agent Delegation](#agent-delegation).
- **Implementation is the source of truth.** When documentation and code disagree, fix the documentation, not the other way around.
- **Scale the pipeline to the risk, once it's requested.** A typo fix needs no delegation; a change to auth/authorization boundaries or a shared component warrants the full verification set once the user asks for review.
- **One or multiple agents may run for the same task**, including in parallel when they don't depend on each other's output.
- **Optimize for correctness and long-term project quality over minimizing agent/Skill usage** — but never at the cost of running review/verification steps the user hasn't asked for yet.

## Documentation Synchronization Rules

- `docs-maintainer` runs only once the user explicitly asks for docs to be synced (directly, or via the `documentation` Skill) — never automatically right after a change lands. See [Default Development Workflow](#default-development-workflow).
- Every fact should have exactly one canonical home in `docs/`; other documents cross-reference it rather than repeating it.
- Do not document planned/aspirational behavior as already implemented — mark it as planned or a known limitation, consistent with `docs/ROADMAP.md`.

## Context Optimization Principles

- Prefer a narrowly-scoped agent (`file-reader`, `impact-analyzer`) over reading broadly in the main conversation when the task only needs a targeted answer.
- Shell command execution follows the [Command Execution Policy](#command-execution-policy) above — gated on request, then delegated, batched, and summarized rather than run and pasted inline.
- Use `context-manager` only when the user explicitly asks for a session summary or to persist context — not automatically after a task completes.
- Don't re-derive facts already established in this session or already documented — read the relevant `docs/` file instead of re-deriving it from source.
- Each `workflows/*.md` runbook reads only the files its own execution steps name — don't pull in the full `docs/` set or every agent/Skill definition "just in case" (see [Workflow Orchestration Principles](#workflow-orchestration-principles)).

## Workflow Orchestration Principles

Principles specific to the `workflows/` layer — how a workflow runbook should be written and used, as distinct from an Agent or a Skill:

- **Workflows orchestrate; they never re-implement.** A workflow file names which Agents/Skills to invoke, in what order, and with what gates — the actual work and its internal boundaries live in the agent/Skill definitions, never copied into the workflow file.
- **Every workflow explicitly lists its Required Agents and Optional Agents.** "Use the appropriate agents" is not acceptable in a runbook — name them, per the standard structure in [Adding a New Workflow](#adding-a-new-workflow).
- **Prefer invoking a Skill wholesale when one already matches the workflow's shape** (`feature-implementation` → a dev Skill, `testing` → the `testing` Skill, `documentation` → the `documentation` Skill, `pre-release` → the `release` Skill). Only orchestrate agents directly when the workflow is a *slice* of what a Skill does (e.g. `feature-planning` and `feature-review` are the pre- and post- halves of a dev Skill's Phase 1/Phase 2, invoked standalone) or has no matching Skill (e.g. `pre-commit`).
- **Every automatic vs. on-request boundary in [Default Development Workflow](#default-development-workflow) still applies inside every runbook.** No workflow overrides it — `feature-implementation` stops after building; review/verification/docs always wait for an explicit ask.
- **Generic and reusable.** Like `agents/` and `skills/`, `workflows/` describes procedure shape, not project-specific detail — project knowledge comes from what the invoked agents/Skills read from `CLAUDE.md`/`docs/` at execution time.

## Adding a New Workflow

1. Create `workflows/<workflow-name>.md` with the standard sections: Purpose, Trigger, Parent Assistant Responsibilities, Required Agents, Optional Agents, Required Skills, Execution Steps, Expected Outputs, User Confirmation Points.
2. Orchestrate existing Agents/Skills only — if the workflow needs a capability no agent/Skill has, that's a signal to add the agent/Skill first (see [AGENTS.md § Adding a New Agent](./AGENTS.md#adding-a-new-agent) / [SKILLS.md § Adding a New Skill](./SKILLS.md#adding-a-new-skill)), not to inline the logic into the workflow.
3. List every agent the workflow requires or may use directly in that runbook's Required Agents / Optional Agents sections — there is no separate policy document to update.
4. Add a row to [The AI Development Lifecycle](#the-ai-development-lifecycle) table (or the Situational Workflows list, if it doesn't fit the linear stage order), a row to the [Workflow Matrix](#workflow-matrix), and its invocation phrase to [Workflow Invocation](#workflow-invocation).
5. Update [Skill Selection](#skill-selection) if the new workflow changes which Skill a scope maps to.

## Reference

- [AGENTS.md](./AGENTS.md) — every available sub-agent, its purpose, and when to invoke it.
- [SKILLS.md](./SKILLS.md) — every available Skill, its purpose, and its high-level workflow.
- [`workflows/`](./workflows/) — every runnable workflow, indexed in [The AI Development Lifecycle](#the-ai-development-lifecycle) above. Each runbook is the canonical source for its own agent/Skill list.
- [ROT.md](./ROT.md) — the AI-ecosystem maintenance checklist; [`workflows/maintenance.md`](./workflows/maintenance.md) is its runnable entry point.
- [CLAUDE.md](./CLAUDE.md) — the AI bootstrap, global rules, and the Agent First Policy.
- [`docs/AI_CONTEXT.md`](../docs/AI_CONTEXT.md) — compact project restore point for a new session.
