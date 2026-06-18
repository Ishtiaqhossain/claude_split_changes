import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const run = (...args) =>
  execFileSync('node', ['src/index.js', ...args], { encoding: 'utf8' }).trim();

test('CLI renders text by default', () => {
  assert.equal(run(), 'Sales\n=====\nApples: 120\nOranges: 90');
});

test('CLI --csv exports CSV end to end', () => {
  assert.equal(run('--csv'), 'label,value\nApples,120\nOranges,90');
});
