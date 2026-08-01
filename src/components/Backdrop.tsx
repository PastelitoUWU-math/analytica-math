// Fondo decorativo: fórmulas matemáticas flotando suavemente.
// Pointer-events: none para no interferir con la UI.
import { useMemo } from "react";
import { InlineMath } from "./InlineMath";

const FORMULAS = [
  "$\\displaystyle\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$",
  "$\\displaystyle\\int_0^1 x^2\\,dx=\\frac{1}{3}$",
  "$\\displaystyle\\sum_{n=1}^{\\infty}\\frac{1}{n^2}=\\frac{\\pi^2}{6}$",
  "$e^{i\\pi}+1=0$",
  "$\\displaystyle\\frac{d}{dx}e^x=e^x$",
  "$\\displaystyle\\lim_{n\\to\\infty}\\left(1+\\tfrac{1}{n}\\right)^n=e$",
  "$\\nabla\\cdot\\mathbf{F}=\\rho$",
  "$\\displaystyle\\int e^x\\,dx=e^x+C$",
  "$f'(a)=\\displaystyle\\lim_{h\\to 0}\\tfrac{f(a+h)-f(a)}{h}$",
  "$\\zeta(s)=\\displaystyle\\sum_{n=1}^{\\infty}\\tfrac{1}{n^s}$",
  "$\\cos^2 x+\\sin^2 x=1$",
  "$\\displaystyle\\binom{n}{k}=\\tfrac{n!}{k!(n-k)!}$",
];

export function Backdrop() {
  // Posiciones aleatorias estables por render del root
  const items = useMemo(
    () =>
      FORMULAS.map((f, i) => ({
        f,
        left: (i * 53) % 100,
        top: (i * 37 + 13) % 100,
        delay: (i * 1.7) % 8,
        dur: 22 + ((i * 3) % 14),
        size: 0.85 + ((i * 11) % 7) / 20,
      })),
    [],
  );
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <div className="absolute inset-0 backdrop-aurora" />
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute max-w-[18rem] opacity-[0.12] text-foreground backdrop-float"
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            fontSize: `${it.size}rem`,
            animationDelay: `-${it.delay}s`,
            animationDuration: `${it.dur}s`,
          }}
        >
          <InlineMath source={it.f} />
        </span>
      ))}
    </div>
  );
}
