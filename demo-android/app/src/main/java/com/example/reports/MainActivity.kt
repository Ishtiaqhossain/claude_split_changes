package com.example.reports

import android.app.Activity
import android.os.Bundle
import android.widget.TextView

class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val report = Report(
            title = "Sales",
            rows = listOf(Row("Apples", 120), Row("Oranges", 90)),
        )

        val textView = TextView(this).apply {
            text = report.render()
            textSize = 18f
            setPadding(48, 48, 48, 48)
        }
        setContentView(textView)
    }
}
