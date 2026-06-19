"""A tiny report renderer. Today it only renders plain text."""


def render(title, rows):
    lines = [title, "=" * len(title)]
    for label, value in rows:
        lines.append(f"{label}: {value}")
    return "\n".join(lines)
