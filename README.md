# claude_pr_skills

A Claude Code skill — **[`splitting-changes-into-prs`](splitting-changes-into-prs/SKILL.md)** —
plus worked, **buildable** examples of it in two languages.

> **One diff, one thesis.** Each change should make exactly one argument — and that argument
> should be buildable and testable by itself.

## The skill

[`splitting-changes-into-prs/SKILL.md`](splitting-changes-into-prs/SKILL.md) takes a large
change and carves it into a stack of small, single-thesis units of review. Highlights:

- **One diff, one thesis.** A change is an argument with one topic sentence; the reviewer
  evaluates one claim. "Small" is a *communication* rule, and splitting is, above all, the
  *empathetic* option for the reviewer.
- **Refactor-first.** When a feature needs existing code reshaped, the reshaping ships *before*
  the feature — as its own changes — so the feature lands as a small, obvious diff.
- **Atomic commits ≠ atomic reviews.** The unit of review is the whole diff, so split the
  *reviewable unit* into a **stack** — a clean commit history inside one big PR isn't enough.
- **Tool-agnostic.** Written in neutral terms (a "change") with mappings for GitHub PRs,
  Sapling/Phabricator diffs, and Gerrit CLs — plus the native stacking workflow for each.
- **Built for scale.** Ownership-aligned splits, presubmit economics, feature-gating over long
  branches, right-sizing (don't over-split), and Google's small-CL / review-speed guidance.

## Worked examples — before vs. after

Both demos land the **same change — CSV export — two ways**: as a single monolith, and as the
refactor-first stack the skill prescribes. Every branch was **built and unit-tested on its own**,
so each step is genuinely buildable and testable in isolation. PRs are live on this repo.

| | PR(s) | What a reviewer sees |
|---|---|---|
| **Before** ❌ | one monolith PR | a formatter abstraction + a `Report` refactor + the CSV feature + wiring jammed into one commit — you can't tell safe restructuring from behavior change |
| **After** ✅ | a refactor-first stack of 4 PRs | each PR makes one argument, builds + tests on its own, and its title states its stack position and prerequisite |

<details open>
<summary><b>🟨 JavaScript / Node</b> — <a href="demo/"><code>demo/</code></a></summary>

A tiny Node project: a `Report` module that renders rows as plain text.

```bash
cd demo
npm run build   # syntax-check + run the entry point
npm test        # node --test
```

**Before (monolith):** [#1 feat: add CSV export to reports](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/1)

**After (refactor-first stack):**

| PR | One thing | Proof |
|----|-----------|-------|
| [#2 `[1/4]`](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/2) | extract `Report` core into a seam | tests **unchanged**, green → behavior preserved |
| [#3 `[2/4]`](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/3) | introduce a Formatter registry | tests **unchanged**, green |
| [#4 `[3/4]`](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/4) | add `CsvFormatter` behind a flag | new CSV unit test; flag off → no change |
| [#5 `[4/4]`](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/5) | enable CSV export + wire up CLI | integration test: `--csv` emits CSV |

</details>

<details>
<summary><b>🤖 Android / Kotlin</b> — <a href="demo-android/"><code>demo-android/</code></a></summary>

A lean Android app (plain `Activity`, no androidx): a `Report` rendered in a `TextView`.
Gradle 8.9 / AGP 8.7.2 / Kotlin 2.0.21 / `compileSdk 36`. The splittable logic is pure Kotlin
and unit-tested on the JVM, so each step is testable without an emulator.

```bash
cd demo-android
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"  # any JDK 17+
export ANDROID_HOME="$HOME/Library/Android/sdk"                                 # SDK w/ platform 36

./gradlew :app:testDebugUnitTest   # JVM unit tests (Report / Formatter logic)
./gradlew :app:assembleDebug       # build the debug APK
```

**Before (monolith):** [#6 Android: feat: add CSV export to reports](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/6)

**After (refactor-first stack):**

| PR | One thing | Proof |
|----|-----------|-------|
| [#7 `[1/4]`](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/7) | extract `Report` core into a `ReportFormatter` seam | tests **unchanged**, green → behavior preserved |
| [#8 `[2/4]`](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/8) | introduce a Formatter registry | tests **unchanged**, green |
| [#9 `[3/4]`](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/9) | add `CsvFormatter` behind a `FeatureFlags` gate | new `CsvFormatterTest`; flag off → no change |
| [#10 `[4/4]`](https://github.com/Ishtiaqhossain/claude_pr_skills/pull/10) | enable CSV export + share intent | end-to-end `render("csv")` test |

</details>

## Repository layout

```
splitting-changes-into-prs/SKILL.md   the skill
demo/                                  JavaScript / Node example
demo-android/                          Android / Kotlin example
```

Each language tells the **same story**: the monolith bundles four concerns into one
unreviewable diff; the stack lands them as four single-thesis changes, refactors first, with
the dependency spelled out in every title.
