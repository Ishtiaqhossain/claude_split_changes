import { Money } from '../money.js';

// Per-category totals for an ungrouped or grouped result.
function categoryTotals(result) {
  const totals = new Map();
  for (const t of result.groups.flatMap((g) => g.rows)) {
    totals.set(t.category, (totals.get(t.category) ?? Money.zero()).plus(t.amount));
  }
  return [...totals.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

// Renders a high-level summary: one line per category with its total.
export class SummaryFormatter {
  format(title, result) {
    const lines = [title, '='.repeat(title.length)];
    for (const [category, total] of categoryTotals(result)) {
      lines.push(`${category}: ${total.toString()}`);
    }
    lines.push('-'.repeat(title.length));
    lines.push(`TOTAL  ${result.total.toString()}`);
    return lines.join('\n');
  }
}
