import { Money } from './money.js';

// Sum a list of transactions into a Money total.
function sum(rows) {
  return rows.reduce((acc, t) => acc.plus(t.amount), Money.zero());
}

// Turn a list of Transactions into a QueryResult that formatters render:
//
//   { groups: [ { key, rows, subtotal } ], total, grouped }
//
// Supports filtering by date range, category, and minimum amount. With no
// filters this is the identity query (one group, all rows), so the default
// output is unchanged.
export function applyQuery(transactions, options = {}) {
  const { filters = {} } = options;

  let rows = transactions;
  if (filters.from) rows = rows.filter((t) => t.date >= filters.from);
  if (filters.to) rows = rows.filter((t) => t.date <= filters.to);
  if (filters.category) rows = rows.filter((t) => t.category === filters.category);
  if (filters.minCents != null) rows = rows.filter((t) => t.amount.cents >= filters.minCents);

  const groups = [{ key: null, rows, subtotal: sum(rows) }];
  return { groups, total: sum(rows), grouped: false };
}
