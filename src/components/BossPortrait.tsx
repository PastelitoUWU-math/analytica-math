// Retrato dinámico de jefe matemático: SVG estilizado con animaciones sutiles.
// No es realista, es un emblema con aire grabado/clasicista.
import { useEffect, useState } from "react";

export function BossPortrait({
  name,
  accent,
  speaking,
}: {
  name: string;
  accent: string;
  speaking: boolean;
}) {
  // Frame de animación de "respiración"/parpadeo
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      setT((prev) => prev + (now - last) / 1000);
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const breath = Math.sin(t * 1.4) * 1.2;
  const mouth = speaking ? 4 + Math.abs(Math.sin(t * 8)) * 4 : 2;
  const blink = Math.sin(t * 0.7) > 0.96 ? 0.2 : 1;

  // Hash inicial para variar el peinado/sombrero según nombre
  const seed = name
    .split("")
    .reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const wig = seed % 3; // 0 peluca larga, 1 calvo, 2 con sombrero alto

  return (
    <svg viewBox="0 0 200 240" className="w-full h-full">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.25 0.02 250)" />
          <stop offset="100%" stopColor="oklch(0.12 0.02 250)" />
        </linearGradient>
      </defs>
      <rect width="200" height="240" fill="url(#bg)" />
      <g transform={`translate(0, ${breath})`}>
        {/* Hombros / cuello con golilla */}
        <path
          d="M30,230 C 50,180 80,170 100,170 C 120,170 150,180 170,230 Z"
          fill="oklch(0.22 0.02 250)"
          stroke="currentColor"
          strokeOpacity="0.3"
        />
        <path
          d="M60,180 Q 100,165 140,180 Q 100,200 60,180"
          fill="oklch(0.96 0.01 85)"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
        {/* Cara */}
        <ellipse cx="100" cy="120" rx="42" ry="52" fill="oklch(0.88 0.03 60)" stroke="url(#ink)" strokeWidth="1.2" />
        {/* Mejillas */}
        <ellipse cx="78" cy="135" rx="6" ry="3" fill={accent} opacity="0.18" />
        <ellipse cx="122" cy="135" rx="6" ry="3" fill={accent} opacity="0.18" />
        {/* Ojos */}
        <g>
          <ellipse cx="85" cy="115" rx="4" ry={4 * blink} fill="url(#ink)" />
          <ellipse cx="115" cy="115" rx="4" ry={4 * blink} fill="url(#ink)" />
          <ellipse cx="86" cy="114" rx="1.2" ry={1.2 * blink} fill="white" opacity="0.9" />
          <ellipse cx="116" cy="114" rx="1.2" ry={1.2 * blink} fill="white" opacity="0.9" />
        </g>
        {/* Cejas */}
        <path d="M77,103 Q85,99 93,103" stroke="url(#ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M107,103 Q115,99 123,103" stroke="url(#ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Nariz */}
        <path d="M100,118 Q98,135 100,140 Q103,142 105,140" stroke="url(#ink)" strokeWidth="1" fill="none" />
        {/* Boca */}
        <ellipse cx="100" cy={155} rx="7" ry={mouth} fill="oklch(0.3 0.08 25)" />
        {/* Peinado / sombrero */}
        {wig === 0 && (
          <>
            <path
              d="M58,110 Q55,70 100,62 Q145,70 142,110 Q150,145 140,165 L60,165 Q50,145 58,110 Z"
              fill="oklch(0.92 0.015 85)"
              stroke="url(#ink)"
              strokeWidth="1"
            />
            <ellipse cx="70" cy="155" rx="14" ry="22" fill="oklch(0.92 0.015 85)" stroke="url(#ink)" />
            <ellipse cx="130" cy="155" rx="14" ry="22" fill="oklch(0.92 0.015 85)" stroke="url(#ink)" />
          </>
        )}
        {wig === 1 && (
          <path
            d="M62,118 Q60,85 100,78 Q140,85 138,118"
            fill="oklch(0.86 0.04 60)"
            stroke="url(#ink)"
          />
        )}
        {wig === 2 && (
          <g>
            <rect x="62" y="50" width="76" height="34" fill="url(#ink)" />
            <rect x="48" y="80" width="104" height="10" fill="url(#ink)" />
          </g>
        )}
        {/* Insignia con inicial */}
        <circle cx="100" cy="200" r="9" fill={accent} opacity="0.85" />
        <text
          x="100"
          y="204"
          textAnchor="middle"
          fontSize="11"
          fill="white"
          fontFamily="KaTeX_Main, serif"
        >
          {name[0]}
        </text>
      </g>
    </svg>
  );
}
