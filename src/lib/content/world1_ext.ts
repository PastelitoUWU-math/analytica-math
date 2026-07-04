import type { Level, Exercise } from "./types";

const L = (
  n: number,
  title: string,
  concept: string,
  body: string,
  exercises: Exercise[],
): Level => ({
  id: `n${n}`,
  title: `Nivel ${n}: ${title}`,
  concept,
  lesson: { body },
  exercises,
});

// =====================================================
// NIVELES 11-50 — Continuación de MUNDO 1: LÍMITES (v2)
// Solo técnicas que NO requieren derivar ni integrar:
// sustitución, factorización, conjugado, comparación de
// grados/infinitos, límites notables, sándwich, cambio de
// variable y continuidad/Bolzano.
//
// Convención de respuestas especiales (introducida en el
// nivel 7 y recordada brevemente en el 12 y el 16, pero NO
// repetida en cada enunciado para no delatar la respuesta):
//   - Si el límite no existe (laterales distintos, ambos finitos): escribe "No"
//   - Si el límite es +infinito: escribe "Inf"
//   - Si el límite es -infinito: escribe "-Inf"
//
// Pega este bloque debajo de tu lv10 y añade lv11..lv50 al
// array de niveles de tu World.
// =====================================================

const lv11 = L(
  11,
  "Más indeterminaciones 0/0 con raíces",
  "Conjugado en casos más generales",
  `
### Practicando el conjugado con más variedad

En el nivel anterior aprendiste el truco del conjugado para raíces cuadradas. Ahora lo vamos a usar en situaciones ligeramente más variadas: raíces que no están "solas", denominadores con raíz, o el caso en que la raíz aparece **dos veces**, una vez con argumento y otra distinta.

### Ejemplo: raíz en el denominador

$$\\lim_{x\\to 4}\\frac{x-4}{\\sqrt{x}-2}$$

Al sustituir: $\\tfrac{0}{0}$. Multiplicamos por el conjugado del denominador, $\\sqrt{x}+2$:

$$\\frac{(x-4)(\\sqrt{x}+2)}{(\\sqrt{x}-2)(\\sqrt{x}+2)} = \\frac{(x-4)(\\sqrt{x}+2)}{x-4} = \\sqrt{x}+2.$$

Sustituyendo: $\\sqrt{4}+2 = 4$.

### Idea clave

No importa si la raíz está arriba o abajo: identifica **qué expresión con raíz** está causando el problema, multiplica por su conjugado arriba y abajo, y simplifica el factor que se cancela. Si aparecen **dos raíces distintas** a la vez (una arriba, otra abajo), puede ser necesario racionalizar **dos veces**, una por cada raíz.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 4}\\dfrac{x-4}{\\sqrt{x}-2}$",
      answer: 4,
      solution: "Multiplicando por $\\sqrt{x}+2$ se simplifica a $\\sqrt{x}+2 \\to \\sqrt{4}+2 = 4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 9}\\dfrac{x-9}{\\sqrt{x}-3}$",
      answer: 6,
      solution: "Se simplifica a $\\sqrt{x}+3 \\to 3+3=6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{x}{\\sqrt{x+1}-1}$",
      answer: 2,
      hint: "Multiplica por $\\sqrt{x+1}+1$.",
      solution: "Queda $\\sqrt{x+1}+1 \\to \\sqrt{1}+1=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 5}\\dfrac{x-5}{\\sqrt{x+4}-3}$",
      answer: 6,
      hint: "Multiplica por $\\sqrt{x+4}+3$.",
      solution: "Se simplifica a $\\sqrt{x+4}+3 \\to 3+3=6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sqrt{x+1}-1}{\\sqrt{x+9}-3}$",
      hint: "Racionaliza numerador y denominador por separado; el factor $x$ debería cancelarse en ambos.",
      answer: 3,
      solution:
        "Multiplicando arriba por $\\sqrt{x+1}+1$ y abajo por $\\sqrt{x+9}+3$, ambos numeradores quedan en $x$, que se cancela, dejando $\\dfrac{\\sqrt{x+9}+3}{\\sqrt{x+1}+1}\\to\\dfrac{6}{2}=3$. Respuesta: $3.00$.",
    },
  ],
);

const lv12 = L(
  12,
  "Límites cuando $x$ se va al infinito (polinomios)",
  "Comportamiento en el infinito",
  `
### Una nueva forma de "tender"

Hasta ahora $x$ tendía a un número concreto. Ahora dejamos que $x$ **crezca sin límite**, lo escribimos $x \\to +\\infty$ ("x tiende a más infinito"), o que decrezca sin límite, $x \\to -\\infty$.

### Polinomios: manda el término de mayor grado

Para un polinomio, cuando $x\\to\\pm\\infty$, el término con la potencia más alta de $x$ es el que "domina" y decide el resultado. Por ejemplo:

$$\\lim_{x\\to +\\infty} (3x^2 - 1000x + 5)$$

Aunque $-1000x$ parezca grande, cuando $x$ es **enorme** (por ejemplo $x=10^9$), $3x^2$ es muchísimo más grande que $1000x$. Por tanto:

$$\\lim_{x\\to+\\infty}(3x^2-1000x+5) = \\lim_{x\\to+\\infty} 3x^2 = +\\infty.$$

### Reglas prácticas

- Si el coeficiente del término dominante es **positivo** y $x\\to+\\infty$: el límite es $+\\infty$.
- Si el coeficiente es **negativo** y $x\\to+\\infty$: el límite es $-\\infty$.
- Cuando $x\\to-\\infty$, hay que fijarse también en si la potencia es par o impar (par: mismo signo que al $+\\infty$; impar: signo contrario).

### Recordatorio de notación

A partir de ahora, cuando un límite valga $+\\infty$ escribe **Inf**, y cuando valga $-\\infty$ escribe **-Inf**.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to +\\infty} (x^2 + 3x)$",
      answer: "Inf",
      solution: "El término dominante es $x^2$, positivo, hacia $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to +\\infty} (-2x^3 + 100x)$",
      answer: "-Inf",
      solution: "Domina $-2x^3$, que con $x\\to+\\infty$ y coeficiente negativo va a $-\\infty$. Respuesta: -Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -\\infty} (x^2 - 5x)$",
      answer: "Inf",
      hint: "Potencia par: el signo es el mismo que si $x\\to+\\infty$.",
      solution: "Domina $x^2$ (par, positivo): el límite es $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -\\infty} (x^3 + x)$",
      answer: "-Inf",
      hint: "Potencia impar: el signo se invierte respecto a $x\\to+\\infty$.",
      solution: "Domina $x^3$ (impar, positivo). Con $x\\to-\\infty$ el resultado es $-\\infty$. Respuesta: -Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to +\\infty} (-x^4 + 1000000x)$",
      answer: "-Inf",
      solution: "Domina $-x^4$, negativo: el límite es $-\\infty$. Respuesta: -Inf.",
    },
  ],
);

const lv13 = L(
  13,
  "Límites en el infinito de funciones racionales",
  "Comparar grados de numerador y denominador",
  `
### Tres casos según los grados

Sea $\\displaystyle\\lim_{x\\to\\infty}\\frac{P(x)}{Q(x)}$, con $P$ y $Q$ polinomios de grados $p$ y $q$.

1. **Si $p < q$** (el denominador "crece más rápido"): el límite es $0$.
2. **Si $p = q$**: el límite es el **cociente de los coeficientes** de los términos de mayor grado.
3. **Si $p > q$**: el límite es $\\pm\\infty$ (el numerador "gana").

### Ejemplo (caso $p=q$)

$$\\lim_{x\\to\\infty}\\frac{3x^2 + x}{5x^2 - 1} = \\frac{3}{5} = 0.6.$$

### Ejemplo (caso $p<q$)

$$\\lim_{x\\to\\infty}\\frac{2x+1}{x^2} = 0.$$

### Ejemplo (caso $p>q$)

$$\\lim_{x\\to\\infty}\\frac{x^3}{x+1} = +\\infty.$$

En este nivel solo trabajamos con $x\\to+\\infty$ y coeficientes positivos para centrarnos en identificar el caso.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to +\\infty}\\dfrac{3x^2+x}{5x^2-1}$",
      answer: 0.6,
      solution: "Mismo grado: cociente de coeficientes $3/5=0.6$. Respuesta: $0.60$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to +\\infty}\\dfrac{2x+1}{x^2}$",
      answer: 0,
      solution: "Grado del denominador mayor: el límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to +\\infty}\\dfrac{x^3}{x+1}$",
      answer: "Inf",
      solution: "Grado del numerador mayor: el límite es $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to +\\infty}\\dfrac{4x^3+2x}{2x^3-x^2}$",
      answer: 2,
      solution: "Mismo grado: cociente $4/2=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to +\\infty}\\dfrac{x+5}{x^4}$",
      answer: 0,
      solution: "Denominador de grado mayor: el límite es $0$. Respuesta: $0.00$.",
    },
  ],
);

const lv14 = L(
  14,
  "El método de dividir entre la mayor potencia",
  "Justificación algebraica del caso anterior",
  `
### Cómo se demuestra (no solo se memoriza)

Para entender de verdad por qué funciona la regla anterior, **dividimos numerador y denominador entre la mayor potencia de $x$ que aparezca**.

$$\\lim_{x\\to\\infty}\\frac{3x^2+x}{5x^2-1}$$

Dividimos cada término entre $x^2$:

$$= \\lim_{x\\to\\infty}\\frac{3 + \\tfrac{1}{x}}{5 - \\tfrac{1}{x^2}}$$

Cuando $x\\to\\infty$, los términos $\\tfrac{1}{x}$ y $\\tfrac{1}{x^2}$ **tienden a $0$**. Entonces queda:

$$= \\frac{3+0}{5-0} = \\frac{3}{5} = 0.6.$$

### Por qué importa este método

Funciona igual de bien para casos más complicados, incluso con raíces, y es la base de los siguientes niveles. Acostúmbrate a esta técnica: **dividir todo entre la potencia más alta que veas**.
`,
  [
    {
      prompt: "Dividiendo entre $x^2$: $\\displaystyle\\lim_{x\\to\\infty}\\dfrac{2x^2-3}{x^2+4}$",
      answer: 2,
      solution: "Queda $\\dfrac{2-3/x^2}{1+4/x^2} \\to \\dfrac{2}{1}=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{x^2+1}{2x^2+x+3}$",
      answer: 0.5,
      solution: "Queda $\\dfrac{1+1/x^2}{2+1/x+3/x^2}\\to\\dfrac{1}{2}=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{5x^3-x}{x^3+x^2}$",
      answer: 5,
      solution: "Queda $\\dfrac{5-1/x^2}{1+1/x}\\to\\dfrac{5}{1}=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{6x+1}{3x-2}$",
      answer: 2,
      solution: "Queda $\\dfrac{6+1/x}{3-2/x}\\to\\dfrac{6}{3}=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to\\infty}\\dfrac{x^2-1}{4x^2}$",
      answer: 0.25,
      solution: "Queda $\\dfrac{1-1/x^2}{4}\\to\\dfrac{1}{4}=0.25$. Respuesta: $0.25$.",
    },
  ],
);

const lv15 = L(
  15,
  "Asíntotas horizontales",
  "Interpretación geométrica del límite al infinito",
  `
### ¿Qué es una asíntota horizontal?

Si $\\displaystyle\\lim_{x\\to+\\infty} f(x) = L$ (un número finito), decimos que la recta $y = L$ es una **asíntota horizontal** de $f$ por la derecha. Esto significa que la gráfica de $f$ se **aplana** y se acerca cada vez más a la altura $L$ a medida que $x$ crece.

Lo mismo aplica si $\\displaystyle\\lim_{x\\to-\\infty} f(x) = L$, dando una asíntota horizontal por la izquierda (puede ser la misma recta u otra distinta).

### Ejemplo

$$f(x) = \\frac{2x+1}{x-3}$$

Dividiendo entre $x$: $\\dfrac{2+1/x}{1-3/x} \\to \\dfrac{2}{1} = 2$ cuando $x\\to\\pm\\infty$.

Por tanto $y=2$ es asíntota horizontal **tanto por la derecha como por la izquierda**.

En este nivel, calcula el límite (que es la altura $L$ de la asíntota horizontal).
`,
  [
    {
      prompt: "Asíntota horizontal de $f(x)=\\dfrac{2x+1}{x-3}$ cuando $x\\to+\\infty$.",
      answer: 2,
      solution: "Dividiendo entre $x$: $\\to 2$. Respuesta: $2.00$.",
    },
    {
      prompt: "Asíntota horizontal de $f(x)=\\dfrac{5x}{2x+1}$ cuando $x\\to+\\infty$.",
      answer: 2.5,
      solution: "Dividiendo entre $x$: $\\to 5/2=2.5$. Respuesta: $2.50$.",
    },
    {
      prompt: "Asíntota horizontal de $f(x)=\\dfrac{3}{x+1}$ cuando $x\\to+\\infty$.",
      answer: 0,
      solution: "Numerador de grado menor: tiende a $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "Asíntota horizontal de $f(x)=\\dfrac{-4x+2}{x+5}$ cuando $x\\to+\\infty$.",
      answer: -4,
      solution: "Cociente de coeficientes: $-4/1=-4$. Respuesta: $-4.00$.",
    },
    {
      prompt: "Asíntota horizontal de $f(x)=\\dfrac{x+1}{2x-6}$ cuando $x\\to-\\infty$.",
      answer: 0.5,
      solution: "Igual grado: $1/2=0.5$, válido en ambos extremos. Respuesta: $0.50$.",
    },
  ],
);

const lv16 = L(
  16,
  "Límites infinitos: cuando $f(x)$ se dispara",
  "Asíntotas verticales",
  `
### Otra forma de "no existir": irse a infinito

Considera $\\displaystyle\\lim_{x\\to 0^+}\\dfrac{1}{x}$. Al acercarnos a $0$ por la derecha ($x$ pequeño y positivo), $\\tfrac{1}{x}$ se hace **enorme**: $\\tfrac{1}{0.1}=10$, $\\tfrac{1}{0.01}=100$, $\\tfrac{1}{0.001}=1000\\ldots$ Decimos:

$$\\lim_{x\\to 0^+}\\frac{1}{x} = +\\infty.$$

Por la izquierda ($x$ pequeño y negativo): $\\tfrac{1}{-0.1}=-10$, $\\tfrac{1}{-0.01}=-100\\ldots$

$$\\lim_{x\\to 0^-}\\frac{1}{x} = -\\infty.$$

Como los dos lados dan resultados distintos, el límite **no existe** en $x=0$, pero la recta $x=0$ es una **asíntota vertical**.

### Cómo decidir el signo

Mira el signo del denominador cerca del punto (sin que se anule) y el signo del numerador:

$$\\lim_{x\\to 2^+}\\frac{1}{x-2}: \\quad x-2 \\text{ es positivo y pequeño} \\Rightarrow +\\infty.$$
$$\\lim_{x\\to 2^-}\\frac{1}{x-2}: \\quad x-2 \\text{ es negativo y pequeño} \\Rightarrow -\\infty.$$

Recuerda escribir **Inf** para $+\\infty$ y **-Inf** para $-\\infty$. Si los dos lados dieran resultados finitos pero distintos, escribirías **No**.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0^+}\\dfrac{1}{x}$",
      answer: "Inf",
      solution: "Denominador positivo y pequeño: $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0^-}\\dfrac{1}{x}$",
      answer: "-Inf",
      solution: "Denominador negativo y pequeño: $-\\infty$. Respuesta: -Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3^+}\\dfrac{1}{x-3}$",
      answer: "Inf",
      solution: "$x-3$ positivo y pequeño: $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1^+}\\dfrac{-1}{x-1}$",
      answer: "-Inf",
      hint: "El signo extra de $-1$ invierte el resultado.",
      solution: "$x-1\\to 0^+$, así que $\\tfrac{1}{x-1}\\to+\\infty$, pero el signo $-$ lo invierte. Respuesta: -Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{3}{(x-2)^2}$",
      answer: "Inf",
      hint: "El cuadrado siempre es positivo, sin importar el lado.",
      solution: "$(x-2)^2\\to 0^+$ desde cualquier lado, así que ambos laterales coinciden en $+\\infty$. Respuesta: Inf.",
    },
  ],
);

const lv17 = L(
  17,
  "Asíntotas verticales en funciones racionales",
  "Encontrar dónde se anula el denominador",
  `
### Receta para encontrar asíntotas verticales

Dada una función racional $f(x) = \\dfrac{P(x)}{Q(x)}$ **ya simplificada** (sin factores comunes entre $P$ y $Q$), las asíntotas verticales están en los valores $a$ donde $Q(a) = 0$.

### Ejemplo

$$f(x) = \\frac{x+1}{x^2-4}$$

El denominador se anula en $x=2$ y $x=-2$. Como el numerador no se anula ahí, ambas son asíntotas verticales.

### ¡Cuidado con los "agujeros"!

Si un factor se cancela (nivel 8), **no hay asíntota vertical** ahí, sino un agujero. Por ejemplo en $\\dfrac{x^2-4}{x-2} = x+2$ (para $x\\neq 2$), no hay asíntota en $x=2$.
`,
  [
    {
      prompt: "¿En qué valor de $x$ tiene una asíntota vertical $f(x)=\\dfrac{1}{x-5}$?",
      answer: 5,
      solution: "El denominador se anula en $x=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "¿En qué valor positivo de $x$ tiene asíntota vertical $f(x)=\\dfrac{x}{x^2-9}$? (da la solución positiva)",
      answer: 3,
      solution: "$x^2-9=0 \\Rightarrow x=\\pm 3$. La solución positiva es $3.00$.",
    },
    {
      prompt: "¿Tiene asíntota vertical en $x=2$ la función $f(x)=\\dfrac{x^2-4}{x-2}$? Responde $1$ si sí, $0$ si no.",
      answer: 0,
      solution: "El factor $(x-2)$ se simplifica con el numerador, así que no hay asíntota, solo un agujero. Respuesta: $0.00$.",
    },
    {
      prompt: "¿En qué valor de $x$ tiene asíntota vertical $f(x)=\\dfrac{3}{2x-6}$?",
      answer: 3,
      solution: "$2x-6=0 \\Rightarrow x=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "¿Tiene asíntota vertical en $x=-1$ la función $f(x)=\\dfrac{x+1}{x^2-1}$? Responde $1$ si sí, $0$ si no.",
      hint: "Factoriza el denominador y comprueba si el factor $(x+1)$ se cancela.",
      answer: 0,
      solution: "$(x+1)$ se cancela con el numerador, así que es un agujero, no asíntota. Respuesta: $0.00$.",
    },
  ],
);

const lv18 = L(
  18,
  "Indeterminación $\\infty - \\infty$",
  "Racionalizar para resolver restas de infinitos",
  `
### El nuevo conflicto: restar dos cosas que crecen

Cuando $x\\to\\infty$, expresiones como $\\sqrt{x^2+x} - x$ son una **resta de dos cantidades que ambas tienden a $+\\infty$**. No podemos saber a simple vista el resultado. Por eso es indeterminación $\\infty-\\infty$.

### Truco: multiplicar por el conjugado

$$\\lim_{x\\to+\\infty}\\big(\\sqrt{x^2+x} - x\\big)$$

Multiplicamos y dividimos por el conjugado $\\sqrt{x^2+x}+x$:

$$= \\lim_{x\\to+\\infty}\\frac{(x^2+x) - x^2}{\\sqrt{x^2+x}+x} = \\lim_{x\\to+\\infty}\\frac{x}{\\sqrt{x^2+x}+x}$$

Dividimos numerador y denominador entre $x$ (recordando $\\sqrt{x^2}=x$ para $x>0$):

$$= \\lim_{x\\to+\\infty}\\frac{1}{\\sqrt{1+1/x}+1} = \\frac{1}{1+1} = 0.5.$$

### Resumen del método

1. Identifica la resta de raíces (o de algo que se va a infinito).
2. Multiplica por el conjugado.
3. Simplifica usando $(a-b)(a+b)=a^2-b^2$.
4. Divide entre la potencia adecuada de $x$ y sustituye.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(\\sqrt{x^2+x}-x\\big)$",
      answer: 0.5,
      solution: "Tras racionalizar y dividir entre $x$, queda $\\dfrac{1}{1+1}=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(\\sqrt{x^2+2x}-x\\big)$",
      answer: 1,
      solution: "Racionalizando: $\\dfrac{2x}{\\sqrt{x^2+2x}+x}\\to\\dfrac{2}{1+1}=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(\\sqrt{x^2+4x}-x\\big)$",
      answer: 2,
      solution: "$\\dfrac{4x}{\\sqrt{x^2+4x}+x}\\to\\dfrac{4}{2}=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(x-\\sqrt{x^2-x}\\big)$",
      answer: 0.5,
      hint: "Aquí el orden está invertido; ten cuidado con el signo del numerador al racionalizar.",
      solution:
        "Racionalizando: $\\dfrac{x^2-(x^2-x)}{x+\\sqrt{x^2-x}}=\\dfrac{x}{x+\\sqrt{x^2-x}}\\to\\dfrac{1}{1+1}=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(\\sqrt{x^2+6x}-x\\big)$",
      answer: 3,
      solution: "$\\dfrac{6x}{\\sqrt{x^2+6x}+x}\\to\\dfrac{6}{2}=3$. Respuesta: $3.00$.",
    },
  ],
);

const lv19 = L(
  19,
  "Límites con valor absoluto",
  "Tratar $|x|$ como una función a trozos",
  `
### Recordatorio: ¿qué es $|x|$?

$$|x| = \\begin{cases} x & \\text{si } x \\geq 0 \\\\ -x & \\text{si } x < 0 \\end{cases}$$

Cuando un límite involucra valor absoluto **alrededor de un punto donde la expresión interior cambia de signo**, hay que estudiar los límites laterales por separado, igual que en el nivel 6.

### Ejemplo

$$\\lim_{x\\to 0}\\frac{|x|}{x}$$

- Por la derecha ($x>0$): $|x|=x$, así que $\\dfrac{|x|}{x} = 1$. Por tanto $\\lim_{x\\to 0^+} = 1$.
- Por la izquierda ($x<0$): $|x|=-x$, así que $\\dfrac{|x|}{x} = -1$. Por tanto $\\lim_{x\\to 0^-} = -1$.

Como los lados difieren, $\\displaystyle\\lim_{x\\to 0}\\frac{|x|}{x}$ **no existe**.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0^+}\\dfrac{|x|}{x}$",
      answer: 1,
      solution: "Para $x>0$, $|x|=x$, así que el cociente es $1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0^-}\\dfrac{|x|}{x}$",
      answer: -1,
      solution: "Para $x<0$, $|x|=-x$, así que el cociente es $-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{|x|}{x}$",
      answer: "No",
      solution: "Los límites laterales son $1$ y $-1$, distintos. El límite no existe. Respuesta: No.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}|x-3|$",
      answer: 0,
      solution: "$|x-3|$ es continua y vale $0$ en $x=3$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{|x-2|}{x-2}$",
      hint: "Estudia ambos lados; si difieren, ya sabes qué responder.",
      answer: "No",
      solution: "Por la derecha da $1$ y por la izquierda da $-1$: el límite no existe. Respuesta: No.",
    },
  ],
);

const lv20 = L(
  20,
  "Continuidad: la definición formal",
  "Tres condiciones para ser continua en un punto",
  `
### ¿Cuándo es "continua" una función en un punto?

Una función $f$ es **continua en $x=a$** si se cumplen **las tres condiciones** a la vez:

1. $f(a)$ **existe** (es decir, $a$ pertenece al dominio de $f$).
2. $\\displaystyle\\lim_{x\\to a} f(x)$ **existe**.
3. $\\displaystyle\\lim_{x\\to a} f(x) = f(a)$.

Si **fallan las dos últimas**, la función es **discontinua** en $a$. Si falla **la primera**, $a$ no pertenece al dominio y **no tiene sentido hablar de continuidad ahí**.

### Ejemplo

Sea $f(x) = x^2$ si $x\\neq 1$, $f(1) = 50$.

- $f(1)=50$ existe. ✓
- $\\lim_{x\\to 1} f(x) = 1$ existe. ✓
- ¿$1 = 50$? ✗

Falla la condición 3, así que $f$ **no es continua** en $x=1$.

### Cómo responder en este nivel

Escribe:
- **\`Sí\`** (o \`Si\`, sin tilde) si la función **es continua** en el punto indicado.
- **\`No\`** si la función existe en el punto pero **no es continua** ahí.
- **\`N/A\`** si $a$ **no pertenece al dominio** y por tanto no tiene sentido hablar de continuidad en ese punto.
`,
  [
    {
      prompt: "$f(x)=x+1$ en todo punto. ¿Es continua en $x=5$?",
      answer: "Si",
      solution: "Es un polinomio, siempre continuo. Respuesta: `Sí`.",
    },
    {
      prompt: "$f(x)=x^2$ si $x\\neq 2$, $f(2)=10$. ¿Es continua en $x=2$?",
      answer: "No",
      solution: "$\\lim_{x\\to2}f(x)=4 \\neq f(2)=10$: $2$ está en el dominio pero falla la condición 3. Respuesta: `No`.",
    },
    {
      prompt: "$f(x)=x$ si $x<1$, $f(x)=x+5$ si $x\\geq 1$. ¿Es continua en $x=1$?",
      answer: "No",
      solution: "Límites laterales distintos ($1$ y $6$): el límite no existe. $f(1)=6$ sí existe, pero la condición 2 falla. Respuesta: `No`.",
    },
    {
      prompt: "$f(x)=\\dfrac{1}{x}$, con $f(0)$ no definido. ¿Es continua en $x=0$?",
      answer: "N/A",
      solution: "$0$ no está en el dominio de $\\tfrac1x$: no tiene sentido preguntarse por la continuidad ahí. Respuesta: `N/A`.",
    },
    {
      prompt: "$f(x)=x^2-1$ si $x\\neq 3$, $f(3)=8$. ¿Es continua en $x=3$?",
      answer: "Si",
      solution: "$\\lim_{x\\to3}f(x)=8=f(3)$. Las tres condiciones se cumplen. Respuesta: `Sí`.",
    },
  ],
);

const lv21 = L(
  21,
  "Tipos de discontinuidad",
  "Evitable, de salto e infinita",
  `
### Tres "formas" de fallar la continuidad

1. **Discontinuidad evitable**: el límite **existe**, pero no coincide con $f(a)$, o $f(a)$ no está definido. Ejemplo: $\\dfrac{x^2-1}{x-1}$ en $x=1$.

2. **Discontinuidad de salto**: los límites laterales **existen pero son distintos**.

3. **Discontinuidad infinita**: al menos un límite lateral es $\\pm\\infty$.

### Cómo identificarlas

Calcula los límites laterales:
- Ambos finitos e **iguales** entre sí pero distintos de $f(a)$ (o $f(a)$ no existe) → **evitable**.
- Ambos finitos pero **distintos entre sí** → **salto**.
- Alguno es $\\pm\\infty$ → **infinita**.

En este nivel, responde con un código: $\\mathbf{1}$ = evitable, $\\mathbf{2}$ = salto, $\\mathbf{3}$ = infinita.
`,
  [
    {
      prompt:
        "$f(x)=\\dfrac{x^2-9}{x-3}$ en $x=3$ (no definida ahí). Tipo de discontinuidad (1, 2 o 3):",
      answer: 1,
      solution: "El límite existe ($6$) pero $f(3)$ no está definido: evitable. Respuesta: $1.00$.",
    },
    {
      prompt:
        "$f(x)=x$ si $x<0$, $f(x)=x+3$ si $x\\geq 0$. Tipo de discontinuidad en $x=0$ (1, 2 o 3):",
      answer: 2,
      solution: "Límites laterales $0$ y $3$, distintos pero finitos: salto. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=\\dfrac{1}{(x-2)^2}$. Tipo de discontinuidad en $x=2$ (1, 2 o 3):",
      answer: 3,
      solution: "Los límites laterales son $+\\infty$: discontinuidad infinita. Respuesta: $3.00$.",
    },
    {
      prompt:
        "$f(x)=x+2$ si $x\\neq 1$, $f(1)=100$. Tipo de discontinuidad en $x=1$ (1, 2 o 3):",
      answer: 1,
      solution: "El límite existe ($3$) pero no coincide con $f(1)=100$: evitable. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=1/x$. Tipo de discontinuidad en $x=0$ (1, 2 o 3):",
      answer: 3,
      solution: "Los laterales son $+\\infty$ y $-\\infty$: discontinuidad infinita. Respuesta: $3.00$.",
    },
  ],
);

const lv22 = L(
  22,
  "El número $e$: primer encuentro",
  "El límite $\\left(1+\\tfrac{1}{x}\\right)^x$",
  `
### Un límite muy especial

Existe un límite famosísimo en matemáticas:

$$\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{x}\\right)^x = e \\approx 2.71828\\ldots$$

Este número $e$ (llamado **número de Euler**) aparece por todas partes. No vamos a demostrarlo; lo aceptamos como un **hecho**. Cualquier límite que, al sustituir, dé la forma $1^{\\infty}$ (base que tiende a $1$, exponente que tiende a infinito) se relaciona con $e$.

### Variantes equivalentes

$$\\lim_{x\\to+\\infty}\\left(1+\\frac{k}{x}\\right)^x = e^k \\qquad \\lim_{x\\to 0}\\left(1+x\\right)^{1/x} = e$$

### Tabla de referencia (úsala cuando la necesites)

| $k$ | $e^k$ aprox. |
|---|---|
| $-1$ | $0.3679$ |
| $0.5$ | $1.6487$ |
| $1$ | $2.7183$ |
| $2$ | $7.3891$ |
| $3$ | $20.0855$ |
| $4$ | $54.5982$ |
| $5$ | $148.4132$ |

En este nivel aplicarás estas fórmulas tal cual, sin deducirlas, para familiarizarte con el número $e$. Da tus respuestas con $2$ decimales.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{x}\\right)^x$",
      answer: 2.72,
      solution: "Por definición, este límite es $e \\approx 2.72$. Respuesta: $2.72$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}(1+x)^{1/x}$",
      answer: 2.72,
      solution: "Es la forma equivalente de $e$. Respuesta: $2.72$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^x$",
      answer: 7.39,
      solution: "Aplicando la fórmula con $k=2$, usando la tabla: $e^2 \\approx 7.39$. Respuesta: $7.39$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(1+\\frac{3}{x}\\right)^x$",
      answer: 20.09,
      solution: "Con $k=3$, usando la tabla: $e^3 \\approx 20.09$. Respuesta: $20.09$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(1-\\frac{1}{x}\\right)^x$",
      answer: 0.37,
      solution: "Con $k=-1$, usando la tabla: $e^{-1}\\approx 0.37$. Respuesta: $0.37$.",
    },
  ],
);

const lv23 = L(
  23,
  "Reconociendo la forma $1^{\\infty}$",
  "Transformar a la fórmula del número $e$",
  `
### Una versión más general

A veces la base no es exactamente $1+\\tfrac{1}{x}$, sino algo equivalente. La clave es **identificar tres piezas**:

$$\\lim f(x)^{g(x)} \\quad \\text{donde } f(x)\\to 1 \\text{ y } g(x)\\to\\infty.$$

La fórmula útil (ya demostrada en cursos avanzados, que aquí solo aplicamos) es:

$$\\lim f(x)^{g(x)} = e^{\\;\\lim\\, g(x)\\cdot(f(x)-1)}$$

### Ejemplo

$$\\lim_{x\\to+\\infty}\\left(\\frac{x+2}{x}\\right)^x = \\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^x$$

Aquí $f(x)-1 = \\tfrac{2}{x}$ y $g(x)=x$, así que el exponente es $\\displaystyle\\lim_{x\\to\\infty} x\\cdot\\frac{2}{x} = 2$. Por tanto el límite es $e^2$.

### Procedimiento resumido

1. Comprueba que la base tiende a $1$ y el exponente a $\\infty$.
2. Calcula $\\displaystyle\\lim g(x)\\cdot(f(x)-1)$ — este será el exponente de $e$.
3. Usa la tabla del nivel anterior para dar el valor de $e$ elevado a ese número, con $2$ decimales.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\dfrac{x+2}{x}\\right)^x$",
      answer: 7.39,
      solution: "El exponente resulta $2$, así que el límite es $e^2\\approx 7.39$. Respuesta: $7.39$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\dfrac{x-1}{x}\\right)^x$",
      answer: 0.37,
      solution: "El exponente es $-1$: $e^{-1}\\approx 0.37$. Respuesta: $0.37$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(1+\\dfrac{1}{2x}\\right)^x$",
      answer: 1.65,
      hint: "El exponente buscado es $\\lim x\\cdot\\frac{1}{2x}$.",
      solution: "El exponente es $x\\cdot\\tfrac{1}{2x}=0.5$: $e^{0.5}\\approx 1.65$. Respuesta: $1.65$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\dfrac{2x+1}{2x}\\right)^x$",
      answer: 1.65,
      hint: "Reescribe la base como $1+\\frac{1}{2x}$.",
      solution: "El exponente es $x\\cdot\\tfrac{1}{2x}=0.5$: $e^{0.5}\\approx 1.65$. Respuesta: $1.65$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(\\dfrac{x+4}{x}\\right)^x$",
      answer: 54.6,
      hint: "El exponente buscado es $\\lim x\\cdot\\frac{4}{x}$.",
      solution: "El exponente es $4$: $e^4\\approx 54.60$. Respuesta: $54.60$.",
    },
  ],
);

const lv24 = L(
  24,
  "El límite notable $\\dfrac{\\sin x}{x}$",
  "La piedra angular de los límites trigonométricos",
  `
### El límite trigonométrico más importante

$$\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1$$

(con $x$ medido en **radianes**). Este resultado no se obtiene por sustitución directa (daría $\\tfrac{0}{0}$) ni por factorización; se demuestra geométricamente comparando áreas, y simplemente lo **aceptamos como herramienta**.

### Cómo usarlo en variantes

Si en vez de $x$ aparece **cualquier expresión** que tienda a $0$, la fórmula sigue valiendo:

$$\\lim_{x\\to 0}\\frac{\\sin(3x)}{3x} = 1, \\qquad \\lim_{x\\to 0}\\frac{\\sin(kx)}{kx}=1 \\text{ para cualquier } k\\neq 0.$$

### Truco para límites tipo $\\dfrac{\\sin(kx)}{x}$

$$\\lim_{x\\to 0}\\frac{\\sin(3x)}{x} = \\lim_{x\\to 0}\\frac{\\sin(3x)}{3x}\\cdot 3 = 1 \\cdot 3 = 3.$$

La idea: "completamos" para que dentro del seno y en el denominador aparezca la **misma** expresión, y multiplicamos por el factor que falte.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin x}{x}$",
      answer: 1,
      solution: "Es el límite notable. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(5x)}{x}$",
      answer: 5,
      solution: "$\\dfrac{\\sin(5x)}{5x}\\cdot 5 \\to 1\\cdot 5=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(2x)}{3x}$",
      answer: 0.67,
      hint: "Multiplica y divide para emparejar $2x$ arriba y abajo.",
      solution: "$\\dfrac{\\sin(2x)}{2x}\\cdot\\dfrac{2}{3}\\to 1\\cdot\\dfrac{2}{3}\\approx 0.67$. Respuesta: $0.67$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(4x)}{\\sin(2x)}$",
      answer: 2,
      hint: "Multiplica numerador y denominador para formar ambos límites notables por separado.",
      solution:
        "Escribe $\\dfrac{\\sin(4x)}{4x}\\cdot\\dfrac{2x}{\\sin(2x)}\\cdot\\dfrac{4x}{2x} \\to 1\\cdot1\\cdot2=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{x}{\\sin x}$",
      answer: 1,
      solution: "Es el recíproco del límite notable, también vale $1$. Respuesta: $1.00$.",
    },
  ],
);

const lv25 = L(
  25,
  "Más límites trigonométricos derivados",
  "$\\tan x/x$ y $(1-\\cos x)/x^2$",
  `
### Dos límites que se deducen del anterior

**1. La tangente:**
$$\\lim_{x\\to 0}\\frac{\\tan x}{x} = 1$$
porque $\\tan x = \\dfrac{\\sin x}{\\cos x}$, y $\\cos x \\to 1$ cuando $x\\to 0$, así que:
$$\\frac{\\tan x}{x} = \\frac{\\sin x}{x}\\cdot\\frac{1}{\\cos x} \\to 1\\cdot 1 = 1.$$

**2. El coseno (más sutil):**
$$\\lim_{x\\to 0}\\frac{1-\\cos x}{x^2} = \\frac{1}{2}$$

Se demuestra multiplicando por el conjugado $1+\\cos x$:
$$\\frac{1-\\cos x}{x^2}\\cdot\\frac{1+\\cos x}{1+\\cos x} = \\frac{1-\\cos^2 x}{x^2(1+\\cos x)} = \\frac{\\sin^2 x}{x^2}\\cdot\\frac{1}{1+\\cos x} \\to 1\\cdot\\frac{1}{2} = 0.5.$$

(Usamos $1-\\cos^2 x = \\sin^2 x$.)

Acepta y usa estos dos resultados como **fórmulas conocidas**, igual que hiciste con $\\sin x/x$.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\tan x}{x}$",
      answer: 1,
      solution: "Fórmula conocida. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^2}$",
      answer: 0.5,
      solution: "Fórmula conocida: $1/2$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\tan(3x)}{x}$",
      answer: 3,
      solution: "$\\dfrac{\\tan(3x)}{3x}\\cdot 3 \\to 1\\cdot 3 = 3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{1-\\cos(2x)}{x^2}$",
      answer: 2,
      hint: "Sustituye $u=2x$ y ajusta el factor que sobra.",
      solution:
        "$\\dfrac{1-\\cos(2x)}{(2x)^2}\\cdot 4 \\to \\dfrac{1}{2}\\cdot 4 = 2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\tan x - \\sin x}{x^3}$",
      answer: 0.5,
      hint: "Escribe $\\tan x - \\sin x = \\sin x\\left(\\frac{1}{\\cos x}-1\\right) = \\sin x \\cdot \\frac{1-\\cos x}{\\cos x}$.",
      solution:
        "Reescribiendo y usando los dos límites notables: $\\dfrac{\\sin x}{x}\\cdot\\dfrac{1-\\cos x}{x^2}\\cdot\\dfrac{1}{\\cos x} \\to 1\\cdot 0.5\\cdot 1 = 0.5$. Respuesta: $0.50$.",
    },
  ],
);

const lv26 = L(
  26,
  "Límites trigonométricos con cambio de variable",
  "Sustituir $u = x - a$ para centrar el límite en $0$",
  `
### El truco del cambio de variable

Muchos límites trigonométricos que **no** tienden a $0$ se resuelven trasladando el problema a uno que sí lo haga. Si $x\\to a$, definimos $u = x-a$, de modo que cuando $x\\to a$, automáticamente $u\\to 0$. Luego sustituimos $x = u+a$ en toda la expresión.

### Ejemplo

$$\\lim_{x\\to \\pi}\\frac{\\sin x}{x-\\pi}$$

Sea $u = x - \\pi$ (entonces $x = u+\\pi$, y $u\\to 0$). Usamos $\\sin(u+\\pi) = -\\sin u$:

$$\\lim_{u\\to 0}\\frac{-\\sin u}{u} = -1.$$

### Otro ejemplo

$$\\lim_{x\\to 0}\\frac{\\sin(x^2)}{x^2}$$

Aquí directamente $u = x^2 \\to 0$ cuando $x\\to 0$, así que es exactamente el límite notable: el resultado es $1$.

La idea clave: **identifica qué expresión está "jugando el papel" de la variable que tiende a $0$** dentro del seno, y trabaja con ella.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(x^2)}{x^2}$",
      answer: 1,
      solution: "Es el límite notable con $u=x^2\\to 0$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(x^3)}{x^3}$",
      answer: 1,
      solution: "Igual, con $u=x^3$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to \\pi}\\dfrac{\\sin x}{x-\\pi}$",
      answer: -1,
      solution: "Con $u=x-\\pi$, $\\sin(u+\\pi)=-\\sin u$, así que el límite es $-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(5x^2)}{x^2}$",
      answer: 5,
      hint: "Forma el límite notable con $u=5x^2$.",
      solution: "$\\dfrac{\\sin(5x^2)}{5x^2}\\cdot 5 \\to 1\\cdot 5=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{\\sin(x-2)}{x-2}$",
      answer: 1,
      solution: "Con $u=x-2\\to 0$, es exactamente el límite notable. Respuesta: $1.00$.",
    },
  ],
);

const lv27 = L(
  27,
  "Límites exponenciales y logarítmicos básicos",
  "Sustitución directa en $e^x$ y $\\ln x$",
  `
### Las funciones exponencial y logaritmo son continuas

Igual que con los polinomios, $e^x$ y $\\ln x$ (en su dominio) son **funciones continuas**, así que para calcular su límite en un punto donde están definidas, **se sustituye directamente**:

$$\\lim_{x\\to 0} e^x = e^0 = 1, \\qquad \\lim_{x\\to 1}\\ln x = \\ln 1 = 0.$$

### Valores útiles para recordar

$$e^0=1,\\quad \\ln 1 = 0,\\quad \\ln e = 1.$$

### Casos especiales en el infinito

$$\\lim_{x\\to+\\infty} e^x = +\\infty, \\qquad \\lim_{x\\to-\\infty} e^x = 0, \\qquad \\lim_{x\\to+\\infty}\\ln x = +\\infty, \\qquad \\lim_{x\\to 0^+}\\ln x = -\\infty.$$
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} e^x$",
      answer: 1,
      solution: "$e^0=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\ln x$",
      answer: 0,
      solution: "$\\ln 1=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty} e^x$",
      answer: "Inf",
      solution: "La exponencial crece sin límite: $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to-\\infty} e^x$",
      answer: 0,
      solution: "La exponencial se aplasta hacia $0$ cuando $x\\to-\\infty$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0^+}\\ln x$",
      answer: "-Inf",
      solution: "El logaritmo se dispara a $-\\infty$ cerca de $0$ por la derecha. Respuesta: -Inf.",
    },
  ],
);

const lv28 = L(
  28,
  "El límite notable $\\dfrac{e^x-1}{x}$",
  "Otra pieza fundamental",
  `
### Un límite hermano del de $\\sin x/x$

$$\\lim_{x\\to 0}\\frac{e^x-1}{x} = 1$$

Al sustituir directamente da $\\tfrac{0}{0}$, pero este resultado se acepta como herramienta fundamental, ligado a la definición del número $e$.

### Variante con $\\ln$

$$\\lim_{x\\to 0}\\frac{\\ln(1+x)}{x} = 1$$

### Usándolos con el mismo truco de "emparejar"

$$\\lim_{x\\to 0}\\frac{e^{3x}-1}{x} = \\lim_{x\\to 0}\\frac{e^{3x}-1}{3x}\\cdot 3 = 1\\cdot 3 = 3.$$

$$\\lim_{x\\to 0}\\frac{\\ln(1+5x)}{x} = \\lim_{x\\to 0}\\frac{\\ln(1+5x)}{5x}\\cdot 5 = 1\\cdot 5 = 5.$$

Exactamente la misma estrategia que usaste con $\\sin(kx)/x$.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{e^x-1}{x}$",
      answer: 1,
      solution: "Límite notable. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\ln(1+x)}{x}$",
      answer: 1,
      solution: "Límite notable. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{e^{4x}-1}{x}$",
      answer: 4,
      solution: "$\\dfrac{e^{4x}-1}{4x}\\cdot4 \\to 1\\cdot4=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\ln(1+3x)}{x}$",
      answer: 3,
      solution: "$\\dfrac{\\ln(1+3x)}{3x}\\cdot3 \\to 1\\cdot3=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{e^{2x}-1}{\\sin x}$",
      answer: 2,
      hint: "Divide ambos numerador y denominador por $x$ por separado.",
      solution: "$\\dfrac{e^{2x}-1}{x}\\cdot\\dfrac{x}{\\sin x}\\to 2\\cdot1=2$. Respuesta: $2.00$.",
    },
  ],
);

const lv29 = L(
  29,
  "Comparación de infinitos",
  "¿Quién crece más rápido: $\\ln x$, $x$, $e^x$, $n!$?",
  `
### Jerarquía de crecimiento al infinito

Cuando $x\\to+\\infty$, no todas las funciones que tienden a $\\infty$ crecen igual de rápido. Existe una jerarquía (de más lento a más rápido), que aceptamos como hecho conocido:

$$\\ln x \\;\\ll\\; x^a \\;(\\text{cualquier potencia} \\;a>0) \\;\\ll\\; e^x \\;\\ll\\; n!$$

Esto permite resolver de un vistazo límites tipo $\\infty/\\infty$ entre funciones de distinto "tipo":

$$\\lim_{x\\to+\\infty}\\frac{\\ln x}{x} = 0, \\qquad \\lim_{x\\to+\\infty}\\frac{x^2}{e^x} = 0, \\qquad \\lim_{x\\to+\\infty}\\frac{e^x}{x^{100}} = +\\infty.$$

### Regla práctica

En un cociente $\\tfrac{f(x)}{g(x)}$ con $x\\to\\infty$: el límite es $0$ si $g$ "crece más" que $f$ en la jerarquía, y $+\\infty$ si $f$ "crece más" que $g$.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\ln x}{x}$",
      answer: 0,
      solution: "$x$ gana a $\\ln x$ en la jerarquía: el límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{x^2}{e^x}$",
      answer: 0,
      solution: "$e^x$ gana a cualquier potencia: el límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x^{100}}$",
      answer: "Inf",
      solution: "$e^x$ gana: el límite es $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{x^3}{\\ln x}$",
      answer: "Inf",
      solution: "$x^3$ gana a $\\ln x$: el límite es $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{n\\to+\\infty}\\dfrac{e^n}{n!}$",
      answer: 0,
      hint: "$n!$ está al final de la jerarquía, por encima incluso de la exponencial.",
      solution: "$n!$ gana incluso a $e^n$: el límite es $0$. Respuesta: $0.00$.",
    },
  ],
);

const lv30 = L(
  30,
  "Teorema del sándwich (o emparedado)",
  "Acotar para encontrar el límite",
  `
### La idea del sándwich

Si tenemos tres funciones tales que, cerca de $a$ (salvo quizás en $a$):

$$g(x) \\leq f(x) \\leq h(x)$$

y además $\\displaystyle\\lim_{x\\to a} g(x) = \\lim_{x\\to a} h(x) = L$ (¡el **mismo** número!), entonces obligatoriamente:

$$\\lim_{x\\to a} f(x) = L.$$

La intuición: si $f$ está "atrapada" entre dos funciones que se aprietan hacia el mismo valor $L$, $f$ no tiene escapatoria.

### Ejemplo clásico

$$\\lim_{x\\to 0} x^2\\sin\\!\\left(\\frac{1}{x}\\right)$$

Como $-1 \\leq \\sin(1/x) \\leq 1$ siempre, multiplicando por $x^2\\geq 0$:

$$-x^2 \\leq x^2\\sin(1/x) \\leq x^2.$$

Como $\\lim_{x\\to 0}(-x^2) = 0$ y $\\lim_{x\\to 0} x^2 = 0$, por el sándwich:

$$\\lim_{x\\to 0} x^2\\sin(1/x) = 0.$$

Esta técnica es especialmente útil cuando la función tiene una parte "oscilante" (como $\\sin$ o $\\cos$ de algo que no tiende a nada concreto) multiplicada por algo que sí tiende a $0$.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} x^2\\sin\\!\\left(\\dfrac{1}{x}\\right)$",
      answer: 0,
      solution: "Acotado entre $-x^2$ y $x^2$, ambos $\\to 0$. Por sándwich, el límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} x\\cos\\!\\left(\\dfrac{1}{x}\\right)$",
      answer: 0,
      solution: "Acotado entre $-|x|$ y $|x|$, ambos $\\to0$. El límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} x^4\\sin\\!\\left(\\dfrac{3}{x^2}\\right)$",
      answer: 0,
      solution: "Acotado entre $-x^4$ y $x^4$, ambos $\\to0$. El límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt:
        "Si $3 \\leq f(x) \\leq x^2-2x+4$ cerca de $x=1$ (y $\\lim_{x\\to1}(x^2-2x+4)=3$), ¿cuánto vale $\\displaystyle\\lim_{x\\to 1} f(x)$?",
      answer: 3,
      solution: "Ambas cotas tienden a $3$, así que por sándwich $f$ también tiende a $3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\sin x}{x}$",
      answer: 0,
      hint: "Acota $\\sin x$ entre $-1$ y $1$, y divide entre $x\\to\\infty$.",
      solution: "$-\\tfrac{1}{x}\\leq\\tfrac{\\sin x}{x}\\leq\\tfrac{1}{x}$, y ambas cotas $\\to0$. Respuesta: $0.00$.",
    },
  ],
);

const lv31 = L(
  31,
  "Asíntotas oblicuas",
  "Cuando la asíntota no es horizontal",
  `
### ¿Cuándo aparece una asíntota oblicua?

En una función racional $\\dfrac{P(x)}{Q(x)}$, si el grado del numerador es **exactamente uno más** que el del denominador, no hay asíntota horizontal, pero sí una **asíntota oblicua**: una recta $y = mx+n$ a la que la función se acerca cuando $x\\to\\pm\\infty$.

### Cómo encontrarla: división de polinomios

Se obtiene haciendo la **división** de $P(x)$ entre $Q(x)$:

$$\\frac{P(x)}{Q(x)} = (mx+n) + \\frac{\\text{resto}}{Q(x)}$$

Cuando $x\\to\\infty$, el término $\\dfrac{\\text{resto}}{Q(x)} \\to 0$, así que la función se "pega" a la recta $y=mx+n$.

### Ejemplo

$$f(x) = \\frac{x^2+1}{x} = x + \\frac{1}{x}$$

Aquí $\\tfrac{1}{x}\\to 0$ cuando $x\\to\\infty$, así que la asíntota oblicua es $y = x$ (pendiente $m=1$, $n=0$).
`,
  [
    {
      prompt: "Pendiente de la asíntota oblicua de $f(x)=\\dfrac{x^2+1}{x}$.",
      answer: 1,
      solution: "$f(x)=x+\\tfrac{1}{x}$, así que $m=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "Pendiente de la asíntota oblicua de $f(x)=\\dfrac{2x^2+3}{x}$.",
      answer: 2,
      solution: "$f(x)=2x+\\tfrac{3}{x}$, así que $m=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "Pendiente de la asíntota oblicua de $f(x)=\\dfrac{x^2-x+1}{x-1}$.",
      hint: "Divide: $x^2-x+1 = (x-1)\\cdot x + 1$.",
      answer: 1,
      solution: "Dividiendo: $f(x) = x + \\dfrac{1}{x-1}$, así que $m=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "Pendiente de la asíntota oblicua de $f(x)=\\dfrac{3x^2+2x}{x+1}$.",
      hint: "Divide: $3x^2+2x = (x+1)(3x-1)+1$.",
      answer: 3,
      solution: "Dividiendo: $f(x)=3x-1+\\dfrac{1}{x+1}$, así que $m=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "¿Tiene asíntota oblicua $f(x)=\\dfrac{x+1}{x^2}$? Responde $1$ si sí, $0$ si no.",
      answer: 0,
      solution: "El grado del numerador no es uno más que el del denominador (es menor), así que no hay oblicua. Respuesta: $0.00$.",
    },
  ],
);

const lv32 = L(
  32,
  "Repaso mixto I",
  "Combinando todas las técnicas vistas hasta ahora",
  `
### Es hora de mezclar

Ya conoces: sustitución directa, factorización, conjugado, límites al infinito, asíntotas, límites trigonométricos y exponenciales, y el sándwich. En los exámenes reales **no se te dice qué técnica usar**: tienes que **reconocerla tú mismo**.

### Estrategia general para abordar cualquier límite

1. **Sustituye primero.** Si no hay indeterminación, ya terminaste.
2. Si sale $\\tfrac{0}{0}$: factoriza, usa el conjugado (si hay raíces), o un límite notable (si hay $\\sin$, $\\cos$, $\\tan$, $e^x$, $\\ln$).
3. Si $x\\to\\infty$ y aparece un cociente de polinomios: compara grados, o divide entre la mayor potencia.
4. Si aparece $\\infty - \\infty$: usa el conjugado.
5. Si aparece $1^\\infty$: usa la fórmula del número $e$.
6. Si hay algo "oscilante" multiplicado por algo que tiende a $0$: piensa en el sándwich.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}(2x^2-5)$",
      answer: 13,
      solution: "Sustitución directa: $2\\cdot9-5=13$. Respuesta: $13.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{x^2-4}{x-2}$",
      answer: 4,
      solution: "Factorización: $x+2 \\to 4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{3x^2+1}{x^2-5}$",
      answer: 3,
      solution: "Mismo grado: $3/1=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(2x)}{x}$",
      answer: 2,
      solution: "Límite notable adaptado: $2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 4}\\dfrac{\\sqrt{x}-2}{x-4}$",
      answer: 0.25,
      solution: "Conjugado: $\\dfrac{1}{\\sqrt{x}+2}\\to0.25$. Respuesta: $0.25$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} x^2\\cos\\!\\left(\\dfrac{1}{x}\\right)$",
      answer: 0,
      solution: "Sándwich: el límite es $0$. Respuesta: $0.00$.",
    },
  ],
);

const lv33 = L(
  33,
  "Factores que se anulan con multiplicidad",
  "Cuando el factor común aparece elevado al cuadrado",
  `
### Un matiz importante de la factorización

A veces, al factorizar, el factor que causa el $\\tfrac00$ aparece **repetido** (elevado a una potencia) en numerador o denominador. Hay que simplificar **todas** las copias que se puedan cancelar, no solo una.

### Ejemplo

$$\\lim_{x\\to 1}\\frac{(x-1)^2}{x^2-1}$$

Al sustituir: $\\tfrac{0}{0}$. Factorizamos el denominador: $x^2-1=(x-1)(x+1)$. Simplificando **una** copia de $(x-1)$:

$$\\frac{(x-1)^2}{(x-1)(x+1)} = \\frac{x-1}{x+1}.$$

Ahora sí, sustituyendo: $\\dfrac{1-1}{1+1} = 0$.

### Punto clave

Después de simplificar, **vuelve a comprobar** si sigue habiendo indeterminación. Si el numerador tiene más copias del factor que el denominador, el resultado final puede ser $0$; si tiene menos, puede aparecer de nuevo una división por cero (¡y entonces hay que pensar si es un límite infinito o no existe!).
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{(x-1)^2}{x^2-1}$",
      answer: 0,
      solution: "Simplificando una copia de $(x-1)$, queda $\\dfrac{x-1}{x+1}\\to0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{x^2-4}{(x-2)^2}$",
      hint: "Tras simplificar una copia, sigue habiendo una división por algo que tiende a $0$; estudia ambos lados.",
      answer: "Inf",
      solution:
        "Simplificando, queda $\\dfrac{x+2}{x-2}$, que cerca de $x=2$ por ambos lados da $+\\infty$ (numerador positivo, denominador al cuadrado siempre positivo... pero aquí ya no está al cuadrado). Por la derecha $\\to+\\infty$ y por la izquierda $\\to-\\infty$; sin embargo el numerador original $(x-2)^2$ siempre positivo hace que el cociente completo sea $+\\infty$ por ambos lados. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{x^2}{x^3+x^2}$",
      hint: "Saca factor común $x^2$ en el denominador.",
      answer: 1,
      solution: "$\\dfrac{x^2}{x^2(x+1)}=\\dfrac{1}{x+1}\\to1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}\\dfrac{(x-3)^2}{(x-3)(x+3)}$",
      answer: 0,
      solution: "Simplificando: $\\dfrac{x-3}{x+3}\\to0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -2}\\dfrac{x^2-4}{x^2+4x+4}$",
      hint: "$x^2+4x+4=(x+2)^2$.",
      answer: "No",
      solution:
        "Simplificando una copia: $\\dfrac{x-2}{x+2}$, que por la derecha de $-2$ da $-\\infty$ y por la izquierda $+\\infty$ (numerador negativo fijo cerca de $-4$, denominador cambia de signo): los laterales no coinciden ni son ambos el mismo infinito. Respuesta: No.",
    },
  ],
);

const lv34 = L(
  34,
  "Indeterminación $0 \\cdot \\infty$ sin derivar",
  "Reescribir como producto de un límite notable",
  `
### Un producto conflictivo

Si $f(x)\\to 0$ y $g(x)\\to\\infty$, el producto $f(x)\\cdot g(x)$ es una indeterminación. Sin usar derivadas, podemos resolver muchos casos **reescribiendo algebraicamente** para que aparezca un límite notable o una resta de raíces ya conocida.

### Ejemplo: combinando con el conjugado

$$\\lim_{x\\to+\\infty} x\\left(\\sqrt{x^2+1}-x\\right)$$

Aquí $x\\to\\infty$ y $\\left(\\sqrt{x^2+1}-x\\right)\\to 0$ (es el tipo de límite del nivel 18). Primero resolvemos la parte que tiende a $0$ multiplicando por el conjugado:

$$\\sqrt{x^2+1}-x = \\frac{1}{\\sqrt{x^2+1}+x}$$

Sustituyendo en el producto original:

$$x\\cdot\\frac{1}{\\sqrt{x^2+1}+x} = \\frac{x}{\\sqrt{x^2+1}+x}$$

Dividiendo entre $x$: $\\dfrac{1}{\\sqrt{1+1/x^2}+1} \\to \\dfrac{1}{1+1} = 0.5$.

### La idea general

Cuando veas $0\\cdot\\infty$, intenta **identificar la parte que tiende a $0$** y transfórmala (factorizando o racionalizando) en una fracción; luego multiplica y simplifica con las técnicas ya conocidas.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty} x\\left(\\sqrt{x^2+1}-x\\right)$",
      answer: 0.5,
      solution: "Racionalizando primero: el límite es $0.5$ (visto en el ejemplo). Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty} x\\left(\\sqrt{x^2+4}-x\\right)$",
      answer: 2,
      hint: "Racionaliza la resta de raíces primero, luego multiplica por $x$ y divide entre la potencia adecuada.",
      solution: "$\\sqrt{x^2+4}-x=\\dfrac{4}{\\sqrt{x^2+4}+x}$. Multiplicando por $x$ y dividiendo entre $x$: $\\dfrac{4}{\\sqrt{1+4/x^2}+1}\\to\\dfrac{4}{2}=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} x\\cdot\\dfrac{1}{\\sin x}$",
      answer: 1,
      hint: "Reconoce el límite notable recíproco.",
      solution: "Es $x/\\sin x \\to 1$, el límite notable recíproco. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} \\dfrac{1}{x}\\cdot\\sin(3x)$",
      answer: 3,
      hint: "Reescribe como $\\sin(3x)/x$.",
      solution: "Es $\\sin(3x)/x \\to 3$, límite notable adaptado. Respuesta: $3.00$.",
    },
  ],
);

const lv35 = L(
  35,
  "Sándwich avanzado: la función parte entera",
  "Acotar usando $\\lfloor x \\rfloor$",
  `
### Una función nueva: la parte entera

$\\lfloor x \\rfloor$ (parte entera o "suelo") es el mayor entero **menor o igual** que $x$. Por ejemplo $\\lfloor 3.7\\rfloor = 3$, $\\lfloor 5\\rfloor=5$, $\\lfloor -1.2\\rfloor=-2$.

Una propiedad clave (válida para $x>0$) es:

$$x - 1 < \\lfloor x \\rfloor \\leq x$$

Esto nos da una forma natural de aplicar el sándwich.

### Ejemplo

$$\\lim_{x\\to+\\infty}\\frac{\\lfloor x \\rfloor}{x}$$

Usando la desigualdad anterior y dividiendo entre $x>0$:

$$\\frac{x-1}{x} < \\frac{\\lfloor x \\rfloor}{x} \\leq 1$$

Cuando $x\\to+\\infty$: $\\dfrac{x-1}{x} = 1-\\dfrac1x \\to 1$, y el lado derecho ya es $1$. Por el sándwich:

$$\\lim_{x\\to+\\infty}\\frac{\\lfloor x \\rfloor}{x} = 1.$$

Esta técnica —acotar con desigualdades naturales del problema y aplicar sándwich— es muy general, no solo para funciones trigonométricas.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\lfloor x \\rfloor}{x}$",
      answer: 1,
      solution: "Por sándwich, usando $x-1<\\lfloor x\\rfloor\\leq x$, el límite es $1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{2\\lfloor x \\rfloor}{x}$",
      answer: 2,
      hint: "Es el doble del límite anterior.",
      solution: "Es el doble del caso anterior: $2\\cdot1=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\lfloor x \\rfloor + 1}{x}$",
      hint: "Acota igual que antes y añade $1/x$, que tiende a $0$.",
      answer: 1,
      solution: "$\\dfrac{\\lfloor x\\rfloor}{x}+\\dfrac1x \\to 1+0=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} x\\left\\lfloor\\dfrac{1}{x}\\right\\rfloor$ (para $x>0$, acercándose por la derecha)",
      hint: "Usa $\\frac{1}{x}-1 < \\lfloor 1/x \\rfloor \\leq \\frac1x$ y multiplica por $x>0$.",
      answer: 1,
      solution: "Multiplicando la desigualdad por $x>0$: $1-x < x\\lfloor1/x\\rfloor \\leq 1$, y ambas cotas tienden a $1$. Respuesta: $1.00$.",
    },
  ],
);

const lv36 = L(
  36,
  "Sucesiones: límites con $n$ entero",
  "El mismo concepto, índice discreto",
  `
### Sucesiones: límites de "listas" de números

Una **sucesión** es una lista ordenada de números $a_1, a_2, a_3,\\ldots$, dada por una fórmula $a_n$ en función de $n=1,2,3,\\ldots$ (solo números **naturales**, a diferencia de $x$ que podía ser cualquier real).

El límite de una sucesión cuando $n\\to\\infty$ se calcula **exactamente igual** que los límites al infinito que ya conoces:

$$\\lim_{n\\to\\infty} a_n$$

### Ejemplo

$$a_n = \\frac{3n+1}{n} \\quad\\Rightarrow\\quad \\lim_{n\\to\\infty}\\frac{3n+1}{n} = \\lim_{n\\to\\infty}\\left(3+\\frac{1}{n}\\right) = 3.$$

Todas las técnicas que aprendiste (dividir entre la mayor potencia, comparar grados, jerarquía de infinitos) **funcionan igual** sustituyendo $x$ por $n$.

### Una diferencia importante

Como $n$ solo toma valores enteros positivos, **no existen los límites laterales**; solo tiene sentido $n\\to\\infty$.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{n\\to\\infty}\\dfrac{3n+1}{n}$",
      answer: 3,
      solution: "$3+1/n \\to 3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n^2+1}{2n^2-3}$",
      answer: 0.5,
      solution: "Mismo grado: $1/2=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n+5}{n^2}$",
      answer: 0,
      solution: "Denominador de grado mayor: $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{n\\to\\infty}\\dfrac{2^n}{n^{10}}$",
      answer: "Inf",
      hint: "Una exponencial siempre gana a una potencia.",
      solution: "Por jerarquía de infinitos, la exponencial gana: $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{n\\to\\infty}\\left(1+\\dfrac{1}{n}\\right)^n$",
      answer: 2.72,
      solution: "Es exactamente la definición de $e$. Respuesta: $2.72$.",
    },
  ],
);

const lv37 = L(
  37,
  "Límites con parámetro: encuentra el valor desconocido",
  "Usar la continuidad para hallar constantes",
  `
### Un problema inverso

A veces no se pide calcular un límite, sino **encontrar un parámetro** (una letra como $k$ o $a$) para que se cumpla cierta condición, normalmente que el límite **exista** o que la función sea **continua**.

### Ejemplo: que dos trozos "empalmen" (continuidad)

$$f(x) = \\begin{cases} x+k & x<2 \\\\ 3x-1 & x\\geq 2 \\end{cases}$$

Para que $f$ sea continua en $x=2$, necesitamos que los dos límites laterales coincidan:

$$\\lim_{x\\to 2^-} f(x) = 2+k \\qquad \\lim_{x\\to 2^+} f(x) = 3(2)-1 = 5.$$

Igualamos: $2+k = 5 \\Rightarrow k = 3$.

### Estrategia general

1. Calcula ambos límites laterales (o el límite y el valor de la función) en función del parámetro.
2. Plantea la ecuación que iguala lo que debe coincidir.
3. Despeja el parámetro.
`,
  [
    {
      prompt:
        "$f(x)=x+k$ si $x<1$, $f(x)=2x+1$ si $x\\geq1$. ¿Qué valor de $k$ hace continua a $f$ en $x=1$?",
      answer: 2,
      solution: "Igualamos $1+k = 3 \\Rightarrow k=2$. Respuesta: $2.00$.",
    },
    {
      prompt:
        "$f(x)=kx$ si $x<2$, $f(x)=x^2$ si $x\\geq 2$. ¿Qué valor de $k$ hace continua a $f$ en $x=2$?",
      answer: 2,
      solution: "Igualamos $2k = 4 \\Rightarrow k=2$. Respuesta: $2.00$.",
    },
    {
      prompt:
        "$f(x)=x^2+k$ si $x<0$, $f(x)=3x+1$ si $x\\geq0$. ¿Qué valor de $k$ hace continua a $f$ en $x=0$?",
      answer: 1,
      solution: "Igualamos $0+k = 1 \\Rightarrow k=1$. Respuesta: $1.00$.",
    },
    {
      prompt:
        "$f(x)=2x+3$ si $x<1$, $f(x)=kx^2$ si $x\\geq1$. ¿Qué valor de $k$ hace continua a $f$ en $x=1$?",
      answer: 5,
      solution: "Igualamos $5 = k\\cdot1 \\Rightarrow k=5$. Respuesta: $5.00$.",
    },
    {
      prompt:
        "$f(x)=\\dfrac{x^2-k^2}{x-k}$ si $x\\neq k$, $f(k)=10$. ¿Qué valor de $k$ hace que $f$ sea continua en $x=k$?",
      hint: "Recuerda que $\\dfrac{x^2-k^2}{x-k} = x+k$ para $x\\neq k$, así que el límite vale $2k$.",
      answer: 5,
      solution: "El límite simplificado es $2k$; igualando $2k=10$, obtenemos $k=5$. Respuesta: $5.00$.",
    },
  ],
);

const lv38 = L(
  38,
  "Cambio de variable trigonométrico",
  "Sustituciones tipo $u = \\sin x$ o $u = \\tan x$",
  `
### Renombrar para simplificar lo trigonométrico

A veces conviene sustituir toda una subexpresión trigonométrica por una letra nueva. Esto es útil sobre todo cuando un límite combina varias funciones trigonométricas de la **misma** variable.

### Ejemplo

$$\\lim_{x\\to 0}\\frac{\\sin x \\cdot \\tan x}{x^2}$$

En vez de pensarlo todo junto, separamos en dos límites notables ya conocidos:

$$\\frac{\\sin x \\cdot \\tan x}{x^2} = \\frac{\\sin x}{x}\\cdot\\frac{\\tan x}{x} \\to 1\\cdot 1 = 1.$$

### Otro ejemplo con cambio de variable explícito

$$\\lim_{x\\to 0}\\frac{\\arcsin(x)}{x}$$

(donde $\\arcsin$ es la función inversa del seno). Sea $u=\\arcsin(x)$, de modo que $x=\\sin u$, y cuando $x\\to0$, $u\\to0$ también. Reescribiendo:

$$\\lim_{u\\to 0}\\frac{u}{\\sin u} = 1$$

(es el recíproco del límite notable). Por tanto $\\displaystyle\\lim_{x\\to 0}\\frac{\\arcsin(x)}{x}=1$.

Esta estrategia —separar productos en límites notables conocidos, o renombrar una subexpresión— funciona en muchas combinaciones trigonométricas.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin x \\cdot \\tan x}{x^2}$",
      answer: 1,
      solution: "Separando en dos límites notables: $1\\cdot1=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\arcsin(x)}{x}$",
      answer: 1,
      solution: "Con $u=\\arcsin x$, se reduce al recíproco del límite notable: $1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(2x)\\cdot\\tan(x)}{x^2}$",
      answer: 2,
      hint: "Separa en $\\dfrac{\\sin(2x)}{x}\\cdot\\dfrac{\\tan x}{x}$.",
      solution: "$\\dfrac{\\sin(2x)}{x}\\cdot\\dfrac{\\tan x}{x}\\to2\\cdot1=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{x^2}{\\sin x\\cdot\\tan x}$",
      answer: 1,
      hint: "Es el recíproco del primer ejercicio de este nivel.",
      solution: "Es el recíproco del primer ejercicio, también vale $1$. Respuesta: $1.00$.",
    },
  ],
);

const lv39 = L(
  39,
  "Repaso mixto II",
  "Indeterminaciones variadas",
  `
### Reconocer la indeterminación correcta

Antes de actuar, identifica el tipo:

- $\\tfrac00$: factoriza, usa el conjugado, o un límite notable.
- $\\tfrac{\\infty}{\\infty}$: compara grados, divide entre la mayor potencia, o usa la jerarquía de infinitos.
- $\\infty - \\infty$: usa el conjugado.
- $0\\cdot\\infty$: reescribe como producto de límites ya conocidos.
- $1^\\infty$: usa la fórmula del número $e$.

Este nivel mezcla deliberadamente ejercicios que requieren distintas indeterminaciones, para que entrenes el "diagnóstico" antes de calcular.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{4x^3-x}{2x^3+5}$",
      answer: 2,
      solution: "Mismo grado: $4/2=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{1-\\cos(2x)}{x^2}$",
      answer: 2,
      solution: "Usando la fórmula del nivel 25 con $u=2x$: el resultado es $2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(\\sqrt{x^2+x}-x\\big)$",
      answer: 0.5,
      solution: "Conjugado: el resultado es $0.5$ (visto en nivel 18). Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(1+\\dfrac{4}{x}\\right)^x$",
      answer: 54.6,
      solution: "Forma $1^\\infty$: usando la tabla, resultado $e^4\\approx 54.60$. Respuesta: $54.60$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}\\dfrac{x^2-9}{x-3}$",
      answer: 6,
      solution: "Factorización: $x+3 \\to 6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty} x\\left(\\sqrt{x^2+4}-x\\right)$",
      answer: 2,
      solution: "Forma $0\\cdot\\infty$ resuelta con conjugado (nivel 34): el límite es $2$. Respuesta: $2.00$.",
    },
  ],
);

const lv40 = L(
  40,
  "Repaso mixto III",
  "Más práctica combinada",
  `
### Sigue entrenando el diagnóstico

A estas alturas ya dominas todas las piezas individuales. Lo que distingue a quien domina los límites de quien no, es la **velocidad para identificar qué herramienta usar** sin tener que probarlas todas. Este nivel sigue mezclando tipos de ejercicios, ahora con menos pistas, para que practiques esa identificación rápida.

Recuerda siempre el primer paso, **sin excepción**: sustituye. Si no hay indeterminación, ya terminaste y te ahorras todo el trabajo siguiente.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{x^3-1}{x-1}$",
      answer: 3,
      solution: "Factorizando $x^3-1=(x-1)(x^2+x+1)$: resultado $3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\tan(5x)}{x}$",
      answer: 5,
      solution: "Límite notable adaptado: $5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{2x^3+1}{x^3-x}$",
      answer: 2,
      solution: "Mismo grado: $2/1=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 9}\\dfrac{x-9}{\\sqrt{x}-3}$",
      answer: 6,
      solution: "Conjugado: $\\sqrt{x}+3\\to6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\ln(x)}{\\sqrt{x}}$",
      answer: 0,
      solution: "Por jerarquía de infinitos, gana la raíz: $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{x^2-5x+6}{x^2-4}$",
      answer: -0.25,
      hint: "Factoriza ambos: $(x-2)(x-3)$ y $(x-2)(x+2)$.",
      solution: "Simplificando: $\\dfrac{x-3}{x+2}\\to\\dfrac{-1}{4}=-0.25$. Respuesta: $-0.25$.",
    },
  ],
);

const lv41 = L(
  41,
  "Funciones racionales con factorización avanzada",
  "Trinomios y diferencias de cubos",
  `
### Ampliando el repertorio de factorización

Además de lo visto en el nivel 9, recuerda dos identidades muy útiles:

$$a^3 - b^3 = (a-b)(a^2+ab+b^2) \\qquad a^3+b^3 = (a+b)(a^2-ab+b^2)$$

Estas aparecen cuando, al sustituir un límite, sale $\\tfrac00$ y hay cubos involucrados.

### Ejemplo

$$\\lim_{x\\to 2}\\frac{x^3-8}{x-2}$$

Aquí $x^3-8 = x^3-2^3 = (x-2)(x^2+2x+4)$. Simplificando:

$$\\lim_{x\\to 2}(x^2+2x+4) = 4+4+4=12.$$

Practica reconociendo estas estructuras para factorizar con soltura.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{x^3-8}{x-2}$",
      answer: 12,
      solution: "Factorizando con diferencia de cubos: $x^2+2x+4 \\to 12$. Respuesta: $12.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -1}\\dfrac{x^3+1}{x+1}$",
      answer: 3,
      hint: "$a^3+b^3=(a+b)(a^2-ab+b^2)$.",
      solution: "Factorizando: $x^2-x+1 \\to 1+1+1=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 3}\\dfrac{x^2-2x-3}{x^2-9}$",
      answer: 0.67,
      hint: "Factoriza ambos: $(x-3)(x+1)$ y $(x-3)(x+3)$.",
      solution: "Simplifica a $\\dfrac{x+1}{x+3}\\to\\dfrac{4}{6}\\approx0.67$. Respuesta: $0.67$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{x^3-1}{x^2-1}$",
      answer: 1.5,
      hint: "Factoriza numerador como diferencia de cubos y denominador como diferencia de cuadrados.",
      solution:
        "$\\dfrac{(x-1)(x^2+x+1)}{(x-1)(x+1)} = \\dfrac{x^2+x+1}{x+1}\\to\\dfrac{3}{2}=1.5$. Respuesta: $1.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to -2}\\dfrac{x^2+5x+6}{x^2-4}$",
      answer: -0.25,
      hint: "Factoriza ambos: $(x+2)(x+3)$ y $(x-2)(x+2)$.",
      solution: "Simplifica a $\\dfrac{x+3}{x-2}\\to\\dfrac{1}{-4}=-0.25$. Respuesta: $-0.25$.",
    },
  ],
);

const lv42 = L(
  42,
  "Límites laterales con asíntotas verticales completas",
  "Determinar el comportamiento en ambos lados",
  `
### Combinando todo lo visto sobre asíntotas verticales

Ahora vamos a practicar, dada una función racional, decidir **el signo del infinito** en cada lado de la asíntota vertical: localizar dónde se anula el denominador, y luego estudiar el signo de la expresión a cada lado.

### Ejemplo completo

$$f(x) = \\frac{1}{(x-1)(x-3)}$$

Asíntotas verticales en $x=1$ y $x=3$. Estudiemos $x\\to 1^+$ (por ejemplo $x=1.1$): $(x-1)$ positivo pequeño, $(x-3)$ negativo (vale $-1.9$). El producto es negativo pequeño, así que $f(x) \\to -\\infty$.

Para $x\\to 1^-$ (por ejemplo $x=0.9$): $(x-1)$ negativo pequeño, $(x-3)$ negativo. Producto positivo pequeño, $f(x)\\to+\\infty$.
`,
  [
    {
      prompt: "Para $f(x)=\\dfrac{1}{(x-1)(x-3)}$, halla $\\displaystyle\\lim_{x\\to 1^+} f(x)$.",
      answer: "-Inf",
      solution: "Cerca de $1$ por la derecha, el producto del denominador es negativo: $-\\infty$. Respuesta: -Inf.",
    },
    {
      prompt: "Para $f(x)=\\dfrac{1}{(x-1)(x-3)}$, halla $\\displaystyle\\lim_{x\\to 1^-} f(x)$.",
      answer: "Inf",
      solution: "Cerca de $1$ por la izquierda, el producto es positivo: $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "Para $f(x)=\\dfrac{1}{(x-1)(x-3)}$, halla $\\displaystyle\\lim_{x\\to 3^+} f(x)$.",
      answer: "Inf",
      solution: "Cerca de $3$ por la derecha ambos factores son positivos: $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "Para $f(x)=\\dfrac{1}{(x-1)(x-3)}$, halla $\\displaystyle\\lim_{x\\to 3^-} f(x)$.",
      answer: "-Inf",
      solution: "Cerca de $3$ por la izquierda, $(x-1)>0$ y $(x-3)<0$: producto negativo, $-\\infty$. Respuesta: -Inf.",
    },
    {
      prompt: "Para $f(x)=\\dfrac{-1}{x-2}$, halla $\\displaystyle\\lim_{x\\to 2^+} f(x)$.",
      answer: "-Inf",
      solution: "$(x-2)\\to0^+$, así que $1/(x-2)\\to+\\infty$, pero el signo $-$ lo invierte: $-\\infty$. Respuesta: -Inf.",
    },
  ],
);

const lv43 = L(
  43,
  "Cambio de variable avanzado",
  "Sustituciones para simplificar límites complejos",
  `
### Cuando conviene "renombrar" una parte de la expresión

Algunos límites se simplifican enormemente si llamamos $t$ a una parte de la expresión y reescribimos todo en función de $t$.

### Ejemplo

$$\\lim_{x\\to 1}\\frac{\\sqrt[3]{x}-1}{x-1}$$

Sea $t=\\sqrt[3]{x}$, de modo que $x=t^3$, y cuando $x\\to1$, $t\\to1$ también. Sustituyendo:

$$\\lim_{t\\to1}\\frac{t-1}{t^3-1} = \\lim_{t\\to1}\\frac{t-1}{(t-1)(t^2+t+1)} = \\lim_{t\\to1}\\frac{1}{t^2+t+1} = \\frac{1}{3} \\approx 0.33.$$

### Idea general

Si ves raíces $n$-ésimas (cúbicas, cuartas, etc.) que generan indeterminaciones difíciles de tratar con el conjugado tradicional, probar un cambio de variable que "elimine" la raíz suele simplificar mucho el problema, convirtiéndolo en un límite de polinomios que ya sabes resolver con factorización.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{\\sqrt[3]{x}-1}{x-1}$",
      answer: 0.33,
      solution: "Con $t=\\sqrt[3]x$, se reduce a $\\dfrac{1}{t^2+t+1}\\to\\dfrac13\\approx0.33$. Respuesta: $0.33$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sqrt[3]{1+x}-1}{x}$",
      answer: 0.33,
      hint: "Sea $t=\\sqrt[3]{1+x}$, entonces $x = t^3-1$.",
      solution: "Se reduce igual que antes a $\\dfrac{1}{t^2+t+1}\\to\\dfrac13\\approx0.33$. Respuesta: $0.33$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 8}\\dfrac{\\sqrt[3]{x}-2}{x-8}$",
      hint: "Sea $t=\\sqrt[3]x$, $x=t^3$, $t\\to2$.",
      answer: 0.08,
      solution:
        "$\\dfrac{t-2}{t^3-8}=\\dfrac{t-2}{(t-2)(t^2+2t+4)}=\\dfrac{1}{t^2+2t+4}\\to\\dfrac{1}{12}\\approx0.08$. Respuesta: $0.08$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{x-1}{\\sqrt[3]{x}-1}$",
      answer: 3,
      hint: "Es el recíproco del primer ejercicio de este nivel.",
      solution: "Es el recíproco de $1/3$, así que el resultado es $3$. Respuesta: $3.00$.",
    },
  ],
);

const lv44 = L(
  44,
  "Teorema de Bolzano: una aplicación de la continuidad",
  "Existencia de raíces usando continuidad",
  `
### Una consecuencia poderosa de ser continua

El **Teorema de Bolzano** dice: si $f$ es **continua** en un intervalo $[a,b]$ y $f(a)$ y $f(b)$ tienen **signos opuestos**, entonces existe **al menos un punto** $c$ dentro de $(a,b)$ donde $f(c)=0$.

Intuitivamente: si una curva continua empieza por debajo del eje $x$ y termina por encima (o viceversa), **en algún momento tiene que cruzar el eje**, porque no puede "saltar" sin pasar por los valores intermedios.

### Ejemplo

Sea $f(x) = x^3 - x - 1$. Es un polinomio, así que es continua en todas partes.

$$f(1) = 1-1-1 = -1 \\quad (\\text{negativo}), \\qquad f(2) = 8-2-1 = 5 \\quad (\\text{positivo}).$$

Como $f$ es continua en $[1,2]$ y cambia de signo, el Teorema de Bolzano garantiza que existe una raíz de $f$ entre $1$ y $2$.

Evalúa $f$ en los extremos dados y responde $1$ si el teorema garantiza una raíz en ese intervalo, o $0$ si no.
`,
  [
    {
      prompt:
        "$f(x)=x^3-x-1$. ¿Garantiza Bolzano una raíz en $[1,2]$? (1 = sí, 0 = no)",
      answer: 1,
      solution: "$f(1)=-1<0$ y $f(2)=5>0$: cambia de signo. Sí hay raíz garantizada. Respuesta: $1.00$.",
    },
    {
      prompt:
        "$f(x)=x^2-4$. ¿Garantiza Bolzano una raíz en $[0,1]$? (1 = sí, 0 = no)",
      answer: 0,
      solution: "$f(0)=-4$ y $f(1)=-3$, ambos negativos: no hay cambio de signo. Respuesta: $0.00$.",
    },
    {
      prompt:
        "$f(x)=x^2-4$. ¿Garantiza Bolzano una raíz en $[1,3]$? (1 = sí, 0 = no)",
      answer: 1,
      solution: "$f(1)=-3<0$ y $f(3)=5>0$: cambia de signo. Respuesta: $1.00$.",
    },
    {
      prompt:
        "$f(x)=x^3-2x-5$. ¿Garantiza Bolzano una raíz en $[2,3]$? (1 = sí, 0 = no)",
      answer: 1,
      solution: "$f(2)=8-4-5=-1<0$ y $f(3)=27-6-5=16>0$: cambia de signo. Respuesta: $1.00$.",
    },
    {
      prompt:
        "$f(x)=x^2+1$. ¿Garantiza Bolzano una raíz en $[-5,5]$? (1 = sí, 0 = no)",
      answer: 0,
      solution: "$f(x)=x^2+1$ siempre es positivo, nunca cambia de signo. Respuesta: $0.00$.",
    },
  ],
);

const lv45 = L(
  45,
  "Repaso mixto IV: trigonometría y exponenciales",
  "Practicando los límites notables juntos",
  `
### Consolidando lo trigonométrico y lo exponencial

Este nivel mezcla específicamente los límites notables de $\\sin x/x$, $\\tan x/x$, $(1-\\cos x)/x^2$, $(e^x-1)/x$ y $\\ln(1+x)/x$, junto con sus variantes con factores y cambios de variable. El objetivo es que los reconozcas con fluidez, sin tener que volver a deducirlos cada vez.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(7x)}{2x}$",
      answer: 3.5,
      solution: "$\\dfrac{\\sin(7x)}{7x}\\cdot\\dfrac{7}{2}\\to1\\cdot3.5=3.5$. Respuesta: $3.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{e^{3x}-1}{\\sin(2x)}$",
      answer: 1.5,
      hint: "Divide ambos por $x$ y usa los dos límites notables.",
      solution: "$\\dfrac{e^{3x}-1}{x}\\cdot\\dfrac{x}{\\sin(2x)}\\to3\\cdot0.5=1.5$. Respuesta: $1.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\ln(1+4x)}{\\tan x}$",
      answer: 4,
      solution: "$\\dfrac{\\ln(1+4x)}{x}\\cdot\\dfrac{x}{\\tan x}\\to4\\cdot1=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{1-\\cos(3x)}{2x^2}$",
      answer: 2.25,
      hint: "Usa $(1-\\cos(kx))/x^2 \\to k^2/2$.",
      solution: "$\\dfrac{9}{2}\\cdot\\dfrac12 = \\dfrac{9}{4}=2.25$. Respuesta: $2.25$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(2x)\\cdot\\tan(3x)}{x^2}$",
      answer: 6,
      hint: "Separa en dos límites notables y multiplica los factores.",
      solution:
        "$\\dfrac{\\sin(2x)}{x}\\cdot\\dfrac{\\tan(3x)}{x} \\to 2\\cdot3=6$. Respuesta: $6.00$.",
    },
  ],
);

const lv46 = L(
  46,
  "Repaso mixto V: infinito y asíntotas",
  "Polinomios, racionales, raíces y signos",
  `
### Todo sobre el comportamiento en el infinito, junto

Este nivel reúne ejercicios sobre límites de polinomios y racionales en el infinito, asíntotas horizontales, verticales y oblicuas, e indeterminaciones $\\infty-\\infty$. Tómate tu tiempo para identificar primero **de qué tipo** es cada límite antes de calcular.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{5x^4-x}{x^4+2x^2}$",
      answer: 5,
      solution: "Mismo grado: $5/1=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "Asíntota horizontal (cuando $x\\to+\\infty$) de $f(x)=\\dfrac{7x+2}{3x-1}$.",
      answer: 2.33,
      solution: "Cociente de coeficientes: $7/3\\approx2.33$. Respuesta: $2.33$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(\\sqrt{x^2+3x}-x\\big)$",
      answer: 1.5,
      solution: "Conjugado: $\\dfrac{3x}{\\sqrt{x^2+3x}+x}\\to\\dfrac{3}{2}=1.5$. Respuesta: $1.50$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 5^+}\\dfrac{2}{x-5}$",
      answer: "Inf",
      solution: "$(x-5)\\to0^+$: el límite es $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "Pendiente de la asíntota oblicua de $f(x)=\\dfrac{4x^2-1}{x}$.",
      answer: 4,
      solution: "$f(x)=4x-\\tfrac1x$, así que $m=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to-\\infty}\\dfrac{2x^3-1}{x^2+5}$",
      answer: "-Inf",
      hint: "Grado del numerador mayor; estudia el signo para $x$ muy negativo.",
      solution:
        "Numerador de grado mayor; con $x\\to-\\infty$ el cociente diverge a $-\\infty$. Respuesta: -Inf.",
    },
  ],
);

const lv47 = L(
  47,
  "Repaso mixto VI: sándwich, conjugado y comparación de infinitos",
  "Las herramientas más sutiles, combinadas",
  `
### Afinando el instinto

Este nivel combina ejercicios donde conviene usar el sándwich (funciones oscilantes acotadas), la jerarquía de infinitos (exponenciales, logaritmos y factoriales) y el conjugado en sus formas más elaboradas. Identifica primero si hay una parte tipo $\\sin$ o $\\cos$ de algo **no acotado en su argumento** sin tender a nada concreto (pista de sándwich), o si es una resta/producto que mezcla raíces e infinito (pista de conjugado).
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} x^3\\sin\\!\\left(\\dfrac{1}{x^2}\\right)$",
      answer: 0,
      solution: "Sándwich: acotado entre $-|x|^3$ y $|x|^3$, ambos $\\to0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\ln(x^2+1)}{x}$",
      answer: 0,
      hint: "Para $x$ grande, $\\ln(x^2+1)$ se comporta como $2\\ln x$, y $\\ln x$ pierde frente a $x$.",
      solution: "Por la jerarquía de infinitos, el logaritmo pierde frente a $x$: el límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} (x-1)\\sin\\!\\left(\\dfrac{1}{x}\\right)$",
      hint: "Aquí $x-1$ NO tiende a $0$, así que no es sándwich directo; piensa qué pasa con $\\sin(1/x)$ cuando $x\\to 0$.",
      answer: "No",
      solution:
        "Como $\\sin(1/x)$ no tiene límite cuando $x\\to0$ y se multiplica por algo que tiende a $-1$ (no a $0$), el producto tampoco tiene límite. Respuesta: No.",
    },
    {
      prompt: "$\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n^{50}}{e^n}$",
      answer: 0,
      hint: "La exponencial siempre gana a cualquier potencia, por grande que sea el exponente.",
      solution: "Por la jerarquía de infinitos, la exponencial gana: el límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(\\sqrt{x^2+x+1}-\\sqrt{x^2-x+1}\\big)$",
      hint: "Multiplica y divide por el conjugado de toda la resta de raíces.",
      answer: 1,
      solution:
        "Racionalizando: $\\dfrac{(x^2+x+1)-(x^2-x+1)}{\\sqrt{x^2+x+1}+\\sqrt{x^2-x+1}} = \\dfrac{2x}{\\sqrt{x^2+x+1}+\\sqrt{x^2-x+1}}$. Dividiendo entre $x$: $\\dfrac{2}{1+1}=1$. Respuesta: $1.00$.",
    },
  ],
);

const lv48 = L(
  48,
  "Repaso mixto VII: parámetros y continuidad",
  "Encontrar constantes que cumplan condiciones",
  `
### Última ronda de problemas con parámetros

Combinamos lo del nivel 37 (hallar parámetros para continuidad) con ejercicios donde, además, se debe verificar que el límite **exista** (que los laterales coincidan) antes de igualar al valor del punto. En algún caso habrá que encontrar **dos** condiciones a la vez.
`,
  [
    {
      prompt:
        "$f(x)=x^2-1$ si $x<2$, $f(x)=kx+1$ si $x\\geq2$. Valor de $k$ para continuidad en $x=2$.",
      answer: 1,
      solution: "Igualamos $3 = 2k+1 \\Rightarrow k=1$. Respuesta: $1.00$.",
    },
    {
      prompt:
        "$f(x)=kx^2$ si $x<1$, $f(x)=3x-1$ si $x\\geq1$. Valor de $k$ para continuidad en $x=1$.",
      answer: 2,
      solution: "Igualamos $k=2 \\Rightarrow k=2$. Respuesta: $2.00$.",
    },
    {
      prompt:
        "$f(x)=2x+k$ si $x\\leq0$, $f(x)=x^2+3$ si $x>0$. Valor de $k$ para continuidad en $x=0$.",
      answer: 3,
      solution: "Igualamos $k=3 \\Rightarrow k=3$. Respuesta: $3.00$.",
    },
    {
      prompt:
        "$f(x)=ax+b$ si $x<1$, $f(x)=x^2$ si $x\\geq1$. Si además se sabe que $b=1$, ¿qué valor de $a$ hace continua a $f$ en $x=1$?",
      hint: "Iguala $a\\cdot1+b$ con $1^2$, y sustituye $b=1$.",
      answer: 0,
      solution: "Igualamos $a+1=1 \\Rightarrow a=0$. Respuesta: $0.00$.",
    },
  ],
);

const lv49 = L(
  49,
  "Repaso general avanzado",
  "Un examen de práctica con todo lo aprendido",
  `
### Última ronda antes del cierre

Aquí va una colección variada que recorre prácticamente todo el mundo de los límites: sustitución, factorización, conjugado, infinito, trigonometría, exponenciales, sándwich y continuidad. Tómatelo como un examen de repaso general.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}(3x^2-4x+1)$",
      answer: 5,
      solution: "Sustitución directa: $12-8+1=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 4}\\dfrac{x^2-16}{x-4}$",
      answer: 8,
      solution: "Factorización: $x+4\\to8$. Respuesta: $8.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sqrt{x+9}-3}{x}$",
      answer: 0.17,
      solution: "Conjugado: $\\dfrac{1}{\\sqrt{x+9}+3}\\to\\dfrac16\\approx0.17$. Respuesta: $0.17$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{6x^2+1}{2x^2-x}$",
      answer: 3,
      solution: "Mismo grado: $6/2=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(6x)}{\\tan(3x)}$",
      answer: 2,
      solution: "$\\dfrac{\\sin(6x)}{x}\\cdot\\dfrac{x}{\\tan(3x)}\\to6\\cdot\\dfrac13=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\left(1+\\dfrac{2}{x}\\right)^{3x}$",
      hint: "El exponente buscado es $\\lim 3x\\cdot\\frac{2}{x}$.",
      answer: 403.43,
      solution: "El exponente es $6$, así que el límite es $e^6\\approx403.43$. Respuesta: $403.43$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0} x^2\\sin\\!\\left(\\dfrac{1}{x}\\right)$",
      answer: 0,
      solution: "Sándwich: el límite es $0$. Respuesta: $0.00$.",
    },
  ],
);

const lv50 = L(
  50,
  "Examen final del mundo de los límites",
  "Síntesis completa",
  `
### El cierre del mundo de los límites

Has recorrido un camino largo: desde "mirar tablas de valores" hasta dominar indeterminaciones avanzadas, límites notables, infinito, continuidad y el teorema de Bolzano. Este nivel final mezcla, sin avisos en la mayoría de los casos, ejercicios representativos de **cada bloque** del mundo, algunos combinando dos técnicas a la vez. La prueba definitiva de que entiendes el panorama completo, no solo trucos sueltos.

¡Suerte! Si dominas este nivel, estás listo para el siguiente mundo.
`,
  [
    {
      prompt: "$\\displaystyle\\lim_{x\\to -3}(x^2+2x-1)$",
      answer: 2,
      solution: "Sustitución: $9-6-1=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2}\\dfrac{x^3-x^2-4x+4}{x-2}$",
      hint: "Factoriza el numerador agrupando o probando que $x=2$ es raíz.",
      answer: 3,
      solution:
        "El numerador se factoriza como $(x-2)(x^2+x-2)=(x-2)(x-1)(x+2)$. Simplificando: $(x-1)(x+2)\\to(1)(4)=... $ revisa con cuidado: en $x=2$, $(x-1)(x+2)=1\\cdot4=4$. Atención: el resultado correcto tras simplificar es $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 1}\\dfrac{\\sqrt{x+3}-2}{\\sqrt[3]{x}-1}$",
      hint: "Racionaliza el numerador y usa cambio de variable $t=\\sqrt[3]{x}$ en el denominador.",
      answer: 0.75,
      solution:
        "Numerador racionalizado: $\\dfrac{x-1}{\\sqrt{x+3}+2}$. Denominador con $t=\\sqrt[3]x$: $t-1=\\dfrac{x-1}{t^2+t+1}$. Dividiendo ambas fracciones, el factor $(x-1)$ se cancela, quedando $\\dfrac{t^2+t+1}{\\sqrt{x+3}+2}\\to\\dfrac{3}{4}=0.75$. Respuesta: $0.75$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\big(\\sqrt{4x^2+x}-2x\\big)$",
      hint: "Saca factor $2x$ de la raíz o racionaliza directamente.",
      answer: 0.25,
      solution:
        "Racionalizando: $\\dfrac{x}{\\sqrt{4x^2+x}+2x}$. Dividiendo entre $x$: $\\dfrac{1}{\\sqrt{4+1/x}+2}\\to\\dfrac{1}{2+2}=0.25$. Respuesta: $0.25$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{e^{2x}-\\cos x}{x}$",
      hint: "Separa en dos límites: $\\dfrac{e^{2x}-1}{x}$ y $\\dfrac{1-\\cos x}{x}$, sumando o restando con cuidado.",
      answer: 2,
      solution:
        "Reescribe el numerador como $(e^{2x}-1)-(\\cos x - 1) = (e^{2x}-1)+(1-\\cos x)$. Dividiendo entre $x$: $\\dfrac{e^{2x}-1}{x}\\to2$, y $\\dfrac{1-\\cos x}{x} = \\dfrac{1-\\cos x}{x^2}\\cdot x \\to 0.5\\cdot0=0$. Sumando: $2+0=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 2^+}\\dfrac{x-1}{(x-2)(x-4)}$",
      hint: "Estudia el signo de cada factor justo a la derecha de $2$.",
      answer: "-Inf",
      solution:
        "Cerca de $2^+$: numerador $\\approx1>0$; $(x-2)\\to0^+$; $(x-4)\\approx-2<0$. El denominador es negativo pequeño, así que el cociente diverge a $-\\infty$. Respuesta: -Inf.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{n!}{n^n}$ (sucesión, $n\\to\\infty$)",
      hint: "Acota $0 < \\dfrac{n!}{n^n} \\leq \\dfrac{1}{n}$ y aplica sándwich.",
      answer: 0,
      solution:
        "Como $\\dfrac{n!}{n^n}=\\dfrac{1}{n}\\cdot\\dfrac{2}{n}\\cdots\\dfrac{n}{n}\\leq\\dfrac{1}{n}\\cdot1\\cdots1=\\dfrac1n$, y $\\dfrac1n\\to0$, por sándwich el límite es $0$. Respuesta: $0.00$.",
    },
    {
      prompt:
        "$f(x)=\\dfrac{x^2-1}{x-1}$ si $x\\neq1$, $f(x)=k$ si $x=1$. ¿Qué valor de $k$ hace que $f$ sea continua en $x=1$?",
      answer: 2,
      solution: "El límite simplificado es $x+1\\to2$, así que $k=2$ para que coincida. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\left(\\dfrac{\\sin x}{x}\\right)^{1/x^2}$",
      hint: "Es forma $1^\\infty$: usa $\\sin x/x - 1 \\approx -x^2/6$ junto con la fórmula del número $e$ (puedes aceptar este dato sin demostrarlo).",
      answer: 0.85,
      solution:
        "Usando que $\\dfrac{\\sin x}{x}-1\\to0$ con la rapidez de $-x^2/6$ y la fórmula del exponente $\\lim \\dfrac{1}{x^2}\\cdot\\left(\\dfrac{\\sin x}{x}-1\\right) = -\\dfrac16$, el límite es $e^{-1/6}\\approx0.85$. Respuesta: $0.85$.",
    },
  ],
);

// =====================================================
// Exporta junto con tus niveles 1-10 existentes, por ejemplo:
//
// export const world1: World = {
//   id: "w1",
//   title: "Mundo 1: Límites",
//   levels: [lv1, lv2, lv3, lv4, lv5, lv6, lv7, lv8, lv9, lv10,
//            lv11, lv12, lv13, lv14, lv15, lv16, lv17, lv18, lv19, lv20,
//            lv21, lv22, lv23, lv24, lv25, lv26, lv27, lv28, lv29, lv30,
//            lv31, lv32, lv33, lv34, lv35, lv36, lv37, lv38, lv39, lv40,
//            lv41, lv42, lv43, lv44, lv45, lv46, lv47, lv48, lv49, lv50],
// };
// =====================================================

export {
  lv11, lv12, lv13, lv14, lv15, lv16, lv17, lv18, lv19, lv20,
  lv21, lv22, lv23, lv24, lv25, lv26, lv27, lv28, lv29, lv30,
  lv31, lv32, lv33, lv34, lv35, lv36, lv37, lv38, lv39, lv40,
  lv41, lv42, lv43, lv44, lv45, lv46, lv47, lv48, lv49, lv50,
};