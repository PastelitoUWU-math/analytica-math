import katex from "katex";

// Renderiza un texto markdown muy ligero con $...$ inline y $$...$$ display, párrafos, listas, encabezados, bold y blockquote.
// Devuelve un string HTML seguro (controlamos las entradas en code, no aceptamos HTML del usuario).

function renderMath(src: string, displayMode: boolean): string {
  try {
    return katex.renderToString(src, { displayMode, throwOnError: false, output: "html" });
  } catch {
    return `<span class="text-destructive">[error LaTeX]</span>`;
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Inline parser: handles \$ as literal, $...$ math, **bold**
function inline(text: string): string {
  // Split by math first
  const parts: string[] = [];
  let i = 0;
  while (i < text.length) {
    if (text[i] === "\\" && text[i + 1] === "$") {
      parts.push("$");
      i += 2;
      continue;
    }
    if (text[i] === "$") {
      const end = text.indexOf("$", i + 1);
      if (end === -1) {
        parts.push(escapeHtml(text.slice(i)));
        break;
      }
      const math = text.slice(i + 1, end);
      parts.push(renderMath(math, false));
      i = end + 1;
      continue;
    }
    // accumulate plain until next special
    let j = i;
    while (j < text.length && text[j] !== "$" && !(text[j] === "\\" && text[j + 1] === "$")) j++;
    let chunk = text.slice(i, j);
    chunk = escapeHtml(chunk).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    parts.push(chunk);
    i = j;
  }
  return parts.join("");
}

export function renderRich(src: string): string {
  // First extract $$...$$ display blocks
  const out: string[] = [];
  const lines = src.replace(/\r/g, "").split("\n");
  let buf: string[] = [];
  let inBlock = false;
  let blockBuf: string[] = [];

  const flushPara = () => {
    if (!buf.length) return;
    const joined = buf.join("\n").trim();
    if (!joined) {
      buf = [];
      return;
    }
    // Heading
    const h = joined.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length + 1; // h2..h5
      out.push(`<h${lvl} class="font-display tracking-tight">${inline(h[2])}</h${lvl}>`);
      buf = [];
      return;
    }
    // Blockquote
    if (joined.startsWith(">")) {
      const inner = joined
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join("\n");
      out.push(
        `<blockquote class="border-l-2 border-accent pl-4 italic text-muted-foreground my-4">${inline(inner)}</blockquote>`,
      );
      buf = [];
      return;
    }
    // List
    if (joined.split("\n").every((l) => /^\s*[-*]\s+/.test(l))) {
      const items = joined
        .split("\n")
        .map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ""))}</li>`)
        .join("");
      out.push(`<ul class="list-disc pl-6 space-y-1 my-3">${items}</ul>`);
      buf = [];
      return;
    }
    out.push(`<p class="my-3 leading-relaxed">${inline(joined)}</p>`);
    buf = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("$$") && line.trim().endsWith("$$") && line.trim().length > 3) {
      flushPara();
      const inner = line.trim().slice(2, -2);
      out.push(`<div class="my-4 text-center overflow-x-auto">${renderMath(inner, true)}</div>`);
      continue;
    }
    if (line.trim() === "$$") {
      if (!inBlock) {
        flushPara();
        inBlock = true;
        blockBuf = [];
      } else {
        out.push(
          `<div class="my-4 text-center overflow-x-auto">${renderMath(blockBuf.join("\n"), true)}</div>`,
        );
        inBlock = false;
      }
      continue;
    }
    if (inBlock) {
      blockBuf.push(line);
      continue;
    }
    if (line.trim() === "") {
      flushPara();
    } else {
      buf.push(line);
    }
  }
  flushPara();
  return out.join("\n");
}
