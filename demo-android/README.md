# reports-android — Android demo

The Android counterpart of [`demo/`](../demo). A tiny, lean Android app (plain `Activity`, no
androidx) whose `Report` renders rows as plain text. The change we want to land is the same one
as the Node demo: **CSV export** — and we land it two ways to demonstrate the
[`splitting-changes-into-prs`](../splitting-changes-into-prs/SKILL.md) skill.

## Build & test

Uses the Gradle wrapper (Gradle 8.9, AGP 8.7.2, Kotlin 2.0.21, `compileSdk 36`). Needs a JDK 17+
and an Android SDK with platform 36.

```bash
cd demo-android
# JDK 21 (e.g. Android Studio's bundled JBR) + the Android SDK:
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"

./gradlew :app:testDebugUnitTest   # run the JVM unit tests (Report/Formatter logic)
./gradlew :app:assembleDebug       # build the debug APK
```

The splittable logic (`Report`, the formatters) is pure Kotlin and unit-tested on the JVM via
`testDebugUnitTest`, so each step in the stack is **testable by itself** without an emulator.

## Before vs. after — the PRs

Same contrast as the Node demo:

| | PR(s) | What a reviewer sees |
|---|---|---|
| **Before** ❌ | one monolith PR | a `Formatter` abstraction + `Report` refactor + CSV feature + share-intent wiring jammed into one commit |
| **After** ✅ | a refactor-first stack of 4 PRs | each PR does one thing, builds + unit-tests on its own, title states its stack position and prerequisite |

The "after" stack:

```
[1/4] refactor: extract Report core into a ReportFormatter seam   (tests unchanged → behavior preserved)
[2/4] refactor: introduce a Formatter registry                    (tests unchanged → behavior preserved)
[3/4] feat: add CsvFormatter behind a flag                        (new CSV unit test; flag off by default)
[4/4] feat: enable CSV export + share intent                      (wires the export button)
```
