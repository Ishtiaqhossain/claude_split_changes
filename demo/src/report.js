import { toTransactions } from './transaction.js';
import { applyQuery } from './query.js';
import { getFormatter } from './formatters/index.js';

// Generate a report: convert raw rows -> Transactions, run the query pipeline
// (filtering), then render with the chosen formatter.
//
// options = { format = 'text', filters = {} }
export function generateReport(title, transactions, options = {}) {
  const { format = 'text', filters = {} } = options;
  const result = applyQuery(toTransactions(transactions), { filters });
  return getFormatter(format).format(title, result);
}

// Back-compat: the original text-only entry point.
export function renderReport(title, transactions) {
  return generateReport(title, transactions, { format: 'text' });
}
