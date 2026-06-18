package com.example.reports

data class Row(val label: String, val value: Int)

// A Report holds rows and renders them. Today it only renders plain text.
class Report(val title: String, val rows: List<Row>) {

    fun render(): String {
        val lines = mutableListOf(title, "=".repeat(title.length))
        for (row in rows) {
            lines.add("${row.label}: ${row.value}")
        }
        return lines.joinToString("\n")
    }
}
