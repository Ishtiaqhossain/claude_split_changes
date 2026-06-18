package com.example.reports

// A Formatter turns a report's title and rows into a string.
interface ReportFormatter {
    fun format(title: String, rows: List<Row>): String
}

class TextFormatter : ReportFormatter {
    override fun format(title: String, rows: List<Row>): String {
        val lines = mutableListOf(title, "=".repeat(title.length))
        for (row in rows) lines.add("${row.label}: ${row.value}")
        return lines.joinToString("\n")
    }
}

// Registry mapping a format name to a formatter. New output formats register
// here; callers look one up by name. Today only 'text' is registered, so
// behavior is unchanged.
object FormatterRegistry {
    private val formatters = mutableMapOf<String, ReportFormatter>("text" to TextFormatter())

    fun get(name: String): ReportFormatter =
        formatters[name] ?: throw IllegalArgumentException("Unknown format: $name")

    fun register(name: String, formatter: ReportFormatter) {
        formatters[name] = formatter
    }
}
