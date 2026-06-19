import { toTransactions } from './transaction.js';
import { applyQuery } from './query.js';
import { getFormatter } from './formatters/index.js';

// Generate a report: convert raw rows -> Transactions, run the query pipeline,
// then render with the chosen formatter. `renderReport` stays as the text-only
// shorthand so existing callers and tests don't have to change.
export function generateReport(title, transactions, options = {}) {
  const { format = 'text' } = options;
  const result = applyQuery(toTransactions(transactions));
  return getFormatter(format).format(title, result);
}

export function renderReport(title, transactions) {
  return generateReport(title, transactions, { format: 'text' });
}
