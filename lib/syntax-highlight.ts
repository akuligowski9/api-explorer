function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Language-specific colorizers ─────────────────────────────────────

function colorizeCurl(line: string): string {
  return line
    .replace(/^(curl)\b/, '<span style="color:#c084fc">$1</span>')
    .replace(/(-X\s+)(GET|POST|PUT|DELETE)/, '$1<span style="color:#fbbf24">$2</span>')
    .replace(/(-H)\s/, '<span style="color:#60a5fa">$1</span> ')
    .replace(/"([^"]*)"/g, '<span style="color:#4ade80">"$1"</span>');
}

function colorizeJavaScript(line: string): string {
  return line
    .replace(
      /\b(const|let|var|await|async|function)\b/g,
      '<span style="color:#c084fc">$1</span>',
    )
    .replace(
      /\b(fetch|console|response|JSON)\b/g,
      '<span style="color:#60a5fa">$1</span>',
    )
    .replace(
      /\.(json|log|stringify)\b/g,
      '.<span style="color:#fbbf24">$1</span>',
    )
    .replace(/"([^"]*)"/g, '<span style="color:#4ade80">"$1"</span>');
}

function colorizePython(line: string): string {
  return line
    .replace(
      /^(import|from)\b/,
      '<span style="color:#c084fc">$1</span>',
    )
    .replace(
      /\b(requests|response|print)\b/g,
      '<span style="color:#60a5fa">$1</span>',
    )
    .replace(
      /\.(get|post|json)\b/g,
      '.<span style="color:#fbbf24">$1</span>',
    )
    .replace(/"([^"]*)"/g, '<span style="color:#4ade80">"$1"</span>');
}

// ── Public API ───────────────────────────────────────────────────────

export type CodeLanguage = "curl" | "javascript" | "python";

export function colorizeCode(line: string, lang: CodeLanguage): string {
  const escaped = escapeHtml(line);

  switch (lang) {
    case "curl":
      return colorizeCurl(escaped);
    case "javascript":
      return colorizeJavaScript(escaped);
    case "python":
      return colorizePython(escaped);
  }
}

export function colorizeJson(line: string): string {
  return escapeHtml(line)
    .replace(
      /("(?:[^"\\]|\\.)*")(\s*:)/g,
      '<span style="color:#c084fc">$1</span>$2',
    )
    .replace(
      /:\s*("(?:[^"\\]|\\.)*")/g,
      ': <span style="color:#4ade80">$1</span>',
    )
    .replace(
      /:\s*(\d+\.?\d*)/g,
      ': <span style="color:#60a5fa">$1</span>',
    )
    .replace(
      /:\s*(true|false)/g,
      ': <span style="color:#fbbf24">$1</span>',
    )
    .replace(
      /:\s*(null)/g,
      ': <span style="color:#f87171">$1</span>',
    );
}
