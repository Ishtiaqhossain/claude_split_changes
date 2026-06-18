package com.example.reports

data class Row(val label: String, val value: Int)

// A Report holds rows and renders them. Rendering is delegated to a formatter
// looked up from the registry; 'text' remains the default, so public behavior
// is unchanged.
class Report(val title: String, val rows: List<Row>) {

    fun render(format: String = "text"): String =
        FormatterRegistry.get(format).format(title, rows)
}
