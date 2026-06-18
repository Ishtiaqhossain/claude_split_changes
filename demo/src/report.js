import { TextFormatter } from './formatter.js';

// A Report holds rows and renders them. Rendering is delegated to a
// formatter; the public behavior is unchanged (still plain text).
export class Report {
  constructor(title, rows) {
    this.title = title;
    this.rows = rows; // array of { label, value }
  }

  render() {
    return new TextFormatter().format(this.title, this.rows);
  }
}
