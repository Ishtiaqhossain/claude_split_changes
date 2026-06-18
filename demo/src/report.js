import { toTransactions } from './transaction.js';
import { Money } from './money.js';

// Builds a plain-text expense report. Rows are now typed Transactions and the
// total is summed as Money (integer cents), so there is no floating-point drift.
// The output is byte-for-byte identical to before — this is a pure refactor.
export function renderReport(title, transactions) {
  const rows = toTransactions(transactions);
  const lines = [title, '='.repeat(title.length)];

  let total = Money.zero();
  for (const t of rows) {
    total = total.plus(t.amount);
    lines.push(`${t.date}  ${t.category}  ${t.description}  ${t.amount.toString()}`);
  }

  lines.push('-'.repeat(title.length));
  lines.push(`TOTAL  ${total.toString()}`);
  return lines.join('\n');
}
