import { renderRich } from "@/lib/render-rich";

export function Rich({ source, className = "" }: { source: string; className?: string }) {
  return (
    <div
      className={`prose-analytica ${className}`}
      // Contenido controlado y generado en código.
      dangerouslySetInnerHTML={{ __html: renderRich(source) }}
    />
  );
}
