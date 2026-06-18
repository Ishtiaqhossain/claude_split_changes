import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyQuery } from '../src/query.js';
import { toTransactions } from '../src/transaction.js';
import { getFormatter, formatNames } from '../src/formatters/index.js';

const tx = toTransactions([
  { date: '2026-01-03', category: 'Groceries', description: 'Apples', amount: 10 },
  { date: '2026-01-10', category: 'Dining', description: 'Lunch', amount: 20 },
]);
const result = applyQuery(tx);

test('registry exposes the text format', () => {
  assert.deepEqual(formatNames(), ['text']);
});

test('text formatter renders rows and a total', () => {
  const out = getFormatter('text').format('Expenses', result);
  assert.match(out, /^Expenses\n=+/);
  assert.match(out, /2026-01-03  Groceries  Apples  \$10\.00/);
  assert.match(out, /TOTAL  \$30\.00/);
});

test('unknown format throws', () => {
  assert.throws(() => getFormatter('pdf'), /Unknown format/);
});
