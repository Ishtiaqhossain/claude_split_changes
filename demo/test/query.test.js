import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyQuery } from '../src/query.js';
import { toTransactions } from '../src/transaction.js';

const rows = toTransactions([
  { date: '2026-01-03', category: 'Groceries', description: 'Supermarket', amount: 54.20 },
  { date: '2026-01-05', category: 'Transport', description: 'Bus pass', amount: 30.00 },
]);

test('identity query: one group with every row and the correct total', () => {
  const result = applyQuery(rows);
  assert.equal(result.grouped, false);
  assert.equal(result.groups.length, 1);
  assert.equal(result.groups[0].rows.length, 2);
  assert.equal(result.total.toString(), '$84.20');
});
