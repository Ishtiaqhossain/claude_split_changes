#!/usr/bin/env bash
# Independent corpus entry — sindresorhus/quick-lru (Node; code the author didn't build).
#
# The HARD / *reasoning* case. The skill's split of "add .expiresIn()" is refactor-first:
#   [1] extract a behavior-preserving #getItem seam (test.js byte-unchanged vs base),
#   [2] add the feature on the seam.
# Unlike the cherry-pick entries (which split the maintainers' own commits), the seam here
# was a judgment call — so this is the one corpus entry that exercises the skill's
# decomposition REASONING, not just the harness. The two authored nodes are stored as
# patches alongside this script and replayed, then verified with the project's own runner.
set -euo pipefail
here="$(cd "$(dirname "$0")/../.." && pwd)"
patches="$(cd "$(dirname "$0")/quick-lru" && pwd)"
work="$(mktemp -d)"; trap 'rm -rf "$work"' EXIT

git clone -q https://github.com/sindresorhus/quick-lru "$work/q"
cd "$work/q"
git config user.email corpus@ci.local      # CI runners have no git identity
git config user.name  corpus
npm install --no-audit --no-fund --silent

base="$(git rev-parse '6c0efa5^')"          # before .expiresIn()
git checkout -q -B split "$base"
git apply "$patches/01-refactor.patch"
git commit -q -am "[1/2] refactor: extract #getItem seam (behavior-preserving)"; git tag ql-1-refactor
git apply "$patches/02-feat.patch"
git commit -q -am "[2/2] feat: add .expiresIn() on the seam (+ tests)";          git tag ql-2-feat

# Refactor proof: node 1 must leave test.js byte-unchanged from the base.
if [ -n "$(git diff "$base" ql-1-refactor -- test.js)" ]; then
  echo "refactor node changed test.js — not behavior-preserving"; exit 1
fi
echo "refactor proof: test.js byte-unchanged at the refactor node ✅"

bash "$here/eval/run-eval.sh" "$PWD" "npx ava" ql-1-refactor ql-2-feat
