import { Money } from './money.js';

// Sum a list of transactions into a Money total.
function sum(rows) {
  return rows.reduce((acc, t) => acc.plus(t.amount), Money.zero());
}

// The query pipeline. Today it is the identity query: a single group holding
// every row in original order, plus the total. Filtering, sorting, and grouping
// land on top of this seam in later changes — callers route through it now.
export function applyQuery(transactions, options = {}) {
  const rows = transactions;
  return { groups: [{ key: null, rows, subtotal: sum(rows) }], total: sum(rows), grouped: false };
}
