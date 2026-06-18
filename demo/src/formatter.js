// A Formatter turns a report's title and rows into a string.
// Extracting this seam lets new output formats plug in later without
// touching Report's logic. Today there is exactly one formatter: text.
export class TextFormatter {
  format(title, rows) {
    const lines = [title, '='.repeat(title.length)];
    for (const row of rows) lines.push(`${row.label}: ${row.value}`);
    return lines.join('\n');
  }
}
