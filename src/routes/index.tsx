import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Analytica — Aprende análisis matemático jugando" },
      {
        name: "description",
        content:
          "Analytica es un juego web en español para aprender análisis matemático paso a paso: límites, derivadas, integrales y series. Mundos, niveles y batallas contra matemáticos legendarios.",
      },
      { property: "og:title", content: "Analytica" },
      {
        property: "og:description",
        content:
          "Aprende cálculo desde cero con explicaciones rigurosas paso a paso, en formato de juego de mundos y niveles.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Shell>
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
          Análisis matemático · Jugando · Paso a paso
        </p>
        <h1 className="text-5xl md:text-6xl font-display tracking-tight leading-[1.05]">
          Domina el cálculo
          <br />
          <span className="italic text-muted-foreground">como un viaje</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Cinco mundos. Niveles que avanzan despacio para que ningún concepto se
          quede a medias. Y al final de cada mundo, una batalla contra una
          figura legendaria del análisis.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            to="/mundos"
            className="px-6 py-3 rounded-md bg-foreground text-background hover:opacity-90 transition"
          >
            Empezar a jugar
          </Link>
          <Link
            to="/ranking"
            className="px-6 py-3 rounded-md border border-border hover:bg-secondary transition"
          >
            Ver ranking
          </Link>
        </div>
      </section>

      <div className="ink-rule max-w-3xl mx-auto my-6" />

      <section className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <Feature
          title="Explicaciones primero"
          body="Antes de cada ejercicio, una lección rigurosa, sencilla y paso a paso. Nada de tirarte a la piscina."
        />
        <Feature
          title="50+ niveles por mundo"
          body="Para consolidar de verdad. Empezamos por lo trivial y, sin prisa, llegamos a lo avanzado."
        />
        <Feature
          title="Jefes históricos"
          body="Cauchy, Weierstrass, Leibniz, Newton, Euler. Diálogos en escena y diez ejercicios decisivos."
        />
      </section>
    </Shell>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
