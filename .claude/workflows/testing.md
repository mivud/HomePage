# Workflow: Testing

## Purpose
Validate existing or just-implemented behavior without building anything new.

## Trigger
- "Run the tests."
- "Run lint/build and make sure this passes."
- "Run the E2E suite."
- Only when the user explicitly asks for verification — never automatically after implementation.

## Parent Assistant Responsibilities
- Invoke the `testing` Skill and relay its concise pass/fail summary with evidence.
- Never run lint/build/test commands directly via a shell tool in the main conversation — that's what `test-runner`/`playwright-tester` are for.
- Don't fix a discovered failure here — hand off to [`bug-fix.md`](./bug-fix.md).

## Required Agents
The `testing` Skill runs these based on scope — listed here so the set is explicit:
- [`test-runner`](../agents/test-runner.md) — lint/type-check/unit tests/build; always runs.
- [`playwright-tester`](../agents/playwright-tester.md) — if a Playwright suite exists and the scope is UI/E2E.
- [`qa-tester`](../agents/qa-tester.md) — functional/negative/edge-case scenarios for the feature/area in scope.

## Optional Agents
- [`accessibility-reviewer`](../agents/accessibility-reviewer.md) — if the scope is interactive UI.
- [`regression-checker`](../agents/regression-checker.md) — if the scope includes a recent change to shared code.

## Required Skills
- `testing` — invoke it directly; it owns agent selection and sequencing.

## Execution Steps
1. Invoke the `testing` Skill.
2. `test-runner` and `playwright-tester` don't depend on each other's output — they run together, not sequentially.
3. Delegate command execution to the Skill's agents rather than running commands inline; don't paste full logs into the conversation unless the user asks for them.
4. Relay the Skill's concise pass/fail summary with evidence.

## Expected Outputs
Pass/fail per check, concrete evidence (file:line, scenario, failure detail), next-step suggestions. Never raw logs by default.

## User Confirmation Points
None to *run* verification once explicitly requested. If a failure needs a fix, that's a new, separately-confirmed `bug-fix.md` invocation.
