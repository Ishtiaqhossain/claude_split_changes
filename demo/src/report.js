import { toTransactions } from './transaction.js';
import { applyQuery } from './query.js';
import { getFormatter } from './formatters/index.js';

// Generate a report: convert raw rows -> Transactions, run the query pipeline,
// then render with the chosen formatter (default text).
export function generateReport(title, transactions, options = {}) {
  const { format = 'text' } = options;
  const result = applyQuery(toTransactions(transactions));
  return getFormatter(format).format(title, result);
}

// Back-compat: the original text-only entry point. Kept so existing callers and
// tests that just want "the text report" don't have to change.
export function renderReport(title, transactions) {
  return generateReport(title, transactions, { format: 'text' });
}
