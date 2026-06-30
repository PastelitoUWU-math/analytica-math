import katex from "katex";

// Renderiza una cadena con `$...$` como math inline (sin párrafos ni bloques).
// Útil para títulos, subtítulos, conceptos: nada de markdown, solo math.
export function InlineMath({ source, className = "" }: { source: string; className?: string }) {
  const html = renderInline(source);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
  const out: string[] = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === "\\" && text[i + 1] === "$") {
      out.push("$");
      i += 2;
      continue;
    }
    if (text[i] === "$") {
      const end = text.indexOf("$", i + 1);
      if (end === -1) {
        out.push(escapeHtml(text.slice(i)));
        break;
      }
      try {
        out.push(
          katex.renderToString(text.slice(i + 1, end), {
            displayMode: false,
            throwOnError: false,
            output: "html",
          }),
        );
      } catch {
        out.push(escapeHtml(text.slice(i, end + 1)));
      }
      i = end + 1;
      continue;
    }
    let j = i;
    while (j < text.length && text[j] !== "$" && !(text[j] === "\\" && text[j + 1] === "$")) j++;
    out.push(escapeHtml(text.slice(i, j)));
    i = j;
  }
  return out.join("");
}
