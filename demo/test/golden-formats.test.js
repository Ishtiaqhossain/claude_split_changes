import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateReport } from '../src/report.js';

const fixture = [
  { date: '2026-01-03', category: 'Groceries', description: 'Apples', amount: 10 },
  { date: '2026-01-10', category: 'Dining', description: 'Lunch', amount: 20 },
  { date: '2026-01-20', category: 'Groceries', description: 'Bread', amount: 5 },
];

test('golden: csv', () => {
  assert.equal(
    generateReport('Expenses', fixture, { format: 'csv' }),
    [
      'date,category,description,amount',
      '2026-01-03,Groceries,Apples,10.00',
      '2026-01-10,Dining,Lunch,20.00',
      '2026-01-20,Groceries,Bread,5.00',
    ].join('\n'),
  );
});

test('golden: summary lists category totals', () => {
  assert.equal(
    generateReport('Expenses', fixture, { format: 'summary' }),
    ['Expenses', '========', 'Dining: $20.00', 'Groceries: $15.00', '--------', 'TOTAL  $35.00'].join('\n'),
  );
});

test('golden: markdown', () => {
  assert.equal(
    generateReport('Expenses', fixture, { format: 'markdown' }),
    [
      '# Expenses',
      '',
      '| Date | Category | Description | Amount |',
      '| --- | --- | --- | --- |',
      '| 2026-01-03 | Groceries | Apples | $10.00 |',
      '| 2026-01-10 | Dining | Lunch | $20.00 |',
      '| 2026-01-20 | Groceries | Bread | $5.00 |',
      '',
      '**Total:** $35.00',
    ].join('\n'),
  );
});

test('golden: json', () => {
  assert.equal(
    generateReport('Expenses', fixture, { format: 'json' }),
    [
      '{',
      '  "title": "Expenses",',
      '  "grouped": false,',
      '  "groups": [',
      '    {',
      '      "key": null,',
      '      "rows": [',
      '        {',
      '          "date": "2026-01-03",',
      '          "category": "Groceries",',
      '          "description": "Apples",',
      '          "amount": 10',
      '        },',
      '        {',
      '          "date": "2026-01-10",',
      '          "category": "Dining",',
      '          "description": "Lunch",',
      '          "amount": 20',
      '        },',
      '        {',
      '          "date": "2026-01-20",',
      '          "category": "Groceries",',
      '          "description": "Bread",',
      '          "amount": 5',
      '        }',
      '      ],',
      '      "subtotal": 35',
      '    }',
      '  ],',
      '  "total": 35',
      '}',
    ].join('\n'),
  );
});
