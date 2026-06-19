# Repository map — start here if it feels like a lot

This repo is **one small skill wearing a large evidence jacket.** Hold these two layers apart and
the whole thing gets simple.

> **To *use* the skill, you only need `stack-changes/`. Everything else just proves it works.**

## Layer 1 — the product (this is the skill)
| Path | What it is |
|------|------------|
| `stack-changes/SKILL.md` | the instructions the agent runs |
| `stack-changes/reference/*.md` | overflow detail read on demand (why, terminology, at-scale, rationalizations, further-reading) |
| `stack-changes/scripts/detect-review-system.sh` (+ `.test.sh`) | detects GitHub / Sapling / Gerrit / … so the stacking mechanics fit the repo |

Install = copy `stack-changes/` into `~/.claude/skills/`. Nothing below is required for that.

## Layer 2 — the evidence (everything else; optional)
Exists only to show Layer 1 is trustworthy. Each piece answers one reviewer question:

| Path | What it is | Answers |
|------|------------|---------|
| `demo/`, `demo-split/`, `demo-py/` | worked before/after splits (npm + Python) | "show me an example" |
| `scripts/verify-stack.sh` | checks out each split node and builds + tests it | "prove each PR stands alone" |
| `eval/` | grades splits of real *outside* repos (yocto-queue, quick-lru) | "prove it works on repos you didn't build" |
| `VALIDATION.md` | tracks every claim → its proof (asserted → observed) | "is it really validated?" |
| `.github/workflows/ci.yml` | runs all the proofs on every push | keep them honest over time |
| `README.md`, `assets/` | the storefront | presentation |

## If you want to…
- **use / change the skill** → `stack-changes/SKILL.md` (and re-`cp` to `~/.claude/skills/`)
- **see it in action** → `demo/` (npm) or `demo-py/` (Python)
- **check what's proven** → `VALIDATION.md`
- **understand why it's structured this way** → you're reading it
