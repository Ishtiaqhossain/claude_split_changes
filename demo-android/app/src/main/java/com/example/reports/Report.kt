package com.example.reports

data class Row(val label: String, val value: Int)

// A Report holds rows and renders them. Rendering is delegated to a
// formatter; the public behavior is unchanged (still plain text).
class Report(val title: String, val rows: List<Row>) {

    fun render(): String = TextFormatter().format(title, rows)
}
