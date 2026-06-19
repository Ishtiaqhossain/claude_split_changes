# Why small, single-thesis changes matter

The motivation behind [`../SKILL.md`](../SKILL.md) — the *why* an executing agent doesn't need
inline (it needs the acceptance tests and the procedure), but a human deciding to adopt the
practice does.

## Empathy for the reviewer
The deepest reason to do this is **empathy for the reviewer.** A small, single-thesis change
respects their attention: it can be reviewed in one sitting, reasoned about completely, and
approved with confidence rather than a reflexive LGTM. A large change is hard to review well —
reviewers skim it, approve it, and miss bugs. A sequence of single-thesis changes is the
opposite: each one is easy to reason about, reverts cleanly, and bisects precisely. As one
senior reviewer put it, small changes are simply *the more empathetic option*.

## At org scale it becomes load-bearing
At the scale of a large engineering org this stops being a nicety and becomes load-bearing.
With thousands of engineers committing to a shared trunk, small single-purpose changes are
what keep **review latency** low, **presubmit/CI cost** bounded, **rollback** surgical, and
**bisection** tractable across an enormous history. Both Meta and Google run effectively one
monorepo each, lean heavily on **stacked changes**, and treat *small* as a cultural default,
not an afterthought. The fuller version of these practices — small-CL culture, presubmit
economics, ownership-aligned splits, feature-gating, land queues, and the LSC escape hatch —
lives in [`at-scale.md`](at-scale.md).

## Split by thesis, not by layer
A change is a *paragraph with a topic sentence*, or a *proof with a single claim*: a reviewer
should be able to state its one thesis in a sentence. The most common bad split ignores this and
carves by **layer** instead:

```
PR 1: add models
PR 2: add utils
PR 3: add tests
PR 4: wire everything
```

PRs 1–3 don't *do* anything a reviewer can evaluate or a user can use — the behavior only appears
in PR 4. "Add tests" with nothing to test, "add models" that nothing calls: these are fragments. A
good split is by *thesis* (e.g. the refactor-first stack), where each change states one thesis and
carries its proof — refactors keep existing tests green, features ship their own tests — so any one
can be reviewed, approved, and rolled back on its own.
