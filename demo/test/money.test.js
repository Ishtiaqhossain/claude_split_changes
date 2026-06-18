import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Money } from '../src/money.js';

test('fromDollars stores integer cents', () => {
  assert.equal(Money.fromDollars(54.2).cents, 5420);
  assert.equal(Money.fromDollars(0.1).cents, 10);
});

test('plus avoids floating-point drift', () => {
  let m = Money.zero();
  for (let i = 0; i < 3; i++) m = m.plus(Money.fromDollars(0.1));
  assert.equal(m.cents, 30);
  assert.equal(m.toString(), '$0.30');
});

test('toString and toNumber', () => {
  assert.equal(Money.fromDollars(86.1).toString(), '$86.10');
  assert.equal(Money.fromDollars(86.1).toNumber(), 86.1);
});
