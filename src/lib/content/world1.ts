import type { World, Level, Exercise } from "./types";
import * as ext from "./world1_ext";
import cauchyPortrait from "@/assets/cauchy.jpg.asset.json";
import bossTheme from "@/assets/boss-theme.m4a.asset.json";

// Utilidad: redondea para presentación
const r = (x: number, k = 4) => Math.round(x * 10 ** k) / 10 ** k;

// =====================================================
// MUNDO 1 — LÍMITES
// Construido pedagógicamente: de lo más trivial a lo avanzado.
// =====================================================

const L = (n: number, title: string, concept: string, body: string, exercises: Exercise[]): Level => ({
  id: `n${n}`,
  title: `Nivel ${n}: ${title}`,
  concept,
  lesson: { body },
  exercises,
});

// ---------- Niveles 1-10 escritos a mano ----------

const lv1 = L(
  1,
  "¿Qué significa acercarse a un número?",
  "Idea intuitiva: tendencia",
  `
### La pregunta más sencilla del mundo

Imagina que tienes un número, por ejemplo $2$. Y imagina que vas escribiendo números **cada vez más cerca de $2$**, sin tocarlo nunca. Por ejemplo:

$$1.9,\\quad 1.99,\\quad 1.999,\\quad 1.9999,\\ldots$$

o también desde el otro lado:

$$2.1,\\quad 2.01,\\quad 2.001,\\quad 2.0001,\\ldots$$

A esto lo llamamos **acercarse a $2$**, o decir que $x$ **tiende** a $2$. Lo escribimos $x \\to 2$. Importante: $x$ **nunca llega a valer exactamente $2$**; solo se le acerca todo lo que queramos.

### El límite, en una frase

El **límite** de una función $f(x)$ cuando $x$ tiende a $a$ es **el número al que se acerca $f(x)$** cuando $x$ se acerca a $a$.

Lo escribimos:
$$\\lim_{x\\to a} f(x)$$

Y se lee: *"el límite, cuando $x$ tiende a $a$, de $f(x)$"*.

### Cómo se "ve" un límite con una tabla

No vamos a calcular nada con fórmulas todavía. Lo único que vamos a hacer es **mirar valores**.

Por ejemplo, tomemos la función $f(x) = x + 3$ y miremos qué pasa cuando $x$ se acerca a $2$:

- $x = 1.9 \\;\\Rightarrow\\; f(x) = 4.9$
- $x = 1.99 \\;\\Rightarrow\\; f(x) = 4.99$
- $x = 1.999 \\;\\Rightarrow\\; f(x) = 4.999$
- $x = 2.001 \\;\\Rightarrow\\; f(x) = 5.001$
- $x = 2.01 \\;\\Rightarrow\\; f(x) = 5.01$
- $x = 2.1 \\;\\Rightarrow\\; f(x) = 5.1$

¿Ves a qué número se acercan los valores de $f(x)$? Se acercan a $\\mathbf{5}$.

> Eso es todo. Hemos "visto" que $\\displaystyle\\lim_{x\\to 2}(x+3) = 5$ **solo mirando una tabla**. En los próximos niveles aprenderemos atajos, pero la idea siempre es la misma: **a qué número se acerca el resultado**.

### En este nivel

Vas a practicar **solo eso**: ver una tabla de valores y decir a qué número se está acercando $f(x)$. No hace falta saber resolver límites todavía; basta con observar.
`,
  [
    {
      prompt:
        "Mira los valores: $f(1.9)=4.9$, $f(1.99)=4.99$, $f(1.999)=4.999$, $f(2.001)=5.001$, $f(2.01)=5.01$. ¿A qué número se acerca $f(x)$?",
      answer: 5,
      hint: "Fíjate en a qué decimal se aproximan todos los resultados.",
      solution:
        "Todos los valores rodean al número $5$: $4.999$, $5.001$, etc. Por tanto el límite es $5.00$.",
    },
    {
      prompt:
        "Mira los valores: $g(0.9)=2.81$, $g(0.99)=2.9801$, $g(0.999)=2.998$, $g(1.001)=3.002$, $g(1.01)=3.0201$. ¿A qué número se acerca $g(x)$?",
      answer: 3,
      solution:
        "Los valores se apretujan alrededor de $3$ por ambos lados. El límite es $3.00$.",
    },
    {
      prompt:
        "Tabla: $h(2.9)=-0.1$, $h(2.99)=-0.01$, $h(2.999)=-0.001$, $h(3.001)=0.001$, $h(3.01)=0.01$. ¿A qué número tiende $h(x)$?",
      answer: 0,
      solution:
        "Los valores se acercan a $0$ desde ambos lados. El límite es $0.00$.",
    },
    {
      prompt:
        "Tabla: $f(-0.1)=6.99$, $f(-0.01)=6.9999$, $f(0.01)=7.0001$, $f(0.1)=7.01$. ¿A qué número se acerca $f(x)$?",
      answer: 7,
      solution:
        "Los valores rondan $7$ tan cerca como queramos. El límite es $7.00$.",
    },
    {
      prompt:
        "Tabla: $u(4.9)=10.05$, $u(4.99)=10.005$, $u(5.001)=9.999$, $u(5.01)=9.99$. ¿A qué número se acerca $u(x)$ cuando $x\\to 5$?",
      answer: 10,
      hint: "Aunque desde un lado decrezca y desde el otro crezca, ambos se aprietan al mismo número.",
      solution:
        "Por la izquierda baja hacia $10$ y por la derecha sube hacia $10$. El límite es $10.00$.",
    },
    {
      prompt:
        "Una función vale siempre $7.5$, sin importar el valor de $x$. ¿Cuál es $\\displaystyle\\lim_{x\\to 12} f(x)$?",
      answer: 7.5,
      solution:
        "Una función constante vale lo mismo en todas partes; el límite es ese valor, $7.50$.",
    },
  ],
);


const lv2 = L(
  2,
  "Sustitución con polinomios",
  "Cálculo directo en polinomios",
  `
### Polinomios: siempre se puede sustituir

Un **polinomio** es una suma de potencias de $x$ multiplicadas por números, por ejemplo $3x^2 - 5x + 1$. La propiedad clave es:

> Para **cualquier** polinomio $P(x)$ y **cualquier** número $a$, se cumple $\\displaystyle\\lim_{x\\to a} P(x) = P(a)$.

Es decir: en polinomios **siempre** sustituimos directamente. Ningún truco.

### Ejemplo paso a paso

$$\\lim_{x\\to 2}(3x^2 - 5x + 1)$$

Paso 1: sustituye $x$ por $2$ en cada término:
- $3x^2 \\to 3\\cdot 2^2 = 3\\cdot 4 = 12$
- $-5x \\to -5\\cdot 2 = -10$
- $+1 \\to +1$

Paso 2: suma los resultados: $12 - 10 + 1 = 3$.

Por tanto $\\displaystyle\\lim_{x\\to 2}(3x^2 - 5x + 1) = 3$.

Cuidado con los signos y con las potencias de números negativos: $(-2)^2 = 4$, pero $-2^2 = -4$ por convenio.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}(x^2)$",
      answer: 4,
      solution: "$2^2 = 4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}(x^2 - 1)$",
      answer: 8,
      solution: "$3^2 - 1 = 9 - 1 = 8$. Respuesta: $8.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -1}(x^2 + 2x + 5)$",
      answer: 4,
      hint: "Cuidado: $(-1)^2 = 1$.",
      solution: "$(-1)^2 + 2(-1) + 5 = 1 - 2 + 5 = 4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}(x^3 - 2x)$",
      answer: 4,
      solution: "$2^3 - 2\\cdot 2 = 8 - 4 = 4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}(5x^2 - 3x + 7)$",
      answer: 9,
      solution: "$5\\cdot 1 - 3\\cdot 1 + 7 = 5 - 3 + 7 = 9$. Respuesta: $9.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -2}(x^2 + 3x)$",
      answer: -2,
      solution: "$(-2)^2 + 3(-2) = 4 - 6 = -2$. Respuesta: $-2.00$.",
    },
  ],
);

const lv3 = L(
  3,
  "Sumas, productos y cocientes seguros",
  "Propiedades aritméticas del límite",
  `
### Reglas básicas (cuando no hay problema)

Si $\\lim_{x\\to a} f(x) = L$ y $\\lim_{x\\to a} g(x) = M$, entonces:

- $\\lim_{x\\to a}\\big(f(x) + g(x)\\big) = L + M$
- $\\lim_{x\\to a}\\big(f(x)\\cdot g(x)\\big) = L\\cdot M$
- $\\lim_{x\\to a}\\dfrac{f(x)}{g(x)} = \\dfrac{L}{M}$ **siempre que** $M\\neq 0$.

En la práctica esto significa que para funciones formadas por sumas, productos y divisiones de polinomios (las llamadas *funciones racionales*) **se puede sustituir** mientras el **denominador no se haga cero** al sustituir.

### Ejemplo

$$\\lim_{x\\to 1}\\frac{x^2+3}{x+2} = \\frac{1+3}{1+2} = \\frac{4}{3} \\approx 1.3333\\ldots$$

Como el denominador en $x=1$ vale $3 \\neq 0$, podemos sustituir tranquilamente.

### ¿Y si al sustituir sale $\\tfrac{\\text{algo}}{0}$?

Eso es **otro caso** que veremos en niveles posteriores. Por ahora solo trabajaremos con denominadores que no se anulan.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\frac{x+1}{x-1}$",
      answer: 3,
      solution: "Sustituyendo: $\\dfrac{2+1}{2-1} = \\dfrac{3}{1} = 3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\frac{x^2+3}{x+2}$",
      answer: 4 / 3,
      solution: "Sustituyendo: $\\dfrac{1+3}{1+2} = \\dfrac{4}{3} \\approx 1.3333$. Respuesta válida: $1.33$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\frac{2x+5}{x+1}$",
      answer: 5,
      solution: "Sustituyendo: $\\dfrac{0+5}{0+1} = 5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}\\frac{x^2-1}{x+1}$",
      answer: 2,
      solution: "Sustituyendo: $\\dfrac{9-1}{3+1} = \\dfrac{8}{4} = 2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\Big((x+1)\\cdot(x-3)\\Big)$",
      answer: -3,
      solution: "Sustituyendo: $(2+1)(2-3) = 3\\cdot(-1) = -3$. Respuesta: $-3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -1}\\frac{x^2+2}{x-1}$",
      answer: -1.5,
      solution: "Sustituyendo: $\\dfrac{1+2}{-1-1} = \\dfrac{3}{-2} = -1.5$. Respuesta: $-1.50$.",
    },
  ],
);

const lv4 = L(
  4,
  "Funciones con raíces (sustitución segura)",
  "Sustitución con $\\sqrt{\\,}$",
  `
### Raíces cuadradas

La raíz cuadrada $\\sqrt{x}$ está definida cuando $x \\geq 0$. Si al sustituir queda un número $\\geq 0$, **podemos sustituir directamente**:

$$\\lim_{x\\to 9}\\sqrt{x} = \\sqrt{9} = 3.$$

Y combinándola con sumas/productos sigue valiendo la regla:

$$\\lim_{x\\to 4}(2+\\sqrt{x}) = 2 + \\sqrt{4} = 2 + 2 = 4.$$

Si al sustituir te queda raíz de algo negativo, el límite no existe (en los reales). En este nivel **nos saldrán solo casos seguros**.

> Recordatorio: $\\sqrt{2} \\approx 1.4142$, $\\sqrt{3} \\approx 1.7321$, $\\sqrt{5} \\approx 2.2361$. Puedes usar la aproximación necesaria para escribir tu respuesta con al menos $2$ decimales.
`,
  [
    { prompt: "$\\displaystyle\\lim_{x\\to 16}\\sqrt{x}$", answer: 4, solution: "$\\sqrt{16}=4$. Respuesta: $4.00$." },
    { prompt: "$\\displaystyle\\lim_{x\\to 25}\\sqrt{x}$", answer: 5, solution: "$\\sqrt{25}=5$. Respuesta: $5.00$." },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 4}\\big(3 + \\sqrt{x}\\big)$",
      answer: 5,
      solution: "$3+\\sqrt{4}=3+2=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 9}\\frac{\\sqrt{x}+1}{2}$",
      answer: 2,
      solution: "$\\dfrac{\\sqrt{9}+1}{2}=\\dfrac{4}{2}=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\sqrt{x+2}$",
      answer: 2,
      solution: "$\\sqrt{2+2}=\\sqrt{4}=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}\\sqrt{x+1}$",
      answer: 2,
      solution: "$\\sqrt{3+1}=\\sqrt{4}=2$. Respuesta: $2.00$.",
    },
  ],
);

const lv5 = L(
  5,
  "Cuando $f(a)$ y $\\lim_{x\\to a}f(x)$ no coinciden",
  "Diferencia entre valor y límite",
  `
### Atención: el límite ignora el punto en sí

Hasta ahora siempre coincidía $\\lim_{x\\to a} f(x)$ con $f(a)$. Eso ocurre cuando la función es **continua**. Pero el límite, en realidad, **no mira el valor exacto en $a$**: mira los valores **alrededor** de $a$.

Considera una función "rota" en un único punto:

$$g(x) = \\begin{cases} x+1 & \\text{si } x \\neq 2 \\\\ 100 & \\text{si } x = 2 \\end{cases}$$

Si calculamos $g(2)$, el valor es $100$. Pero si nos preguntamos a qué se acerca $g(x)$ **cuando $x$ se acerca a $2$ sin valer exactamente $2$**, los valores son $g(1.9)=2.9$, $g(1.99)=2.99$, $g(2.01)=3.01$… Se acercan a $3$.

Por tanto:
$$\\lim_{x\\to 2} g(x) = 3, \\quad \\text{aunque } g(2)=100.$$

### Por qué es importante

Esto justifica por qué el límite es una herramienta tan útil: nos permite **estudiar el comportamiento** de una función incluso en puntos donde no está definida, o donde tiene un "agujero".
`,
  [
    {
      prompt:
        "Sea $g(x) = x^2$ si $x\\neq 1$, y $g(1) = 50$. Calcula $\\displaystyle\\lim_{x\\to 1}g(x)$.",
      answer: 1,
      solution:
        "El límite ignora el valor en $x=1$. Mira los valores cercanos: $g(0.99)\\approx 0.98$, $g(1.01)\\approx 1.02$, que se acercan a $1$. Respuesta: $1.00$.",
    },
    {
      prompt:
        "Sea $f(x) = x+5$ si $x\\neq 0$, y $f(0) = 100$. Calcula $\\displaystyle\\lim_{x\\to 0}f(x)$.",
      answer: 5,
      solution: "El valor en $0$ no importa. Cerca de $0$, $f(x)\\to 0+5=5$. Respuesta: $5.00$.",
    },
    {
      prompt:
        "Sea $h(x) = 3$ si $x\\neq 4$, y $h(4) = 7$. Calcula $\\displaystyle\\lim_{x\\to 4}h(x)$.",
      answer: 3,
      solution: "Cerca de $4$ la función vale siempre $3$, así que el límite es $3.00$.",
    },
    {
      prompt:
        "Sea $f(x) = 2x$ si $x\\neq 3$, y $f(3) = -99$. Calcula $\\displaystyle\\lim_{x\\to 3}f(x)$.",
      answer: 6,
      solution: "Cerca de $3$ es $2x$, que se acerca a $6$. Respuesta: $6.00$.",
    },
    {
      prompt:
        "Sea $f(x) = x^2 - 1$ si $x\\neq -1$, y $f(-1)=42$. Calcula $\\displaystyle\\lim_{x\\to -1}f(x)$.",
      answer: 0,
      solution: "$(-1)^2 - 1 = 0$. El valor $42$ es irrelevante. Respuesta: $0.00$.",
    },
  ],
);

const lv6 = L(
  6,
  "Límites laterales (por la izquierda y por la derecha)",
  "Límite por un lado",
  `
### Acercarse desde dos direcciones

Cuando $x$ tiende a un valor $a$, puede hacerlo **por la izquierda** ($x<a$, valores más pequeños que $a$) o **por la derecha** ($x>a$). Definimos:

- **Límite por la izquierda**: $\\displaystyle\\lim_{x\\to a^-} f(x)$, mirando solo $x<a$.
- **Límite por la derecha**: $\\displaystyle\\lim_{x\\to a^+} f(x)$, mirando solo $x>a$.

### Ejemplo de función con un escalón

$$f(x) = \\begin{cases} x+1 & \\text{si } x < 2 \\\\ x+10 & \\text{si } x \\geq 2 \\end{cases}$$

- Por la izquierda de $2$, $f(x) = x+1$, así que $\\displaystyle\\lim_{x\\to 2^-} f(x) = 2+1 = 3$.
- Por la derecha de $2$, $f(x) = x+10$, así que $\\displaystyle\\lim_{x\\to 2^+} f(x) = 2+10 = 12$.

Cada lado se calcula **usando la fórmula que corresponde a ese lado** y luego sustituyendo.
`,
  [
    {
      prompt:
        "Sea $f(x) = x$ si $x<3$ y $f(x)=x+5$ si $x\\geq 3$. Calcula $\\displaystyle\\lim_{x\\to 3^-}f(x)$.",
      answer: 3,
      solution: "Por la izquierda usamos $f(x)=x$, y $\\lim_{x\\to 3^-} x = 3$. Respuesta: $3.00$.",
    },
    {
      prompt:
        "Sea $f(x) = x$ si $x<3$ y $f(x)=x+5$ si $x\\geq 3$. Calcula $\\displaystyle\\lim_{x\\to 3^+}f(x)$.",
      answer: 8,
      solution: "Por la derecha usamos $f(x)=x+5$, que tiende a $3+5=8$. Respuesta: $8.00$.",
    },
    {
      prompt:
        "Sea $g(x) = 2x$ si $x<1$ y $g(x)=x^2$ si $x\\geq 1$. Calcula $\\displaystyle\\lim_{x\\to 1^-}g(x)$.",
      answer: 2,
      solution: "Por la izquierda: $g(x)=2x \\to 2\\cdot 1 = 2$. Respuesta: $2.00$.",
    },
    {
      prompt:
        "Sea $g(x) = 2x$ si $x<1$ y $g(x)=x^2$ si $x\\geq 1$. Calcula $\\displaystyle\\lim_{x\\to 1^+}g(x)$.",
      answer: 1,
      solution: "Por la derecha: $g(x)=x^2 \\to 1^2 = 1$. Respuesta: $1.00$.",
    },
    {
      prompt:
        "Sea $h(x) = -x$ si $x<0$ y $h(x) = x$ si $x\\geq 0$ (esto es $|x|$). Calcula $\\displaystyle\\lim_{x\\to 0^-} h(x)$.",
      answer: 0,
      solution: "Por la izquierda: $-x \\to -0 = 0$. Respuesta: $0.00$.",
    },
    {
      prompt:
        "Sea $h(x) = -x$ si $x<0$ y $h(x) = x$ si $x\\geq 0$. Calcula $\\displaystyle\\lim_{x\\to 0^+} h(x)$.",
      answer: 0,
      solution: "Por la derecha: $x \\to 0$. Respuesta: $0.00$.",
    },
  ],
);

const lv7 = L(
  7,
  "¿Cuándo existe el límite?",
  "Existencia: ambos lados deben coincidir",
  `
### La regla de existencia

$$\\boxed{\\displaystyle\\lim_{x\\to a} f(x) = L \\iff \\lim_{x\\to a^-} f(x) = L \\;\\text{y}\\; \\lim_{x\\to a^+} f(x) = L.}$$

En palabras: el límite **existe** y vale $L$ **si y solo si** los dos límites laterales existen y son **iguales** a $L$.

Si los límites laterales son distintos, el límite **no existe** (decimos que la función tiene un *salto*).

### Ejemplo: salto

Sea $f(x) = 1$ si $x<0$ y $f(x)=-1$ si $x\\geq 0$ (función signo). Entonces:
- $\\lim_{x\\to 0^-} f = 1$
- $\\lim_{x\\to 0^+} f = -1$

Como $1 \\neq -1$, $\\lim_{x\\to 0} f(x)$ **no existe**.

### Convención de respuestas especiales (¡recuérdala!)

A partir de ahora, cuando pida un límite y la respuesta **no sea un número finito**, escribe una de estas palabras clave en lugar de un decimal:

- **\`No\`** — cuando el límite **no existe** (por ejemplo, laterales distintos).
- **\`Inf\`** — cuando el límite tiende a $+\\infty$.
- **\`-Inf\`** — cuando el límite tiende a $-\\infty$.

Si el límite sí existe y es un número finito, sigue escribiendo su valor decimal como siempre.
`,
  [
    {
      prompt:
        "$f(x)=x+1$ si $x<2$, $f(x)=x+1$ si $x\\geq 2$. ¿Cuánto vale $\\displaystyle\\lim_{x\\to 2}f(x)$?",
      answer: 3,
      solution: "Ambos lados dan $3$, así que el límite existe y vale $3.00$.",
    },
    {
      prompt:
        "$f(x)=x$ si $x<1$, $f(x)=x+5$ si $x\\geq 1$. ¿Cuánto vale $\\displaystyle\\lim_{x\\to 1}f(x)$?",
      answer: "No" as const,
      solution:
        "Izquierda: $1$. Derecha: $6$. Son distintos, así que el límite no existe. Respuesta: `No`.",
    },
    {
      prompt:
        "$f(x)=x^2$ si $x<2$, $f(x)=4$ si $x\\geq 2$. ¿Cuánto vale $\\displaystyle\\lim_{x\\to 2}f(x)$?",
      answer: 4,
      solution: "Izquierda: $2^2=4$. Derecha: $4$. Coinciden. Respuesta: $4.00$.",
    },
    {
      prompt:
        "$f(x)=3$ si $x<0$, $f(x)=-3$ si $x\\geq 0$. ¿Cuánto vale $\\displaystyle\\lim_{x\\to 0}f(x)$?",
      answer: "No" as const,
      solution: "Izquierda $3$, derecha $-3$. No coinciden. Respuesta: `No`.",
    },
    {
      prompt:
        "$f(x)=2x$ si $x<3$, $f(x)=x+3$ si $x\\geq 3$. ¿Cuánto vale $\\displaystyle\\lim_{x\\to 3}f(x)$?",
      answer: 6,
      solution: "Izquierda: $2\\cdot 3=6$. Derecha: $3+3=6$. Coinciden. Respuesta: $6.00$.",
    },
  ],
);

const lv8 = L(
  8,
  "El primer caso conflictivo: $\\tfrac{0}{0}$",
  "Detectar la indeterminación",
  `
### ¿Qué pasa cuando al sustituir sale $\\tfrac{0}{0}$?

Considera $\\displaystyle\\lim_{x\\to 1}\\dfrac{x^2-1}{x-1}$.

Si sustituyes directamente: numerador $1-1=0$, denominador $1-1=0$. Sale $\\tfrac{0}{0}$.

**Esto no significa que el límite valga $0$ ni que no exista.** $\\tfrac{0}{0}$ se llama **indeterminación**: significa que la regla de "sustituir" **no nos dice nada** y hay que hacer algo extra para descubrir el valor real.

### ¿Por qué aparece?

Aparece típicamente cuando numerador y denominador comparten un factor común que se anula en el punto. En el ejemplo, $x^2-1 = (x-1)(x+1)$, así que:

$$\\frac{x^2-1}{x-1} = \\frac{(x-1)(x+1)}{x-1} = x+1, \\quad \\text{para } x\\neq 1.$$

Como el límite ignora el valor en $x=1$ (¡nivel 5!), podemos usar esta forma simplificada:

$$\\lim_{x\\to 1}\\frac{x^2-1}{x-1} = \\lim_{x\\to 1}(x+1) = 2.$$

### Estrategia general (a desarrollar en niveles próximos)

1. **Sustituye**. Si no sale indeterminación, listo.
2. **Si sale $\\tfrac{0}{0}$**, intenta **factorizar** numerador y denominador y simplificar el factor que causa el cero.
3. Vuelve a sustituir en la expresión simplificada.

En este nivel solo te pedimos **detectar** si hay indeterminación o no, y resolver casos en los que el truco de factorizar es directo (diferencia de cuadrados $a^2 - b^2 = (a-b)(a+b)$, que ya conoces del bachillerato).

> Si necesitas refrescar: $x^2-a^2 = (x-a)(x+a)$. Por ejemplo $x^2-9 = (x-3)(x+3)$.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{x^2-4}{x-2}$",
      answer: 4,
      hint: "$x^2-4 = (x-2)(x+2)$.",
      solution:
        "Sustituir da $\\tfrac{0}{0}$. Factorizamos: $\\dfrac{(x-2)(x+2)}{x-2} = x+2$. Por tanto el límite es $2+2=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}\\dfrac{x^2-9}{x-3}$",
      answer: 6,
      solution:
        "$\\tfrac{0}{0}$ al sustituir. Factorizamos: $\\dfrac{(x-3)(x+3)}{x-3}=x+3 \\to 3+3=6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{x^2-1}{x-1}$",
      answer: 2,
      solution:
        "$\\tfrac{0}{0}$. Factorizamos $x^2-1=(x-1)(x+1)$, simplificamos, y queda $x+1 \\to 2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -2}\\dfrac{x^2-4}{x+2}$",
      answer: -4,
      hint: "$x^2-4=(x-2)(x+2)$.",
      solution:
        "$\\tfrac{0}{0}$. $\\dfrac{(x-2)(x+2)}{x+2}=x-2 \\to -2-2=-4$. Respuesta: $-4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 5}\\dfrac{x^2-25}{x-5}$",
      answer: 10,
      solution: "Factorizando: $x+5 \\to 10$. Respuesta: $10.00$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to 0}\\dfrac{x^2-9}{x-5}$ (¡Cuidado! Comprueba primero si hay indeterminación.)",
      answer: 1.8,
      solution:
        "Sustituyendo: $\\dfrac{0-9}{0-5}=\\dfrac{-9}{-5}=1.8$. No había indeterminación, basta con sustituir. Respuesta: $1.80$.",
    },
  ],
);

const lv9 = L(
  9,
  "Factorización: el truco principal en $\\tfrac{0}{0}$",
  "Factorizar polinomios para simplificar",
  `
### Cuando la diferencia de cuadrados no basta

Hemos visto $\\tfrac{x^2-a^2}{x-a} \\to 2a$. Pero hay polinomios que requieren otras factorizaciones. Las más útiles:

- **Factor común**: $x^2+3x = x(x+3)$.
- **Diferencia de cuadrados**: $x^2 - a^2 = (x-a)(x+a)$.
- **Trinomio cuadrado**: $x^2 + 2ax + a^2 = (x+a)^2$.
- **Trinomio general** $x^2 + bx + c$: busca dos números cuyo producto sea $c$ y suma $b$. Ejemplo: $x^2 - 5x + 6 = (x-2)(x-3)$ porque $2\\cdot 3 = 6$ y $2+3=5$.

### Procedimiento

1. Sustituye. Si sale $\\tfrac{0}{0}$, **el numerador y el denominador deben tener un factor común que sea $(x-a)$**, siendo $a$ el valor al que tiende $x$.
2. Factoriza ambos para hacer aparecer ese $(x-a)$.
3. Simplifica y vuelve a sustituir.

### Ejemplo paso a paso

$$\\lim_{x\\to 2}\\frac{x^2 - 5x + 6}{x-2}$$

Paso 1: sustituyendo, $\\tfrac{4-10+6}{0} = \\tfrac{0}{0}$. Indeterminado.

Paso 2: factorizamos el numerador. Buscamos dos números con producto $6$ y suma $-5$: son $-2$ y $-3$. Entonces $x^2 - 5x + 6 = (x-2)(x-3)$.

Paso 3: simplificamos:
$$\\frac{(x-2)(x-3)}{x-2} = x-3, \\quad x\\neq 2.$$

Paso 4: sustituimos: $2 - 3 = -1$. Por tanto el límite vale $-1$.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{x^2-5x+6}{x-2}$",
      answer: -1,
      solution:
        "$\\tfrac{0}{0}$. $x^2-5x+6=(x-2)(x-3)$. Simplificamos a $x-3 \\to 2-3=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}\\dfrac{x^2-7x+12}{x-3}$",
      answer: -1,
      hint: "$x^2-7x+12=(x-3)(x-4)$.",
      solution: "Simplifica a $x-4 \\to 3-4=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{x^2+3x}{x}$",
      answer: 3,
      hint: "Saca factor común $x$.",
      solution:
        "$\\dfrac{x(x+3)}{x}=x+3 \\to 0+3=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 4}\\dfrac{x^2-16}{x^2-3x-4}$",
      answer: 1.6,
      hint: "Factoriza numerador y denominador. $x^2-3x-4=(x-4)(x+1)$.",
      solution:
        "Numerador: $(x-4)(x+4)$. Denominador: $(x-4)(x+1)$. Simplifica: $\\dfrac{x+4}{x+1} \\to \\dfrac{8}{5}=1.6$. Respuesta: $1.60$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -1}\\dfrac{x^2+3x+2}{x+1}$",
      answer: 1,
      hint: "$x^2+3x+2=(x+1)(x+2)$.",
      solution: "Simplifica a $x+2 \\to -1+2=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{x^3-1}{x-1}$",
      answer: 3,
      hint: "$x^3-1=(x-1)(x^2+x+1)$.",
      solution:
        "Simplifica a $x^2+x+1 \\to 1+1+1=3$. Respuesta: $3.00$.",
    },
  ],
);

const lv10 = L(
  10,
  "Indeterminación con raíces: el conjugado",
  "Truco del conjugado",
  `
### Una raíz que se resta

¿Y si la indeterminación viene de algo como $\\sqrt{x} - 2$? No podemos factorizar como antes. El truco es **multiplicar y dividir por el conjugado**.

El **conjugado** de $\\sqrt{x} - 2$ es $\\sqrt{x} + 2$. La idea es usar la identidad:
$$(a-b)(a+b) = a^2 - b^2$$
que nos permite "quitar" la raíz.

### Ejemplo paso a paso

$$\\lim_{x\\to 4}\\frac{\\sqrt{x} - 2}{x - 4}$$

Paso 1: sustituyendo, $\\tfrac{\\sqrt{4}-2}{4-4}=\\tfrac{0}{0}$. Indeterminado.

Paso 2: multiplicamos arriba y abajo por $\\sqrt{x}+2$:
$$\\frac{\\sqrt{x}-2}{x-4} \\cdot \\frac{\\sqrt{x}+2}{\\sqrt{x}+2} = \\frac{(\\sqrt{x})^2 - 2^2}{(x-4)(\\sqrt{x}+2)} = \\frac{x-4}{(x-4)(\\sqrt{x}+2)}.$$

Paso 3: simplificamos $(x-4)$:
$$\\frac{1}{\\sqrt{x}+2}.$$

Paso 4: sustituimos: $\\dfrac{1}{\\sqrt{4}+2} = \\dfrac{1}{4} = 0.25$.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 4}\\dfrac{\\sqrt{x}-2}{x-4}$",
      answer: 0.25,
      solution:
        "Multiplica por el conjugado $\\sqrt{x}+2$. Queda $\\dfrac{1}{\\sqrt{x}+2}\\to \\dfrac{1}{4}=0.25$. Respuesta: $0.25$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 9}\\dfrac{\\sqrt{x}-3}{x-9}$",
      answer: 1 / 6,
      solution:
        "Conjugado $\\sqrt{x}+3$: queda $\\dfrac{1}{\\sqrt{x}+3}\\to\\dfrac{1}{6}\\approx 0.1667$. Respuesta: $0.17$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{\\sqrt{x}-1}{x-1}$",
      answer: 0.5,
      solution: "Conjugado $\\sqrt{x}+1$: $\\dfrac{1}{\\sqrt{x}+1}\\to\\dfrac{1}{2}=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sqrt{x+1}-1}{x}$",
      answer: 0.5,
      hint: "Multiplica por $\\sqrt{x+1}+1$.",
      solution:
        "Conjugado: numerador $(x+1)-1 = x$. Queda $\\dfrac{x}{x(\\sqrt{x+1}+1)}=\\dfrac{1}{\\sqrt{x+1}+1}\\to\\dfrac{1}{2}=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sqrt{x+4}-2}{x}$",
      answer: 0.25,
      solution:
        "Conjugado $\\sqrt{x+4}+2$: numerador $(x+4)-4 = x$. Queda $\\dfrac{1}{\\sqrt{x+4}+2}\\to \\dfrac{1}{4}=0.25$. Respuesta: $0.25$.",
    },
  ],
);

// ---------- Niveles 11-50 (contenido curado en ./world1_ext) ----------

const extraLevels: Level[] = [
  ext.lv11, ext.lv12, ext.lv13, ext.lv14, ext.lv15, ext.lv16, ext.lv17, ext.lv18, ext.lv19, ext.lv20,
  ext.lv21, ext.lv22, ext.lv23, ext.lv24, ext.lv25, ext.lv26, ext.lv27, ext.lv28, ext.lv29, ext.lv30,
  ext.lv31, ext.lv32, ext.lv33, ext.lv34, ext.lv35, ext.lv36, ext.lv37, ext.lv38, ext.lv39, ext.lv40,
  ext.lv41, ext.lv42, ext.lv43, ext.lv44, ext.lv45, ext.lv46, ext.lv47, ext.lv48, ext.lv49, ext.lv50,
];

export const world1Levels: Level[] = [lv1, lv2, lv3, lv4, lv5, lv6, lv7, lv8, lv9, lv10, ...extraLevels];

// ============== JEFE DEL MUNDO 1: CAUCHY ==============
export const world1Boss = {
  id: "cauchy",
  name: "Augustin-Louis Cauchy",
  era: "Francia, siglo XIX",
  accent: "oklch(0.55 0.18 25)",
  portraitUrl: cauchyPortrait.url,
  themeUrl: bossTheme.url,
  intro: [
    "Bonjour. Soy Cauchy, el matemático que dio al cálculo su rigor moderno.",
    "Antes de mí, los infinitesimales eran fantasmas. Yo los até con épsilons y deltas.",
    "Los cincuenta niveles que has vencido eran calentamiento. Aquí no habrá pistas fáciles.",
    "Si pretendes dominar el análisis, debes pasar por mis límites. Comencemos.",
  ],
  taunts: [
    "Mon ami, la imprecisión no se tolera en mi laboratorio.",
    "Recuerda: el límite no es lo que la función vale, es lo que la función promete.",
    "Sustituye. Si rompe, factoriza. Si no factoriza, conjuga. Es un arte.",
    "Te queda mucho camino, aspirante.",
  ],
  victory: "Bien hecho. Te has ganado tu lugar entre los analistas. Continúa.",
  defeat: "C'est impossible... Tu rigor supera el mío. Toma tu galardón.",
  exercises: [
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to 1}\\dfrac{\\sqrt[3]{x}-1}{\\sqrt{x}-1}$",
      hint: "Cambio de variable $t=x^{1/6}$: entonces $\\sqrt[3]{x}=t^2$ y $\\sqrt{x}=t^3$.",
      answer: 2 / 3,
      solution:
        "Con $t=x^{1/6}$: numerador $t^2-1=(t-1)(t+1)$, denominador $t^3-1=(t-1)(t^2+t+1)$. El factor $(t-1)$ se cancela y $t\\to 1$: $\\dfrac{t+1}{t^2+t+1}\\to\\dfrac{2}{3}\\approx 0.67$. Respuesta: $0.67$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sqrt{1+2x}-\\sqrt{1-3x}}{x}$",
      hint: "Racionaliza multiplicando por la suma de las raíces.",
      answer: 2.5,
      solution:
        "Multiplicando por $\\sqrt{1+2x}+\\sqrt{1-3x}$: numerador $(1+2x)-(1-3x)=5x$. Queda $\\dfrac{5x}{x(\\sqrt{1+2x}+\\sqrt{1-3x})}\\to\\dfrac{5}{2}=2.5$. Respuesta: $2.50$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to+\\infty}\\Big(\\sqrt{x^2+3x+1}-\\sqrt{x^2-x+2}\\Big)$",
      hint: "Racionaliza y compara los coeficientes de $x$ en el numerador tras la simplificación.",
      answer: 2,
      solution:
        "Multiplicando por el conjugado: numerador $(x^2+3x+1)-(x^2-x+2)=4x-1$. Denominador $\\sqrt{x^2+3x+1}+\\sqrt{x^2-x+2}$. Dividiendo entre $x$: $\\dfrac{4-1/x}{\\sqrt{1+3/x+1/x^2}+\\sqrt{1-1/x+2/x^2}}\\to\\dfrac{4}{2}=2$. Respuesta: $2.00$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\tan(3x)-\\sin(3x)}{x^3}$",
      hint: "Escribe $\\tan-\\sin=\\sin\\cdot(1-\\cos)/\\cos$ y usa $1-\\cos u\\sim u^2/2$.",
      answer: 13.5,
      solution:
        "$\\tan 3x-\\sin 3x=\\dfrac{\\sin 3x\\,(1-\\cos 3x)}{\\cos 3x}$. Como $\\sin 3x\\sim 3x$, $1-\\cos 3x\\sim (3x)^2/2=9x^2/2$ y $\\cos 3x\\to 1$: $\\dfrac{3x\\cdot 9x^2/2}{x^3}=\\dfrac{27}{2}=13.5$. Respuesta: $13.50$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\dfrac{x+2}{x-1}\\right)^{2x+1}$",
      hint: "Forma $1^\\infty$: reescribe la base como $1+\\dfrac{3}{x-1}$.",
      answer: 403.43,
      solution:
        "La base $= 1+\\dfrac{3}{x-1}$. Exponente $\\times$ (base $-1$): $(2x+1)\\cdot\\dfrac{3}{x-1}\\to 6$. Por la fórmula del número $e$: el límite es $e^{6}\\approx 403.43$. Respuesta: $403.43$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to 2^-}\\dfrac{\\sqrt{x-1}-1}{(x-2)\\,\\lfloor x \\rfloor}$",
      hint: "Cerca de $2^-$, $\\lfloor x\\rfloor=1$. Racionaliza el numerador.",
      answer: 0.5,
      solution:
        "Con $x\\to 2^-$, $\\lfloor x\\rfloor=1$. Racionalizando: $\\dfrac{(x-1)-1}{(x-2)(\\sqrt{x-1}+1)}=\\dfrac{x-2}{(x-2)(\\sqrt{x-1}+1)}=\\dfrac{1}{\\sqrt{x-1}+1}\\to\\dfrac{1}{2}=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{n\\to\\infty}\\left(\\dfrac{n^2+n+1}{n^2-n+1}\\right)^{n}$",
      hint: "Reescribe la base como $1+\\dfrac{2n}{n^2-n+1}$ y usa la definición de $e$.",
      answer: 7.39,
      solution:
        "Base $-1 = \\dfrac{2n}{n^2-n+1}$. Producto con el exponente $n$: $\\dfrac{2n^2}{n^2-n+1}\\to 2$. Por tanto el límite es $e^2\\approx 7.39$. Respuesta: $7.39$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to 0}\\lim_{n\\to\\infty}\\dfrac{\\sin x\\,\\tan x\\,\\sin 2x\\,\\tan 2x\\cdots\\sin nx\\,\\tan nx}{(n!)^{2}\\,x^{2n}}$",
      answer: 1,
      solution:
        "Para $x\\to 0$, $\\sin(kx)\\sim kx$ y $\\tan(kx)\\sim kx$, luego $\\sin(kx)\\tan(kx)\\sim k^{2}x^{2}$. El producto para $k=1,\\ldots,n$ es $(n!)^{2}x^{2n}$, que se cancela con el denominador. Los dos límites valen $1$. Respuesta: $1.00$.",
    },
    {
      prompt:
        "$\\displaystyle\\lim_{x\\to 0^+}x^{\\,1/\\ln x}$",
      hint: "Toma logaritmo: $\\ln(y)=\\dfrac{\\ln x}{\\ln x}$.",
      answer: 2.72,
      solution:
        "$\\ln y=\\dfrac{1}{\\ln x}\\cdot\\ln x=1$, así que $y\\to e\\approx 2.72$. Respuesta: $2.72$.",
    },
    {
      prompt:
        "$f(x)=\\dfrac{\\sin(ax)}{x}$ si $x\\neq 0$, $f(0)=6$. ¿Qué valor de $a$ hace que $f$ sea continua en $0$? (da la solución positiva)",
      hint: "El límite es $a$; iguálalo a $f(0)$.",
      answer: 6,
      solution:
        "$\\lim_{x\\to 0}\\dfrac{\\sin(ax)}{x}=a$. Para que $f$ sea continua debe cumplirse $a=6$. Respuesta: $6.00$.",
    },
  ],
};

