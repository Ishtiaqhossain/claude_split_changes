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

test('compareTo orders amounts', () => {
  assert.ok(Money.fromDollars(10).compareTo(Money.fromDollars(20)) < 0);
  assert.ok(Money.fromDollars(20).compareTo(Money.fromDollars(10)) > 0);
  assert.equal(Money.fromDollars(5).compareTo(Money.fromDollars(5)), 0);
});

test('minus can go negative and renders with a leading minus', () => {
  const r = Money.fromDollars(10).minus(Money.fromDollars(30));
  assert.equal(r.cents, -2000);
  assert.equal(r.toString(), '-$20.00');
});

test('percentOf is rounded and zero-safe', () => {
  assert.equal(Money.fromDollars(94).percentOf(Money.fromDollars(80)), 118);
  assert.equal(Money.fromDollars(5).percentOf(Money.zero()), 0);
});

test('isGreaterThan compares amounts', () => {
  assert.ok(Money.fromDollars(20).isGreaterThan(Money.fromDollars(10)));
  assert.ok(!Money.fromDollars(10).isGreaterThan(Money.fromDollars(20)));
});
