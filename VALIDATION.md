# Validation — turning claims from *asserted* to *observed*

The skill promises that a large change can be split into a stack where **each change builds and
tests on its own**. This file tracks the evidence for that promise across three layers, per the
expert review framework.

## Definition of done

| Item | Status | Evidence |
|------|--------|----------|
| Layer 1 — detector fixture matrix (incl. adversarial) passes in CI | ✅ | [`stack-changes/scripts/detect-review-system.test.sh`](stack-changes/scripts/detect-review-system.test.sh) — 12 cases; CI job `detector`. |
| Layer 2 — decomposition rubric + scoped eval across 2+ build systems | ◑ | Rubric below; applied to the npm and Python stacks (both verified). Full 8–12-repo LLM corpus = ongoing work. |
| Layer 3 — per-revision build/test loop in the skill, demonstrated green on 2+ build systems | ✅ | Skill section "Verify the Stack"; [`scripts/verify-stack.sh`](scripts/verify-stack.sh); transcript below; CI job `verify-stack`. |
| README install commands work as written | ✅ | Clone URL → HTTP 200; repo name `claude_stack_changes`; demo PRs #11–#19 resolve. |
| Detector failure modes + no-script fallback documented | ✅ | `SKILL.md` → "Detecting Your Review System". |

## Layer 3 — observed buildability across build systems

`scripts/verify-stack.sh "<the project's own build+test cmd>" <ref>...` checks out each stack
node, runs the command, and reads the exit code — so it is portable across build systems.

**Python (`demo-py/`, build = `py_compile`, test = `unittest`):**
```
$ bash scripts/verify-stack.sh "cd demo-py && python3 -m py_compile *.py && python3 -m unittest" py-0 py-1 py-2 py-3
ok    py-0
ok    py-1      # refactor — test_report.py byte-unchanged vs py-0 (behavior preserved)
ok    py-2
ok    py-3
ALL GREEN (4 nodes)
```

**npm (`demo/`, build = `npm run build`, test = `npm test`):**
```
$ bash scripts/verify-stack.sh "cd demo && npm run build && npm test" expense-stack/1-model … 8-cli
ok    expense-stack/1-model      … through …
ok    expense-stack/8-cli
ALL GREEN (8 nodes)
```

Both are enforced in CI (job `verify-stack`) on every push, so a regression that breaks a node
fails the build instead of slipping through.

## Layer 2 — decomposition rubric

Grade each Split Plan against:

- [ ] Refactor-only changes are cleanly separated from behavior changes.
- [ ] Dependency order is a valid topological sort — no change references code from a later one.
- [ ] No over-splitting — every change is justifiable in one sentence without citing a later change.
- [ ] The "Test proof" column names a real test at that revision, not a placeholder.
- [ ] The detected review system matches the repo, and the mechanics shown are correct.

Applied to the two worked stacks (npm expense-report, Python report) — both pass. Broadening to
an 8–12-repo corpus across more languages (Go/Cargo/Gradle/Bazel/Django), run 3× each with
per-repo pass rates, is tracked as future work.
