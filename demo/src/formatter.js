// A Formatter turns a report's title and rows into a string.
export class TextFormatter {
  format(title, rows) {
    const lines = [title, '='.repeat(title.length)];
    for (const row of rows) lines.push(`${row.label}: ${row.value}`);
    return lines.join('\n');
  }
}

export class CsvFormatter {
  format(title, rows) {
    const lines = ['label,value'];
    for (const row of rows) lines.push(`${row.label},${row.value}`);
    return lines.join('\n');
  }
}

// Registry mapping a format name to a formatter instance.
const formatters = { text: new TextFormatter() };

export function getFormatter(name) {
  const formatter = formatters[name];
  if (!formatter) throw new Error(`Unknown format: ${name}`);
  return formatter;
}

export function registerFormatter(name, formatter) {
  formatters[name] = formatter;
}

// CSV export is now wired into the CLI, so it is always available.
registerFormatter('csv', new CsvFormatter());
