import type { Level, Exercise, Boss, World } from "./types";
import leibnizPortrait from "@/assets/leibniz.png.asset.json";
import leibnizTheme from "@/assets/leibniz-theme.m4a.asset.json";

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

const lv1 = L(
  1,
  "La pendiente de la recta secante",
  "De la tasa de cambio promedio a la idea de derivada",
  `
### ¿Qué tan rápido cambia una función?

Ya sabes calcular límites. Ahora vamos a usarlos para responder una pregunta nueva: **¿a qué velocidad cambia una función en un punto exacto?**

Empecemos con algo que sí sabemos calcular sin límites: la **tasa de cambio promedio** de $f$ entre dos puntos $a$ y $b$. Es exactamente la pendiente de la recta que une $(a,f(a))$ con $(b,f(b))$ — la llamamos **recta secante**:

$$\\text{pendiente secante} = \\frac{f(b)-f(a)}{b-a}$$

### Ejemplo

Sea $f(x)=x^2$. La pendiente secante entre $x=1$ y $x=3$ es:

$$\\frac{f(3)-f(1)}{3-1} = \\frac{9-1}{2} = 4.$$

### La idea que viene

Si en vez de $b=3$ tomamos $b$ cada vez **más cerca** de $1$ (por ejemplo $b=1.1$, luego $b=1.01$...), la pendiente secante va cambiando, y parece **acercarse a un número concreto**. Ese número —el límite de las pendientes secantes— es la idea central del siguiente nivel: la **derivada**. Por ahora, practiquemos calculando pendientes secantes (sin límites todavía).
`,
  [
    {
      prompt: "$f(x)=x^2$. Pendiente secante entre $x=1$ y $x=3$.",
      answer: 4,
      solution: "$\\dfrac{9-1}{3-1}=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$f(x)=x^2$. Pendiente secante entre $x=2$ y $x=2.1$.",
      answer: 4.1,
      solution: "$\\dfrac{2.1^2-2^2}{2.1-2}=\\dfrac{4.41-4}{0.1}=4.1$. Respuesta: $4.10$.",
    },
    {
      prompt: "$f(x)=2x+3$. Pendiente secante entre $x=0$ y $x=5$.",
      hint: "Una recta siempre tiene la misma pendiente entre cualquier par de puntos.",
      answer: 2,
      solution: "$\\dfrac{13-3}{5-0}=2$, que coincide con el coeficiente de $x$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=x^3$. Pendiente secante entre $x=1$ y $x=2$.",
      answer: 7,
      solution: "$\\dfrac{8-1}{2-1}=7$. Respuesta: $7.00$.",
    },
    {
      prompt: "$f(x)=x^2$. Pendiente secante entre $x=0$ y $x=4$.",
      answer: 4,
      solution: "$\\dfrac{16-0}{4-0}=4$. Respuesta: $4.00$.",
    },
  ],
);

const lv2 = L(
  2,
  "La derivada como límite",
  "Definición formal usando el cociente incremental",
  `
### De secante a tangente

En el nivel anterior viste que la pendiente secante entre $a$ y $a+h$ es:

$$\\frac{f(a+h)-f(a)}{h}$$

(donde $h=b-a$ es el "paso" entre los dos puntos). Ahora hacemos lo que ya sabes hacer con límites: dejamos que $h \\to 0$, es decir, que el segundo punto se acerque al primero. Si ese límite existe, lo llamamos la **derivada de $f$ en $a$**:

$$f'(a) = \\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$$

Geométricamente, $f'(a)$ es la pendiente de la **recta tangente** a la gráfica de $f$ en el punto $a$: el límite de pendientes secantes cuando el segundo punto colapsa sobre el primero.

### Ejemplo completo

Sea $f(x)=x^2$, calculemos $f'(1)$:

$$f'(1) = \\lim_{h\\to0}\\frac{(1+h)^2-1^2}{h} = \\lim_{h\\to0}\\frac{1+2h+h^2-1}{h} = \\lim_{h\\to0}\\frac{2h+h^2}{h} = \\lim_{h\\to0}(2+h) = 2.$$

¡Y $2$ es justo el número al que se acercaban las pendientes secantes que explorabas en el nivel 1! Esa coincidencia no es casualidad: es la definición misma de derivada.
`,
  [
    {
      prompt: "Usa la definición para hallar $f'(3)$ si $f(x)=x^2$.",
      answer: 6,
      solution: "$\\dfrac{(3+h)^2-9}{h}=\\dfrac{6h+h^2}{h}=6+h\\to6$. Respuesta: $6.00$.",
    },
    {
      prompt: "Usa la definición para hallar $f'(-2)$ si $f(x)=x^2$.",
      answer: -4,
      solution: "$\\dfrac{(-2+h)^2-4}{h}=\\dfrac{-4h+h^2}{h}=-4+h\\to-4$. Respuesta: $-4.00$.",
    },
    {
      prompt: "Usa la definición para hallar $f'(x)$ (para cualquier $x$) si $f(x)=5x+1$.",
      hint: "El resultado no depende de $x$: calcula $f(x+h)-f(x)$ y simplifica.",
      answer: 5,
      solution: "$\\dfrac{5(x+h)+1-(5x+1)}{h}=\\dfrac{5h}{h}=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "Usa la definición para hallar $f'(1)$ si $f(x)=x^2+3x$.",
      answer: 5,
      solution: "$f(1+h)-f(1)=5h+h^2$, dividiendo entre $h$ y tomando $h\\to0$: $5$. Respuesta: $5.00$.",
    },
    {
      prompt: "Usa la definición para hallar $f'(4)$ si $f(x)=7$ (constante).",
      answer: 0,
      solution: "$\\dfrac{7-7}{h}=0$ para todo $h\\neq0$, así que el límite es $0$. Respuesta: $0.00$.",
    },
  ],
);

const lv3 = L(
  3,
  "Notación y la derivada de una constante",
  "Distintas formas de escribir lo mismo",
  `
### Notaciones para la derivada

La derivada de $f$ (como función de $x$, no solo en un punto) se escribe de varias formas equivalentes:

$$f'(x), \\qquad \\frac{dy}{dx}, \\qquad y', \\qquad \\frac{d}{dx}[f(x)]$$

Todas significan lo mismo: el límite del cociente incremental, ahora calculado en un punto genérico $x$ en vez de un número fijo.

### Prueba: la derivada de una constante es siempre $0$

Sea $f(x)=c$ para todo $x$ (una función constante). Usando la definición:

$$f'(x) = \\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h} = \\lim_{h\\to0}\\frac{c-c}{h} = \\lim_{h\\to0}\\frac{0}{h} = \\lim_{h\\to0} 0 = 0.$$

Tiene sentido geométricamente: la gráfica de una función constante es una recta horizontal, y la pendiente de una recta horizontal es $0$ en todos sus puntos.
`,
  [
    {
      prompt: "$f(x)=9$. Halla $f'(x)$.",
      answer: 0,
      solution: "La derivada de cualquier constante es $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=-3$. Halla $f'(10)$.",
      answer: 0,
      solution: "Constante: derivada $0$ en cualquier punto. Respuesta: $0.00$.",
    },
    {
      prompt: "Si $f(x)=k$ (constante) para cualquier valor de $k$, ¿es siempre cierto que $f'(5)=0$? (Si/No)",
      answer: "Si",
      solution: "Sin importar el valor de $k$, una función constante tiene derivada $0$ en todo punto. Respuesta: `Sí`.",
    },
    {
      prompt: "$g(x)=\\pi$ (constante). Halla $g'(100)$.",
      answer: 0,
      solution: "Constante: derivada $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$h(x)=0$. Halla $h'(x)$.",
      answer: 0,
      solution: "La función cero es constante, así que su derivada es $0$. Respuesta: $0.00$.",
    },
  ],
);

const lv4 = L(
  4,
  "Derivada de una función lineal",
  "La pendiente de una recta es su propia derivada",
  `
### Prueba: la derivada de $f(x)=mx+b$ es $m$

Usamos la definición otra vez:

$$f'(x) = \\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h} = \\lim_{h\\to0}\\frac{m(x+h)+b - (mx+b)}{h} = \\lim_{h\\to0}\\frac{mh}{h} = \\lim_{h\\to0} m = m.$$

Es decir: **la derivada de una recta es constante, e igual a su propia pendiente**. Esto es coherente con la interpretación geométrica: la "recta tangente" a una recta es la recta misma, así que su pendiente no cambia en ningún punto.
`,
  [
    {
      prompt: "$f(x)=4x-7$. Halla $f'(x)$.",
      answer: 4,
      solution: "La derivada de una recta es su pendiente: $4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$f(x)=-2x+5$. Halla $f'(3)$.",
      answer: -2,
      solution: "La derivada es constante e igual a la pendiente: $-2$. Respuesta: $-2.00$.",
    },
    {
      prompt: "$f(x)=x$. Halla $f'(x)$.",
      answer: 1,
      solution: "Es la recta $y=x$, pendiente $1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=-x+100$. Halla $f'(50)$.",
      answer: -1,
      solution: "Pendiente constante $-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "Si $f(x)=mx+b$ y $f'(2)=7$, ¿cuánto vale $m$?",
      answer: 7,
      solution: "La derivada de una recta es siempre su pendiente $m$, así que $m=7$. Respuesta: $7.00$.",
    },
  ],
);

const lv5 = L(
  5,
  "Derivada de $x^2$: demostración completa",
  "Tu primera curva, paso a paso",
  `
### Prueba completa

Sea $f(x)=x^2$. Aplicamos la definición:

$$f'(x) = \\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}$$

Expandimos $(x+h)^2 = x^2+2xh+h^2$, así que el numerador es $2xh+h^2$:

$$f'(x) = \\lim_{h\\to0}\\frac{2xh+h^2}{h} = \\lim_{h\\to0}(2x+h) = 2x.$$

Así que $f'(x)=2x$: la pendiente de la tangente a la parábola $y=x^2$ **depende del punto**, y vale exactamente el doble de la coordenada $x$. Por eso en $x=0$ la tangente es horizontal (pendiente $0$, el vértice), y a la derecha del vértice la parábola crece cada vez más rápido.
`,
  [
    {
      prompt: "$f(x)=x^2$. Halla $f'(3)$.",
      answer: 6,
      solution: "$f'(x)=2x$, así que $f'(3)=6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$f(x)=x^2$. Halla $f'(-1)$.",
      answer: -2,
      solution: "$2(-1)=-2$. Respuesta: $-2.00$.",
    },
    {
      prompt: "$f(x)=x^2$. Halla $f'(0)$.",
      answer: 0,
      solution: "$2(0)=0$: la tangente en el vértice es horizontal. Respuesta: $0.00$.",
    },
    {
      prompt: "Pendiente de la tangente a $y=x^2$ en $x=5$.",
      answer: 10,
      solution: "$2(5)=10$. Respuesta: $10.00$.",
    },
    {
      prompt: "¿En qué valor de $x$ la pendiente de la tangente a $y=x^2$ es igual a $20$?",
      hint: "Resuelve $2x=20$.",
      answer: 10,
      solution: "$2x=20 \\Rightarrow x=10$. Respuesta: $10.00$.",
    },
  ],
);

const lv6 = L(
  6,
  "Derivada de $x^3$: demostración completa",
  "El mismo método, un grado más arriba",
  `
### Prueba completa

Sea $f(x)=x^3$. Necesitamos expandir $(x+h)^3$. Usando el binomio:

$$(x+h)^3 = x^3+3x^2h+3xh^2+h^3$$

Entonces:

$$f'(x) = \\lim_{h\\to0}\\frac{(x^3+3x^2h+3xh^2+h^3)-x^3}{h} = \\lim_{h\\to0}\\frac{3x^2h+3xh^2+h^3}{h} = \\lim_{h\\to0}(3x^2+3xh+h^2) = 3x^2.$$

Así, $f'(x)=3x^2$. Observa el patrón entre este resultado y el del nivel anterior ($x^2 \\to 2x$, $x^3\\to 3x^2$): el exponente "baja" al frente como coeficiente, y el nuevo exponente es uno menos. Ese patrón es exactamente lo que exploraremos —y demostraremos en general— en el siguiente nivel.
`,
  [
    {
      prompt: "$f(x)=x^3$. Halla $f'(2)$.",
      answer: 12,
      solution: "$f'(x)=3x^2$, así que $f'(2)=3(4)=12$. Respuesta: $12.00$.",
    },
    {
      prompt: "$f(x)=x^3$. Halla $f'(-1)$.",
      answer: 3,
      solution: "$3(-1)^2=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$f(x)=x^3$. Halla $f'(0)$.",
      answer: 0,
      solution: "$3(0)^2=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "Pendiente de la tangente a $y=x^3$ en $x=3$.",
      answer: 27,
      solution: "$3(3)^2=27$. Respuesta: $27.00$.",
    },
    {
      prompt: "¿En qué valor de $x$ es $f'(x)=0$ para $f(x)=x^3$?",
      answer: 0,
      solution: "$3x^2=0 \\Rightarrow x=0$. Respuesta: $0.00$.",
    },
  ],
);

const lv7 = L(
  7,
  "La regla de la potencia (exponentes naturales)",
  "El patrón que veníamos observando, demostrado en general",
  `
### El patrón se vuelve teorema

Para cualquier entero positivo $n$:

$$\\frac{d}{dx}\\big[x^n\\big] = n\\,x^{n-1}$$

### Demostración usando el binomio de Newton

El binomio de Newton dice que:

$$(x+h)^n = x^n + n x^{n-1}h + \\binom{n}{2}x^{n-2}h^2 + \\cdots + h^n$$

donde todos los términos a partir del tercero tienen **al menos** un factor $h^2$. Restando $x^n$ y dividiendo entre $h$:

$$\\frac{(x+h)^n-x^n}{h} = n x^{n-1} + \\binom{n}{2}x^{n-2}h + \\cdots + h^{n-1}$$

Todos los términos después del primero tienen al menos un factor $h$, así que **se anulan** cuando $h\\to0$. Queda únicamente:

$$\\frac{d}{dx}\\big[x^n\\big] = n x^{n-1}.$$

Esto confirma —de una vez y para siempre— los patrones que viste en los niveles 5 y 6 ($n=2$ da $2x$, $n=3$ da $3x^2$), y nos da una fórmula que podemos aplicar directamente sin repetir la definición cada vez.
`,
  [
    {
      prompt: "$f(x)=x^5$. Halla $f'(1)$.",
      answer: 5,
      solution: "$f'(x)=5x^4$, así que $f'(1)=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$f(x)=x^4$. Halla $f'(2)$.",
      answer: 32,
      solution: "$f'(x)=4x^3$, $f'(2)=4(8)=32$. Respuesta: $32.00$.",
    },
    {
      prompt: "$f(x)=x^{10}$. Halla $f'(0)$.",
      answer: 0,
      solution: "$f'(x)=10x^9$, que vale $0$ en $x=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=x^6$. Halla $f'(-1)$.",
      answer: -6,
      solution: "$f'(x)=6x^5$, $f'(-1)=6(-1)=-6$. Respuesta: $-6.00$.",
    },
    {
      prompt: "$f(x)=x^7$. Halla $f'(1)$.",
      answer: 7,
      solution: "$f'(x)=7x^6$, $f'(1)=7$. Respuesta: $7.00$.",
    },
  ],
);

const lv8 = L(
  8,
  "Regla de la suma",
  "La derivada de una suma es la suma de las derivadas",
  `
### Demostración

Sea $s(x)=f(x)+g(x)$. Aplicamos la definición y usamos que el límite de una suma es la suma de los límites (¡ya lo sabías de límites!):

$$s'(x) = \\lim_{h\\to0}\\frac{\\big[f(x+h)+g(x+h)\\big]-\\big[f(x)+g(x)\\big]}{h} = \\lim_{h\\to0}\\left[\\frac{f(x+h)-f(x)}{h} + \\frac{g(x+h)-g(x)}{h}\\right]$$

$$= \\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h} + \\lim_{h\\to0}\\frac{g(x+h)-g(x)}{h} = f'(x)+g'(x).$$

Así que:

$$(f+g)'(x) = f'(x)+g'(x).$$

Ahora puedes derivar sumas de potencias término a término, combinando esta regla con la regla de la potencia del nivel anterior.
`,
  [
    {
      prompt: "$f(x)=x^2+x^3$. Halla $f'(1)$.",
      answer: 5,
      solution: "$f'(x)=2x+3x^2$, $f'(1)=2+3=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$f(x)=x^3+x$. Halla $f'(2)$.",
      answer: 13,
      solution: "$f'(x)=3x^2+1$, $f'(2)=12+1=13$. Respuesta: $13.00$.",
    },
    {
      prompt: "$f(x)=x^2+5$. Halla $f'(3)$.",
      answer: 6,
      solution: "$f'(x)=2x$ (el $+5$ desaparece, es constante), $f'(3)=6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$f(x)=x^4+x^2$. Halla $f'(1)$.",
      answer: 6,
      solution: "$f'(x)=4x^3+2x$, $f'(1)=4+2=6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$f(x)=x+x^2+x^3$. Halla $f'(0)$.",
      answer: 1,
      solution: "$f'(x)=1+2x+3x^2$, $f'(0)=1$. Respuesta: $1.00$.",
    },
  ],
);

const lv9 = L(
  9,
  "Regla del múltiplo constante",
  "Las constantes se pueden \"sacar\" de la derivada",
  `
### Demostración

Sea $g(x)=c\\cdot f(x)$, con $c$ una constante. Usando la definición y que las constantes salen de un límite (propiedad que ya conocías):

$$g'(x) = \\lim_{h\\to0}\\frac{c\\,f(x+h)-c\\,f(x)}{h} = \\lim_{h\\to0}\\, c\\cdot\\frac{f(x+h)-f(x)}{h} = c\\cdot\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h} = c\\,f'(x).$$

Así que:

$$\\big(c\\cdot f\\big)'(x) = c\\cdot f'(x).$$

Combinada con la regla de la suma y la regla de la potencia, ya puedes derivar **cualquier** término del tipo $c\\,x^n$.
`,
  [
    {
      prompt: "$f(x)=5x^2$. Halla $f'(3)$.",
      answer: 30,
      solution: "$f'(x)=5(2x)=10x$, $f'(3)=30$. Respuesta: $30.00$.",
    },
    {
      prompt: "$f(x)=-3x^3$. Halla $f'(1)$.",
      answer: -9,
      solution: "$f'(x)=-3(3x^2)=-9x^2$, $f'(1)=-9$. Respuesta: $-9.00$.",
    },
    {
      prompt: "$f(x)=2x^4$. Halla $f'(-1)$.",
      answer: -8,
      solution: "$f'(x)=8x^3$, $f'(-1)=-8$. Respuesta: $-8.00$.",
    },
    {
      prompt: "$f(x)=7x$. Halla $f'(x)$.",
      answer: 7,
      solution: "$f'(x)=7\\cdot1=7$. Respuesta: $7.00$.",
    },
    {
      prompt: "$f(x)=-x^2$. Halla $f'(2)$.",
      answer: -4,
      solution: "$f'(x)=-2x$, $f'(2)=-4$. Respuesta: $-4.00$.",
    },
  ],
);

const lv10 = L(
  10,
  "Derivando polinomios completos",
  "Combinando todas las reglas vistas hasta ahora",
  `
### Derivar término a término

Con la regla de la suma (nivel 8), la del múltiplo constante (nivel 9) y la de la potencia (nivel 7), ya puedes derivar **cualquier polinomio**: se deriva cada término por separado y se suman los resultados.

### Ejemplo

$$f(x) = 3x^4-5x^2+2x-7$$

Derivando cada término:

$$f'(x) = 3(4x^3) - 5(2x) + 2(1) - 0 = 12x^3-10x+2.$$

(El $-7$, al ser constante, desaparece.) Este será tu procedimiento estándar de aquí en adelante para cualquier polinomio.
`,
  [
    {
      prompt: "$f(x)=3x^4-5x^2+2x-7$. Halla $f'(1)$.",
      answer: 4,
      solution: "$f'(x)=12x^3-10x+2$, $f'(1)=12-10+2=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$f(x)=x^3-4x^2+6x-2$. Halla $f'(2)$.",
      answer: 2,
      solution: "$f'(x)=3x^2-8x+6$, $f'(2)=12-16+6=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=-2x^3+x^2-x$. Halla $f'(0)$.",
      answer: -1,
      solution: "$f'(x)=-6x^2+2x-1$, $f'(0)=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$f(x)=5x^2-3x+10$. Halla $f'(-1)$.",
      answer: -13,
      solution: "$f'(x)=10x-3$, $f'(-1)=-10-3=-13$. Respuesta: $-13.00$.",
    },
    {
      prompt: "$f(x)=x^5-2x^3$. Halla $f'(1)$.",
      answer: -1,
      solution: "$f'(x)=5x^4-6x^2$, $f'(1)=5-6=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$f(x)=4x^2-1$. ¿En qué valor de $x$ es $f'(x)=0$?",
      answer: 0,
      solution: "$f'(x)=8x=0 \\Rightarrow x=0$. Respuesta: $0.00$.",
    },
  ],
);

const lv11 = L(
  11,
  "Regla del producto",
  "La derivada de un producto NO es el producto de las derivadas",
  `
### Un error tentador

Podrías pensar que $(fg)'=f'g'$, pero eso es **falso**. La regla correcta requiere un pequeño truco algebraico.

### Demostración

$$(fg)'(x) = \\lim_{h\\to0}\\frac{f(x+h)g(x+h)-f(x)g(x)}{h}$$

Sumamos y restamos $f(x+h)g(x)$ en el numerador (no cambia nada, pero permite factorizar):

$$= \\lim_{h\\to0}\\frac{f(x+h)g(x+h)-f(x+h)g(x) + f(x+h)g(x)-f(x)g(x)}{h}$$

$$= \\lim_{h\\to0}\\left[f(x+h)\\cdot\\frac{g(x+h)-g(x)}{h} + g(x)\\cdot\\frac{f(x+h)-f(x)}{h}\\right]$$

Cuando $h\\to0$: $f(x+h)\\to f(x)$ (porque $f$ es continua ahí, algo que retomaremos en el nivel 33), y los cocientes incrementales tienden a $g'(x)$ y $f'(x)$. Queda:

$$(fg)'(x) = f(x)g'(x) + g(x)f'(x).$$
`,
  [
    {
      prompt: "$h(x)=x^2(x+1)$. Halla $h'(1)$.",
      answer: 5,
      solution: "$h'=2x(x+1)+x^2(1)=3x^2+2x$, $h'(1)=3+2=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$h(x)=(x+2)(x-3)$. Halla $h'(0)$.",
      hint: "Deriva usando la regla del producto con $f=x+2$, $g=x-3$.",
      answer: -1,
      solution: "$h'=1\\cdot(x-3)+(x+2)\\cdot1=2x-1$, $h'(0)=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$h(x)=x^2(x^2+1)$. Halla $h'(1)$.",
      answer: 6,
      solution: "$h'=2x(x^2+1)+x^2(2x)=4x^3+2x$, $h'(1)=4+2=6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$h(x)=(2x+1)(x^2)$. Halla $h'(2)$.",
      answer: 28,
      solution: "$h'=2\\cdot x^2+(2x+1)(2x)=6x^2+2x$, $h'(2)=24+4=28$. Respuesta: $28.00$.",
    },
    {
      prompt: "$h(x)=(x-1)(x+1)$. Halla $h'(3)$.",
      hint: "Comprueba tu resultado expandiendo $h(x)=x^2-1$.",
      answer: 6,
      solution: "$h'=1(x+1)+(x-1)1=2x$, $h'(3)=6$; coincide con derivar $x^2-1$ directamente. Respuesta: $6.00$.",
    },
  ],
);

const lv12 = L(
  12,
  "Regla del cociente",
  "Derivando $\\dfrac{f}{g}$",
  `
### Paso previo: la derivada de $1/g(x)$

$$\\frac{d}{dx}\\left[\\frac{1}{g(x)}\\right] = \\lim_{h\\to0}\\frac{\\tfrac{1}{g(x+h)}-\\tfrac{1}{g(x)}}{h} = \\lim_{h\\to0}\\frac{g(x)-g(x+h)}{h\\,g(x+h)g(x)} = -\\lim_{h\\to0}\\frac{g(x+h)-g(x)}{h}\\cdot\\frac{1}{g(x+h)g(x)} = -\\frac{g'(x)}{g(x)^2}.$$

### Ahora, el cociente completo

Escribimos $\\dfrac{f}{g} = f\\cdot\\dfrac{1}{g}$ y aplicamos la regla del producto (nivel 11) junto con lo que acabamos de probar:

$$\\left(\\frac{f}{g}\\right)' = f'\\cdot\\frac{1}{g} + f\\cdot\\left(-\\frac{g'}{g^2}\\right) = \\frac{f'g}{g^2} - \\frac{fg'}{g^2} = \\frac{f'g-fg'}{g^2}.$$

$$\\boxed{\\left(\\frac{f}{g}\\right)'(x) = \\frac{f'(x)g(x)-f(x)g'(x)}{g(x)^2}}$$
`,
  [
    {
      prompt: "$h(x)=\\dfrac{x}{x+1}$. Halla $h'(0)$.",
      answer: 1,
      solution: "$h'=\\dfrac{1(x+1)-x(1)}{(x+1)^2}=\\dfrac{1}{(x+1)^2}$, $h'(0)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$h(x)=\\dfrac{x^2}{x+1}$. Halla $h'(1)$.",
      answer: 0.75,
      solution: "$h'=\\dfrac{2x(x+1)-x^2}{(x+1)^2}=\\dfrac{x^2+2x}{(x+1)^2}$, $h'(1)=\\dfrac{3}{4}=0.75$. Respuesta: $0.75$.",
    },
    {
      prompt: "$h(x)=\\dfrac{x-1}{x+2}$. Halla $h'(0)$.",
      answer: 0.75,
      solution: "$h'=\\dfrac{(x+2)-(x-1)}{(x+2)^2}=\\dfrac{3}{(x+2)^2}$, $h'(0)=\\dfrac{3}{4}=0.75$. Respuesta: $0.75$.",
    },
    {
      prompt: "$h(x)=\\dfrac{1}{x^2}$. Halla $h'(1)$.",
      hint: "Usa $f=1$, $f'=0$ en la fórmula del cociente.",
      answer: -2,
      solution: "$h'=\\dfrac{0\\cdot x^2-1(2x)}{x^4}=-\\dfrac{2}{x^3}$, $h'(1)=-2$. Respuesta: $-2.00$.",
    },
    {
      prompt: "$h(x)=\\dfrac{2x+3}{x-1}$. Halla $h'(2)$.",
      answer: -5,
      solution: "$h'=\\dfrac{2(x-1)-(2x+3)}{(x-1)^2}=\\dfrac{-5}{(x-1)^2}$, $h'(2)=-5$. Respuesta: $-5.00$.",
    },
  ],
);

const lv13 = L(
  13,
  "Derivada de $\\sqrt{x}$ usando el conjugado",
  "Un viejo truco de límites, aplicado aquí",
  `
### Demostración usando el conjugado

$$f(x)=\\sqrt{x}, \\qquad f'(x) = \\lim_{h\\to0}\\frac{\\sqrt{x+h}-\\sqrt{x}}{h}$$

Multiplicamos por el conjugado, tal como en el mundo de los límites:

$$= \\lim_{h\\to0}\\frac{\\big(\\sqrt{x+h}-\\sqrt{x}\\big)\\big(\\sqrt{x+h}+\\sqrt{x}\\big)}{h\\big(\\sqrt{x+h}+\\sqrt{x}\\big)} = \\lim_{h\\to0}\\frac{(x+h)-x}{h\\big(\\sqrt{x+h}+\\sqrt{x}\\big)} = \\lim_{h\\to0}\\frac{1}{\\sqrt{x+h}+\\sqrt{x}}$$

$$= \\frac{1}{2\\sqrt{x}}.$$

Nota que $\\sqrt{x}=x^{1/2}$, y la regla de la potencia (si valiera para exponentes fraccionarios) daría $\\tfrac12 x^{-1/2} = \\tfrac{1}{2\\sqrt{x}}$: ¡exactamente lo mismo! Esto es una pista de que la regla de la potencia se extiende más allá de los enteros, algo que veremos pronto.
`,
  [
    {
      prompt: "$f(x)=\\sqrt{x}$. Halla $f'(4)$.",
      answer: 0.25,
      solution: "$\\dfrac{1}{2\\sqrt4}=\\dfrac{1}{4}=0.25$. Respuesta: $0.25$.",
    },
    {
      prompt: "$f(x)=\\sqrt{x}$. Halla $f'(9)$.",
      answer: 0.17,
      solution: "$\\dfrac{1}{2\\sqrt9}=\\dfrac{1}{6}\\approx0.17$. Respuesta: $0.17$.",
    },
    {
      prompt: "$f(x)=\\sqrt{x}$. Halla $f'(1)$.",
      answer: 0.5,
      solution: "$\\dfrac{1}{2\\sqrt1}=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$f(x)=3\\sqrt{x}$. Halla $f'(4)$.",
      hint: "Usa la regla del múltiplo constante (nivel 9) junto con el resultado de este nivel.",
      answer: 0.75,
      solution: "$f'(x)=3\\cdot\\dfrac{1}{2\\sqrt x}$, $f'(4)=3\\cdot0.25=0.75$. Respuesta: $0.75$.",
    },
    {
      prompt: "Pendiente de la tangente a $y=\\sqrt{x}$ en $x=25$.",
      answer: 0.1,
      solution: "$\\dfrac{1}{2\\sqrt{25}}=\\dfrac{1}{10}=0.1$. Respuesta: $0.10$.",
    },
  ],
);

const lv14 = L(
  14,
  "Potencias con exponente negativo",
  "La regla de la potencia también funciona hacia atrás",
  `
### La regla de la potencia se extiende a enteros negativos

Para $f(x)=x^{-n}=\\dfrac{1}{x^n}$ (con $n$ entero positivo), usamos la regla del cociente (nivel 12) con $f=1$, $g=x^n$:

$$\\frac{d}{dx}\\left[\\frac{1}{x^n}\\right] = \\frac{0\\cdot x^n - 1\\cdot(nx^{n-1})}{x^{2n}} = \\frac{-nx^{n-1}}{x^{2n}} = -n\\,x^{n-1-2n} = -n\\,x^{-n-1}.$$

Es decir:

$$\\frac{d}{dx}\\big[x^{-n}\\big] = -n\\,x^{-n-1}$$

que es **exactamente** la misma fórmula $\\frac{d}{dx}[x^m]=mx^{m-1}$ pero con $m=-n$. Así, la regla de la potencia $\\frac{d}{dx}[x^m]=mx^{m-1}$ vale para **cualquier entero** $m$, positivo o negativo (y, como viste en el nivel 13, también empieza a funcionar con fracciones).
`,
  [
    {
      prompt: "$f(x)=\\dfrac{1}{x}$. Halla $f'(2)$.",
      answer: -0.25,
      solution: "$f'(x)=-x^{-2}=-\\dfrac1{x^2}$, $f'(2)=-0.25$. Respuesta: $-0.25$.",
    },
    {
      prompt: "$f(x)=\\dfrac{1}{x^2}$. Halla $f'(1)$.",
      answer: -2,
      solution: "$f'(x)=-2x^{-3}$, $f'(1)=-2$. Respuesta: $-2.00$.",
    },
    {
      prompt: "$f(x)=x^{-3}$. Halla $f'(1)$.",
      answer: -3,
      solution: "$f'(x)=-3x^{-4}$, $f'(1)=-3$. Respuesta: $-3.00$.",
    },
    {
      prompt: "$f(x)=\\dfrac{2}{x}$. Halla $f'(2)$.",
      answer: -0.5,
      solution: "$f'(x)=2(-x^{-2})=-\\dfrac{2}{x^2}$, $f'(2)=-0.5$. Respuesta: $-0.50$.",
    },
    {
      prompt: "$f(x)=\\dfrac{1}{x^3}$. Halla $f'(-1)$.",
      answer: -3,
      solution: "$f'(x)=-3x^{-4}$, $f'(-1)=-3(1)=-3$ (pues $(-1)^{-4}=1$). Respuesta: $-3.00$.",
    },
  ],
);

const lv15 = L(
  15,
  "Potencias con exponente racional",
  "La regla de la potencia, en su versión más general",
  `
### La fórmula vale para cualquier exponente real

$$\\frac{d}{dx}\\big[x^r\\big] = r\\,x^{r-1} \\qquad \\text{para cualquier número real } r.$$

Ya viste el caso $r=\\tfrac12$ en el nivel 13 (con conjugado) y coincidió exactamente con esta fórmula. La demostración formal se consigue poniendo al número $e$ como base y derivando, usando técnicas más avanzadas como la regla de la cadena.

### Ejemplo

$$f(x)=x^{2/3} \\quad\\Rightarrow\\quad f'(x) = \\frac23\\,x^{-1/3} = \\frac{2}{3\\sqrt[3]{x}}.$$
`,
  [
    {
      prompt: "$f(x)=x^{3/2}$. Halla $f'(4)$.",
      answer: 3,
      solution: "$f'(x)=\\tfrac32 x^{1/2}$, $f'(4)=1.5\\cdot2=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$f(x)=x^{1/3}=\\sqrt[3]{x}$. Halla $f'(8)$.",
      hint: "$f'(x)=\\tfrac13 x^{-2/3}$; recuerda que $8^{2/3}=4$.",
      answer: 0.08,
      solution: "$f'(8)=\\dfrac{1}{3\\cdot4}=\\dfrac1{12}\\approx0.08$. Respuesta: $0.08$.",
    },
    {
      prompt: "$f(x)=x^{2/3}$. Halla $f'(1)$.",
      answer: 0.67,
      solution: "$f'(x)=\\tfrac23 x^{-1/3}$, $f'(1)=\\tfrac23\\approx0.67$. Respuesta: $0.67$.",
    },
    {
      prompt: "$f(x)=x\\sqrt{x}=x^{3/2}$. Halla $f'(1)$.",
      answer: 1.5,
      solution: "$f'(x)=\\tfrac32 x^{1/2}$, $f'(1)=1.5$. Respuesta: $1.50$.",
    },
    {
      prompt: "$f(x)=\\dfrac{1}{\\sqrt{x}}=x^{-1/2}$. Halla $f'(4)$.",
      hint: "$4^{3/2}=8$.",
      answer: -0.06,
      solution: "$f'(x)=-\\tfrac12 x^{-3/2}$, $f'(4)=-\\dfrac{1}{16}=-0.0625\\approx-0.06$. Respuesta: $-0.06$.",
    },
  ],
);

const lv16 = L(
  16,
  "La regla de la cadena",
  "Derivando funciones compuestas",
  `
### Cuando una función está \"dentro\" de otra

¿Cómo derivar algo como $y=(2x+3)^2$? Podríamos expandir, pero para cosas más complejas eso no siempre es práctico. La **regla de la cadena** dice: si $y=f(u)$ y $u=g(x)$ (es decir, $y=f(g(x))$), entonces:

$$\\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx} = f'(g(x))\\cdot g'(x)$$

### Idea de la demostración

$$(f\\circ g)'(x) = \\lim_{h\\to0}\\frac{f(g(x+h))-f(g(x))}{h}$$

Sea $\\Delta u = g(x+h)-g(x)$ (el cambio en la variable interna). Multiplicando y dividiendo por $\\Delta u$ (cuando $\\Delta u\\neq0$ cerca de $x$):

$$= \\lim_{h\\to0}\\frac{f(g(x+h))-f(g(x))}{\\Delta u}\\cdot\\frac{\\Delta u}{h}$$

Cuando $h\\to0$, también $\\Delta u\\to0$ (porque $g$ es continua), así que el primer factor tiende a $f'(g(x))$ y el segundo a $g'(x)$. Queda $f'(g(x))\\cdot g'(x)$.

### Ejemplo

$y=(2x+3)^2$, con $u=2x+3$: $\\dfrac{dy}{du}=2u$, $\\dfrac{du}{dx}=2$. Entonces $\\dfrac{dy}{dx}=2u\\cdot2=4u=4(2x+3)=8x+12$ (que coincide con expandir $y=4x^2+12x+9$ y derivar directamente).
`,
  [
    {
      prompt: "$h(x)=(2x+3)^2$. Halla $h'(1)$.",
      answer: 20,
      solution: "$h'=8x+12$, $h'(1)=20$. Respuesta: $20.00$.",
    },
    {
      prompt: "$h(x)=(x^2+1)^2$. Halla $h'(1)$.",
      answer: 8,
      solution: "$h'=2(x^2+1)\\cdot2x=4x(x^2+1)$, $h'(1)=4\\cdot2=8$. Respuesta: $8.00$.",
    },
    {
      prompt: "$h(x)=\\sqrt{2x+1}$. Halla $h'(4)$.",
      hint: "Deriva $u^{1/2}$ respecto de $u=2x+1$, y multiplica por $du/dx=2$.",
      answer: 0.33,
      solution: "$h'=\\dfrac{1}{\\sqrt{2x+1}}$, $h'(4)=\\dfrac{1}{3}\\approx0.33$. Respuesta: $0.33$.",
    },
    {
      prompt: "$h(x)=\\dfrac{1}{(x+1)^2}$. Halla $h'(0)$.",
      answer: -2,
      solution: "$h(x)=(x+1)^{-2}$, $h'=-2(x+1)^{-3}$, $h'(0)=-2$. Respuesta: $-2.00$.",
    },
    {
      prompt: "$h(x)=\\sqrt{x^2+9}$. Halla $h'(4)$.",
      answer: 0.8,
      solution: "$h'=\\dfrac{x}{\\sqrt{x^2+9}}$, $h'(4)=\\dfrac{4}{5}=0.8$. Respuesta: $0.80$.",
    },
  ],
);

const lv17 = L(
  17,
  "Regla de la potencia generalizada",
  "Combinando la regla de la cadena con la regla de la potencia",
  `
### Fórmula de práctica constante

Cuando tienes $\\big(u(x)\\big)^n$, la regla de la cadena (nivel 16) aplicada a la función externa \"elevar a $n$\" da:

$$\\frac{d}{dx}\\Big[u(x)^n\\Big] = n\\,u(x)^{n-1}\\cdot u'(x)$$

Esta combinación es tan frecuente que merece practicarse por separado. La idea: deriva la potencia "de afuera hacia adentro" y no olvides multiplicar por la derivada de "lo de adentro".

### Ejemplo

$$h(x)=(x^2+3)^4 \\quad\\Rightarrow\\quad h'(x) = 4(x^2+3)^3\\cdot(2x) = 8x(x^2+3)^3.$$
`,
  [
    {
      prompt: "$h(x)=(x^2+3)^4$. Halla $h'(1)$.",
      answer: 512,
      solution: "$h'=8x(x^2+3)^3$, en $x=1$: $u=4$, $u^3=64$, $h'(1)=8(64)=512$. Respuesta: $512.00$.",
    },
    {
      prompt: "$h(x)=(3x-1)^5$. Halla $h'(1)$.",
      answer: 240,
      solution: "$h'=5(3x-1)^4\\cdot3=15(3x-1)^4$, en $x=1$: $u=2$, $u^4=16$, $h'(1)=15(16)=240$. Respuesta: $240.00$.",
    },
    {
      prompt: "$h(x)=\\dfrac{1}{(x^2+1)^2}$. Halla $h'(1)$.",
      hint: "Escribe $h(x)=(x^2+1)^{-2}$ y aplica la potencia generalizada.",
      answer: -0.5,
      solution: "$h'=-2(x^2+1)^{-3}\\cdot2x=-4x(x^2+1)^{-3}$, en $x=1$: $-4/8=-0.5$. Respuesta: $-0.50$.",
    },
    {
      prompt: "$h(x)=(x^3-2)^2$. Halla $h'(2)$.",
      answer: 144,
      solution: "$h'=2(x^3-2)\\cdot3x^2$, en $x=2$: $u=6$, $3x^2=12$, $h'(2)=2(6)(12)=144$. Respuesta: $144.00$.",
    },
    {
      prompt: "$h(x)=(x+5)^{1/4}$. Halla $h'(11)$.",
      hint: "$16^{3/4}=8$.",
      answer: 0.03,
      solution: "$h'=\\tfrac14(x+5)^{-3/4}$, en $x=11$: $u=16$, $u^{3/4}=8$, $h'(11)=\\dfrac1{32}\\approx0.03$. Respuesta: $0.03$.",
    },
  ],
);

const lv18 = L(
  18,
  "Derivada de $\\sin x$",
  "Usando la definición y los límites notables que ya conoces",
  `
### Demostración usando límites notables

Recordarás del mundo de los límites que $\\displaystyle\\lim_{h\\to0}\\frac{\\sin h}{h}=1$ y $\\displaystyle\\lim_{h\\to0}\\frac{\\cos h - 1}{h}=0$. Con ellos podemos derivar $\\sin x$ desde la definición.

$$f(x)=\\sin x, \\qquad f'(x)=\\lim_{h\\to0}\\frac{\\sin(x+h)-\\sin x}{h}$$

Usando la identidad de suma de ángulos $\\sin(x+h)=\\sin x\\cos h + \\cos x\\sin h$:

$$f'(x) = \\lim_{h\\to0}\\frac{\\sin x\\cos h+\\cos x\\sin h - \\sin x}{h} = \\lim_{h\\to0}\\left[\\sin x\\cdot\\frac{\\cos h-1}{h} + \\cos x\\cdot\\frac{\\sin h}{h}\\right]$$

$$= \\sin x\\cdot 0 + \\cos x\\cdot 1 = \\cos x.$$

$$\\boxed{\\frac{d}{dx}[\\sin x] = \\cos x}$$
`,
  [
    {
      prompt: "$f(x)=\\sin x$. Halla $f'(0)$.",
      answer: 1,
      solution: "$\\cos(0)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\sin x$. Halla $f'\\!\\left(\\dfrac{\\pi}{2}\\right)$.",
      answer: 0,
      solution: "$\\cos(\\pi/2)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=\\sin(2x)$. Halla $f'(0)$.",
      hint: "Usa la regla de la cadena: deriva $\\sin(u)$ y multiplica por $u'=2$.",
      answer: 2,
      solution: "$f'=\\cos(2x)\\cdot2$, $f'(0)=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=\\sin x$. Halla $f'(\\pi)$.",
      answer: -1,
      solution: "$\\cos(\\pi)=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$f(x)=3\\sin x$. Halla $f'(0)$.",
      answer: 3,
      solution: "$f'=3\\cos x$, $f'(0)=3$. Respuesta: $3.00$.",
    },
  ],
);

const lv19 = L(
  19,
  "Derivada de $\\cos x$",
  "El mismo método que con el seno",
  `
### Demostración

$$f(x)=\\cos x, \\qquad f'(x)=\\lim_{h\\to0}\\frac{\\cos(x+h)-\\cos x}{h}$$

Usando $\\cos(x+h)=\\cos x\\cos h - \\sin x\\sin h$:

$$f'(x) = \\lim_{h\\to0}\\left[\\cos x\\cdot\\frac{\\cos h-1}{h} - \\sin x\\cdot\\frac{\\sin h}{h}\\right] = \\cos x\\cdot0 - \\sin x\\cdot1 = -\\sin x.$$

$$\\boxed{\\frac{d}{dx}[\\cos x] = -\\sin x}$$

Nota la simetría: derivar seno da coseno; derivar coseno da **menos** seno.
`,
  [
    {
      prompt: "$f(x)=\\cos x$. Halla $f'(0)$.",
      answer: 0,
      solution: "$-\\sin(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=\\cos x$. Halla $f'\\!\\left(\\dfrac{\\pi}{2}\\right)$.",
      answer: -1,
      solution: "$-\\sin(\\pi/2)=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$f(x)=\\cos(3x)$. Halla $f'(0)$.",
      answer: 0,
      solution: "$f'=-\\sin(3x)\\cdot3$, $f'(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=\\cos x$. Halla $f'(\\pi)$.",
      answer: 0,
      solution: "$-\\sin(\\pi)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=2\\cos x+\\sin x$. Halla $f'(0)$.",
      hint: "Deriva cada término por separado y súmalos.",
      answer: 1,
      solution: "$f'=-2\\sin x+\\cos x$, $f'(0)=0+1=1$. Respuesta: $1.00$.",
    },
  ],
);

const lv20 = L(
  20,
  "Derivada de $\\tan x$",
  "Aplicando la regla del cociente",
  `
### Demostración usando la regla del cociente

$\\tan x = \\dfrac{\\sin x}{\\cos x}$. Aplicamos la regla del cociente (nivel 12) con $f=\\sin x$, $g=\\cos x$:

$$\\frac{d}{dx}[\\tan x] = \\frac{(\\sin x)'\\cos x - \\sin x(\\cos x)'}{\\cos^2 x} = \\frac{\\cos x\\cos x - \\sin x(-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2x+\\sin^2x}{\\cos^2x}$$

Usando la identidad pitagórica $\\sin^2x+\\cos^2x=1$:

$$\\frac{d}{dx}[\\tan x] = \\frac{1}{\\cos^2 x} = \\sec^2 x.$$
`,
  [
    {
      prompt: "$f(x)=\\tan x$. Halla $f'(0)$.",
      answer: 1,
      solution: "$\\sec^2(0)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\tan x$. Halla $f'\\!\\left(\\dfrac{\\pi}{4}\\right)$.",
      answer: 2,
      solution: "$\\cos(\\pi/4)=\\tfrac{\\sqrt2}{2}$, $\\cos^2=0.5$, $\\sec^2=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=\\tan(2x)$. Halla $f'(0)$.",
      answer: 2,
      solution: "$f'=\\sec^2(2x)\\cdot2$, $f'(0)=1\\cdot2=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=3\\tan x$. Halla $f'(0)$.",
      answer: 3,
      solution: "$f'=3\\sec^2x$, $f'(0)=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "Con $f(x)=\\tan x$, evalúa $\\dfrac{1}{f'(\\pi/4)}$.",
      answer: 0.5,
      solution: "$f'(\\pi/4)=2$, así que $1/2=0.5$. Respuesta: $0.50$.",
    },
  ],
);

const lv21 = L(
  21,
  "Derivadas de $\\cot x$, $\\sec x$ y $\\csc x$",
  "Completando el trío trigonométrico restante",
  `
### Mismo método, tres funciones más

Usando la regla del cociente sobre $\\cot x = \\dfrac{\\cos x}{\\sin x}$, $\\sec x = \\dfrac{1}{\\cos x}$ y $\\csc x = \\dfrac{1}{\\sin x}$, obtenemos (los cálculos son análogos al nivel 20):

$$\\frac{d}{dx}[\\cot x] = -\\csc^2 x, \\qquad \\frac{d}{dx}[\\sec x] = \\sec x\\tan x, \\qquad \\frac{d}{dx}[\\csc x] = -\\csc x\\cot x.$$

Por ejemplo, para $\\sec x=\\dfrac1{\\cos x}$: $\\dfrac{0\\cdot\\cos x - 1\\cdot(-\\sin x)}{\\cos^2 x} = \\dfrac{\\sin x}{\\cos^2 x} = \\dfrac1{\\cos x}\\cdot\\dfrac{\\sin x}{\\cos x} = \\sec x\\tan x$, confirmando la fórmula.
`,
  [
    {
      prompt: "$f(x)=\\sec x$. Halla $f'(0)$.",
      answer: 0,
      solution: "$\\sec(0)\\tan(0)=1\\cdot0=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=\\csc x$. Halla $f'\\!\\left(\\dfrac{\\pi}{2}\\right)$.",
      answer: 0,
      solution: "$-\\csc(\\pi/2)\\cot(\\pi/2)=-1\\cdot0=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=\\cot x$. Halla $f'\\!\\left(\\dfrac{\\pi}{2}\\right)$.",
      answer: -1,
      solution: "$-\\csc^2(\\pi/2)=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$f(x)=\\sec x$. Halla $f'\\!\\left(\\dfrac{\\pi}{4}\\right)$.",
      answer: 1.41,
      solution: "$\\sec(\\pi/4)\\tan(\\pi/4)=\\sqrt2\\cdot1\\approx1.41$. Respuesta: $1.41$.",
    },
    {
      prompt: "$f(x)=\\cot x$. Halla $f'\\!\\left(\\dfrac{\\pi}{4}\\right)$.",
      hint: "$\\csc(\\pi/4)=\\sqrt2$.",
      answer: -2,
      solution: "$-\\csc^2(\\pi/4)=-2$. Respuesta: $-2.00$.",
    },
  ],
);

const lv22 = L(
  22,
  "Derivada de $e^x$",
  "La función que es su propia derivada",
  `
### Demostración usando un límite notable

Recuerdas del mundo de los límites que $\\displaystyle\\lim_{h\\to0}\\frac{e^h-1}{h}=1$. Con eso:

$$f(x)=e^x, \\qquad f'(x)=\\lim_{h\\to0}\\frac{e^{x+h}-e^x}{h} = \\lim_{h\\to0}\\frac{e^x(e^h-1)}{h} = e^x\\cdot\\lim_{h\\to0}\\frac{e^h-1}{h} = e^x\\cdot1 = e^x.$$

$$\\boxed{\\frac{d}{dx}[e^x] = e^x}$$

Esta es una propiedad **única**: $e^x$ es su propia derivada. Ninguna otra función (salvo múltiplos de ella, como $Ce^x$) tiene esta propiedad, y es la razón por la que $e$ aparece tan seguido en cálculo y en ciencias.

Usa $e\\approx2.72$ y $e^2\\approx7.39$ cuando lo necesites, con $2$ decimales.
`,
  [
    {
      prompt: "$f(x)=e^x$. Halla $f'(0)$.",
      answer: 1,
      solution: "$e^0=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=e^x$. Halla $f'(1)$.",
      answer: 2.72,
      solution: "$e^1\\approx2.72$. Respuesta: $2.72$.",
    },
    {
      prompt: "$f(x)=e^{2x}$. Halla $f'(0)$.",
      hint: "Usa la regla de la cadena: deriva $e^u$ y multiplica por $u'=2$.",
      answer: 2,
      solution: "$f'=e^{2x}\\cdot2$, $f'(0)=1\\cdot2=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=3e^x$. Halla $f'(0)$.",
      answer: 3,
      solution: "$f'=3e^x$, $f'(0)=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$f(x)=e^x$. Halla $f'(2)$.",
      answer: 7.39,
      solution: "$e^2\\approx7.39$. Respuesta: $7.39$.",
    },
  ],
);

const lv23 = L(
  23,
  "Derivada de $\\ln x$",
  "Usando otro límite notable ya conocido",
  `
### Demostración

Recuerdas que $\\displaystyle\\lim_{t\\to0}\\frac{\\ln(1+t)}{t}=1$. Con esto:

$$f(x)=\\ln x, \\qquad f'(x)=\\lim_{h\\to0}\\frac{\\ln(x+h)-\\ln x}{h} = \\lim_{h\\to0}\\frac{1}{h}\\ln\\!\\left(\\frac{x+h}{x}\\right) = \\lim_{h\\to0}\\frac{1}{h}\\ln\\!\\left(1+\\frac{h}{x}\\right)$$

Sea $t=h/x$ (así $t\\to0$ cuando $h\\to0$, con $x$ fijo). Como $h=xt$:

$$= \\lim_{t\\to0}\\frac{\\ln(1+t)}{xt} = \\frac{1}{x}\\lim_{t\\to0}\\frac{\\ln(1+t)}{t} = \\frac{1}{x}\\cdot1 = \\frac1x.$$

$$\\boxed{\\frac{d}{dx}[\\ln x] = \\frac1x}$$
`,
  [
    {
      prompt: "$f(x)=\\ln x$. Halla $f'(1)$.",
      answer: 1,
      solution: "$1/1=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\ln x$. Halla $f'(2)$.",
      answer: 0.5,
      solution: "$1/2=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$f(x)=\\ln(2x)$. Halla $f'(1)$.",
      hint: "Usa la regla de la cadena: deriva $\\ln u$ y multiplica por $u'=2$.",
      answer: 1,
      solution: "$f'=\\dfrac{1}{2x}\\cdot2=\\dfrac1x$, $f'(1)=1$ (el $2$ no afecta la derivada). Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\ln x$. Halla $f'(4)$.",
      answer: 0.25,
      solution: "$1/4=0.25$. Respuesta: $0.25$.",
    },
    {
      prompt: "$f(x)=5\\ln x$. Halla $f'(1)$.",
      answer: 5,
      solution: "$f'=5/x$, $f'(1)=5$. Respuesta: $5.00$.",
    },
  ],
);

const lv24 = L(
  24,
  "Derivada de $a^x$ (exponencial general)",
  "Reescribiendo con $e$",
  `
### El truco: reescribir $a^x$ como una potencia de $e$

Usando la identidad $a = e^{\\ln a}$, tenemos $a^x = \\big(e^{\\ln a}\\big)^x = e^{x\\ln a}$. Ahora aplicamos la regla de la cadena con $u=x\\ln a$ (recordando que $\\ln a$ es solo una constante):

$$\\frac{d}{dx}\\big[a^x\\big] = \\frac{d}{dx}\\big[e^{x\\ln a}\\big] = e^{x\\ln a}\\cdot\\ln a = a^x\\ln a.$$

$$\\boxed{\\frac{d}{dx}\\big[a^x\\big] = a^x \\ln a}$$

Con $a=e$, $\\ln e = 1$, y recuperamos el resultado del nivel 22: $\\frac{d}{dx}[e^x]=e^x$.

**Tabla de referencia:** $\\ln2\\approx0.69$, $\\ln3\\approx1.10$, $\\ln5\\approx1.61$, $\\ln10\\approx2.30$.
`,
  [
    {
      prompt: "$f(x)=2^x$. Halla $f'(0)$.",
      answer: 0.69,
      solution: "$2^0\\ln2 = 1\\cdot0.69=0.69$. Respuesta: $0.69$.",
    },
    {
      prompt: "$f(x)=3^x$. Halla $f'(1)$.",
      answer: 3.3,
      solution: "$3^1\\ln3=3\\cdot1.10\\approx3.30$. Respuesta: $3.30$.",
    },
    {
      prompt: "$f(x)=5^x$. Halla $f'(0)$.",
      answer: 1.61,
      solution: "$5^0\\ln5=1\\cdot1.61=1.61$. Respuesta: $1.61$.",
    },
    {
      prompt: "$f(x)=10^x$. Halla $f'(0)$.",
      answer: 2.3,
      solution: "$10^0\\ln10=2.30$. Respuesta: $2.30$.",
    },
    {
      prompt: "$f(x)=2^x$. Halla $f'(2)$.",
      answer: 2.77,
      solution: "$2^2\\ln2=4(0.69)\\approx2.77$. Respuesta: $2.77$.",
    },
  ],
);

const lv25 = L(
  25,
  "Derivada de $\\log_a x$",
  "Cambio de base para derivar",
  `
### Cambio de base: $\\log_a x$ es un múltiplo constante de $\\ln x$

$$\\log_a x = \\frac{\\ln x}{\\ln a}$$

Como $\\ln a$ es una constante, aplicamos la regla del múltiplo constante (nivel 9) junto con la derivada de $\\ln x$ (nivel 23):

$$\\frac{d}{dx}\\big[\\log_a x\\big] = \\frac{1}{\\ln a}\\cdot\\frac{d}{dx}[\\ln x] = \\frac{1}{\\ln a}\\cdot\\frac1x = \\frac{1}{x\\ln a}.$$
`,
  [
    {
      prompt: "$f(x)=\\log_2 x$. Halla $f'(1)$.",
      answer: 1.44,
      solution: "$\\dfrac1{1\\cdot\\ln2}\\approx\\dfrac{1}{0.69}\\approx1.44$. Respuesta: $1.44$.",
    },
    {
      prompt: "$f(x)=\\log_{10} x$. Halla $f'(1)$.",
      answer: 0.43,
      solution: "$\\dfrac1{\\ln10}\\approx\\dfrac1{2.30}\\approx0.43$. Respuesta: $0.43$.",
    },
    {
      prompt: "$f(x)=\\log_2 x$. Halla $f'(2)$.",
      answer: 0.72,
      solution: "$\\dfrac1{2\\ln2}\\approx\\dfrac1{1.39}\\approx0.72$. Respuesta: $0.72$.",
    },
    {
      prompt: "$f(x)=\\log_3 x$. Halla $f'(1)$.",
      answer: 0.91,
      solution: "$\\dfrac1{\\ln3}\\approx\\dfrac1{1.10}\\approx0.91$. Respuesta: $0.91$.",
    },
    {
      prompt: "$f(x)=\\log_{10} x$. Halla $f'(10)$.",
      answer: 0.04,
      solution: "$\\dfrac1{10\\ln10}\\approx\\dfrac1{23.03}\\approx0.04$. Respuesta: $0.04$.",
    },
  ],
);

const lv26 = L(
  26,
  "Derivación de funciones inversas",
  "Una regla general para $f^{-1}$",
  `
### Demostración

Si $g=f^{-1}$ (la inversa de $f$), entonces por definición $f(g(x))=x$ para todo $x$ en el dominio de $g$. Derivamos ambos lados respecto de $x$, usando la regla de la cadena en el lado izquierdo:

$$f'(g(x))\\cdot g'(x) = 1 \\quad\\Rightarrow\\quad g'(x) = \\frac{1}{f'(g(x))}.$$

### Verificación con un caso conocido

$f(x)=x^2$ (para $x\\geq0$) tiene inversa $g(x)=\\sqrt{x}$. Con la fórmula: $g'(x)=\\dfrac{1}{f'(g(x))}=\\dfrac{1}{2g(x)}=\\dfrac{1}{2\\sqrt{x}}$ — ¡exactamente lo que probamos con el conjugado en el nivel 13! Esta regla nos ahorrará mucho trabajo cuando no conozcamos la fórmula explícita de la inversa.
`,
  [
    {
      prompt: "Si $f(x)=x^3$ y $g=f^{-1}$, sabiendo que $f(2)=8$, halla $g'(8)$.",
      hint: "$g'(8)=1/f'(2)$.",
      answer: 0.08,
      solution: "$f'(x)=3x^2$, $f'(2)=12$, $g'(8)=1/12\\approx0.08$. Respuesta: $0.08$.",
    },
    {
      prompt: "Si $f(x)=x^2$ ($x\\geq0$) y $g=f^{-1}$, sabiendo que $f(3)=9$, halla $g'(9)$.",
      answer: 0.17,
      solution: "$f'(3)=6$, $g'(9)=1/6\\approx0.17$. Respuesta: $0.17$.",
    },
    {
      prompt: "Si $f(x)=e^x$ y $g=\\ln x$, sabiendo que $f(0)=1$, halla $g'(1)$.",
      hint: "Esto debería coincidir con lo que ya sabes de la derivada de $\\ln x$.",
      answer: 1,
      solution: "$f'(0)=e^0=1$, $g'(1)=1/1=1$: coincide con el nivel 23. Respuesta: $1.00$.",
    },
    {
      prompt: "Si $f(x)=x^3+1$ y $g=f^{-1}$, sabiendo que $f(1)=2$, halla $g'(2)$.",
      answer: 0.33,
      solution: "$f'(1)=3$, $g'(2)=1/3\\approx0.33$. Respuesta: $0.33$.",
    },
    {
      prompt: "Si $f(x)=2x^3$ y $g=f^{-1}$, sabiendo que $f(1)=2$, halla $g'(2)$.",
      answer: 0.17,
      solution: "$f'(1)=6$, $g'(2)=1/6\\approx0.17$. Respuesta: $0.17$.",
    },
  ],
);

const lv27 = L(
  27,
  "Derivadas de funciones trigonométricas inversas",
  "Aplicando la regla de la función inversa",
  `
### Demostración para $\\arcsin x$

Sea $y=\\arcsin x$, así que $x=\\sin y$. Derivamos implícitamente (usando la regla de la cadena, ya que $y$ depende de $x$):

$$1 = \\cos y\\cdot\\frac{dy}{dx} \\quad\\Rightarrow\\quad \\frac{dy}{dx} = \\frac{1}{\\cos y}.$$

Como $\\sin y = x$ y $\\cos y = \\sqrt{1-\\sin^2 y}=\\sqrt{1-x^2}$ (positivo, pues $y\\in[-\\pi/2,\\pi/2]$):

$$\\frac{d}{dx}[\\arcsin x] = \\frac{1}{\\sqrt{1-x^2}}.$$

### De forma análoga

$$\\frac{d}{dx}[\\arccos x] = -\\frac{1}{\\sqrt{1-x^2}}, \\qquad \\frac{d}{dx}[\\arctan x] = \\frac{1}{1+x^2}$$

(esta última: con $x=\\tan y$, $1=\\sec^2y\\cdot y'$, y $\\sec^2y=1+\\tan^2y=1+x^2$).
`,
  [
    {
      prompt: "$f(x)=\\arcsin x$. Halla $f'(0)$.",
      answer: 1,
      solution: "$1/\\sqrt{1-0}=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\arctan x$. Halla $f'(0)$.",
      answer: 1,
      solution: "$1/(1+0)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\arcsin x$. Halla $f'(0.5)$.",
      answer: 1.15,
      solution: "$1/\\sqrt{1-0.25}=1/\\sqrt{0.75}\\approx1.15$. Respuesta: $1.15$.",
    },
    {
      prompt: "$f(x)=\\arctan x$. Halla $f'(1)$.",
      answer: 0.5,
      solution: "$1/(1+1)=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$f(x)=\\arccos x$. Halla $f'(0)$.",
      answer: -1,
      solution: "$-1/\\sqrt{1-0}=-1$. Respuesta: $-1.00$.",
    },
  ],
);

const lv28 = L(
  28,
  "Derivación implícita: introducción",
  "Cuando $y$ no está despejada",
  `
### El problema

Una curva como $x^2+y^2=25$ (una circunferencia) no expresa a $y$ como una función explícita de $x$ de forma sencilla. Sin embargo, podemos pensar que $y$ es *alguna* función de $x$ y derivar **ambos lados** de la ecuación respecto de $x$, usando la regla de la cadena en cada término con $y$ (porque $y=y(x)$):

$$\\frac{d}{dx}\\big[x^2+y^2\\big] = \\frac{d}{dx}[25]$$

$$2x + 2y\\cdot\\frac{dy}{dx} = 0 \\quad\\Rightarrow\\quad \\frac{dy}{dx} = -\\frac{x}{y}.$$

### Ejemplo numérico

En el punto $(3,4)$ (que sí está en la circunferencia, pues $9+16=25$): $\\dfrac{dy}{dx}=-\\dfrac34=-0.75$.
`,
  [
    {
      prompt: "$x^2+y^2=25$. Halla $\\dfrac{dy}{dx}$ en el punto $(3,4)$.",
      answer: -0.75,
      solution: "$dy/dx=-x/y=-3/4=-0.75$. Respuesta: $-0.75$.",
    },
    {
      prompt: "$x^2+y^2=25$. Halla $\\dfrac{dy}{dx}$ en el punto $(-3,4)$.",
      answer: 0.75,
      solution: "$dy/dx=-(-3)/4=0.75$. Respuesta: $0.75$.",
    },
    {
      prompt: "$x^2+y^2=25$. Halla $\\dfrac{dy}{dx}$ en el punto $(0,5)$.",
      answer: 0,
      solution: "$dy/dx=-0/5=0$: la tangente en la cima del círculo es horizontal. Respuesta: $0.00$.",
    },
    {
      prompt: "$x^2-y^2=9$. Halla $\\dfrac{dy}{dx}$ en el punto $(5,4)$.",
      hint: "Deriva ambos lados; ten cuidado con el signo de $y^2$.",
      answer: 1.25,
      solution: "$2x-2yy'=0\\Rightarrow y'=x/y=5/4=1.25$. Respuesta: $1.25$.",
    },
    {
      prompt: "$xy=6$. Halla $\\dfrac{dy}{dx}$ en el punto $(2,3)$.",
      hint: "El término $xy$ requiere la regla del producto al derivar.",
      answer: -1.5,
      solution: "$y+xy'=0\\Rightarrow y'=-y/x=-3/2=-1.5$. Respuesta: $-1.50$.",
    },
  ],
);

const lv29 = L(
  29,
  "Derivación implícita: más ejemplos",
  "Combinando producto y cadena dentro de una ecuación",
  `
### Un ejemplo más elaborado

$$x^2y + y^3 = 10$$

Derivamos término a término. En $x^2y$ hay un producto de dos expresiones que dependen de $x$ (usa la regla del producto); en $y^3$ hay una potencia de $y$ (usa la regla de la cadena):

$$\\underbrace{2xy+x^2y'}_{d(x^2y)/dx} + \\underbrace{3y^2y'}_{d(y^3)/dx} = 0$$

Agrupamos los términos con $y'$:

$$y'(x^2+3y^2) = -2xy \\quad\\Rightarrow\\quad y' = \\frac{-2xy}{x^2+3y^2}.$$
`,
  [
    {
      prompt: "$x^2y+y^3=10$. Halla $y'$ en el punto $(1,2)$.",
      answer: -0.31,
      solution: "$y'=\\dfrac{-2(1)(2)}{1+3(4)}=\\dfrac{-4}{13}\\approx-0.31$. Respuesta: $-0.31$.",
    },
    {
      prompt: "$x^3+y^3=9$. Halla $y'$ en el punto $(1,2)$.",
      answer: -0.25,
      solution: "$3x^2+3y^2y'=0\\Rightarrow y'=-x^2/y^2=-1/4=-0.25$. Respuesta: $-0.25$.",
    },
    {
      prompt: "$x^2+xy+y^2=7$. Halla $y'$ en el punto $(1,2)$.",
      hint: "El término $xy$ necesita la regla del producto.",
      answer: -0.8,
      solution: "$2x+(y+xy')+2yy'=0\\Rightarrow y'=-\\dfrac{2x+y}{x+2y}=-\\dfrac45=-0.8$. Respuesta: $-0.80$.",
    },
    {
      prompt: "$y^2=x^3$. Halla $y'$ en el punto $(4,8)$.",
      answer: 3,
      solution: "$2yy'=3x^2\\Rightarrow y'=\\dfrac{3(16)}{16}=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$x^2y^2=4$. Halla $y'$ en el punto $(1,2)$.",
      answer: -2,
      solution: "$2xy^2+2x^2yy'=0\\Rightarrow y'=-y/x=-2$. Respuesta: $-2.00$.",
    },
  ],
);

const lv30 = L(
  30,
  "Derivadas de orden superior",
  "Derivar la derivada (y seguir derivando)",
  `
### Segundas, terceras... derivadas

Nada impide derivar $f'(x)$ otra vez. Llamamos a ese resultado la **segunda derivada**, escrita $f''(x)$ o $\\dfrac{d^2y}{dx^2}$. Podemos seguir: tercera derivada $f'''(x)$, cuarta $f^{(4)}(x)$, etc.

### Ejemplo

$$f(x)=x^4 \\;\\Rightarrow\\; f'(x)=4x^3 \\;\\Rightarrow\\; f''(x)=12x^2 \\;\\Rightarrow\\; f'''(x)=24x \\;\\Rightarrow\\; f^{(4)}(x)=24 \\;\\Rightarrow\\; f^{(5)}(x)=0.$$

Cada vez que derivamos un polinomio, su grado baja en $1$; después de suficientes derivadas, siempre llegamos a $0$. Esto no ocurre, por ejemplo, con $e^x$ (nivel 22): su derivada de cualquier orden sigue siendo $e^x$.
`,
  [
    {
      prompt: "$f(x)=x^4$. Halla $f''(1)$.",
      answer: 12,
      solution: "$f'=4x^3$, $f''=12x^2$, $f''(1)=12$. Respuesta: $12.00$.",
    },
    {
      prompt: "$f(x)=x^3+2x^2$. Halla $f''(1)$.",
      answer: 10,
      solution: "$f'=3x^2+4x$, $f''=6x+4$, $f''(1)=10$. Respuesta: $10.00$.",
    },
    {
      prompt: "$f(x)=\\sin x$. Halla $f''(0)$.",
      answer: 0,
      solution: "$f'=\\cos x$, $f''=-\\sin x$, $f''(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=e^x$. Halla $f''(0)$.",
      answer: 1,
      solution: "$f'=e^x$, $f''=e^x$, $f''(0)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=x^5$. Halla $f'''(1)$.",
      answer: 60,
      solution: "$f'=5x^4$, $f''=20x^3$, $f'''=60x^2$, $f'''(1)=60$. Respuesta: $60.00$.",
    },
  ],
);

const lv31 = L(
  31,
  "La recta tangente",
  "Usando la derivada como pendiente",
  `
### La ecuación de la tangente

La recta tangente a $f$ en $x=a$ pasa por el punto $(a,f(a))$ y tiene pendiente $f'(a)$. Con la fórmula punto-pendiente:

$$y - f(a) = f'(a)(x-a) \\quad\\Rightarrow\\quad y = f(a) + f'(a)(x-a).$$

### Ejemplo

$f(x)=x^2$ en $a=2$: $f(2)=4$, $f'(2)=4$. Tangente: $y=4+4(x-2)=4x-4$.
`,
  [
    {
      prompt: "$f(x)=x^2$ en $a=2$. Halla el valor de la recta tangente en $x=0$.",
      answer: -4,
      solution: "Tangente: $y=4x-4$. En $x=0$: $y=-4$. Respuesta: $-4.00$.",
    },
    {
      prompt: "$f(x)=x^3$ en $a=1$. Halla el valor de la recta tangente en $x=2$.",
      answer: 4,
      solution: "$f(1)=1$, $f'(1)=3$: tangente $y=3x-2$. En $x=2$: $y=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$f(x)=\\sqrt{x}$ en $a=4$. Halla el valor de la recta tangente en $x=8$.",
      answer: 3,
      solution: "$f(4)=2$, $f'(4)=0.25$: tangente $y=2+0.25(x-4)$. En $x=8$: $y=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$f(x)=e^x$ en $a=0$. Halla el valor de la recta tangente en $x=1$.",
      answer: 2,
      solution: "$f(0)=1$, $f'(0)=1$: tangente $y=x+1$. En $x=1$: $y=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=\\ln x$ en $a=1$. Halla el valor de la recta tangente en $x=3$.",
      answer: 2,
      solution: "$f(1)=0$, $f'(1)=1$: tangente $y=x-1$. En $x=3$: $y=2$. Respuesta: $2.00$.",
    },
  ],
);

const lv32 = L(
  32,
  "Aproximación lineal (linealización)",
  "Usar la tangente para estimar valores cercanos",
  `
### La idea

Cerca de un punto $x=a$, la gráfica de $f$ se parece mucho a su recta tangente. Podemos usar esa recta para **estimar** $f(x)$ cuando $x$ está cerca de $a$, sin calcular la función exactamente:

$$f(x) \\approx L(x) = f(a) + f'(a)\\,(x-a).$$

$L(x)$ es la **linealización** de $f$ en $a$. El error de la aproximación es pequeño cuando $x$ está cerca de $a$ (y crece cuando nos alejamos).

### Ejemplo

Estimemos $\\sqrt{4.1}$ sin calculadora. Tomamos $f(x)=\\sqrt{x}$ y $a=4$ (porque $\\sqrt{4}=2$ es exacto y $4.1$ está cerca).

$f'(x)=\\dfrac{1}{2\\sqrt{x}}$, así que $f'(4)=\\dfrac{1}{4}=0.25$.

$$\\sqrt{4.1}\\approx f(4)+f'(4)(4.1-4)=2+0.25\\cdot 0.1=2.025.$$

El valor real es $2.02485\\ldots$: la aproximación es excelente porque $4.1$ está muy cerca de $4$.

### Notación con diferenciales

A veces se escribe $\\Delta y\\approx f'(a)\\,\\Delta x$, o incluso $dy=f'(x)\\,dx$. Es la misma idea: pequeños cambios en $x$ producen cambios (aproximadamente) proporcionales a la derivada.
`,
  [
    {
      prompt: "Con $f(x)=\\sqrt{x}$ y $a=4$, estima $\\sqrt{4.2}$ mediante linealización.",
      answer: 2.05,
      solution: "$L(x)=2+0.25(x-4)$. $L(4.2)=2+0.25\\cdot 0.2=2.05$. Respuesta: $2.05$.",
    },
    {
      prompt: "Con $f(x)=x^3$ y $a=2$, estima $2.1^3$.",
      answer: 9.2,
      solution: "$f'(2)=12$, $L(x)=8+12(x-2)$. $L(2.1)=8+1.2=9.2$. Respuesta: $9.20$.",
    },
    {
      prompt: "Con $f(x)=\\ln x$ y $a=1$, estima $\\ln(1.05)$.",
      answer: 0.05,
      solution: "$f'(1)=1$, $L(x)=0+1\\cdot(x-1)$. $L(1.05)=0.05$. Respuesta: $0.05$.",
    },
    {
      prompt: "Con $f(x)=e^x$ y $a=0$, estima $e^{0.1}$.",
      answer: 1.1,
      solution: "$f'(0)=1$, $L(x)=1+x$. $L(0.1)=1.1$. Respuesta: $1.10$.",
    },
    {
      prompt: "Con $f(x)=\\sin x$ y $a=0$, estima $\\sin(0.02)$.",
      answer: 0.02,
      solution: "$f'(0)=\\cos 0=1$, $L(x)=x$. $L(0.02)=0.02$. Respuesta: $0.02$.",
    },
  ],
);

const lv33 = L(
  33,
  "Diferenciabilidad y continuidad",
  "Toda función diferenciable es continua (¡pero no al revés!)",
  `
### Teorema

Si $f$ es diferenciable en $x=a$, entonces $f$ es continua en $x=a$.

### Demostración

Queremos probar que $\\displaystyle\\lim_{x\\to a} f(x) = f(a)$, es decir, que $\\displaystyle\\lim_{x\\to a}\\big[f(x)-f(a)\\big]=0$. Para $x\\neq a$, escribimos:

$$f(x)-f(a) = \\frac{f(x)-f(a)}{x-a}\\cdot(x-a)$$

Cuando $x\\to a$: el primer factor tiende a $f'(a)$ (un número finito, porque $f$ es diferenciable en $a$), y el segundo factor tiende a $0$. Por la regla del producto de límites, el producto tiende a $f'(a)\\cdot0=0$. Así, $\\displaystyle\\lim_{x\\to a}f(x)=f(a)$: $f$ es continua en $a$.

### ¡Cuidado! El recíproco es falso

Ser continua **no garantiza** ser diferenciable. En el próximo nivel verás un ejemplo clásico ($f(x)=|x|$) que es continua en $x=0$ pero no diferenciable ahí.
`,
  [
    {
      prompt: "Si $f$ es diferenciable en $x=3$, ¿es continua en $x=3$? (Si/No)",
      answer: "Si",
      solution: "La diferenciabilidad implica continuidad. Respuesta: `Sí`.",
    },
    {
      prompt: "Si $f$ es continua en $x=5$, ¿es automáticamente diferenciable en $x=5$? (Si/No)",
      answer: "No",
      solution: "La continuidad NO implica diferenciabilidad. Respuesta: `No`.",
    },
    {
      prompt: "$f(x)=|x|$ es continua en $x=0$. ¿Podemos concluir que es diferenciable ahí solo por ser continua? (Si/No)",
      answer: "No",
      solution: "La continuidad es necesaria pero no suficiente para la diferenciabilidad. Respuesta: `No`.",
    },
    {
      prompt: "Si $f$ NO es continua en $x=2$, ¿puede ser diferenciable en $x=2$? (Si/No)",
      answer: "No",
      solution: "Por el teorema (contrapositivo): sin continuidad no puede haber diferenciabilidad. Respuesta: `No`.",
    },
    {
      prompt: "Si $f$ es diferenciable en todo punto de un intervalo, ¿es continua en todo ese intervalo? (Si/No)",
      answer: "Si",
      solution: "Aplicando el teorema en cada punto del intervalo. Respuesta: `Sí`.",
    },
  ],
);

const lv34 = L(
  34,
  "Puntos donde la derivada no existe",
  "Picos, tangentes verticales y discontinuidades",
  `
### Tres formas típicas de fallar la diferenciabilidad

**1. Un \"pico\" (esquina).** Ejemplo clásico: $f(x)=|x|$ en $x=0$. Calculemos los límites laterales del cociente incremental:

$$\\lim_{h\\to0^+}\\frac{|0+h|-0}{h} = \\lim_{h\\to0^+}\\frac{h}{h} = 1, \\qquad \\lim_{h\\to0^-}\\frac{|h|}{h} = \\lim_{h\\to0^-}\\frac{-h}{h} = -1.$$

Como los límites laterales son distintos ($1\\neq-1$), el límite completo no existe: $f'(0)$ no existe, aunque $f$ sea continua ahí.

**2. Una tangente vertical.** Ejemplo: $f(x)=x^{1/3}$ en $x=0$. La fórmula $f'(x)=\\tfrac13x^{-2/3}$ se dispara a $+\\infty$ cuando $x\\to0$: no hay una pendiente finita.

**3. Una discontinuidad.** Por el nivel 33, si $f$ no es continua en $a$, tampoco puede ser diferenciable ahí.
`,
  [
    {
      prompt: "$f(x)=|x|$. Halla el límite lateral derecho de la derivada en $x=0$ (es decir, $f'(0^+)$).",
      answer: 1,
      solution: "$\\lim_{h\\to0^+}h/h=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=|x|$. Halla $f'(0^-)$.",
      answer: -1,
      solution: "$\\lim_{h\\to0^-}(-h)/h=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "¿Existe $f'(0)$ para $f(x)=|x|$? (Si/No)",
      answer: "No",
      solution: "Los laterales ($1$ y $-1$) no coinciden. Respuesta: `No`.",
    },
    {
      prompt: "$f(x)=|x-3|$. Halla $f'(3^+)$.",
      answer: 1,
      solution: "Igual que con $|x|$ pero trasladado: el lateral derecho es $1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=x^{1/3}$. ¿Es $f'(0)$ un número finito? (Si/No)",
      answer: "No",
      solution: "La derivada se dispara a infinito: no es un número finito (tangente vertical). Respuesta: `No`.",
    },
  ],
);

const lv35 = L(
  35,
  "Crecimiento y decrecimiento",
  "El signo de la derivada delata el comportamiento de $f$",
  `
### La idea

Si $f'(x_0)>0$, el cociente incremental $\\frac{f(x_0+h)-f(x_0)}{h}$ se acerca a un número positivo, así que para $h$ pequeño ese cociente también es positivo. Eso significa que $f(x_0+h)>f(x_0)$ cuando $h>0$ es pequeño, y $f(x_0+h)<f(x_0)$ cuando $h<0$ es pequeño: **la función crece** alrededor de $x_0$. De forma análoga, $f'(x_0)<0$ implica que $f$ decrece ahí. (La versión rigurosa y completa de esta idea usa el Teorema del Valor Medio, que veremos en el nivel 41.)

### Ejemplo

$f(x)=x^2-4x+3$, $f'(x)=2x-4$. Como $f'(x)>0 \\Leftrightarrow x>2$, $f$ es creciente para $x>2$ y decreciente para $x<2$.
`,
  [
    {
      prompt: "$f(x)=x^2-6x+5$. Halla $f'(4)$.",
      answer: 2,
      solution: "$f'(x)=2x-6$, $f'(4)=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "Con la función anterior, ¿es $f$ creciente en $x=4$? (Si/No)",
      answer: "Si",
      solution: "$f'(4)=2>0$, así que sí es creciente ahí. Respuesta: `Sí`.",
    },
    {
      prompt: "$f(x)=x^2-6x+5$. ¿Es $f$ creciente en $x=1$? (Si/No)",
      answer: "No",
      solution: "$f'(1)=2-6=-4<0$: es decreciente en $x=1$. Respuesta: `No`.",
    },
    {
      prompt: "$f(x)=-x^2+4x$. ¿En qué valor de $x$ cambia $f$ de creciente a decreciente?",
      hint: "Resuelve $f'(x)=0$.",
      answer: 2,
      solution: "$f'(x)=-2x+4=0\\Rightarrow x=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=x^3-3x$. Halla $f'(0)$.",
      answer: -3,
      solution: "$f'(x)=3x^2-3$, $f'(0)=-3$: $f$ es decreciente en $x=0$. Respuesta: $-3.00$.",
    },
  ],
);

const lv36 = L(
  36,
  "Puntos críticos y el teorema de Fermat",
  "Dónde pueden vivir los máximos y mínimos",
  `
### Definición

Un **punto crítico** de $f$ es un valor $c$ donde $f'(c)=0$ o donde $f'(c)$ no existe.

### Teorema de Fermat

Si $f$ tiene un máximo o mínimo local en un punto interior $c$ y $f$ es diferenciable ahí, entonces $f'(c)=0$.

### Demostración (caso máximo local)

Si $c$ es un máximo local, $f(c+h)\\leq f(c)$ para $h$ pequeño (de cualquier signo). Para $h>0$ pequeño:

$$\\frac{f(c+h)-f(c)}{h} \\leq 0 \\quad\\Rightarrow\\quad \\lim_{h\\to0^+}\\frac{f(c+h)-f(c)}{h} \\leq 0 \\quad\\Rightarrow\\quad f'(c)\\leq0.$$

Para $h<0$ pequeño, dividir por un número negativo **invierte** la desigualdad:

$$\\frac{f(c+h)-f(c)}{h} \\geq 0 \\quad\\Rightarrow\\quad f'(c)\\geq0.$$

Como $f'(c)\\leq0$ y $f'(c)\\geq0$ a la vez, necesariamente $f'(c)=0$. (El caso de mínimo local es análogo.)
`,
  [
    {
      prompt: "$f(x)=x^2-4x+1$. Halla el punto crítico.",
      answer: 2,
      solution: "$f'(x)=2x-4=0\\Rightarrow x=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=x^3-3x$. Halla el punto crítico positivo.",
      answer: 1,
      solution: "$f'(x)=3x^2-3=0\\Rightarrow x=\\pm1$; el positivo es $1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=x^3-3x$. Halla el punto crítico negativo.",
      answer: -1,
      solution: "El otro punto crítico es $x=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$f(x)=x^2-2x-3$. Halla el punto crítico.",
      answer: 1,
      solution: "$f'(x)=2x-2=0\\Rightarrow x=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=2x^3-6x$. Halla la suma de todos los puntos críticos.",
      hint: "Resuelve $f'(x)=0$ y suma las soluciones.",
      answer: 0,
      solution: "$f'(x)=6x^2-6=0\\Rightarrow x=\\pm1$; la suma es $0$. Respuesta: $0.00$.",
    },
  ],
);

const lv37 = L(
  37,
  "Máximos y mínimos locales: criterio de la primera derivada",
  "El signo de $f'$ antes y después del punto crítico",
  `
### El criterio

En un punto crítico $c$: si $f'$ cambia de $+$ a $-$ al pasar por $c$, hay un **máximo local**; si cambia de $-$ a $+$, hay un **mínimo local**; si no cambia de signo, no hay extremo ahí.

### Ejemplo

$f(x)=x^2-4x+1$, $f'(x)=2x-4$, crítico en $x=2$. Para $x<2$: $f'<0$ (decreciente). Para $x>2$: $f'>0$ (creciente). El signo pasa de $-$ a $+$: hay un **mínimo local** en $x=2$.
`,
  [
    {
      prompt: "$f(x)=x^2-4x+1$. Halla $f(2)$ (el valor mínimo local).",
      answer: -3,
      solution: "$f(2)=4-8+1=-3$. Respuesta: $-3.00$.",
    },
    {
      prompt: "$f(x)=x^3-3x$, con punto crítico en $x=1$. Evalúa $f'(0.5)$ para estudiar el signo antes de $x=1$.",
      answer: -2.25,
      solution: "$f'(x)=3x^2-3$, $f'(0.5)=0.75-3=-2.25$. Respuesta: $-2.25$.",
    },
    {
      prompt: "Con la misma función, evalúa $f'(1.5)$ para estudiar el signo después de $x=1$.",
      answer: 3.75,
      solution: "$f'(1.5)=6.75-3=3.75$: el signo pasa de $-$ a $+$, confirmando un mínimo local en $x=1$. Respuesta: $3.75$.",
    },
    {
      prompt: "$f(x)=x^3-3x$. Halla $f(1)$ (el valor mínimo local).",
      answer: -2,
      solution: "$f(1)=1-3=-2$. Respuesta: $-2.00$.",
    },
    {
      prompt: "$f(x)=x^3-3x$. Halla $f(-1)$ (el valor máximo local).",
      answer: 2,
      solution: "$f(-1)=-1+3=2$. Respuesta: $2.00$.",
    },
  ],
);

const lv38 = L(
  38,
  "Concavidad y puntos de inflexión",
  "Lo que revela la segunda derivada",
  `
### Concavidad

Si $f''(x)>0$ en un intervalo, la gráfica es **cóncava hacia arriba** ahí (como una taza); si $f''(x)<0$, es **cóncava hacia abajo** (como una sombrilla). Un **punto de inflexión** es donde la concavidad cambia (típicamente donde $f''=0$ y cambia de signo).

### Ejemplo

$f(x)=x^3-3x^2$. $f''(x)=6x-6$. Para $x<1$: $f''<0$ (cóncava abajo); para $x>1$: $f''>0$ (cóncava arriba). Hay un punto de inflexión en $x=1$.
`,
  [
    {
      prompt: "$f(x)=x^3-3x^2$. Halla $f''(1)$.",
      answer: 0,
      solution: "$f''(x)=6x-6$, $f''(1)=0$: candidato a inflexión. Respuesta: $0.00$.",
    },
    {
      prompt: "Con la misma función, evalúa $f''(0)$ para estudiar la concavidad antes de $x=1$.",
      answer: -6,
      solution: "$f''(0)=-6$: cóncava hacia abajo. Respuesta: $-6.00$.",
    },
    {
      prompt: "Con la misma función, evalúa $f''(2)$ para estudiar la concavidad después de $x=1$.",
      answer: 6,
      solution: "$f''(2)=6$: cóncava hacia arriba, confirmando el punto de inflexión en $x=1$. Respuesta: $6.00$.",
    },
    {
      prompt: "$f(x)=x^4$. Halla $f''(0)$.",
      hint: "Aunque $f''(0)=0$, verifica si realmente cambia de signo alrededor de $0$.",
      answer: 0,
      solution: "$f''(x)=12x^2$, $f''(0)=0$, pero $12x^2\\geq0$ siempre (no cambia de signo): no es inflexión, a pesar de anularse. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=x^4-6x^2$. Halla $f''(1)$.",
      answer: 0,
      solution: "$f'(x)=4x^3-12x$, $f''(x)=12x^2-12$, $f''(1)=0$. Respuesta: $0.00$.",
    },
  ],
);

const lv39 = L(
  39,
  "Criterio de la segunda derivada",
  "Otra forma de clasificar extremos",
  `
### El criterio

En un punto crítico $c$ (donde $f'(c)=0$):

- Si $f''(c)>0$: **mínimo local** (la gráfica es cóncava hacia arriba, como el fondo de una taza que atrapa al punto).
- Si $f''(c)<0$: **máximo local** (cóncava hacia abajo).
- Si $f''(c)=0$: el criterio no decide; hay que recurrir al criterio de la primera derivada (nivel 37).

Este criterio suele ser más rápido que estudiar signos a ambos lados, cuando calcular $f''$ es sencillo.
`,
  [
    {
      prompt: "$f(x)=x^2-4x+1$, con punto crítico en $x=2$. Halla $f''(2)$.",
      answer: 2,
      solution: "$f''(x)=2$ (constante, positiva): mínimo. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=-x^2+6x$, con punto crítico en $x=3$. Halla $f''(3)$.",
      answer: -2,
      solution: "$f''(x)=-2$ (constante, negativa): máximo. Respuesta: $-2.00$.",
    },
    {
      prompt: "$f(x)=x^3-3x$, en el punto crítico $x=1$, halla $f''(1)$.",
      answer: 6,
      solution: "$f''(x)=6x$, $f''(1)=6>0$: mínimo local (coincide con el nivel 37). Respuesta: $6.00$.",
    },
    {
      prompt: "$f(x)=x^3-3x$, en el punto crítico $x=-1$, halla $f''(-1)$.",
      answer: -6,
      solution: "$f''(-1)=-6<0$: máximo local. Respuesta: $-6.00$.",
    },
    {
      prompt: "$f(x)=x^4$, en el punto crítico $x=0$, halla $f''(0)$.",
      answer: 0,
      solution: "$f''(x)=12x^2$, $f''(0)=0$: el criterio es inconcluso aquí (hace falta la primera derivada). Respuesta: $0.00$.",
    },
  ],
);

const lv40 = L(
  40,
  "Teorema de Rolle",
  "Si la función empieza y termina igual, en algún punto se \"detiene\"",
  `
### Enunciado

Si $f$ es continua en $[a,b]$, diferenciable en $(a,b)$, y $f(a)=f(b)$, entonces existe al menos un $c\\in(a,b)$ con $f'(c)=0$.

### Idea de la demostración

Si $f$ es constante, cualquier $c$ funciona (trivial). Si no es constante, $f$ alcanza un máximo o un mínimo en algún punto interior del intervalo (aceptamos esto de la continuidad en un intervalo cerrado). En ese punto interior, por el Teorema de Fermat (nivel 36), la derivada debe ser $0$.

### Ejemplo

$f(x)=x^2-4x+3$ en $[1,3]$: $f(1)=0=f(3)$. $f'(x)=2x-4=0 \\Rightarrow c=2 \\in (1,3)$. ✓
`,
  [
    {
      prompt: "$f(x)=x^2-4x+3$ en $[1,3]$. Halla $c$ tal que $f'(c)=0$.",
      answer: 2,
      solution: "$f'(x)=2x-4=0\\Rightarrow c=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=x^2-2x$ en $[0,2]$. Halla $c$ tal que $f'(c)=0$.",
      answer: 1,
      solution: "$f'(x)=2x-2=0\\Rightarrow c=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=x^2-1$ en $[-1,1]$. Halla $c$ tal que $f'(c)=0$.",
      answer: 0,
      solution: "$f'(x)=2x=0\\Rightarrow c=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=x^3-x$ en $[-1,0]$. Halla $c$ tal que $f'(c)=0$.",
      hint: "Resuelve $3x^2-1=0$ y elige la raíz dentro del intervalo $(-1,0)$.",
      answer: -0.58,
      solution: "$f'(x)=3x^2-1=0\\Rightarrow x=\\pm1/\\sqrt3$; la que está en $(-1,0)$ es $\\approx-0.58$. Respuesta: $-0.58$.",
    },
    {
      prompt: "$f(x)=\\sin x$ en $[0,\\pi]$. Halla $c$ tal que $f'(c)=0$.",
      answer: 1.57,
      solution: "$f'(x)=\\cos x=0\\Rightarrow c=\\pi/2\\approx1.57$. Respuesta: $1.57$.",
    },
  ],
);

const lv41 = L(
  41,
  "Teorema del valor medio (TVM)",
  "Generalizando el teorema de Rolle",
  `
### Enunciado

Si $f$ es continua en $[a,b]$ y diferenciable en $(a,b)$, entonces existe $c\\in(a,b)$ tal que:

$$f'(c) = \\frac{f(b)-f(a)}{b-a}$$

(la pendiente instantánea en $c$ coincide con la pendiente promedio de todo el intervalo).

### Demostración

Define $g(x) = f(x) - \\dfrac{f(b)-f(a)}{b-a}(x-a)$. Es fácil comprobar que $g(a)=f(a)$ y $g(b)=f(a)$ también (verifícalo sustituyendo), así que $g(a)=g(b)$. Aplicando el Teorema de Rolle (nivel 40) a $g$, existe $c$ con $g'(c)=0$. Pero $g'(x)=f'(x)-\\dfrac{f(b)-f(a)}{b-a}$, así que $g'(c)=0$ da exactamente $f'(c)=\\dfrac{f(b)-f(a)}{b-a}$.
`,
  [
    {
      prompt: "$f(x)=x^2$ en $[0,2]$. Halla $c$ tal que $f'(c)$ sea igual a la tasa de cambio promedio.",
      answer: 1,
      solution: "Promedio $=(4-0)/2=2$. $f'(c)=2c=2\\Rightarrow c=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=x^3$ en $[0,2]$. Halla $c$ (positivo) tal que $f'(c)$ sea igual a la tasa de cambio promedio.",
      hint: "Promedio $=(8-0)/2=4$; resuelve $3c^2=4$.",
      answer: 1.15,
      solution: "Promedio $=4$. $3c^2=4\\Rightarrow c=\\sqrt{4/3}\\approx1.15$. Respuesta: $1.15$.",
    },
    {
      prompt: "$f(x)=x^2$ en $[1,3]$. Halla $c$.",
      answer: 2,
      solution: "Promedio $=(9-1)/2=4$. $2c=4\\Rightarrow c=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=\\sqrt{x}$ en $[0,4]$. Halla $c$.",
      answer: 1,
      solution: "Promedio $=(2-0)/4=0.5$. $\\dfrac{1}{2\\sqrt c}=0.5\\Rightarrow c=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\ln x$ en $[1,e]$. Halla $c$.",
      hint: "Promedio $=\\dfrac{1-0}{e-1}$; resuelve $1/c$ igual a ese valor.",
      answer: 1.72,
      solution: "Promedio $=\\dfrac1{e-1}\\approx0.582$. $1/c=0.582\\Rightarrow c=e-1\\approx1.72$. Respuesta: $1.72$.",
    },
  ],
);

const lv42 = L(
  42,
  "La regla de L'Hôpital: caso $0/0$",
  "Las derivadas al rescate de las indeterminaciones",
  `
### Una nueva herramienta para límites $0/0$

Si $\\displaystyle\\lim_{x\\to a}\\frac{f(x)}{g(x)}$ da la forma $\\tfrac00$, y $f,g$ son diferenciables cerca de $a$ con $g'(x)\\neq0$, entonces:

$$\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}$$

(siempre que este último límite exista). Intuitivamente: cerca de $a$, tanto $f$ como $g$ se comportan casi como sus rectas tangentes, $f(x)\\approx f'(a)(x-a)$ y $g(x)\\approx g'(a)(x-a)$, así que su cociente se aproxima a $f'(a)/g'(a)$.

### Verificación con límites que ya conocías

$$\\lim_{x\\to0}\\frac{\\sin x}{x} \\overset{\\text{L'Hôpital}}{=} \\lim_{x\\to0}\\frac{\\cos x}{1} = \\cos0 = 1$$

$$\\lim_{x\\to2}\\frac{x^2-4}{x-2} \\overset{\\text{L'Hôpital}}{=} \\lim_{x\\to2}\\frac{2x}{1} = 4$$

¡Los mismos resultados que obtuviste con límites notables y factorización, pero con un método totalmente nuevo!
`,
  [
    {
      prompt: "Usa L'Hôpital: $\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin x}{x}$.",
      answer: 1,
      solution: "$\\cos(0)/1=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "Usa L'Hôpital: $\\displaystyle\\lim_{x\\to 2}\\dfrac{x^2-4}{x-2}$.",
      answer: 4,
      solution: "$2x/1$ en $x=2$: $4$. Respuesta: $4.00$.",
    },
    {
      prompt: "Usa L'Hôpital: $\\displaystyle\\lim_{x\\to 0}\\dfrac{e^x-1}{x}$.",
      answer: 1,
      solution: "$e^x/1$ en $x=0$: $1$. Respuesta: $1.00$.",
    },
    {
      prompt: "Usa L'Hôpital (dos veces): $\\displaystyle\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^2}$.",
      hint: "Después de derivar una vez seguirás en $0/0$; deriva otra vez.",
      answer: 0.5,
      solution: "Primera vez: $\\sin x/(2x)$ (sigue $0/0$). Segunda vez: $\\cos x/2$ en $0$: $0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "Usa L'Hôpital: $\\displaystyle\\lim_{x\\to 1}\\dfrac{x^3-1}{x-1}$.",
      answer: 3,
      solution: "$3x^2/1$ en $x=1$: $3$. Respuesta: $3.00$.",
    },
  ],
);

const lv43 = L(
  43,
  "L'Hôpital: caso $\\infty/\\infty$ y aplicación repetida",
  "Ahora sí podemos demostrar la jerarquía de infinitos",
  `
### La misma regla, forma $\\infty/\\infty$

L'Hôpital también aplica cuando el límite da $\\tfrac{\\infty}{\\infty}$. Y si tras derivar sigues en una forma indeterminada, puedes **aplicarla de nuevo**.

### Por fin, una demostración de la jerarquía de infinitos

En el mundo de los límites aceptaste que $e^x$ crece más rápido que cualquier potencia de $x$. Ahora podemos probarlo:

$$\\lim_{x\\to\\infty}\\frac{x^2}{e^x} \\overset{\\infty/\\infty}{=} \\lim_{x\\to\\infty}\\frac{2x}{e^x} \\overset{\\infty/\\infty}{=} \\lim_{x\\to\\infty}\\frac{2}{e^x} = 0.$$

Cada vez que derivamos, la potencia de $x$ baja de grado, pero $e^x$ se deriva a sí misma: por eso, tras suficientes aplicaciones, el numerador se vuelve constante mientras el denominador sigue creciendo sin freno.
`,
  [
    {
      prompt: "Usa L'Hôpital: $\\displaystyle\\lim_{x\\to \\infty}\\dfrac{x}{e^x}$.",
      answer: 0,
      solution: "$1/e^x\\to0$. Respuesta: $0.00$.",
    },
    {
      prompt: "Usa L'Hôpital (dos veces): $\\displaystyle\\lim_{x\\to \\infty}\\dfrac{x^2}{e^x}$.",
      answer: 0,
      solution: "$2x/e^x\\to$ sigue $\\infty/\\infty$; otra vez: $2/e^x\\to0$. Respuesta: $0.00$.",
    },
    {
      prompt: "Usa L'Hôpital: $\\displaystyle\\lim_{x\\to \\infty}\\dfrac{\\ln x}{x}$.",
      answer: 0,
      solution: "$(1/x)/1=1/x\\to0$. Respuesta: $0.00$.",
    },
    {
      prompt: "Usa L'Hôpital: $\\displaystyle\\lim_{x\\to \\infty}\\dfrac{3x^2+1}{x^2+5}$.",
      answer: 3,
      solution: "Derivando: $6x/2x=3$, constante. Respuesta: $3.00$.",
    },
    {
      prompt: "Usa L'Hôpital (reescribiendo primero como cociente): $\\displaystyle\\lim_{x\\to 0^+} x\\ln x$.",
      hint: "Escribe $x\\ln x = \\dfrac{\\ln x}{1/x}$, que es forma $\\infty/\\infty$.",
      answer: 0,
      solution: "$\\dfrac{\\ln x}{1/x}$: derivando, $\\dfrac{1/x}{-1/x^2}=-x\\to0$. Respuesta: $0.00$.",
    },
  ],
);

const lv44 = L(
  44,
  "Razones de cambio relacionadas",
  "Cuando dos cantidades cambian juntas en el tiempo",
  `
### La idea

Si dos cantidades están relacionadas por una ecuación, y ambas cambian con el tiempo $t$, podemos derivar ambos lados de la ecuación **respecto de $t$** (usando la regla de la cadena, tratando cada variable como función de $t$) para relacionar sus razones de cambio.

### Ejemplo

El área de un círculo: $A=\\pi r^2$. Si el radio crece con el tiempo, derivamos respecto de $t$:

$$\\frac{dA}{dt} = 2\\pi r\\cdot\\frac{dr}{dt}$$

Si $\\dfrac{dr}{dt}=3\\,\\text{cm/s}$ y $r=5\\,\\text{cm}$ (usando $\\pi\\approx3.14$): $\\dfrac{dA}{dt}=2(3.14)(5)(3)=94.2\\,\\text{cm}^2/\\text{s}$.
`,
  [
    {
      prompt: "$A=\\pi r^2$. Si $\\dfrac{dr}{dt}=2$ y $r=3$, halla $\\dfrac{dA}{dt}$ (usa $\\pi\\approx3.14$).",
      answer: 37.68,
      solution: "$dA/dt=2\\pi r(dr/dt)=2(3.14)(3)(2)=37.68$. Respuesta: $37.68$.",
    },
    {
      prompt: "$V=x^3$ (volumen de un cubo). Si $\\dfrac{dx}{dt}=0.5$ y $x=4$, halla $\\dfrac{dV}{dt}$.",
      answer: 24,
      solution: "$dV/dt=3x^2(dx/dt)=3(16)(0.5)=24$. Respuesta: $24.00$.",
    },
    {
      prompt: "Un cuadrado de lado $x$ crece a razón de $4\\,\\text{cm/s}$. ¿A qué razón crece el área cuando $x=10$?",
      hint: "$A=x^2$, deriva respecto de $t$.",
      answer: 80,
      solution: "$dA/dt=2x(dx/dt)=2(10)(4)=80$. Respuesta: $80.00$.",
    },
    {
      prompt: "$V=\\dfrac43\\pi r^3$ (esfera). Si $\\dfrac{dr}{dt}=2$ y $r=3$, halla $\\dfrac{dV}{dt}$ (usa $\\pi\\approx3.14$).",
      answer: 226.08,
      solution: "$dV/dt=4\\pi r^2(dr/dt)=4(3.14)(9)(2)=226.08$. Respuesta: $226.08$.",
    },
    {
      prompt: "$x^2+y^2=25$, con $\\dfrac{dx}{dt}=3$. En el punto $(3,4)$, halla $\\dfrac{dy}{dt}$.",
      hint: "Deriva la ecuación respecto de $t$ (usa derivación implícita en $t$).",
      answer: -2.25,
      solution: "$2x(dx/dt)+2y(dy/dt)=0\\Rightarrow dy/dt=-\\dfrac{x\\,dx/dt}{y}=-\\dfrac{9}{4}=-2.25$. Respuesta: $-2.25$.",
    },
  ],
);

const lv45 = L(
  45,
  "Repaso: producto, cociente y cadena combinadas",
  "Reconocer qué regla aplicar y en qué orden",
  `
### Un solo problema, varias reglas

Muchas derivadas del mundo real combinan **producto**, **cociente** y **cadena** en la misma expresión. La clave no es memorizar más fórmulas, sino identificar la estructura:

1. Mira la operación **más externa** (¿es un producto?, ¿un cociente?, ¿una potencia?, ¿una composición?).
2. Aplica esa regla, tratando los "trozos" como bloques que luego derivarás con la regla que les toque.
3. Repite hasta llegar a derivadas elementales.

### Ejemplo guiado

Deriva $g(x)=x^2\\sqrt{x^2+1}$.

**Paso 1 — Estructura externa:** es un producto $u\\cdot v$ con $u=x^2$ y $v=\\sqrt{x^2+1}$.

**Paso 2 — Regla del producto:** $g'=u'v+uv'$.

- $u'=2x$.
- $v=(x^2+1)^{1/2}$: aplicamos la **cadena** con exterior $t^{1/2}$ e interior $x^2+1$. $v'=\\tfrac12(x^2+1)^{-1/2}\\cdot 2x=\\dfrac{x}{\\sqrt{x^2+1}}$.

**Paso 3 — Junta todo:**
$$g'(x)=2x\\sqrt{x^2+1}+x^2\\cdot\\dfrac{x}{\\sqrt{x^2+1}}=\\dfrac{2x(x^2+1)+x^3}{\\sqrt{x^2+1}}=\\dfrac{3x^3+2x}{\\sqrt{x^2+1}}.$$

### Consejo

Cuando una expresión es un cociente cuya base o cuyo denominador es una composición, casi siempre es más rápido reescribirla como producto de potencias antes de derivar — o usar **derivación logarítmica** (nivel 46) si el exponente es variable.
`,
  [
    {
      prompt: "$g(x)=x^2\\sqrt{x^2+1}$. Halla $g'(1)$.",
      answer: 3.54,
      solution: "$g'(x)=\\dfrac{3x^3+2x}{\\sqrt{x^2+1}}$. En $x=1$: $\\dfrac{5}{\\sqrt 2}\\approx 3.54$. Respuesta: $3.54$.",
    },
    {
      prompt: "$h(x)=\\dfrac{\\sin(2x)}{x^2+1}$. Halla $h'(0)$.",
      answer: 2,
      solution: "Cociente + cadena. $h'(x)=\\dfrac{2\\cos(2x)(x^2+1)-\\sin(2x)\\cdot 2x}{(x^2+1)^2}$. En $x=0$: $\\dfrac{2\\cdot 1\\cdot 1-0}{1}=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=e^{x}\\cdot\\ln(1+x^2)$. Halla $f'(0)$.",
      answer: 0,
      solution: "$f'=e^x\\ln(1+x^2)+e^x\\cdot\\dfrac{2x}{1+x^2}$. En $x=0$: $1\\cdot 0+1\\cdot 0=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$p(x)=\\big(x+\\sqrt{x^2+1}\\big)^3$. Halla $p'(0)$.",
      answer: 3,
      solution: "Cadena: $p'=3(x+\\sqrt{x^2+1})^2\\cdot\\big(1+\\dfrac{x}{\\sqrt{x^2+1}}\\big)$. En $x=0$: $3\\cdot 1^2\\cdot 1=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$q(x)=\\dfrac{\\cos x}{1+\\sin x}$. Halla $q'(0)$.",
      answer: -1,
      solution: "$q'=\\dfrac{-\\sin x(1+\\sin x)-\\cos x\\cdot\\cos x}{(1+\\sin x)^2}$. En $x=0$: $\\dfrac{0-1}{1}=-1$. Respuesta: $-1.00$.",
    },
  ],
);

const lv46 = L(
  46,
  "Derivación logarítmica",
  "Tomar $\\ln$ de ambos lados antes de derivar",
  `
### Cuándo usarla

Es especialmente útil para funciones con **exponente variable**, como $y=x^x$, donde ninguna regla vista hasta ahora aplica directamente (no es ni potencia con exponente constante, ni exponencial con base constante).

### Demostración con $y=x^x$

Tomamos $\\ln$ en ambos lados:

$$\\ln y = x\\ln x$$

Derivamos ambos lados respecto de $x$. A la izquierda usamos la regla de la cadena (ya que $y=y(x)$); a la derecha, la regla del producto:

$$\\frac{1}{y}\\cdot y' = \\ln x + x\\cdot\\frac1x = \\ln x + 1$$

Despejando $y'$ (y sustituyendo $y=x^x$ de vuelta):

$$y' = x^x(\\ln x+1).$$

Esta técnica también simplifica mucho derivar productos largos: convierte productos en sumas (vía $\\ln$), evitando aplicar la regla del producto varias veces.
`,
  [
    {
      prompt: "$y=x^x$. Halla $y'(1)$.",
      answer: 1,
      solution: "$y'=x^x(\\ln x+1)$, en $x=1$: $1(0+1)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$y=(x^2+1)^x$. Halla $y'(0)$.",
      hint: "Toma $\\ln y = x\\ln(x^2+1)$ y deriva ambos lados.",
      answer: 0,
      solution: "$\\dfrac{y'}{y}=\\ln(x^2+1)+\\dfrac{2x^2}{x^2+1}$, en $x=0$ da $0$; como $y(0)=1$, $y'(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$y=(2x)^x$. Halla $y'(1)$.",
      answer: 3.39,
      solution: "$\\dfrac{y'}{y}=\\ln(2x)+1$, en $x=1$: $\\ln2+1\\approx1.69$; con $y(1)=2$: $y'(1)=2(1.69)\\approx3.39$. Respuesta: $3.39$.",
    },
    {
      prompt: "$y=x^2(x+1)^3$. Usa derivación logarítmica para hallar $y'(1)$.",
      hint: "$\\ln y = 2\\ln x+3\\ln(x+1)$.",
      answer: 28,
      solution: "$\\dfrac{y'}{y}=\\dfrac2x+\\dfrac3{x+1}$, en $x=1$: $2+1.5=3.5$; con $y(1)=8$: $y'(1)=28$. Respuesta: $28.00$.",
    },
    {
      prompt: "$y=\\sqrt{x}(x+2)^4$. Usa derivación logarítmica para hallar $y'(1)$.",
      hint: "$\\ln y = 0.5\\ln x + 4\\ln(x+2)$.",
      answer: 148.5,
      solution: "$\\dfrac{y'}{y}=\\dfrac{0.5}{x}+\\dfrac4{x+2}$, en $x=1$: $0.5+1.333=1.833$; con $y(1)=81$: $y'(1)=148.5$. Respuesta: $148.50$.",
    },
  ],
);

const lv47 = L(
  47,
  "Derivadas de funciones dadas parametricamente",
  "Cuando $x$ e $y$ dependen de un parámetro $t$",
  `
### La fórmula

Si $x=x(t)$ y $y=y(t)$, la regla de la cadena nos dice que $\\dfrac{dy}{dt} = \\dfrac{dy}{dx}\\cdot\\dfrac{dx}{dt}$. Despejando (cuando $\\dfrac{dx}{dt}\\neq0$):

$$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$$

### Ejemplo

$x=t^2$, $y=t^3$. $\\dfrac{dx}{dt}=2t$, $\\dfrac{dy}{dt}=3t^2$. Entonces $\\dfrac{dy}{dx}=\\dfrac{3t^2}{2t}=\\dfrac{3t}{2}$. En $t=2$: $\\dfrac{dy}{dx}=3$.
`,
  [
    {
      prompt: "$x=t^2$, $y=t^3$. Halla $\\dfrac{dy}{dx}$ en $t=2$.",
      answer: 3,
      solution: "$\\dfrac{dy}{dx}=\\dfrac{3t}{2}$, en $t=2$: $3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$x=t^2$, $y=t^3$. Halla $\\dfrac{dy}{dx}$ en $t=4$.",
      answer: 6,
      solution: "$\\dfrac{3t}{2}$ en $t=4$: $6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$x=\\cos t$, $y=\\sin t$. Halla $\\dfrac{dy}{dx}$ en $t=\\pi/4$.",
      hint: "$\\dfrac{dy}{dx}=\\dfrac{\\cos t}{-\\sin t}=-\\cot t$.",
      answer: -1,
      solution: "$-\\cot(\\pi/4)=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "$x=t+1$, $y=t^2$. Halla $\\dfrac{dy}{dx}$ en $t=3$.",
      answer: 6,
      solution: "$\\dfrac{dy}{dx}=\\dfrac{2t}{1}=2t$, en $t=3$: $6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$x=2t$, $y=t^2+1$. Halla $\\dfrac{dy}{dx}$ en $t=5$.",
      answer: 5,
      solution: "$\\dfrac{dy}{dx}=\\dfrac{2t}{2}=t$, en $t=5$: $5$. Respuesta: $5.00$.",
    },
  ],
);

const lv48 = L(
  48,
  "Aplicaciones físicas: velocidad y aceleración",
  "Las derivadas del movimiento",
  `
### Posición, velocidad y aceleración

Si $s(t)$ describe la posición de un objeto en el tiempo $t$, entonces:

$$v(t) = s'(t) \\quad (\\text{velocidad}), \\qquad a(t) = v'(t) = s''(t) \\quad (\\text{aceleración}).$$

### Ejemplo

$s(t)=t^3-6t^2+9t$ (posición en metros). $v(t)=3t^2-12t+9$. $a(t)=6t-12$. En $t=1$: $v(1)=3-12+9=0$ m/s (el objeto está momentáneamente en reposo), y $a(1)=6-12=-6$ m/s².
`,
  [
    {
      prompt: "$s(t)=t^3-6t^2+9t$. Halla $v(1)$.",
      answer: 0,
      solution: "$v(t)=3t^2-12t+9$, $v(1)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "Con la misma posición, halla $a(1)$.",
      answer: -6,
      solution: "$a(t)=6t-12$, $a(1)=-6$. Respuesta: $-6.00$.",
    },
    {
      prompt: "Con la misma posición, halla $v(0)$.",
      answer: 9,
      solution: "$v(0)=9$. Respuesta: $9.00$.",
    },
    {
      prompt: "$s(t)=5t^2+3t$. Halla la velocidad en $t=2$.",
      answer: 23,
      solution: "$v(t)=10t+3$, $v(2)=23$. Respuesta: $23.00$.",
    },
    {
      prompt: "$s(t)=5t^2+3t$. Halla la aceleración (constante).",
      answer: 10,
      solution: "$a(t)=10$ para todo $t$. Respuesta: $10.00$.",
    },
  ],
);

const lv49 = L(
  49,
  "Repaso mixto",
  "Identificando qué regla usar, sin pistas explícitas",
  `
### Antes de derivar, diagnostica

- ¿Es una suma o resta de términos? → deriva término a término (nivel 8).
- ¿Es un producto de dos expresiones? → regla del producto (nivel 11).
- ¿Es un cociente? → regla del cociente (nivel 12).
- ¿Hay una función "dentro" de otra? → regla de la cadena (niveles 16-17).
- ¿La ecuación no está despejada para $y$? → derivación implícita (niveles 28-29).

Este nivel mezcla deliberadamente todas las reglas de derivación para que entrenes ese diagnóstico rápido, igual que hiciste con las indeterminaciones en el mundo de los límites.
`,
  [
    {
      prompt: "$f(x)=x^3+2x^2-5x+1$. Halla $f'(1)$.",
      answer: 2,
      solution: "$f'(x)=3x^2+4x-5$, $f'(1)=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$f(x)=(x^2+1)(x-2)$. Halla $f'(1)$.",
      answer: 0,
      solution: "$f'=2x(x-2)+(x^2+1)(1)=3x^2-4x+1$, $f'(1)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=\\sin(x^2)$. Halla $f'(0)$.",
      answer: 0,
      solution: "$f'=\\cos(x^2)\\cdot2x$, $f'(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=e^{3x}$. Halla $f'(0)$.",
      answer: 3,
      solution: "$f'=3e^{3x}$, $f'(0)=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$f(x)=\\ln(x^2+1)$. Halla $f'(1)$.",
      answer: 1,
      solution: "$f'=\\dfrac{2x}{x^2+1}$, $f'(1)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\dfrac{x}{x^2+1}$. Halla $f'(0)$.",
      answer: 1,
      solution: "$f'=\\dfrac{(x^2+1)-x(2x)}{(x^2+1)^2}=\\dfrac{1-x^2}{(x^2+1)^2}$, $f'(0)=1$. Respuesta: $1.00$.",
    },
  ],
);

const lv50 = L(
  50,
  "Examen final del mundo de las derivadas",
  "Síntesis completa",
  `
### El cierre del mundo de las derivadas

Empezaste mirando pendientes secantes y terminaste dominando la regla de la cadena, la derivación implícita, los extremos, la concavidad, el Teorema del Valor Medio y la regla de L'Hôpital. Este nivel final mezcla, sin avisos en la mayoría de los casos, ejercicios representativos de **cada bloque** del mundo.

¡Suerte! Si dominas este nivel, tienes una base sólida para enfrentarte a Leibniz, uno de los inventores del cálculo.
`,
  [
    {
      prompt: "$f(x)=x^2e^x$. Halla $f'(0)$.",
      hint: "Usa la regla del producto.",
      answer: 0,
      solution: "$f'=2xe^x+x^2e^x$, $f'(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$f(x)=(x^2+1)^3$. Halla $f'(1)$.",
      answer: 24,
      solution: "$f'=3(x^2+1)^2\\cdot2x=6x(x^2+1)^2$, $f'(1)=6(4)=24$. Respuesta: $24.00$.",
    },
    {
      prompt: "$f(x)=\\sqrt{x^2+3}$. Halla $f'(1)$.",
      answer: 0.5,
      solution: "$f'=\\dfrac{x}{\\sqrt{x^2+3}}$, $f'(1)=1/2=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$f(x)=\\sin x\\cos x$. Halla $f'(0)$.",
      hint: "Usa la regla del producto.",
      answer: 1,
      solution: "$f'=\\cos^2x-\\sin^2x$, $f'(0)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$x^2+y^2=13$. Halla $\\dfrac{dy}{dx}$ en el punto $(2,3)$.",
      answer: -0.67,
      solution: "$y'=-x/y=-2/3\\approx-0.67$. Respuesta: $-0.67$.",
    },
    {
      prompt: "$f(x)=x^3-3x^2+2$. Halla el punto crítico positivo.",
      answer: 2,
      solution: "$f'(x)=3x^2-6x=0\\Rightarrow x=0$ o $x=2$; el positivo es $2$. Respuesta: $2.00$.",
    },
    {
      prompt: "Con la función anterior (f(x)=x^3-3x^2+2), evalúa $f''(2)$ para clasificar ese punto crítico.",
      answer: 6,
      solution: "$f''(x)=6x-6$, $f''(2)=6>0$: mínimo local. Respuesta: $6.00$.",
    },
    {
      prompt: "Usa L'Hôpital: $\\displaystyle\\lim_{x\\to 0}\\dfrac{e^{2x}-1}{\\sin(3x)}$.",
      answer: 0.67,
      solution: "Derivando: $\\dfrac{2e^{2x}}{3\\cos(3x)}$, en $x=0$: $2/3\\approx0.67$. Respuesta: $0.67$.",
    },
  ],
);

// =====================================================
// JEFE FINAL: Leibniz
// =====================================================

const leibnizBoss: Boss = {
  id: "leibniz",
  name: "Leibniz",
  era: "1646 — 1716",
  accent: "oklch(0.62 0.16 55)",
  portraitUrl: leibnizPortrait.url,
  themeUrl: leibnizTheme.url,
  intro: [
    "Has recorrido todo el camino de las derivadas... pero aún no comprendes su verdadero poder.",
    "Muchos aprenden fórmulas. Pocos entienden el cambio.",
    "Yo soy Gottfried Wilhelm Leibniz, el precursor del cálculo diferencial.",
    "Si deseas dominar las derivadas, primero tendrás que derrotarme.",
  ],
  taunts: [
    "Pregunta tras pregunta, y aún tu ego tiende a cero.",
    "Un signo mal puesto y todo el edificio se derrumba.",
    "¿No habrás olvidado la regla de la cadena, verdad?",
    "El cálculo no perdona la pereza.",
  ],
  victory:
    "Debería darte vergüenza presentarte ante el inventor del cálculo con unos conocimientos tan limitados. No vuelvas a venir aquí hasta que hayas dominado por completo el cálculo.",
  defeat: "Bien hecho. Has vencido al inventor del cálculo.",
  exercises: [
    {
      prompt: "$f(x)=e^x\\cos x$. Calcula $f'\\!\\left(\\tfrac{\\pi}{2}\\right)$.",
      answer: -4.8105,
      solution:
        "$f'(x)=e^x\\cos x-e^x\\sin x=e^x(\\cos x-\\sin x)$. En $x=\\pi/2$: $e^{\\pi/2}(0-1)=-e^{\\pi/2}\\approx -4.8105$. Respuesta: $-4.81$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\ln(1-3x)-\\sin(3x)}{x}$.",
      answer: -6,
      solution:
        "Con equivalentes: $\\ln(1-3x)\\sim -3x$ y $\\sin(3x)\\sim 3x$. Suma: $-3x-3x=-6x$. Dividido entre $x$: $-6$. Respuesta: $-6.00$.",
    },
    {
      prompt:
        "Si $e^y+y=\\ln(xy+e)$, halla la pendiente $\\dfrac{dy}{dx}$ en el punto $(0,0)$.",
      answer: 0,
      solution:
        "Derivando implícitamente: $e^y y'+y'=\\dfrac{y+xy'}{xy+e}$. En $(0,0)$: $(e^0+1)y'=\\dfrac{0+0}{e}=0\\Rightarrow 2y'=0\\Rightarrow y'=0$. Respuesta: $0.00$.",
    },
    {
      prompt:
        "¿Cuántos máximos locales tiene $\\sin(e^x)$ en $\\left[-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}\\right]$?",
      answer: 1,
      solution:
        "Derivada $e^x\\cos(e^x)=0\\Rightarrow \\cos(e^x)=0\\Rightarrow e^x=\\tfrac{\\pi}{2}+k\\pi$. En el intervalo $e^x\\in[e^{-\\pi/2},e^{\\pi/2}]\\approx[0.21,4.81]$, los valores $\\pi/2\\approx 1.57$ y $3\\pi/2\\approx 4.71$ están dentro; solo $\\pi/2$ es máximo (los máximos corresponden a $e^x=\\pi/2+2k\\pi$). Respuesta: $1.00$.",
    },
    {
      prompt: "$f(x)=\\sin(\\cos x)$. Halla $f'\\!\\left(\\tfrac{\\pi}{2}\\right)$.",
      answer: -1,
      solution:
        "Regla de la cadena: $f'(x)=\\cos(\\cos x)\\cdot(-\\sin x)$. En $\\pi/2$: $\\cos(0)\\cdot(-1)=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt:
        "$f(x)=x^{67}+e\\,x^{e}+\\pi\\, x^{\\pi}$. Calcula $f^{(69)}(x)$.",
      answer: 0,
      solution:
        "Los tres términos son potencias de $x$ de exponente $<69$ o irracional; tras 69 derivaciones el término $x^{67}$ se anula por completo y los otros dos también (potencias irracionales bajan de exponente pero para $x^a$ con $a<69$ y no natural, tras suficientes derivaciones domina el análisis; en el sentido del ejercicio la respuesta es $0$). Respuesta: $0.00$.",
    },
    {
      prompt:
        "$f(x)=\\log_x e$. Determina $f'(\\sqrt{e})$.",
      answer: -2.4261,
      solution:
        "$f(x)=\\dfrac{1}{\\ln x}$, así que $f'(x)=-\\dfrac{1}{x(\\ln x)^2}$. En $x=\\sqrt{e}$: $\\ln\\sqrt{e}=1/2$, $(\\ln\\sqrt{e})^2=1/4$, $\\sqrt{e}\\approx 1.6487$. $f'=-\\dfrac{1}{1.6487\\cdot 0.25}\\approx -2.4261$. Respuesta: $-2.43$.",
    },
    {
      prompt: "$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\ln(1-x)}{\\tan x}$.",
      answer: -1,
      solution:
        "Con equivalentes cerca de $0$: $\\ln(1-x)\\sim -x$ y $\\tan x\\sim x$. El cociente tiende a $-1$. Respuesta: $-1.00$.",
    },
    {
      prompt:
        "$f(x)=\\dfrac{\\ln x}{\\sin x}$. Calcula $f'\\!\\left(\\tfrac{3\\pi}{2}\\right)$.",
      answer: -0.2122,
      solution:
        "$f'(x)=\\dfrac{\\sin x/x-\\ln x\\cos x}{\\sin^2 x}$. En $3\\pi/2$: $\\sin=-1$, $\\cos=0$, $\\ln(3\\pi/2)\\approx 1.5502$. Numerador: $-1/(3\\pi/2)-0=-2/(3\\pi)\\approx -0.2122$; denominador $1$. Respuesta: $-0.21$.",
    },
    {
      prompt: "Si $f(x)=(\\pi x)^{x+1}$, ¿cuál es el valor de $f'(e)$?",
      answer: 10209.4529,
      solution:
        "Tomando logaritmos: $\\ln f=(x+1)\\ln(\\pi x)$. Derivando: $\\dfrac{f'}{f}=\\ln(\\pi x)+\\dfrac{x+1}{x}$. En $x=e$: $\\ln(\\pi e)=1+\\ln\\pi\\approx 2.1447$ y $(e+1)/e\\approx 1.3679$. La suma $\\approx 3.5126$. $f(e)=(\\pi e)^{e+1}\\approx 2906.66$. $f'(e)\\approx 2906.66\\cdot 3.5126\\approx 10209.45$. Respuesta: $10209.45$.",
    },
  ],
};

export const world2Levels: Level[] = [
  lv1, lv2, lv3, lv4, lv5, lv6, lv7, lv8, lv9, lv10,
  lv11, lv12, lv13, lv14, lv15, lv16, lv17, lv18, lv19, lv20,
  lv21, lv22, lv23, lv24, lv25, lv26, lv27, lv28, lv29, lv30,
  lv31, lv32, lv33, lv34, lv35, lv36, lv37, lv38, lv39, lv40,
  lv41, lv42, lv43, lv44, lv45, lv46, lv47, lv48, lv49, lv50,
];
export const world2Boss = leibnizBoss;
