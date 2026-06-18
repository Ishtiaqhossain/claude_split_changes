import { Report } from './report.js';

// Pass --csv to export as CSV; otherwise render as plain text.
const format = process.argv.includes('--csv') ? 'csv' : 'text';
const report = new Report('Sales', [
  { label: 'Apples', value: 120 },
  { label: 'Oranges', value: 90 },
]);

console.log(report.render(format));
