import { toTransactions } from './transaction.js';
import { applyQuery } from './query.js';

// Builds a plain-text expense report. Rendering now routes through the query
// pipeline (currently the identity query) so filtering/sorting/grouping can be
// added without touching this function. Text output is unchanged.
export function renderReport(title, transactions) {
  const result = applyQuery(toTransactions(transactions));
  const lines = [title, '='.repeat(title.length)];
  for (const group of result.groups) {
    for (const t of group.rows) {
      lines.push(`${t.date}  ${t.category}  ${t.description}  ${t.amount.toString()}`);
    }
  }
  lines.push('-'.repeat(title.length));
  lines.push(`TOTAL  ${result.total.toString()}`);
  return lines.join('\n');
}
