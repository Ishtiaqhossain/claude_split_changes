import { TextFormatter } from './text.js';

// Registry mapping a format name to a formatter. New output formats register
// here; callers look one up by name. Today there is exactly one: text.
const formatters = {
  text: new TextFormatter(),
};

export function getFormatter(name) {
  const formatter = formatters[name];
  if (!formatter) {
    throw new Error(`Unknown format: ${name} (have: ${formatNames().join(', ')})`);
  }
  return formatter;
}

export function registerFormatter(name, formatter) {
  formatters[name] = formatter;
}

export function formatNames() {
  return Object.keys(formatters);
}
