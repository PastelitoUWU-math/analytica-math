import type { Level, Exercise, Boss } from "./types";
import newtonPortrait from "@/assets/newton.jpg.asset.json";
import newtonTheme from "@/assets/newton-theme.m4a.asset.json";

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
// MUNDO: INTEGRALES — Niveles 1 a 50
// Mismo formato que tus niveles de límites y derivadas: cada
// nivel trae una explicación con demostración (no solo la
// fórmula) y una batería de ejercicios evaluables.
// Todas las respuestas con π usan π≈3.14, indicado en el
// enunciado cuando aplica.
// =====================================================

const lv1 = L(
  1,
  "Antiderivadas: el problema inverso",
  "Deshaciendo una derivada",
  `
### La pregunta al revés

Ya sabes derivar. Ahora hacemos la pregunta opuesta: dada una función $f$, ¿existe una función $F$ tal que $F'(x)=f(x)$? Si es así, decimos que $F$ es una **antiderivada** (o primitiva) de $f$.

### Ejemplo

Como $\\dfrac{d}{dx}[x^2]=2x$, decimos que $F(x)=x^2$ es una antiderivada de $f(x)=2x$.

### Un detalle importante: no es única

$F(x)=x^2+5$ **también** es una antiderivada de $f(x)=2x$, porque $\\dfrac{d}{dx}[x^2+5]=2x+0=2x$. De hecho, $x^2+C$ para **cualquier** constante $C$ funciona. Esto no es un accidente raro: es la razón de ser del siguiente nivel, donde formalizamos esta idea con la notación de la integral indefinida.
`,
  [
    {
      prompt: "¿Es $F(x)=x^3$ una antiderivada de $f(x)=3x^2$? (Si/No)",
      answer: "Si",
      solution: "$F'(x)=3x^2=f(x)$. Respuesta: `Sí`.",
    },
    {
      prompt: "¿Es $F(x)=x^2$ una antiderivada de $f(x)=2x+1$? (Si/No)",
      answer: "No",
      solution: "$F'(x)=2x\\neq2x+1$. Respuesta: `No`.",
    },
    {
      prompt: "¿Es $F(x)=\\sin x$ una antiderivada de $f(x)=\\cos x$? (Si/No)",
      answer: "Si",
      solution: "$F'(x)=\\cos x=f(x)$. Respuesta: `Sí`.",
    },
    {
      prompt: "¿Es $F(x)=x^2+100$ una antiderivada de $f(x)=2x$? (Si/No)",
      answer: "Si",
      solution: "La constante $100$ desaparece al derivar. Respuesta: `Sí`.",
    },
    {
      prompt: "Si $F(x)=e^{2x}$ es una antiderivada de $f(x)=ke^{2x}$, ¿cuánto vale $k$?",
      hint: "Deriva $F(x)$ con la regla de la cadena.",
      answer: 2,
      solution: "$F'(x)=2e^{2x}$, así que $k=2$. Respuesta: $2.00$.",
    },
  ],
);

const lv2 = L(
  2,
  "La integral indefinida y la constante $C$",
  "Notación para \"todas\" las antiderivadas",
  `
### Notación

Escribimos $\\displaystyle\\int f(x)\\,dx = F(x)+C$ para representar **toda la familia** de antiderivadas de $f$, donde $F$ es una antiderivada cualquiera y $C$ es una constante arbitraria.

### ¿Por qué el \"$+C$\" cubre TODAS las antiderivadas?

Supón que $F$ y $G$ son ambas antiderivadas de $f$ (es decir, $F'=f$ y $G'=f$). Entonces $(F-G)'=F'-G'=f-f=0$. Una función cuya derivada es $0$ en todo punto **debe ser constante** (esto se sigue del Teorema del Valor Medio del mundo de las derivadas: si $F-G$ no fuera constante, existiría algún punto donde su derivada no es $0$). Así que $F-G=C$ para alguna constante $C$, es decir, $G=F+C$. **Todas** las antiderivadas de $f$ difieren solo por una constante.

### Usando una condición para hallar $C$

Si además sabemos $F(a)$ para algún punto $a$ (una \"condición inicial\"), podemos determinar el valor exacto de $C$.

### Ejemplo

$F'(x)=2x$ y $F(0)=5$. Como $\\int2x\\,dx=x^2+C$, y $F(0)=0+C=5$, entonces $C=5$, así que $F(x)=x^2+5$.
`,
  [
    {
      prompt: "$F'(x)=2x$ y $F(0)=5$. Halla $F(2)$.",
      answer: 9,
      solution: "$F(x)=x^2+5$, $F(2)=4+5=9$. Respuesta: $9.00$.",
    },
    {
      prompt: "$F'(x)=3x^2$ y $F(1)=0$. Halla $F(2)$.",
      answer: 7,
      solution: "$F(x)=x^3+C$, $F(1)=1+C=0\\Rightarrow C=-1$. $F(2)=8-1=7$. Respuesta: $7.00$.",
    },
    {
      prompt: "$F'(x)=\\cos x$ y $F(0)=1$. Halla $F(\\pi/2)$.",
      answer: 2,
      solution: "$F(x)=\\sin x+C$, $F(0)=C=1$. $F(\\pi/2)=1+1=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$F'(x)=e^x$ y $F(0)=0$. Halla $F(1)$.",
      answer: 1.72,
      solution: "$F(x)=e^x+C$, $F(0)=1+C=0\\Rightarrow C=-1$. $F(1)=e-1\\approx1.72$. Respuesta: $1.72$.",
    },
    {
      prompt: "$F'(x)=1$ y $F(3)=10$. Halla $F(0)$.",
      answer: 7,
      solution: "$F(x)=x+C$, $F(3)=3+C=10\\Rightarrow C=7$. $F(0)=7$. Respuesta: $7.00$.",
    },
  ],
);

const lv3 = L(
  3,
  "Regla de la potencia para integrales",
  "Deshaciendo la regla de la potencia de derivadas",
  `
### La fórmula

$$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C \\qquad (n\\neq-1)$$

### Demostración: solo hay que verificar

No necesitamos un nuevo argumento desde cero: basta comprobar que la derivada del lado derecho da $x^n$. Usando la regla de la potencia para derivadas (ya demostrada en el mundo de las derivadas):

$$\\frac{d}{dx}\\left[\\frac{x^{n+1}}{n+1}\\right] = \\frac{(n+1)x^n}{n+1} = x^n. \\checkmark$$

Así confirmamos la fórmula. Nota la excepción $n=-1$: ahí $n+1=0$ y la fórmula se rompe (división entre cero). Ese caso especial ($\\int\\tfrac1x dx$) se resuelve distinto, y lo veremos en el nivel 7.
`,
  [
    {
      prompt: "$\\displaystyle\\int x^3\\,dx$ (con $C=0$). Evalúa en $x=2$.",
      answer: 4,
      solution: "$F(x)=x^4/4$, $F(2)=16/4=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\int x^4\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 0.2,
      solution: "$F(x)=x^5/5$, $F(1)=0.2$. Respuesta: $0.20$.",
    },
    {
      prompt: "$\\displaystyle\\int x^5\\,dx$ (con $C=0$). Evalúa en $x=-1$.",
      answer: 0.17,
      solution: "$F(x)=x^6/6$, $F(-1)=1/6\\approx0.17$. Respuesta: $0.17$.",
    },
    {
      prompt: "$\\displaystyle\\int \\sqrt{x}\\,dx$ (con $C=0$). Evalúa en $x=4$.",
      hint: "$\\sqrt{x}=x^{1/2}$; usa la regla de la potencia con $n=1/2$.",
      answer: 5.33,
      solution: "$F(x)=\\tfrac23x^{3/2}$, $F(4)=\\tfrac23(8)\\approx5.33$. Respuesta: $5.33$.",
    },
    {
      prompt: "$\\displaystyle\\int \\dfrac{1}{x^2}\\,dx$ (con $C=0$). Evalúa en $x=2$.",
      hint: "Escribe $1/x^2=x^{-2}$.",
      answer: -0.5,
      solution: "$F(x)=x^{-1}/(-1)=-1/x$, $F(2)=-0.5$. Respuesta: $-0.50$.",
    },
  ],
);

const lv4 = L(
  4,
  "Linealidad: suma y diferencia",
  "Integrar término a término",
  `
### La regla

$$\\int\\big[f(x)+g(x)\\big]\\,dx = \\int f(x)\\,dx + \\int g(x)\\,dx$$

### Demostración

Si $F'=f$ y $G'=g$, entonces por la regla de la suma de derivadas (ya conocida): $(F+G)'=F'+G'=f+g$. Así que $F+G$ es una antiderivada de $f+g$, confirmando la fórmula. Lo mismo aplica para la resta.

Esto significa que puedes integrar un polinomio (o cualquier suma de funciones) término a término, exactamente como derivabas término a término.
`,
  [
    {
      prompt: "$\\displaystyle\\int(x^2+x)\\,dx$ (con $C=0$). Evalúa en $x=2$.",
      answer: 4.67,
      solution: "$F(x)=x^3/3+x^2/2$, $F(2)=8/3+2\\approx4.67$. Respuesta: $4.67$.",
    },
    {
      prompt: "$\\displaystyle\\int(3x^2-2x)\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 0,
      solution: "$F(x)=x^3-x^2$, $F(1)=1-1=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int(x^3-x)\\,dx$ (con $C=0$). Evalúa en $x=2$.",
      answer: 2,
      solution: "$F(x)=x^4/4-x^2/2$, $F(2)=4-2=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\int(2x+3)\\,dx$ con $F(0)=5$. Evalúa en $x=1$.",
      answer: 9,
      solution: "$F(x)=x^2+3x+C$, $F(0)=C=5$. $F(1)=1+3+5=9$. Respuesta: $9.00$.",
    },
    {
      prompt: "$\\displaystyle\\int(x^2-4)\\,dx$ con $F(0)=0$. Evalúa en $x=3$.",
      answer: -3,
      solution: "$F(x)=x^3/3-4x+C$, $F(0)=C=0$. $F(3)=9-12=-3$. Respuesta: $-3.00$.",
    },
  ],
);

const lv5 = L(
  5,
  "Linealidad: múltiplo constante",
  "Las constantes salen de la integral",
  `
### La regla

$$\\int c\\,f(x)\\,dx = c\\int f(x)\\,dx$$

### Demostración

Si $F'=f$, entonces $(cF)'=cF'=cf$ (regla del múltiplo constante para derivadas). Así que $cF$ es una antiderivada de $cf$, confirmando la fórmula.
`,
  [
    {
      prompt: "$\\displaystyle\\int 5x^2\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 1.67,
      solution: "$F(x)=\\tfrac53x^3$, $F(1)\\approx1.67$. Respuesta: $1.67$.",
    },
    {
      prompt: "$\\displaystyle\\int -3x\\,dx$ (con $C=0$). Evalúa en $x=2$.",
      answer: -6,
      solution: "$F(x)=-1.5x^2$, $F(2)=-6$. Respuesta: $-6.00$.",
    },
    {
      prompt: "$\\displaystyle\\int 4\\,dx$ (con $C=0$). Evalúa en $x=5$.",
      answer: 20,
      solution: "$F(x)=4x$, $F(5)=20$. Respuesta: $20.00$.",
    },
    {
      prompt: "$\\displaystyle\\int \\tfrac12 x^3\\,dx$ (con $C=0$). Evalúa en $x=2$.",
      answer: 2,
      solution: "$F(x)=x^4/8$, $F(2)=16/8=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\int 6x^2\\,dx$ con $F(1)=5$. Evalúa en $x=2$.",
      answer: 19,
      solution: "$F(x)=2x^3+C$, $F(1)=2+C=5\\Rightarrow C=3$. $F(2)=16+3=19$. Respuesta: $19.00$.",
    },
  ],
);

const lv6 = L(
  6,
  "Integrales de $\\sin x$ y $\\cos x$",
  "Revirtiendo las derivadas trigonométricas",
  `
### Las fórmulas

$$\\int\\sin x\\,dx = -\\cos x+C, \\qquad \\int\\cos x\\,dx = \\sin x+C$$

### Demostración

Basta verificar por derivación: $\\dfrac{d}{dx}[-\\cos x]=-(-\\sin x)=\\sin x$ ✓. Y $\\dfrac{d}{dx}[\\sin x]=\\cos x$ ✓. Estas fórmulas son literalmente las derivadas del mundo anterior, leídas al revés.
`,
  [
    {
      prompt: "$\\displaystyle\\int\\sin x\\,dx$ (con $C=0$). Evalúa en $x=\\pi/2$.",
      answer: 0,
      solution: "$F(x)=-\\cos x$, $F(\\pi/2)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int\\cos x\\,dx$ (con $C=0$). Evalúa en $x=\\pi/2$.",
      answer: 1,
      solution: "$F(x)=\\sin x$, $F(\\pi/2)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int\\sin x\\,dx$ con $F(0)=1$. Evalúa en $x=\\pi$.",
      answer: 3,
      solution: "$F(x)=-\\cos x+C$, $F(0)=-1+C=1\\Rightarrow C=2$. $F(\\pi)=1+2=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$\\displaystyle\\int 3\\cos x\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: 0,
      solution: "$F(x)=3\\sin x$, $F(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int(\\sin x+\\cos x)\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: -1,
      solution: "$F(x)=-\\cos x+\\sin x$, $F(0)=-1+0=-1$. Respuesta: $-1.00$.",
    },
  ],
);

const lv7 = L(
  7,
  "Integrales de $e^x$ y de $\\dfrac1x$",
  "El caso especial que la regla de la potencia no cubre",
  `
### $e^x$: la más fácil de todas

$$\\int e^x\\,dx = e^x+C$$

porque $e^x$ es su propia derivada.

### $\\dfrac1x$: aquí aparece el logaritmo (¡y el valor absoluto!)

$$\\int\\frac1x\\,dx = \\ln|x|+C$$

**¿Por qué el valor absoluto?** Para $x>0$: $\\dfrac{d}{dx}[\\ln x]=\\dfrac1x$ ✓ (ya lo sabías). Pero $\\ln x$ no está definido para $x<0$. Para cubrir también $x<0$, usamos $\\ln|x|=\\ln(-x)$ cuando $x<0$, y verificamos con la regla de la cadena:

$$\\frac{d}{dx}\\big[\\ln(-x)\\big] = \\frac{1}{-x}\\cdot(-1) = \\frac1x. \\checkmark$$

¡También funciona para $x<0$! Por eso la fórmula combinada $\\ln|x|$ es válida en **todo** el dominio de $1/x$ (es decir, para todo $x\\neq0$).
`,
  [
    {
      prompt: "$\\displaystyle\\int e^x\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 2.72,
      solution: "$F(x)=e^x$, $F(1)\\approx2.72$. Respuesta: $2.72$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac1x\\,dx$ (con $C=0$). Evalúa en $x=e$.",
      answer: 1,
      solution: "$F(x)=\\ln|x|$, $F(e)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int e^x\\,dx$ con $F(0)=0$. Evalúa en $x=2$.",
      answer: 6.39,
      solution: "$F(x)=e^x+C$, $F(0)=1+C=0\\Rightarrow C=-1$. $F(2)=e^2-1\\approx6.39$. Respuesta: $6.39$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac3x\\,dx$ (con $C=0$). Evalúa en $x=e^2$.",
      answer: 6,
      solution: "$F(x)=3\\ln|x|$, $F(e^2)=3(2)=6$. Respuesta: $6.00$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac1x\\,dx$ (con $C=0$). Evalúa en $x=-e$.",
      hint: "Usa $\\ln|x|$ y recuerda que $|-e|=e$.",
      answer: 1,
      solution: "$F(-e)=\\ln|-e|=\\ln e=1$. Respuesta: $1.00$.",
    },
  ],
);

const lv8 = L(
  8,
  "Integrales que dan funciones trigonométricas inversas",
  "Revirtiendo $\\arctan$ y $\\arcsin$",
  `
### Las fórmulas

$$\\int\\frac{1}{1+x^2}\\,dx = \\arctan x+C, \\qquad \\int\\frac{1}{\\sqrt{1-x^2}}\\,dx = \\arcsin x+C$$

### Demostración

Como ya probaste en el mundo de las derivadas (nivel 27), $\\dfrac{d}{dx}[\\arctan x]=\\dfrac1{1+x^2}$ y $\\dfrac{d}{dx}[\\arcsin x]=\\dfrac1{\\sqrt{1-x^2}}$. Estas dos fórmulas de integración son, otra vez, esas derivadas leídas al revés.
`,
  [
    {
      prompt: "$\\displaystyle\\int\\dfrac{1}{1+x^2}\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 0.79,
      solution: "$F(x)=\\arctan x$, $F(1)=\\pi/4\\approx0.79$. Respuesta: $0.79$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{1}{\\sqrt{1-x^2}}\\,dx$ (con $C=0$). Evalúa en $x=0.5$.",
      answer: 0.52,
      solution: "$F(x)=\\arcsin x$, $F(0.5)=\\pi/6\\approx0.52$. Respuesta: $0.52$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{1}{1+x^2}\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: 0,
      solution: "$\\arctan(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{3}{1+x^2}\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 2.36,
      solution: "$F(x)=3\\arctan x$, $F(1)=3\\pi/4\\approx2.36$. Respuesta: $2.36$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{1}{\\sqrt{1-x^2}}\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: 0,
      solution: "$\\arcsin(0)=0$. Respuesta: $0.00$.",
    },
  ],
);

const lv9 = L(
  9,
  "Repaso: integrando combinaciones",
  "Combinando todas las reglas básicas",
  `
### Uniendo las piezas

Con la regla de la potencia, la linealidad y las fórmulas de seno, coseno, $e^x$, $1/x$ y las inversas trigonométricas, ya puedes integrar una gran variedad de combinaciones término a término. Este nivel mezcla todo lo anterior.
`,
  [
    {
      prompt: "$\\displaystyle\\int(2x+e^x)\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: 1,
      solution: "$F(x)=x^2+e^x$, $F(0)=0+1=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int\\left(3x^2-\\dfrac1x\\right)dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 1,
      solution: "$F(x)=x^3-\\ln|x|$, $F(1)=1-0=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int(\\cos x+4x)\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: 0,
      solution: "$F(x)=\\sin x+2x^2$, $F(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int\\left(\\dfrac{1}{1+x^2}+x\\right)dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 1.29,
      solution: "$F(x)=\\arctan x+x^2/2$, $F(1)=0.785+0.5\\approx1.29$. Respuesta: $1.29$.",
    },
    {
      prompt: "$\\displaystyle\\int(3\\cos x-2e^x)\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: -2,
      solution: "$F(x)=3\\sin x-2e^x$, $F(0)=0-2=-2$. Respuesta: $-2.00$.",
    },
  ],
);

const lv10 = L(
  10,
  "La integral definida: motivación geométrica",
  "El área bajo una curva",
  `
### Un problema nuevo: el área

¿Cómo calcular el área exacta bajo una curva $y=f(x)$ (con $f\\geq0$) entre $x=a$ y $x=b$? Para una recta, es fácil (geometría de triángulos y trapecios). Para una curva, la idea es **aproximar el área con rectángulos** y luego, con más y más rectángulos (cada vez más angostos), esperar que la aproximación se acerque al valor exacto.

### Ejemplo

$f(x)=x$ en $[0,2]$. Con $2$ rectángulos de ancho $1$, usando la altura del **extremo derecho** de cada uno: alturas $f(1)=1$ y $f(2)=2$, área aproximada $=1(1)+1(2)=3$. Usando el **extremo izquierdo**: alturas $f(0)=0$ y $f(1)=1$, área aproximada $=0+1=1$. El área **exacta** (un triángulo de base $2$ y altura $2$) es $\\tfrac12(2)(2)=2$ — justo entre las dos aproximaciones. Esa es la pista: con más rectángulos, ambas aproximaciones deberían acercarse a $2$.
`,
  [
    {
      prompt: "$f(x)=x$ en $[0,2]$. Aproxima el área con $2$ rectángulos usando el extremo derecho.",
      answer: 3,
      solution: "Alturas $f(1)=1,f(2)=2$: suma $=1(1)+1(2)=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "$f(x)=x$ en $[0,4]$. Aproxima el área con $4$ rectángulos usando el extremo derecho (ancho $1$).",
      answer: 10,
      solution: "Alturas $1,2,3,4$: suma $=1+2+3+4=10$. Respuesta: $10.00$.",
    },
    {
      prompt: "$f(x)=x^2$ en $[0,2]$. Aproxima el área con $2$ rectángulos usando el extremo derecho (ancho $1$).",
      answer: 5,
      solution: "Alturas $f(1)=1,f(2)=4$: suma $=1(1)+1(4)=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$f(x)=x$ en $[0,2]$. Aproxima el área con $2$ rectángulos usando el extremo izquierdo.",
      answer: 1,
      solution: "Alturas $f(0)=0,f(1)=1$: suma $=0+1=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "Halla el área exacta del triángulo bajo $f(x)=x$ en $[0,2]$ usando geometría.",
      answer: 2,
      solution: "Base $\\times$ altura $/2 = (2)(2)/2=2$: justo entre las aproximaciones $1$ y $3$. Respuesta: $2.00$.",
    },
  ],
);

const lv11 = L(
  11,
  "Sumas de Riemann",
  "Formalizando la aproximación con rectángulos",
  `
### La fórmula general

Dividimos $[a,b]$ en $n$ subintervalos iguales de ancho $\\Delta x = \\dfrac{b-a}{n}$. En cada subintervalo elegimos un punto de muestra $x_i^*$ (extremo derecho, izquierdo, o punto medio) y sumamos las áreas de los rectángulos:

$$R_n = \\sum_{i=1}^n f(x_i^*)\\,\\Delta x$$

Esta suma se llama **suma de Riemann**. Cuanto más grande sea $n$ (rectángulos más angostos), mejor debería ser la aproximación.
`,
  [
    {
      prompt: "$f(x)=x^2$ en $[0,2]$, $n=4$ ($\\Delta x=0.5$). Suma de Riemann por la derecha (alturas en $0.5,1,1.5,2$).",
      answer: 3.75,
      solution: "Alturas $0.25,1,2.25,4$, suma $=7.5$; $\\times\\Delta x=0.5$: $3.75$. Respuesta: $3.75$.",
    },
    {
      prompt: "$f(x)=x^2$ en $[0,1]$, $n=4$ ($\\Delta x=0.25$). Suma de Riemann por la derecha.",
      answer: 0.47,
      solution: "Alturas $0.0625,0.25,0.5625,1$, suma $=1.875$; $\\times0.25\\approx0.47$. Respuesta: $0.47$.",
    },
    {
      prompt: "$f(x)=x^2$ en $[0,1]$, $n=4$ ($\\Delta x=0.25$). Suma de Riemann por la izquierda.",
      answer: 0.22,
      solution: "Alturas $0,0.0625,0.25,0.5625$, suma $=0.875$; $\\times0.25\\approx0.22$. Respuesta: $0.22$.",
    },
    {
      prompt: "$f(x)=3x$ en $[0,2]$, $n=2$ ($\\Delta x=1$). Suma de Riemann por la derecha.",
      answer: 9,
      solution: "Alturas $f(1)=3,f(2)=6$, suma $\\times1=9$. Respuesta: $9.00$.",
    },
    {
      prompt: "Halla el área exacta bajo $f(x)=3x$ en $[0,2]$ usando geometría (triángulo).",
      answer: 6,
      solution: "$(2)(6)/2=6$: la suma de Riemann por la derecha ($9$) sobreestima. Respuesta: $6.00$.",
    },
  ],
);

const lv12 = L(
  12,
  "La integral definida como límite",
  "Definición formal usando límites",
  `
### La definición

$$\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\,\\Delta x$$

Es decir, tomamos el límite de las sumas de Riemann cuando el número de rectángulos crece sin límite (¡otra vez tu viejo conocido, el límite al infinito!).

### Ejemplo completo: $\\int_0^b x\\,dx$

Con $\\Delta x=b/n$ y extremos derechos $x_i=ib/n$:

$$\\sum_{i=1}^n \\frac{ib}{n}\\cdot\\frac{b}{n} = \\frac{b^2}{n^2}\\sum_{i=1}^n i = \\frac{b^2}{n^2}\\cdot\\frac{n(n+1)}{2} = \\frac{b^2}{2}\\left(1+\\frac1n\\right)$$

Tomando $n\\to\\infty$: $\\dfrac1n\\to0$, así que el límite es $\\dfrac{b^2}{2}$. Esto confirma (¡con una fórmula construida desde cero!) el resultado geométrico: $\\int_0^b x\\,dx=\\dfrac{b^2}{2}$, coincidiendo con el área del triángulo. Con un cálculo similar (usando la fórmula de la suma de cuadrados) se obtiene $\\int_0^b x^2\\,dx=\\dfrac{b^3}{3}$.
`,
  [
    {
      prompt: "Usando $\\displaystyle\\int_0^b x\\,dx=\\dfrac{b^2}{2}$, halla $\\displaystyle\\int_0^3 x\\,dx$.",
      answer: 4.5,
      solution: "$3^2/2=4.5$. Respuesta: $4.50$.",
    },
    {
      prompt: "Usando $\\displaystyle\\int_0^b x^2\\,dx=\\dfrac{b^3}{3}$, halla $\\displaystyle\\int_0^3 x^2\\,dx$.",
      answer: 9,
      solution: "$3^3/3=9$. Respuesta: $9.00$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^4 x\\,dx$.",
      answer: 8,
      solution: "$16/2=8$. Respuesta: $8.00$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^2 x^2\\,dx$.",
      answer: 2.67,
      solution: "$8/3\\approx2.67$. Respuesta: $2.67$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^5 x\\,dx$.",
      answer: 12.5,
      solution: "$25/2=12.5$. Respuesta: $12.50$.",
    },
  ],
);

const lv13 = L(
  13,
  "Propiedades de la integral definida",
  "Linealidad y aditividad",
  `
### Propiedades (heredadas de las sumas de Riemann)

Como la integral definida es un límite de sumas, hereda directamente las propiedades de linealidad de límites y sumas:

$$\\int_a^b [f+g]\\,dx = \\int_a^b f\\,dx+\\int_a^b g\\,dx, \\qquad \\int_a^b cf\\,dx = c\\int_a^b f\\,dx$$

### Aditividad de intervalos

$$\\int_a^b f(x)\\,dx + \\int_b^c f(x)\\,dx = \\int_a^c f(x)\\,dx$$

Geométricamente: el área de $a$ a $b$ más el área de $b$ a $c$ es el área total de $a$ a $c$.

### Casos especiales por convención

$$\\int_a^a f(x)\\,dx = 0 \\quad(\\text{ancho cero}), \\qquad \\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx \\quad(\\text{invertir el orden cambia el signo})$$
`,
  [
    {
      prompt: "Si $\\int_0^3 f(x)dx=5$ y $\\int_3^7 f(x)dx=2$, halla $\\int_0^7 f(x)dx$.",
      answer: 7,
      solution: "$5+2=7$. Respuesta: $7.00$.",
    },
    {
      prompt: "Si $\\int_0^5 f(x)dx=10$, halla $\\int_5^0 f(x)dx$.",
      answer: -10,
      solution: "Invertir el orden cambia el signo: $-10$. Respuesta: $-10.00$.",
    },
    {
      prompt: "Si $\\int_0^4 f(x)dx=6$ y $\\int_0^4 g(x)dx=3$, halla $\\int_0^4 [f(x)+g(x)]dx$.",
      answer: 9,
      solution: "$6+3=9$. Respuesta: $9.00$.",
    },
    {
      prompt: "Halla $\\int_6^6 f(x)dx$.",
      answer: 0,
      solution: "Ancho cero: $0$. Respuesta: $0.00$.",
    },
    {
      prompt: "Si $\\int_2^9 f(x)dx=12$, halla $\\int_2^9 3f(x)dx$.",
      answer: 36,
      solution: "$3\\times12=36$. Respuesta: $36.00$.",
    },
  ],
);

const lv14 = L(
  14,
  "El Teorema Fundamental del Cálculo, Parte 1",
  "Derivar deshace integrar",
  `
### Enunciado

Sea $g(x)=\\displaystyle\\int_a^x f(t)\\,dt$ (el área acumulada desde $a$ hasta $x$). Si $f$ es continua, entonces:

$$g'(x) = f(x)$$

### Demostración (idea)

$$g'(x) = \\lim_{h\\to0}\\frac{g(x+h)-g(x)}{h} = \\lim_{h\\to0}\\frac1h\\int_x^{x+h} f(t)\\,dt$$

(usando la aditividad de intervalos del nivel 13). Para $h$ pequeño, $\\displaystyle\\int_x^{x+h} f(t)\\,dt$ es aproximadamente el área de una franja delgada de ancho $h$ y altura $\\approx f(x)$ (porque $f$ es continua, no cambia mucho en un intervalo tan corto), así que esa integral es $\\approx f(x)\\cdot h$. Dividiendo entre $h$ y tomando el límite, obtenemos $f(x)$.

Este resultado es profundo: dice que **integrar y derivar son procesos inversos**. Si combinamos esto con la regla de la cadena, también podemos derivar integrales con límites más complejos, como $\\int_a^{x^2}f(t)dt$.
`,
  [
    {
      prompt: "$g(x)=\\displaystyle\\int_0^x(t^2+1)\\,dt$. Halla $g'(2)$.",
      answer: 5,
      solution: "Por TFC1, $g'(x)=x^2+1$, $g'(2)=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$g(x)=\\displaystyle\\int_1^x\\sin t\\,dt$. Halla $g'(\\pi)$.",
      answer: 0,
      solution: "$g'(x)=\\sin x$, $g'(\\pi)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$g(x)=\\displaystyle\\int_0^x e^t\\,dt$. Halla $g'(1)$.",
      answer: 2.72,
      solution: "$g'(x)=e^x$, $g'(1)\\approx2.72$. Respuesta: $2.72$.",
    },
    {
      prompt: "$g(x)=\\displaystyle\\int_0^{x^2} t\\,dt$. Halla $g'(1)$.",
      hint: "Usa TFC1 combinado con la regla de la cadena: $g'(x)=f(x^2)\\cdot2x$.",
      answer: 2,
      solution: "$g'(x)=x^2\\cdot2x=2x^3$, $g'(1)=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$g(x)=\\displaystyle\\int_0^x\\dfrac{1}{1+t^2}\\,dt$. Halla $g'(1)$.",
      answer: 0.5,
      solution: "$g'(x)=1/(1+x^2)$, $g'(1)=0.5$. Respuesta: $0.50$.",
    },
  ],
);

const lv15 = L(
  15,
  "El Teorema Fundamental del Cálculo, Parte 2",
  "El resultado que hace posible calcular integrales de verdad",
  `
### Enunciado

Si $F$ es **cualquier** antiderivada de $f$ (es decir $F'=f$), entonces:

$$\\int_a^b f(x)\\,dx = F(b)-F(a)$$

### Demostración

Sea $g(x)=\\displaystyle\\int_a^x f(t)\\,dt$. Por el TFC Parte 1 (nivel 14), $g'(x)=f(x)=F'(x)$. Como $g$ y $F$ tienen la **misma derivada**, difieren por una constante (nivel 2): $g(x)=F(x)+C$. Evaluando en $x=a$: $g(a)=\\int_a^a f\\,dt=0=F(a)+C$, así que $C=-F(a)$. Entonces:

$$g(b) = F(b)+C = F(b)-F(a)$$

Pero por definición $g(b)=\\int_a^b f(t)\\,dt$. ¡Listo! Este teorema es enorme: **ya no necesitamos calcular límites de sumas de Riemann** para evaluar integrales definidas; basta encontrar una antiderivada y evaluarla en los dos extremos. Notación: $F(x)\\Big|_a^b = F(b)-F(a)$.
`,
  [
    {
      prompt: "$\\displaystyle\\int_0^2 x^2\\,dx$.",
      answer: 2.67,
      solution: "$F(x)=x^3/3$, $F(2)-F(0)=8/3\\approx2.67$. Respuesta: $2.67$.",
    },
    {
      prompt: "$\\displaystyle\\int_1^3 2x\\,dx$.",
      answer: 8,
      solution: "$F(x)=x^2$, $F(3)-F(1)=9-1=8$. Respuesta: $8.00$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\pi}\\sin x\\,dx$.",
      answer: 2,
      solution: "$F(x)=-\\cos x$, $F(\\pi)-F(0)=1+1=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^1 e^x\\,dx$.",
      answer: 1.72,
      solution: "$F(x)=e^x$, $F(1)-F(0)=e-1\\approx1.72$. Respuesta: $1.72$.",
    },
    {
      prompt: "$\\displaystyle\\int_1^2 \\dfrac1x\\,dx$.",
      answer: 0.69,
      solution: "$F(x)=\\ln|x|$, $F(2)-F(1)=\\ln2\\approx0.69$. Respuesta: $0.69$.",
    },
  ],
);

const lv16 = L(
  16,
  "Calculando áreas con el TFC",
  "El área ya no requiere límites de sumas",
  `
### Área bajo una curva

Si $f(x)\\geq0$ en $[a,b]$, el área bajo $y=f(x)$ es exactamente $\\displaystyle\\int_a^b f(x)\\,dx$, que ahora sabes calcular directamente con el TFC Parte 2.
`,
  [
    {
      prompt: "Área bajo $y=x^2$ en $[0,3]$.",
      answer: 9,
      solution: "$[x^3/3]_0^3=9$. Respuesta: $9.00$.",
    },
    {
      prompt: "Área bajo $y=\\sqrt{x}$ en $[0,4]$.",
      answer: 5.33,
      solution: "$[\\tfrac23x^{3/2}]_0^4=\\tfrac23(8)\\approx5.33$. Respuesta: $5.33$.",
    },
    {
      prompt: "Área bajo $y=\\cos x$ en $[0,\\pi/2]$.",
      answer: 1,
      solution: "$[\\sin x]_0^{\\pi/2}=1-0=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "Área bajo $y=e^x$ en $[0,2]$.",
      answer: 6.39,
      solution: "$[e^x]_0^2=e^2-1\\approx6.39$. Respuesta: $6.39$.",
    },
    {
      prompt: "Área bajo $y=4-x^2$ en $[-2,2]$.",
      answer: 10.67,
      solution: "$[4x-x^3/3]_{-2}^2=\\left(8-\\tfrac83\\right)-\\left(-8+\\tfrac83\\right)\\approx10.67$. Respuesta: $10.67$.",
    },
  ],
);

const lv17 = L(
  17,
  "Área entre dos curvas",
  "Restando alturas antes de integrar",
  `
### La fórmula

Si $f(x)\\geq g(x)$ en $[a,b]$, el área entre las curvas es:

$$A = \\int_a^b\\big[f(x)-g(x)\\big]\\,dx$$

### Por qué funciona

Piensa en una franja vertical delgada en la posición $x$: su altura es $f(x)-g(x)$ (la distancia entre las dos curvas) y su ancho es $dx$. Sumando (integrando) todas esas franjas obtenemos el área total — la misma idea de Riemann que ya usaste para el área bajo una sola curva, aplicada a la diferencia de alturas.
`,
  [
    {
      prompt: "Área entre $y=x$ y $y=x^2$ en $[0,1]$ (donde $x\\geq x^2$).",
      answer: 0.17,
      solution: "$\\int_0^1(x-x^2)dx=[\\tfrac{x^2}2-\\tfrac{x^3}3]_0^1\\approx0.17$. Respuesta: $0.17$.",
    },
    {
      prompt: "Área entre $y=4$ y $y=x^2$ en $[-2,2]$.",
      answer: 10.67,
      solution: "$\\int_{-2}^2(4-x^2)dx\\approx10.67$ (mismo cálculo del nivel 16). Respuesta: $10.67$.",
    },
    {
      prompt: "Área entre $y=x+2$ y $y=x^2$ en $[-1,2]$ (donde $x+2\\geq x^2$).",
      answer: 4.5,
      solution: "$\\int_{-1}^2(x+2-x^2)dx=4.5$. Respuesta: $4.50$.",
    },
    {
      prompt: "Área entre $y=2x$ y $y=x^2$ en $[0,2]$ (donde $2x\\geq x^2$).",
      answer: 1.33,
      solution: "$\\int_0^2(2x-x^2)dx=[x^2-\\tfrac{x^3}3]_0^2\\approx1.33$. Respuesta: $1.33$.",
    },
    {
      prompt: "Área entre $y=x$ y $y=x^3$ en $[0,1]$ (donde $x\\geq x^3$).",
      answer: 0.25,
      solution: "$\\int_0^1(x-x^3)dx=[\\tfrac{x^2}2-\\tfrac{x^4}4]_0^1=0.25$. Respuesta: $0.25$.",
    },
  ],
);

const lv18 = L(
  18,
  "Regla de sustitución (cambio de variable)",
  "Deshaciendo la regla de la cadena",
  `
### La idea

Si $F'(u)=f(u)$ y $u=g(x)$, la regla de la cadena dice $\\dfrac{d}{dx}\\big[F(g(x))\\big]=f(g(x))\\,g'(x)$. Leyendo esto al revés:

$$\\int f(g(x))\\,g'(x)\\,dx = F(g(x))+C$$

En la práctica: llamamos $u=g(x)$, calculamos $du=g'(x)\\,dx$, reescribimos toda la integral en términos de $u$, integramos, y sustituimos de vuelta.

### Ejemplo

$$\\int 2x(x^2+1)^3\\,dx$$

Sea $u=x^2+1$, $du=2x\\,dx$. La integral se convierte en $\\int u^3\\,du = \\dfrac{u^4}4+C = \\dfrac{(x^2+1)^4}4+C$. Verificación: $\\dfrac{d}{dx}\\left[\\dfrac{(x^2+1)^4}4\\right]=\\dfrac{4(x^2+1)^3}{4}\\cdot2x=2x(x^2+1)^3$ ✓.
`,
  [
    {
      prompt: "$\\displaystyle\\int 2x(x^2+1)^3\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 4,
      solution: "$F(x)=(x^2+1)^4/4$, $F(1)=16/4=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\int 2\\cos(2x)\\,dx$ (con $C=0$). Evalúa en $x=\\pi/4$.",
      answer: 1,
      solution: "$u=2x$: $F(x)=\\sin(2x)$, $F(\\pi/4)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int x\\,e^{x^2}\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      hint: "$u=x^2$, $du=2x\\,dx$, así que $x\\,dx=\\tfrac12du$.",
      answer: 1.36,
      solution: "$F(x)=e^{x^2}/2$, $F(1)=e/2\\approx1.36$. Respuesta: $1.36$.",
    },
    {
      prompt: "$\\displaystyle\\int \\dfrac{2x}{x^2+1}\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 0.69,
      solution: "$u=x^2+1$: $F(x)=\\ln(x^2+1)$, $F(1)=\\ln2\\approx0.69$. Respuesta: $0.69$.",
    },
    {
      prompt: "$\\displaystyle\\int 3x^2(x^3+2)^2\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 9,
      solution: "$u=x^3+2$: $F(x)=(x^3+2)^3/3$, $F(1)=27/3=9$. Respuesta: $9.00$.",
    },
  ],
);

const lv19 = L(
  19,
  "Más práctica de sustitución",
  "Ajustando por una constante que falta",
  `
### Cuando falta un factor constante

A veces, tras elegir $u$, el $du$ que aparece en la integral difiere de lo que necesitas por una constante. No hay problema: multiplica y divide por esa constante.

### Ejemplo

$$\\int x(x^2+1)^3\\,dx$$

Sea $u=x^2+1$, $du=2x\\,dx$, así que $x\\,dx=\\tfrac12du$. La integral se convierte en $\\int u^3\\cdot\\tfrac12du = \\dfrac{u^4}{8} = \\dfrac{(x^2+1)^4}8+C$.
`,
  [
    {
      prompt: "$\\displaystyle\\int x(x^2+1)^3\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 2,
      solution: "$F(x)=(x^2+1)^4/8$, $F(1)=16/8=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\int \\sin(3x)\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: -0.33,
      solution: "$F(x)=-\\cos(3x)/3$, $F(0)=-1/3\\approx-0.33$. Respuesta: $-0.33$.",
    },
    {
      prompt: "$\\displaystyle\\int x^2\\,e^{x^3}\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      hint: "$u=x^3$, $du=3x^2dx$.",
      answer: 0.91,
      solution: "$F(x)=e^{x^3}/3$, $F(1)=e/3\\approx0.91$. Respuesta: $0.91$.",
    },
    {
      prompt: "$\\displaystyle\\int \\dfrac{x}{\\sqrt{x^2+9}}\\,dx$ (con $C=0$). Evalúa en $x=4$.",
      answer: 5,
      solution: "$F(x)=\\sqrt{x^2+9}$, $F(4)=\\sqrt{25}=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$\\displaystyle\\int \\cos x\\,\\sin^3x\\,dx$ (con $C=0$). Evalúa en $x=\\pi/2$.",
      answer: 0.25,
      solution: "$u=\\sin x$: $F(x)=\\sin^4x/4$, $F(\\pi/2)=0.25$. Respuesta: $0.25$.",
    },
  ],
);

const lv20 = L(
  20,
  "Sustitución en integrales definidas",
  "Cambiando también los límites de integración",
  `
### La ventaja de cambiar los límites

En vez de sustituir de vuelta a $x$ al final, podemos **cambiar los límites de integración** a valores de $u$ directamente:

$$\\int_a^b f(g(x))\\,g'(x)\\,dx = \\int_{g(a)}^{g(b)} f(u)\\,du$$

Esto es consecuencia directa del TFC Parte 2: ambos lados son iguales a $F(g(b))-F(g(a))$, donde $F'=f$.

### Ejemplo

$$\\int_0^1 2x(x^2+1)^3\\,dx$$

Con $u=x^2+1$: cuando $x=0$, $u=1$; cuando $x=1$, $u=2$. La integral se convierte en $\\int_1^2 u^3\\,du = \\left[\\dfrac{u^4}4\\right]_1^2 = 4-0.25=3.75$.
`,
  [
    {
      prompt: "$\\displaystyle\\int_0^1 2x(x^2+1)^3\\,dx$.",
      answer: 3.75,
      solution: "$u=x^2+1$: límites $1\\to2$; $[u^4/4]_1^2=3.75$. Respuesta: $3.75$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\pi/2}\\cos x\\,\\sin^2x\\,dx$.",
      answer: 0.33,
      solution: "$u=\\sin x$: límites $0\\to1$; $[u^3/3]_0^1\\approx0.33$. Respuesta: $0.33$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^2 x\\,e^{x^2}\\,dx$.",
      answer: 26.8,
      solution: "$u=x^2$: límites $0\\to4$; $\\tfrac12[e^u]_0^4=\\tfrac12(e^4-1)\\approx26.80$. Respuesta: $26.80$.",
    },
    {
      prompt: "$\\displaystyle\\int_1^2 \\dfrac{2x}{x^2+1}\\,dx$.",
      answer: 0.92,
      solution: "$u=x^2+1$: límites $2\\to5$; $[\\ln u]_2^5=\\ln(2.5)\\approx0.92$. Respuesta: $0.92$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^1 3x^2(x^3+1)^2\\,dx$.",
      answer: 2.33,
      solution: "$u=x^3+1$: límites $1\\to2$; $[u^3/3]_1^2=7/3\\approx2.33$. Respuesta: $2.33$.",
    },
  ],
);

const lv21 = L(
  21,
  "Integración por partes",
  "Deshaciendo la regla del producto",
  `
### Demostración

La regla del producto dice $(uv)'=u'v+uv'$. Integrando ambos lados respecto de $x$:

$$uv = \\int u'v\\,dx + \\int uv'\\,dx$$

Despejando (y usando la notación $du=u'dx$, $dv=v'dx$):

$$\\boxed{\\int u\\,dv = uv - \\int v\\,du}$$

### Ejemplo

$$\\int x\\,e^x\\,dx$$

Elegimos $u=x$ (así $du=dx$) y $dv=e^x\\,dx$ (así $v=e^x$). Entonces:

$$\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C.$$
`,
  [
    {
      prompt: "$\\displaystyle\\int x\\,e^x\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      answer: 0,
      solution: "$F(x)=e^x(x-1)$, $F(1)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int x\\,e^x\\,dx$ (con $C=0$). Evalúa en $x=2$.",
      answer: 7.39,
      solution: "$F(x)=e^x(x-1)$, $F(2)=e^2\\approx7.39$. Respuesta: $7.39$.",
    },
    {
      prompt: "$\\displaystyle\\int x\\sin x\\,dx$ (con $C=0$). Evalúa en $x=\\pi$.",
      hint: "$u=x$, $dv=\\sin x\\,dx$.",
      answer: 3.14,
      solution: "$F(x)=-x\\cos x+\\sin x$, $F(\\pi)=\\pi\\approx3.14$. Respuesta: $3.14$.",
    },
    {
      prompt: "$\\displaystyle\\int\\ln x\\,dx$ (con $C=0$). Evalúa en $x=e$.",
      hint: "$u=\\ln x$, $dv=dx$.",
      answer: 0,
      solution: "$F(x)=x\\ln x-x$, $F(e)=e-e=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int x\\cos x\\,dx$ (con $C=0$). Evalúa en $x=\\pi/2$.",
      answer: 1.57,
      solution: "$F(x)=x\\sin x+\\cos x$, $F(\\pi/2)=\\pi/2\\approx1.57$. Respuesta: $1.57$.",
    },
  ],
);

const lv22 = L(
  22,
  "Más práctica de integración por partes",
  "Cómo elegir $u$ correctamente",
  `
### Una estrategia de elección

Elegir mal $u$ y $dv$ puede complicar la integral en vez de simplificarla. Prueba: en $\\int xe^x\\,dx$, si eliges $u=e^x$ y $dv=x\\,dx$ (al revés de lo usual), obtienes $v=x^2/2$ y:

$$\\int xe^x\\,dx = \\frac{x^2}2e^x - \\int\\frac{x^2}2e^x\\,dx$$

¡La nueva integral es **más complicada**, no más simple! La elección correcta ($u=x$) funciona porque $u'=1$ es más simple que $u$, mientras que $dv=e^xdx$ es fácil de integrar. Una guía útil (orden de prioridad para elegir $u$): **logarítmicas, inversas trigonométricas, algebraicas, trigonométricas, exponenciales** (a menudo recordado por el acrónimo LIATE).
`,
  [
    {
      prompt: "$\\displaystyle\\int_0^1 x\\,e^x\\,dx$.",
      answer: 1,
      solution: "$[e^x(x-1)]_0^1=0-(-1)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\pi} x\\sin x\\,dx$.",
      answer: 3.14,
      solution: "$[-x\\cos x+\\sin x]_0^{\\pi}=\\pi-0=\\pi\\approx3.14$. Respuesta: $3.14$.",
    },
    {
      prompt: "$\\displaystyle\\int_1^e \\ln x\\,dx$.",
      answer: 1,
      solution: "$[x\\ln x-x]_1^e=0-(-1)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\pi/2} x\\cos x\\,dx$.",
      answer: 0.57,
      solution: "$[x\\sin x+\\cos x]_0^{\\pi/2}=\\pi/2-1\\approx0.57$. Respuesta: $0.57$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^1 x\\,e^{2x}\\,dx$.",
      hint: "$u=x$, $dv=e^{2x}dx$, así $v=e^{2x}/2$.",
      answer: 2.1,
      solution: "$\\left[\\tfrac{xe^{2x}}2-\\tfrac{e^{2x}}4\\right]_0^1=\\tfrac{e^2+1}4\\approx2.10$. Respuesta: $2.10$.",
    },
  ],
);

const lv23 = L(
  23,
  "Integración por partes repetida",
  "Cuando una vez no basta",
  `
### Aplicar la regla varias veces

Para $\\int x^2e^x\\,dx$, aplicamos partes dos veces: primero $u=x^2$, $dv=e^xdx$ da $x^2e^x - \\int2xe^x\\,dx$; luego resolvemos $\\int2xe^x\\,dx$ (como en el nivel 21) para obtener finalmente $F(x)=e^x(x^2-2x+2)+C$.

### Un caso especial: la integral que \"se muerde la cola\"

Para $I=\\int e^x\\sin x\\,dx$, aplicar partes dos veces hace que $I$ **reaparezca** en la ecuación:

$$I = e^x\\sin x - \\int e^x\\cos x\\,dx = e^x\\sin x - \\Big(e^x\\cos x + I\\Big)$$

Despejando algebraicamente: $2I = e^x(\\sin x-\\cos x)$, así que:

$$I = \\frac{e^x(\\sin x-\\cos x)}{2}+C$$

Con un procedimiento análogo: $\\displaystyle\\int e^x\\cos x\\,dx = \\dfrac{e^x(\\sin x+\\cos x)}{2}+C$.
`,
  [
    {
      prompt: "$\\displaystyle\\int x^2e^x\\,dx$ (con $C=0$), usando $F(x)=e^x(x^2-2x+2)$. Evalúa en $x=0$.",
      answer: 2,
      solution: "$F(0)=1(0-0+2)=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "Con la misma antiderivada, evalúa en $x=1$.",
      answer: 2.72,
      solution: "$F(1)=e(1-2+2)=e\\approx2.72$. Respuesta: $2.72$.",
    },
    {
      prompt: "$\\displaystyle\\int e^x\\sin x\\,dx$ (con $C=0$), usando $F(x)=\\dfrac{e^x(\\sin x-\\cos x)}2$. Evalúa en $x=0$.",
      answer: -0.5,
      solution: "$F(0)=(0-1)/2=-0.5$. Respuesta: $-0.50$.",
    },
    {
      prompt: "Con la misma antiderivada, evalúa en $x=\\pi$.",
      answer: 11.57,
      solution: "$F(\\pi)=e^{\\pi}(0-(-1))/2=e^{\\pi}/2\\approx11.57$. Respuesta: $11.57$.",
    },
    {
      prompt: "$\\displaystyle\\int e^x\\cos x\\,dx$ (con $C=0$), usando $F(x)=\\dfrac{e^x(\\sin x+\\cos x)}2$. Evalúa en $x=0$.",
      answer: 0.5,
      solution: "$F(0)=(0+1)/2=0.5$. Respuesta: $0.50$.",
    },
  ],
);

const lv24 = L(
  24,
  "Integrales trigonométricas: potencias de seno y coseno",
  "Estrategias según la paridad del exponente",
  `
### Caso: alguna potencia es impar

Separa un factor y usa $\\sin^2x+\\cos^2x=1$ para convertir el resto en la otra función, dejando el factor impar restante como el $du$ de una sustitución.

$$\\int\\sin^3x\\,dx = \\int(1-\\cos^2x)\\sin x\\,dx$$

Con $u=\\cos x$, $du=-\\sin x\\,dx$: $=-\\int(1-u^2)\\,du = -u+\\dfrac{u^3}3+C = -\\cos x+\\dfrac{\\cos^3x}3+C$.

### Caso: ambas potencias son pares

Usa las identidades de reducción de potencia: $\\sin^2x=\\dfrac{1-\\cos2x}2$, $\\cos^2x=\\dfrac{1+\\cos2x}2$ (que se obtienen de las identidades de ángulo doble). Por ejemplo:

$$\\int\\sin^2x\\,dx = \\int\\frac{1-\\cos2x}2\\,dx = \\frac{x}2-\\frac{\\sin2x}4+C$$
`,
  [
    {
      prompt: "$\\displaystyle\\int\\sin^3x\\,dx$ (con $C=0$), usando $F(x)=-\\cos x+\\dfrac{\\cos^3x}3$. Evalúa en $x=\\pi/2$.",
      answer: 0,
      solution: "$F(\\pi/2)=0+0=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "Con la misma antiderivada, evalúa en $x=0$.",
      answer: -0.67,
      solution: "$F(0)=-1+1/3\\approx-0.67$. Respuesta: $-0.67$.",
    },
    {
      prompt: "$\\displaystyle\\int\\cos^3x\\,dx$ (con $C=0$), usando $F(x)=\\sin x-\\dfrac{\\sin^3x}3$. Evalúa en $x=\\pi/2$.",
      answer: 0.67,
      solution: "$F(\\pi/2)=1-1/3\\approx0.67$. Respuesta: $0.67$.",
    },
    {
      prompt: "$\\displaystyle\\int\\sin^2x\\,dx$ (con $C=0$), usando $F(x)=\\dfrac{x}2-\\dfrac{\\sin2x}4$. Evalúa en $x=\\pi/2$.",
      answer: 0.79,
      solution: "$F(\\pi/2)=\\pi/4-0\\approx0.79$. Respuesta: $0.79$.",
    },
    {
      prompt: "$\\displaystyle\\int\\cos^2x\\,dx$ (con $C=0$), usando $F(x)=\\dfrac{x}2+\\dfrac{\\sin2x}4$. Evalúa en $x=\\pi/2$.",
      answer: 0.79,
      solution: "$F(\\pi/2)=\\pi/4+0\\approx0.79$. Respuesta: $0.79$.",
    },
  ],
);

const lv25 = L(
  25,
  "Integrales trigonométricas: potencias de tan y sec",
  "Usando $1+\\tan^2x=\\sec^2x$",
  `
### Piezas básicas

Como ya sabes que $\\dfrac{d}{dx}[\\tan x]=\\sec^2x$, directamente:

$$\\int\\sec^2x\\,dx = \\tan x+C$$

Y usando la identidad pitagórica $1+\\tan^2x=\\sec^2x$:

$$\\int\\tan^2x\\,dx = \\int(\\sec^2x-1)\\,dx = \\tan x - x+C$$

También, como $\\dfrac{d}{dx}[\\sec x]=\\sec x\\tan x$:

$$\\int\\sec x\\tan x\\,dx = \\sec x+C$$
`,
  [
    {
      prompt: "$\\displaystyle\\int\\sec^2x\\,dx$ (con $C=0$). Evalúa en $x=\\pi/4$.",
      answer: 1,
      solution: "$F(x)=\\tan x$, $F(\\pi/4)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int\\tan^2x\\,dx$ (con $C=0$). Evalúa en $x=\\pi/4$.",
      answer: 0.21,
      solution: "$F(x)=\\tan x-x$, $F(\\pi/4)=1-\\pi/4\\approx0.21$. Respuesta: $0.21$.",
    },
    {
      prompt: "$\\displaystyle\\int\\sec x\\tan x\\,dx$ (con $C=0$). Evalúa en $x=\\pi/3$.",
      answer: 2,
      solution: "$F(x)=\\sec x$, $\\sec(\\pi/3)=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "$\\displaystyle\\int(\\sec^2x-1)\\,dx$ (con $C=0$). Evalúa en $x=0$.",
      answer: 0,
      solution: "$F(x)=\\tan x-x$, $F(0)=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int3\\sec^2x\\,dx$ (con $C=0$). Evalúa en $x=\\pi/4$.",
      answer: 3,
      solution: "$F(x)=3\\tan x$, $F(\\pi/4)=3$. Respuesta: $3.00$.",
    },
  ],
);

const lv26 = L(
  26,
  "Sustitución trigonométrica: caso $\\sqrt{a^2-x^2}$",
  "Cuando la sustitución algebraica no basta",
  `
### La sustitución $x=a\\sin\\theta$

Si el integrando contiene $\\sqrt{a^2-x^2}$, la sustitución $x=a\\sin\\theta$ (con $dx=a\\cos\\theta\\,d\\theta$) simplifica la raíz:

$$\\sqrt{a^2-x^2} = \\sqrt{a^2-a^2\\sin^2\\theta} = a\\sqrt{1-\\sin^2\\theta} = a\\cos\\theta$$

(usando $\\cos\\theta\\geq0$ para $\\theta\\in[-\\pi/2,\\pi/2]$).

### Ejemplo

$$\\int\\frac{dx}{\\sqrt{4-x^2}}, \\quad a=2: \\;\\; x=2\\sin\\theta,\\; dx=2\\cos\\theta\\,d\\theta$$

$$= \\int\\frac{2\\cos\\theta\\,d\\theta}{2\\cos\\theta} = \\int d\\theta = \\theta+C = \\arcsin(x/2)+C$$

En general: $\\displaystyle\\int\\frac{dx}{\\sqrt{a^2-x^2}}=\\arcsin(x/a)+C$ (una generalización directa del nivel 8).
`,
  [
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{\\sqrt{4-x^2}}$ (con $C=0$), usando $F(x)=\\arcsin(x/2)$. Evalúa en $x=2$.",
      answer: 1.57,
      solution: "$\\arcsin(1)=\\pi/2\\approx1.57$. Respuesta: $1.57$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{\\sqrt{9-x^2}}$ (con $C=0$), usando $F(x)=\\arcsin(x/3)$. Evalúa en $x=3$.",
      answer: 1.57,
      solution: "$\\arcsin(1)=\\pi/2\\approx1.57$. Respuesta: $1.57$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{\\sqrt{1-x^2}}$ (con $C=0$). Evalúa en $x=0.5$.",
      answer: 0.52,
      solution: "$\\arcsin(0.5)=\\pi/6\\approx0.52$ (coincide con el nivel 8). Respuesta: $0.52$.",
    },
    {
      prompt: "Área bajo $y=\\sqrt{4-x^2}$ en $[-2,2]$ (usa $\\pi\\approx3.14$; es un semicírculo de radio $2$).",
      hint: "Área de un semicírculo: $\\pi r^2/2$.",
      answer: 6.28,
      solution: "$\\pi(4)/2\\approx6.28$. Respuesta: $6.28$.",
    },
    {
      prompt: "Área bajo $y=\\sqrt{9-x^2}$ en $[-3,3]$ (usa $\\pi\\approx3.14$; semicírculo de radio $3$).",
      answer: 14.13,
      solution: "$\\pi(9)/2\\approx14.13$. Respuesta: $14.13$.",
    },
  ],
);

const lv27 = L(
  27,
  "Sustitución trigonométrica: caso $\\sqrt{a^2+x^2}$",
  "La sustitución $x=a\\tan\\theta$",
  `
### La sustitución

Si el integrando contiene $\\sqrt{a^2+x^2}$, usa $x=a\\tan\\theta$, $dx=a\\sec^2\\theta\\,d\\theta$:

$$\\sqrt{a^2+x^2} = \\sqrt{a^2(1+\\tan^2\\theta)} = a\\sec\\theta$$

(usando la identidad $1+\\tan^2\\theta=\\sec^2\\theta$).

### Un resultado muy usado

$$\\int\\frac{dx}{a^2+x^2} = \\frac1a\\arctan\\!\\left(\\frac xa\\right)+C$$

**Demostración por derivación:** $\\dfrac{d}{dx}\\left[\\dfrac1a\\arctan(x/a)\\right] = \\dfrac1a\\cdot\\dfrac{1}{1+(x/a)^2}\\cdot\\dfrac1a = \\dfrac{1}{a^2\\left(1+\\tfrac{x^2}{a^2}\\right)} = \\dfrac1{a^2+x^2}$ ✓. Con $a=1$ recuperamos exactamente la fórmula del nivel 8.
`,
  [
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{4+x^2}$ (con $C=0$), usando $F(x)=\\tfrac12\\arctan(x/2)$. Evalúa en $x=2$.",
      answer: 0.39,
      solution: "$\\tfrac12(\\pi/4)\\approx0.39$. Respuesta: $0.39$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{9+x^2}$ (con $C=0$), usando $F(x)=\\tfrac13\\arctan(x/3)$. Evalúa en $x=3$.",
      answer: 0.26,
      solution: "$\\tfrac13(\\pi/4)\\approx0.26$. Respuesta: $0.26$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{1+x^2}$ (con $C=0$). Evalúa en $x=1$.",
      answer: 0.79,
      solution: "Coincide con el nivel 8: $\\arctan(1)=\\pi/4\\approx0.79$. Respuesta: $0.79$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{16+x^2}$ (con $C=0$), usando $F(x)=\\tfrac14\\arctan(x/4)$. Evalúa en $x=4$.",
      answer: 0.2,
      solution: "$\\tfrac14(\\pi/4)\\approx0.20$. Respuesta: $0.20$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{25+x^2}$ (con $C=0$), usando $F(x)=\\tfrac15\\arctan(x/5)$. Evalúa en $x=5$.",
      answer: 0.16,
      solution: "$\\tfrac15(\\pi/4)\\approx0.16$. Respuesta: $0.16$.",
    },
  ],
);

const lv28 = L(
  28,
  "Sustitución trigonométrica: caso $\\sqrt{x^2-a^2}$",
  "La sustitución $x=a\\sec\\theta$",
  `
### La sustitución

Si el integrando contiene $\\sqrt{x^2-a^2}$, usa $x=a\\sec\\theta$, $dx=a\\sec\\theta\\tan\\theta\\,d\\theta$:

$$\\sqrt{x^2-a^2} = \\sqrt{a^2(\\sec^2\\theta-1)} = a\\tan\\theta$$

(usando $\\sec^2\\theta-1=\\tan^2\\theta$, otra forma de la identidad pitagórica). Este caso, tras trabajar la sustitución completa, produce el siguiente resultado estándar (lo aceptamos, tal como aceptaste otras fórmulas con demostraciones largas en cursos anteriores):

$$\\int\\frac{dx}{\\sqrt{x^2-a^2}} = \\ln\\big|x+\\sqrt{x^2-a^2}\\big|+C$$
`,
  [
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{\\sqrt{x^2-9}}$ (con $C=0$), usando $F(x)=\\ln|x+\\sqrt{x^2-9}|$. Evalúa en $x=5$.",
      hint: "$5^2-9=16$, y $\\sqrt{16}=4$.",
      answer: 2.2,
      solution: "$F(5)=\\ln(5+4)=\\ln9\\approx2.20$. Respuesta: $2.20$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{\\sqrt{x^2-16}}$ (con $C=0$), usando $F(x)=\\ln|x+\\sqrt{x^2-16}|$. Evalúa en $x=5$.",
      answer: 2.08,
      solution: "$F(5)=\\ln(5+3)=\\ln8\\approx2.08$. Respuesta: $2.08$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{\\sqrt{x^2-4}}$ (con $C=0$), usando $F(x)=\\ln|x+\\sqrt{x^2-4}|$. Evalúa en $x=2$.",
      answer: 0.69,
      solution: "$F(2)=\\ln(2+0)=\\ln2\\approx0.69$. Respuesta: $0.69$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{\\sqrt{x^2-1}}$ (con $C=0$), usando $F(x)=\\ln|x+\\sqrt{x^2-1}|$. Evalúa en $x=1$.",
      answer: 0,
      solution: "$F(1)=\\ln(1+0)=\\ln1=0$. Respuesta: $0.00$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{\\sqrt{x^2-9}}$ (con $C=0$), usando $F(x)=\\ln|x+\\sqrt{x^2-9}|$. Evalúa en $x=3$.",
      answer: 1.1,
      solution: "$F(3)=\\ln(3+0)=\\ln3\\approx1.10$. Respuesta: $1.10$.",
    },
  ],
);

const lv29 = L(
  29,
  "Fracciones parciales: factores lineales distintos",
  "Deshaciendo una suma de fracciones",
  `
### La idea

Una fracción racional con denominador factorizado en factores lineales distintos se puede reescribir como una suma de fracciones más simples, cada una fácil de integrar (con la fórmula $\\ln|x-r|$ del nivel 7).

### Ejemplo

$$\\frac{1}{(x-1)(x+2)} = \\frac{A}{x-1}+\\frac{B}{x+2}$$

Multiplicando ambos lados por $(x-1)(x+2)$: $1=A(x+2)+B(x-1)$. Sustituyendo valores convenientes de $x$ (que anulan uno de los términos):

- $x=1$: $1=3A \\Rightarrow A=1/3$.
- $x=-2$: $1=-3B \\Rightarrow B=-1/3$.

Así: $\\displaystyle\\int\\frac{dx}{(x-1)(x+2)} = \\frac13\\ln|x-1|-\\frac13\\ln|x+2|+C$.
`,
  [
    {
      prompt: "Descompón $\\dfrac{1}{(x-1)(x+2)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+2}$. Halla $A$.",
      answer: 0.33,
      solution: "Sustituyendo $x=1$: $A=1/3\\approx0.33$. Respuesta: $0.33$.",
    },
    {
      prompt: "Con la misma descomposición, halla $B$.",
      answer: -0.33,
      solution: "Sustituyendo $x=-2$: $B=-1/3\\approx-0.33$. Respuesta: $-0.33$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{(x-1)(x+2)}$ (con $C=0$), usando $F(x)=\\tfrac13\\ln|x-1|-\\tfrac13\\ln|x+2|$. Evalúa en $x=2$.",
      answer: -0.46,
      solution: "$F(2)=\\tfrac13\\ln1-\\tfrac13\\ln4\\approx-0.46$. Respuesta: $-0.46$.",
    },
    {
      prompt: "Descompón $\\dfrac{5x-1}{(x-2)(x+1)}=\\dfrac{A}{x-2}+\\dfrac{B}{x+1}$. Halla $A$.",
      hint: "Sustituye $x=2$ tras multiplicar ambos lados por $(x-2)(x+1)$.",
      answer: 3,
      solution: "$5(2)-1=9=3A\\Rightarrow A=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "Con la misma descomposición, halla $B$.",
      answer: 2,
      solution: "Sustituyendo $x=-1$: $-6=-3B\\Rightarrow B=2$. Respuesta: $2.00$.",
    },
  ],
);

const lv30 = L(
  30,
  "Fracciones parciales: factores lineales repetidos",
  "Cuando un factor se repite",
  `
### Por qué necesitamos un término por cada potencia

Si el denominador tiene $(x-1)^2$, una sola fracción $\\dfrac{A}{x-1}$ no tiene suficiente flexibilidad para igualar **cualquier** numerador posible. Necesitamos un término por cada potencia:

$$\\frac{1}{(x-1)^2(x+1)} = \\frac{A}{x-1}+\\frac{B}{(x-1)^2}+\\frac{C}{x+1}$$

### Resolviendo

Multiplicando por el denominador común: $1=A(x-1)(x+1)+B(x+1)+C(x-1)^2$.

- $x=1$: $1=2B\\Rightarrow B=0.5$.
- $x=-1$: $1=4C\\Rightarrow C=0.25$.
- Comparando coeficientes de $x^2$ (que debe ser $0$ en el lado izquierdo): $0=A+C\\Rightarrow A=-0.25$.
`,
  [
    {
      prompt: "Con $\\dfrac{1}{(x-1)^2(x+1)}=\\dfrac{A}{x-1}+\\dfrac{B}{(x-1)^2}+\\dfrac{C}{x+1}$, halla $B$.",
      answer: 0.5,
      solution: "Sustituyendo $x=1$: $B=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "Halla $C$.",
      answer: 0.25,
      solution: "Sustituyendo $x=-1$: $C=0.25$. Respuesta: $0.25$.",
    },
    {
      prompt: "Halla $A$.",
      answer: -0.25,
      solution: "Comparando coeficientes de $x^2$: $A=-C=-0.25$. Respuesta: $-0.25$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{1}{(x-1)^2}\\,dx$ (con $C=0$, parte de la descomposición anterior). Evalúa en $x=2$.",
      hint: "$\\int(x-1)^{-2}dx=-(x-1)^{-1}$.",
      answer: -1,
      solution: "$F(x)=-1/(x-1)$, $F(2)=-1$. Respuesta: $-1.00$.",
    },
    {
      prompt: "Con $\\dfrac{2}{x^2(x-2)}=\\dfrac{A}{x}+\\dfrac{B}{x^2}+\\dfrac{C}{x-2}$, halla $B$.",
      hint: "Sustituye $x=0$ tras multiplicar por $x^2(x-2)$.",
      answer: -1,
      solution: "$2=B(0-2)\\Rightarrow B=-1$. Respuesta: $-1.00$.",
    },
  ],
);

const lv31 = L(
  31,
  "Fracciones parciales: factores cuadráticos irreducibles",
  "Cuando el factor no tiene raíces reales",
  `
### Por qué el numerador debe ser lineal

Si el denominador tiene un factor cuadrático irreducible (sin raíces reales, como $x^2+1$), el numerador correspondiente debe ser $Bx+C$ (lineal), no solo una constante — de lo contrario no habría suficientes grados de libertad para igualar cualquier numerador posible.

### Ejemplo

$$\\frac{x}{(x-1)(x^2+1)} = \\frac{A}{x-1}+\\frac{Bx+C}{x^2+1}$$

Multiplicando: $x=A(x^2+1)+(Bx+C)(x-1)$.

- $x=1$: $1=2A\\Rightarrow A=0.5$.
- Comparando coeficientes de $x^2$: $0=A+B\\Rightarrow B=-0.5$.
- Comparando términos constantes: $0=A-C\\Rightarrow C=0.5$.
`,
  [
    {
      prompt: "Con $\\dfrac{x}{(x-1)(x^2+1)}=\\dfrac{A}{x-1}+\\dfrac{Bx+C}{x^2+1}$, halla $A$.",
      answer: 0.5,
      solution: "Sustituyendo $x=1$: $A=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "Halla $B$.",
      answer: -0.5,
      solution: "Comparando coeficientes de $x^2$: $B=-A=-0.5$. Respuesta: $-0.50$.",
    },
    {
      prompt: "Halla $C$.",
      answer: 0.5,
      solution: "Comparando términos constantes: $C=A=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{1}{x^2+1}\\,dx$ (con $C=0$, típico de esta descomposición). Evalúa en $x=1$.",
      answer: 0.79,
      solution: "$\\arctan(1)=\\pi/4\\approx0.79$. Respuesta: $0.79$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{x}{x^2+1}\\,dx$ (con $C=0$, otra pieza típica). Evalúa en $x=1$.",
      hint: "Usa sustitución con $u=x^2+1$.",
      answer: 0.35,
      solution: "$F(x)=\\tfrac12\\ln(x^2+1)$, $F(1)=0.5\\ln2\\approx0.35$. Respuesta: $0.35$.",
    },
  ],
);

const lv32 = L(
  32,
  "Integrales impropias: límites de integración infinitos",
  "Áreas de regiones que se extienden sin fin",
  `
### Definición

$$\\int_a^{\\infty} f(x)\\,dx = \\lim_{t\\to\\infty}\\int_a^t f(x)\\,dx$$

Si el límite existe (es un número finito), decimos que la integral **converge**; si no, **diverge**. Usa tus conocimientos de límites al infinito para evaluarlas.

### Ejemplo: dos casos con resultados opuestos

$$\\int_1^{\\infty}\\frac{1}{x^2}\\,dx = \\lim_{t\\to\\infty}\\left[-\\frac1x\\right]_1^t = \\lim_{t\\to\\infty}\\left(1-\\frac1t\\right) = 1 \\quad(\\text{¡converge!})$$

$$\\int_1^{\\infty}\\frac{1}{x}\\,dx = \\lim_{t\\to\\infty}\\big[\\ln x\\big]_1^t = \\lim_{t\\to\\infty}\\ln t = \\infty \\quad(\\text{diverge})$$

Sorprendentemente, aunque ambas áreas se extienden infinitamente hacia la derecha, una tiene área finita y la otra no.
`,
  [
    {
      prompt: "$\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^2}\\,dx$.",
      answer: 1,
      solution: "$\\lim_{t\\to\\infty}(1-1/t)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x}\\,dx$.",
      answer: "Inf",
      solution: "Diverge a $+\\infty$. Respuesta: Inf.",
    },
    {
      prompt: "$\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^3}\\,dx$.",
      answer: 0.5,
      solution: "$\\lim_{t\\to\\infty}\\left[-\\tfrac1{2x^2}\\right]_1^t=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\infty}e^{-x}\\,dx$.",
      answer: 1,
      solution: "$\\lim_{t\\to\\infty}[-e^{-x}]_0^t=0-(-1)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "¿Converge $\\displaystyle\\int_1^{\\infty}\\dfrac{1}{\\sqrt{x}}\\,dx$? (Si/No)",
      hint: "Compara el exponente de $x$ con el caso $1/x$.",
      answer: "No",
      solution: "El exponente $1/2\\leq1$: diverge, igual que $\\int1/x\\,dx$. Respuesta: `No`.",
    },
  ],
);

const lv33 = L(
  33,
  "Integrales impropias: discontinuidades en el integrando",
  "Cuando la función se dispara dentro del intervalo",
  `
### Definición

Si $f$ tiene una asíntota vertical en $x=c$ (por ejemplo, en el extremo $b=c$), definimos:

$$\\int_a^c f(x)\\,dx = \\lim_{t\\to c^-}\\int_a^t f(x)\\,dx$$

### Ejemplo sorprendente

$$\\int_0^1\\frac{1}{\\sqrt x}\\,dx = \\lim_{t\\to0^+}\\big[2\\sqrt x\\big]_t^1 = 2-0=2 \\quad(\\text{¡converge, aunque } 1/\\sqrt x \\text{ se dispara en } x=0!)$$

$$\\int_0^1\\frac1x\\,dx = \\lim_{t\\to0^+}\\big[\\ln x\\big]_t^1 = 0-\\lim_{t\\to0^+}\\ln t = \\infty \\quad(\\text{diverge})$$

Igual que en el nivel anterior: dos funciones que se disparan cerca del mismo punto pueden tener comportamientos de área completamente distintos.
`,
  [
    {
      prompt: "$\\displaystyle\\int_0^1\\dfrac{1}{\\sqrt{x}}\\,dx$.",
      answer: 2,
      solution: "$\\lim_{t\\to0^+}[2\\sqrt x]_t^1=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "¿Converge $\\displaystyle\\int_0^1\\dfrac1x\\,dx$? (Si/No)",
      answer: "No",
      solution: "Diverge a $+\\infty$. Respuesta: `No`.",
    },
    {
      prompt: "$\\displaystyle\\int_0^1\\dfrac{1}{x^{1/3}}\\,dx$.",
      answer: 1.5,
      solution: "$\\lim_{t\\to0^+}\\left[\\tfrac32x^{2/3}\\right]_t^1=1.5$. Respuesta: $1.50$.",
    },
    {
      prompt: "¿Converge $\\displaystyle\\int_0^1\\dfrac{1}{x^2}\\,dx$? (Si/No)",
      answer: "No",
      solution: "El exponente $\\geq1$: diverge. Respuesta: `No`.",
    },
    {
      prompt: "$\\displaystyle\\int_1^2\\dfrac{1}{\\sqrt{x-1}}\\,dx$ (discontinuidad en $x=1$).",
      answer: 2,
      solution: "$\\lim_{t\\to1^+}[2\\sqrt{x-1}]_t^2=2$. Respuesta: $2.00$.",
    },
  ],
);

const lv34 = L(
  34,
  "Criterio de comparación para integrales impropias",
  "\"Atrapar\" un área desconocida entre dos conocidas",
  `
### El criterio

Si $0\\leq f(x)\\leq g(x)$ para $x\\geq a$:

- Si $\\displaystyle\\int_a^{\\infty}g(x)\\,dx$ **converge**, entonces $\\displaystyle\\int_a^{\\infty}f(x)\\,dx$ **también converge** (está acotada por algo finito).
- Si $\\displaystyle\\int_a^{\\infty}f(x)\\,dx$ **diverge**, entonces $\\displaystyle\\int_a^{\\infty}g(x)\\,dx$ **también diverge** (contiene algo ya infinito).

Es la misma lógica del teorema del sándwich, aplicada a áreas en vez de límites puntuales.

### Ejemplo

¿Converge $\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^2+1}\\,dx$? Como $\\dfrac{1}{x^2+1}<\\dfrac1{x^2}$ para $x\\geq1$, y $\\int_1^{\\infty}\\tfrac1{x^2}dx=1$ converge (nivel 32), por comparación **también converge** la integral original (aunque este método no nos da su valor exacto).
`,
  [
    {
      prompt: "¿Converge $\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^2+1}\\,dx$? (Si/No)",
      hint: "Compara con $1/x^2$.",
      answer: "Si",
      solution: "Es menor que $1/x^2$, que converge. Respuesta: `Sí`.",
    },
    {
      prompt: "¿Converge $\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x-0.5}\\,dx$? (Si/No)",
      hint: "Compara con $1/x$.",
      answer: "No",
      solution: "Es mayor que $1/x$, que diverge. Respuesta: `No`.",
    },
    {
      prompt: "¿Converge $\\displaystyle\\int_1^{\\infty}\\dfrac{2+\\sin x}{x^2}\\,dx$? (Si/No)",
      hint: "$0\\leq2+\\sin x\\leq3$.",
      answer: "Si",
      solution: "Acotada por $3/x^2$, que converge. Respuesta: `Sí`.",
    },
    {
      prompt: "$\\displaystyle\\int_1^{\\infty}\\dfrac{1}{x^2+1}\\,dx$ (valor exacto).",
      answer: 0.79,
      solution: "$\\lim_{t\\to\\infty}[\\arctan x]_1^t=\\pi/2-\\pi/4=\\pi/4\\approx0.79$. Respuesta: $0.79$.",
    },
    {
      prompt: "¿Converge $\\displaystyle\\int_1^{\\infty}\\dfrac{x}{x^2+1}\\,dx$? (Si/No)",
      hint: "Para $x$ grande, esta función se comporta como $1/x$.",
      answer: "No",
      solution: "Se comporta como $1/x$ para $x$ grande: diverge. Respuesta: `No`.",
    },
  ],
);

const lv35 = L(
  35,
  "Repaso mixto de técnicas de integración",
  "Diagnosticando qué técnica usar",
  `
### Antes de integrar, diagnostica

- ¿Hay una función \"dentro\" de otra con su derivada presente? → sustitución (niveles 18-20).
- ¿Es un producto de dos tipos distintos de función (polinomio, log, trig, exponencial)? → por partes (niveles 21-23).
- ¿Aparece $\\sin^m x\\cos^n x$ o $\\tan^m x\\sec^n x$? → identidades trigonométricas (niveles 24-25).
- ¿Hay $\\sqrt{a^2\\pm x^2}$ o $\\sqrt{x^2-a^2}$? → sustitución trigonométrica (niveles 26-28).
- ¿Es una fracción racional con denominador factorizable? → fracciones parciales (niveles 29-31).
- ¿Un límite es infinito o hay una asíntota vertical? → integral impropia (niveles 32-34).

Este nivel mezcla deliberadamente todo lo anterior.
`,
  [
    {
      prompt: "$\\displaystyle\\int 2x\\cos(x^2)\\,dx$ (con $C=0$). Evalúa en $x=\\sqrt{\\pi/2}$.",
      answer: 1,
      solution: "$F(x)=\\sin(x^2)$, $F(\\sqrt{\\pi/2})=\\sin(\\pi/2)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int x\\ln x\\,dx$ (con $C=0$). Evalúa en $x=1$.",
      hint: "$u=\\ln x$, $dv=x\\,dx$.",
      answer: -0.25,
      solution: "$F(x)=\\tfrac{x^2}2\\ln x-\\tfrac{x^2}4$, $F(1)=0-0.25=-0.25$. Respuesta: $-0.25$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{(x-3)(x+1)}$ (con $C=0$). Evalúa en $x=5$.",
      hint: "$\\dfrac{1}{(x-3)(x+1)}=\\dfrac{1/4}{x-3}-\\dfrac{1/4}{x+1}$.",
      answer: -0.27,
      solution: "$F(x)=\\tfrac14\\ln|x-3|-\\tfrac14\\ln|x+1|$, $F(5)\\approx-0.27$. Respuesta: $-0.27$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\pi}\\sin^2x\\,dx$.",
      answer: 1.57,
      solution: "$[\\tfrac x2-\\tfrac{\\sin2x}4]_0^{\\pi}=\\pi/2\\approx1.57$. Respuesta: $1.57$.",
    },
    {
      prompt: "$\\displaystyle\\int_2^{\\infty}\\dfrac{1}{x^3}\\,dx$.",
      answer: 0.13,
      solution: "$\\lim_{t\\to\\infty}\\left[-\\tfrac1{2x^2}\\right]_2^t=1/8=0.125\\approx0.13$. Respuesta: $0.13$.",
    },
  ],
);

const lv36 = L(
  36,
  "Volumen de sólidos de revolución: método de discos",
  "Rebanando el sólido en discos delgados",
  `
### La idea

Si rotamos la región bajo $y=f(x)$ (con $f\\geq0$) en $[a,b]$ alrededor del eje $x$, obtenemos un sólido de revolución. Rebanándolo perpendicular al eje, cada rebanada delgada en la posición $x$ es (aproximadamente) un disco de radio $f(x)$ y grosor $dx$, con volumen $\\pi[f(x)]^2\\,dx$ (área del círculo por el grosor). Sumando (integrando):

$$V = \\pi\\int_a^b [f(x)]^2\\,dx$$

(Misma lógica de Riemann que usaste para área: aproximar con formas simples y tomar el límite.)

### Ejemplo (verificación con una fórmula conocida)

Rota $y=\\sqrt x$ en $[0,4]$: $V=\\pi\\int_0^4x\\,dx=\\pi(8)=8\\pi\\approx25.12$ (usando $\\pi\\approx3.14$).
`,
  [
    {
      prompt: "Rota $y=\\sqrt{x}$ en $[0,4]$ alrededor del eje $x$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 25.12,
      solution: "$V=\\pi\\int_0^4x\\,dx=8\\pi\\approx25.12$. Respuesta: $25.12$.",
    },
    {
      prompt: "Rota $y=x$ en $[0,2]$ alrededor del eje $x$ (un cono). Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 8.37,
      solution: "$V=\\pi\\int_0^2x^2dx=\\tfrac{8}3\\pi\\approx8.37$. Respuesta: $8.37$.",
    },
    {
      prompt: "Rota $y=2$ (constante) en $[0,3]$ alrededor del eje $x$ (un cilindro). Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 37.68,
      solution: "$V=\\pi\\int_0^3 4\\,dx=12\\pi\\approx37.68$. Respuesta: $37.68$.",
    },
    {
      prompt: "Rota $y=x^2$ en $[0,1]$ alrededor del eje $x$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 0.63,
      solution: "$V=\\pi\\int_0^1x^4dx=\\tfrac{\\pi}5\\approx0.63$. Respuesta: $0.63$.",
    },
    {
      prompt: "Rota $y=\\sqrt{9-x^2}$ en $[0,3]$ alrededor del eje $x$ (una media esfera de radio $3$). Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 56.52,
      solution: "$V=\\pi\\int_0^3(9-x^2)dx=18\\pi\\approx56.52$. Respuesta: $56.52$.",
    },
  ],
);

const lv37 = L(
  37,
  "Volumen de sólidos de revolución: método de arandelas",
  "Discos con un agujero",
  `
### La idea

Si la región entre dos curvas $f(x)\\geq g(x)\\geq0$ se rota alrededor del eje $x$, cada rebanada es una **arandela** (disco con un agujero): área $=\\pi[f(x)]^2-\\pi[g(x)]^2$. Integrando:

$$V = \\pi\\int_a^b\\Big([f(x)]^2-[g(x)]^2\\Big)\\,dx$$
`,
  [
    {
      prompt: "Región entre $y=x$ y $y=x^2$ en $[0,1]$, rotada alrededor del eje $x$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 0.42,
      solution: "$V=\\pi\\int_0^1(x^2-x^4)dx=\\tfrac{2}{15}\\pi\\approx0.42$. Respuesta: $0.42$.",
    },
    {
      prompt: "Región entre $y=2$ y $y=x$ en $[0,2]$, rotada alrededor del eje $x$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 16.75,
      solution: "$V=\\pi\\int_0^2(4-x^2)dx=\\tfrac{16}3\\pi\\approx16.75$. Respuesta: $16.75$.",
    },
    {
      prompt: "Región entre $y=3$ y $y=x^2$ en $[0,1]$, rotada alrededor del eje $x$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 27.63,
      solution: "$V=\\pi\\int_0^1(9-x^4)dx=8.8\\pi\\approx27.63$. Respuesta: $27.63$.",
    },
    {
      prompt: "Región entre $y=x+1$ y $y=1$ en $[0,2]$, rotada alrededor del eje $x$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 20.93,
      solution: "$V=\\pi\\int_0^2\\big[(x+1)^2-1\\big]dx=\\tfrac{20}3\\pi\\approx20.93$. Respuesta: $20.93$.",
    },
    {
      prompt: "Región entre $y=\\sqrt{x}$ y $y=x$ en $[0,1]$, rotada alrededor del eje $x$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 0.52,
      solution: "$V=\\pi\\int_0^1(x-x^2)dx=\\tfrac{\\pi}6\\approx0.52$. Respuesta: $0.52$.",
    },
  ],
);

const lv38 = L(
  38,
  "Volumen de sólidos de revolución: método de capas",
  "Rebanando en cilindros concéntricos",
  `
### La idea

Cuando rotamos alrededor del **eje $y$**, a veces es más natural rebanar en capas cilíndricas verticales en vez de discos horizontales. Una franja delgada en la posición $x$, de altura $f(x)$ y grosor $dx$, al rotar alrededor del eje $y$ forma una capa cilíndrica delgada de radio $x$, altura $f(x)$ y grosor $dx$. \"Desenrollando\" esa capa (como una etiqueta de lata), su volumen es aproximadamente (circunferencia)(altura)(grosor) $=2\\pi x f(x)\\,dx$. Integrando:

$$V = 2\\pi\\int_a^b x\\,f(x)\\,dx$$

### Ejemplo

Región bajo $y=x^2$ en $[0,2]$, rotada alrededor del eje $y$: $V=2\\pi\\int_0^2x^3dx=2\\pi(4)=8\\pi\\approx25.12$.
`,
  [
    {
      prompt: "Región bajo $y=x^2$ en $[0,2]$, rotada alrededor del eje $y$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 25.12,
      solution: "$V=2\\pi\\int_0^2x^3dx=8\\pi\\approx25.12$. Respuesta: $25.12$.",
    },
    {
      prompt: "Región bajo $y=x$ en $[0,3]$, rotada alrededor del eje $y$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 56.52,
      solution: "$V=2\\pi\\int_0^3x^2dx=18\\pi\\approx56.52$. Respuesta: $56.52$.",
    },
    {
      prompt: "Región bajo $y=1$ (constante) en $[0,2]$, rotada alrededor del eje $y$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 12.56,
      solution: "$V=2\\pi\\int_0^2x\\,dx=4\\pi\\approx12.56$. Respuesta: $12.56$.",
    },
    {
      prompt: "Región bajo $y=\\sqrt{x}$ en $[0,1]$, rotada alrededor del eje $y$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 2.51,
      solution: "$V=2\\pi\\int_0^1x^{3/2}dx=0.8\\pi\\approx2.51$. Respuesta: $2.51$.",
    },
    {
      prompt: "Región bajo $y=4-x^2$ en $[0,2]$, rotada alrededor del eje $y$. Halla el volumen (usa $\\pi\\approx3.14$).",
      answer: 25.12,
      solution: "$V=2\\pi\\int_0^2(4x-x^3)dx=8\\pi\\approx25.12$. Respuesta: $25.12$.",
    },
  ],
);

const lv39 = L(
  39,
  "Longitud de arco",
  "Midiendo una curva con segmentos infinitesimales",
  `
### La fórmula

Aproximamos la curva $y=f(x)$ en $[a,b]$ con muchos segmentos rectos cortos. Un segmento de $x_i$ a $x_{i+1}$ tiene longitud:

$$\\sqrt{(\\Delta x)^2+(\\Delta y)^2} = \\sqrt{1+\\left(\\frac{\\Delta y}{\\Delta x}\\right)^2}\\,\\Delta x$$

En el límite, $\\Delta y/\\Delta x \\to f'(x)$, y sumando (integrando) todos los segmentos:

$$L = \\int_a^b\\sqrt{1+[f'(x)]^2}\\,dx$$

### Verificación con una recta

Para $y=2x$ en $[0,3]$: $f'(x)=2$, $L=\\int_0^3\\sqrt5\\,dx=3\\sqrt5\\approx6.71$. Comparemos con la fórmula de distancia directa entre $(0,0)$ y $(3,6)$: $\\sqrt{3^2+6^2}=\\sqrt{45}=3\\sqrt5$ ✓. ¡Coincide exactamente!
`,
  [
    {
      prompt: "Longitud de $y=2x$ de $x=0$ a $x=3$.",
      answer: 6.71,
      solution: "$L=3\\sqrt5\\approx6.71$ (coincide con la fórmula de distancia). Respuesta: $6.71$.",
    },
    {
      prompt: "Longitud de $y=3x+1$ de $x=0$ a $x=2$.",
      answer: 6.32,
      solution: "$f'=3$, $L=\\int_0^2\\sqrt{10}dx=2\\sqrt{10}\\approx6.32$. Respuesta: $6.32$.",
    },
    {
      prompt: "Longitud de $y=x$ de $x=0$ a $x=5$.",
      answer: 7.07,
      solution: "$f'=1$, $L=\\int_0^5\\sqrt2dx=5\\sqrt2\\approx7.07$. Respuesta: $7.07$.",
    },
    {
      prompt: "Longitud de $y=\\dfrac23x^{3/2}$ de $x=0$ a $x=3$.",
      hint: "$f'(x)=\\sqrt{x}$, así que el integrando es $\\sqrt{1+x}$.",
      answer: 4.67,
      solution: "$L=\\int_0^3\\sqrt{1+x}\\,dx=\\left[\\tfrac23(1+x)^{3/2}\\right]_0^3=\\tfrac23(7)\\approx4.67$. Respuesta: $4.67$.",
    },
    {
      prompt: "Longitud de $y=5$ (constante) de $x=0$ a $x=4$.",
      answer: 4,
      solution: "$f'=0$, $L=\\int_0^4 1\\,dx=4$. Respuesta: $4.00$.",
    },
  ],
);

const lv40 = L(
  40,
  "Valor promedio de una función",
  "Generalizando el promedio a un continuo de valores",
  `
### La fórmula

$$\\bar f = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$$

Esta es la generalización natural del promedio de una lista finita de números: con una suma de Riemann usando $n$ muestras, el promedio sería $\\tfrac1n\\sum f(x_i)$; como $\\Delta x=(b-a)/n$, esto es $\\tfrac{1}{b-a}\\sum f(x_i)\\Delta x$, que tiende exactamente a la fórmula de arriba cuando $n\\to\\infty$.

### Teorema del Valor Medio para Integrales

Si $f$ es continua en $[a,b]$, existe $c\\in[a,b]$ con $f(c)=\\bar f$ — un análogo directo del Teorema del Valor Medio de derivadas, demostrable combinando el TFC con ese mismo teorema aplicado a la antiderivada de $f$.
`,
  [
    {
      prompt: "Valor promedio de $f(x)=x^2$ en $[0,3]$.",
      answer: 3,
      solution: "$\\tfrac13\\int_0^3x^2dx=\\tfrac13(9)=3$. Respuesta: $3.00$.",
    },
    {
      prompt: "Valor promedio de $f(x)=x$ en $[0,4]$.",
      answer: 2,
      solution: "$\\tfrac14\\int_0^4x\\,dx=\\tfrac14(8)=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "Valor promedio de $f(x)=\\sin x$ en $[0,\\pi]$.",
      answer: 0.64,
      solution: "$\\tfrac1{\\pi}\\int_0^{\\pi}\\sin x\\,dx=\\tfrac2{\\pi}\\approx0.64$. Respuesta: $0.64$.",
    },
    {
      prompt: "Valor promedio de $f(x)=e^x$ en $[0,1]$.",
      answer: 1.72,
      solution: "$\\int_0^1e^xdx=e-1\\approx1.72$. Respuesta: $1.72$.",
    },
    {
      prompt: "Valor promedio de $f(x)=4$ (constante) en $[0,10]$.",
      answer: 4,
      solution: "Una función constante siempre es su propio promedio. Respuesta: $4.00$.",
    },
  ],
);

const lv41 = L(
  41,
  "Aplicaciones físicas: trabajo",
  "Sumando el efecto de una fuerza que cambia",
  `
### La fórmula

El trabajo realizado por una fuerza variable $F(x)$ al mover un objeto de $x=a$ a $x=b$ es:

$$W = \\int_a^b F(x)\\,dx$$

Esto generaliza la fórmula elemental $W=F\\cdot d$ (para fuerza constante): dividimos el desplazamiento en tramos pequeños donde la fuerza es aproximadamente constante, sumamos (Riemann), y tomamos el límite.

### Ejemplo (Ley de Hooke para resortes)

Un resorte con $F(x)=200x$ (N), estirado de $x=0$ a $x=0.1$ m: $W=\\int_0^{0.1}200x\\,dx=100(0.01)=1$ J.
`,
  [
    {
      prompt: "Resorte con $F(x)=200x$ (N), estirado de $x=0$ a $x=0.1$ m. Halla el trabajo (J).",
      answer: 1,
      solution: "$W=100[x^2]_0^{0.1}=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "Resorte con $F(x)=100x$, estirado de $x=0$ a $x=0.5$ m. Halla el trabajo (J).",
      answer: 12.5,
      solution: "$W=50[x^2]_0^{0.5}=12.5$. Respuesta: $12.50$.",
    },
    {
      prompt: "Fuerza constante $F(x)=10$ N, aplicada de $x=0$ a $x=5$ m. Halla el trabajo (J).",
      answer: 50,
      solution: "$W=10(5)=50$. Respuesta: $50.00$.",
    },
    {
      prompt: "$F(x)=3x^2$ (N), de $x=0$ a $x=2$ m. Halla el trabajo (J).",
      answer: 8,
      solution: "$W=[x^3]_0^2=8$. Respuesta: $8.00$.",
    },
    {
      prompt: "Resorte con $F(x)=50x$, estirado de $x=0.1$ a $x=0.2$ m. Halla el trabajo (J).",
      answer: 0.75,
      solution: "$W=25[x^2]_{0.1}^{0.2}=25(0.03)=0.75$. Respuesta: $0.75$.",
    },
  ],
);

const lv42 = L(
  42,
  "Ecuaciones diferenciales separables",
  "Cuando $x$ e $y$ se pueden separar",
  `
### La técnica

Una ecuación de la forma $\\dfrac{dy}{dx}=f(x)g(y)$ es **separable**: podemos reorganizarla como $\\dfrac{1}{g(y)}\\,dy = f(x)\\,dx$ e integrar cada lado por separado.

### Por qué funciona

Esto no es más que la regla de sustitución (nivel 18) leída al revés: si pensamos en $y$ como función de $x$, integrar $\\tfrac1{g(y)}\\tfrac{dy}{dx}$ respecto de $x$ es, por sustitución con $u=y(x)$, lo mismo que integrar $\\tfrac1{g(y)}$ respecto de $y$.

### Ejemplo

$\\dfrac{dy}{dx}=2xy$. Separando: $\\dfrac{dy}{y}=2x\\,dx$. Integrando: $\\ln|y|=x^2+C$, así que $y=Ae^{x^2}$. Si $y(0)=3$, entonces $A=3$: $y=3e^{x^2}$.
`,
  [
    {
      prompt: "$\\dfrac{dy}{dx}=2xy$, $y(0)=3$. Halla $y(1)$.",
      answer: 8.15,
      solution: "$y=3e^{x^2}$, $y(1)=3e\\approx8.15$. Respuesta: $8.15$.",
    },
    {
      prompt: "$\\dfrac{dy}{dx}=y$, $y(0)=1$. Halla $y(2)$.",
      answer: 7.39,
      solution: "$y=e^x$, $y(2)=e^2\\approx7.39$. Respuesta: $7.39$.",
    },
    {
      prompt: "$\\dfrac{dy}{dx}=-2y$, $y(0)=5$. Halla $y(1)$.",
      answer: 0.68,
      solution: "$y=5e^{-2x}$, $y(1)=5e^{-2}\\approx0.68$. Respuesta: $0.68$.",
    },
    {
      prompt: "$\\dfrac{dy}{dx}=3x^2$, $y(0)=1$. Halla $y(2)$.",
      answer: 9,
      solution: "$y=x^3+1$, $y(2)=9$. Respuesta: $9.00$.",
    },
    {
      prompt: "$\\dfrac{dy}{dx}=\\dfrac{x}{y}$, $y(0)=2$ (con $y>0$). Halla $y(3)$.",
      hint: "Separa: $y\\,dy=x\\,dx$, integra ambos lados y despeja $y$.",
      answer: 3.61,
      solution: "$y^2=x^2+4$, $y(3)=\\sqrt{13}\\approx3.61$. Respuesta: $3.61$.",
    },
  ],
);

const lv43 = L(
  43,
  "Crecimiento y decaimiento exponencial",
  "La aplicación más común de las ecuaciones separables",
  `
### El modelo

Muchos procesos satisfacen $\\dfrac{dy}{dt}=ky$ (la tasa de cambio es proporcional a la cantidad actual): poblaciones, desintegración radiactiva, interés compuesto continuo. Resolviéndola como en el nivel 42, la solución **siempre** tiene la forma:

$$y = y_0\\,e^{kt}$$

Si $k>0$: crecimiento exponencial. Si $k<0$: decaimiento exponencial.

### Vida media

Para decaimiento, la vida media $T$ (tiempo para reducirse a la mitad) satisface $\\tfrac12 y_0 = y_0e^{kT}$, así que $e^{kT}=0.5$, es decir $kT=\\ln(0.5)=-\\ln2$, y:

$$T = \\frac{\\ln2}{|k|}$$
`,
  [
    {
      prompt: "Una población crece según $y=y_0e^{0.1t}$, con $y_0=100$. Halla $y(10)$.",
      answer: 271.83,
      solution: "$y(10)=100e^1\\approx271.83$. Respuesta: $271.83$.",
    },
    {
      prompt: "Con la misma fórmula, halla $y(0)$.",
      answer: 100,
      solution: "$y(0)=100$. Respuesta: $100.00$.",
    },
    {
      prompt: "Una sustancia decae según $y=y_0e^{-0.5t}$, con $y_0=80$. Halla $y(2)$.",
      answer: 29.43,
      solution: "$y(2)=80e^{-1}\\approx29.43$. Respuesta: $29.43$.",
    },
    {
      prompt: "Vida media de una sustancia con $k=-0.1$ (usa $T=\\ln2/|k|$, $\\ln2\\approx0.69$).",
      answer: 6.93,
      solution: "$T=0.69/0.1\\approx6.93$. Respuesta: $6.93$.",
    },
    {
      prompt: "Si una población se duplica en $10$ años, halla la tasa de crecimiento $k$.",
      hint: "Resuelve $2=e^{10k}$.",
      answer: 0.07,
      solution: "$k=\\ln2/10\\approx0.07$. Respuesta: $0.07$.",
    },
  ],
);

const lv44 = L(
  44,
  "Integración numérica: la regla del trapecio",
  "Aproximando cuando no hay antiderivada a la mano",
  `
### La idea

En vez de aproximar cada rebanada con un rectángulo (Riemann), usamos un **trapecio**, que se ajusta mejor a una curva: área de un trapecio $=\\dfrac{\\Delta x}2\\big[f(x_i)+f(x_{i+1})\\big]$. Sumando sobre $n$ subintervalos (los puntos interiores se cuentan dos veces, porque son compartidos por dos trapecios consecutivos):

$$T_n = \\frac{\\Delta x}{2}\\Big[f(x_0)+2f(x_1)+\\cdots+2f(x_{n-1})+f(x_n)\\Big]$$

### Ejemplo

$\\int_0^2x^2dx$ con $n=4$ ($\\Delta x=0.5$; alturas $0,0.25,1,2.25,4$):

$$T_4 = \\frac{0.5}2\\big[0+2(0.25)+2(1)+2(2.25)+4\\big] = 0.25(11)=2.75$$

(el valor exacto es $8/3\\approx2.67$: una aproximación bastante cercana).
`,
  [
    {
      prompt: "Aproxima $\\int_0^2 x^2\\,dx$ con la regla del trapecio, $n=4$.",
      answer: 2.75,
      solution: "$T_4=2.75$ (calculado en el ejemplo). Respuesta: $2.75$.",
    },
    {
      prompt: "Aproxima $\\int_0^4 x\\,dx$ con la regla del trapecio, $n=4$.",
      answer: 8,
      solution: "$T_4=\\tfrac12[0+2+4+6+4]=8$ (exacto, porque $f$ es lineal). Respuesta: $8.00$.",
    },
    {
      prompt: "Aproxima $\\int_0^2 x^3\\,dx$ con la regla del trapecio, $n=2$.",
      answer: 5,
      solution: "$T_2=\\tfrac12[0+2(1)+8]=5$ (el valor exacto es $4$; nota la sobreestimación). Respuesta: $5.00$.",
    },
    {
      prompt: "Aproxima $\\int_1^3 \\dfrac1x\\,dx$ con la regla del trapecio, $n=2$.",
      answer: 1.17,
      solution: "$T_2=\\tfrac12[1+2(0.5)+0.333]\\approx1.17$. Respuesta: $1.17$.",
    },
    {
      prompt: "Aproxima $\\int_0^1 x^2\\,dx$ con la regla del trapecio, $n=2$.",
      answer: 0.38,
      solution: "$T_2=0.25[0+2(0.25)+1]=0.375\\approx0.38$. Respuesta: $0.38$.",
    },
  ],
);

const lv45 = L(
  45,
  "Integración numérica: la regla de Simpson",
  "Ajustando parábolas en vez de rectas",
  `
### La idea

En lugar de conectar puntos con rectas (trapecios), Simpson ajusta una **parábola** a cada terna de puntos consecutivos y calcula el área bajo esa parábola exactamente (una parábola tiene una fórmula de área cerrada muy simple). Esto da una aproximación mucho mejor para curvas suaves. Requiere $n$ par:

$$S_n = \\frac{\\Delta x}{3}\\Big[f(x_0)+4f(x_1)+2f(x_2)+4f(x_3)+\\cdots+4f(x_{n-1})+f(x_n)\\Big]$$

(coeficientes alternando $4,2,4,2,\\ldots,4$, con extremos de coeficiente $1$).

### Ejemplo

$\\int_0^2x^2dx$ con $n=4$: $S_4=\\tfrac{0.5}3[0+4(0.25)+2(1)+4(2.25)+4]=\\tfrac16(16)\\approx2.67$ — ¡coincide **exactamente** con el valor real $8/3$! Esto no es casualidad: Simpson es exacto para cualquier polinomio de grado $\\leq3$.
`,
  [
    {
      prompt: "Aproxima $\\int_0^2 x^2\\,dx$ con Simpson, $n=4$.",
      answer: 2.67,
      solution: "$S_4\\approx2.67$ (exacto). Respuesta: $2.67$.",
    },
    {
      prompt: "Aproxima $\\int_0^2 x^3\\,dx$ con Simpson, $n=2$.",
      answer: 4,
      solution: "$S_2=\\tfrac13[0+4(1)+8]=4$ (exacto, Simpson es exacto para cúbicas). Respuesta: $4.00$.",
    },
    {
      prompt: "Aproxima $\\int_0^4 x\\,dx$ con Simpson, $n=4$.",
      answer: 8,
      solution: "$S_4=\\tfrac13[0+4+4+12+4]=8$ (exacto). Respuesta: $8.00$.",
    },
    {
      prompt: "Aproxima $\\int_1^3 \\dfrac1x\\,dx$ con Simpson, $n=2$.",
      answer: 1.11,
      solution: "$S_2=\\tfrac13[1+2+0.333]\\approx1.11$. Respuesta: $1.11$.",
    },
    {
      prompt: "Aproxima $\\int_0^1 x^4\\,dx$ con Simpson, $n=2$.",
      hint: "El valor exacto es $0.2$; aquí Simpson ya no es exacto porque el grado supera $3$.",
      answer: 0.21,
      solution: "$S_2=\\tfrac16[0+4(0.0625)+1]\\approx0.21$. Respuesta: $0.21$.",
    },
  ],
);

const lv46 = L(
  46,
  "Área en coordenadas polares",
  "Sumando sectores circulares infinitesimales",
  `
### La fórmula

En coordenadas polares, una \"rebanada\" angosta con ángulo $d\\theta$ y radio $r(\\theta)$ es aproximadamente un sector circular, cuya área es $\\tfrac12r^2\\theta$ (la fórmula del sector, aplicada a un ángulo infinitesimal). Sumando (integrando) sobre $\\theta$:

$$A = \\frac12\\int_{\\alpha}^{\\beta} [r(\\theta)]^2\\,d\\theta$$

### Verificación con un círculo completo

$r=3$ (constante) con $\\theta$ de $0$ a $2\\pi$: $A=\\tfrac12\\int_0^{2\\pi}9\\,d\\theta=\\tfrac12(9)(2\\pi)=9\\pi\\approx28.26$ (usando $\\pi\\approx3.14$) — coincide con la fórmula conocida $\\pi r^2=9\\pi$ ✓.
`,
  [
    {
      prompt: "Área de un círculo $r=3$ ($\\theta$ de $0$ a $2\\pi$). Usa $\\pi\\approx3.14$.",
      answer: 28.26,
      solution: "$A=9\\pi\\approx28.26$. Respuesta: $28.26$.",
    },
    {
      prompt: "Área de la región $r=2\\cos\\theta$ para $\\theta\\in[-\\pi/2,\\pi/2]$ (un círculo de área $\\pi$). Usa $\\pi\\approx3.14$.",
      answer: 3.14,
      solution: "$A=\\tfrac12\\int_{-\\pi/2}^{\\pi/2}4\\cos^2\\theta\\,d\\theta=\\pi\\approx3.14$. Respuesta: $3.14$.",
    },
    {
      prompt: "Área del sector de un círculo $r=4$ para $\\theta\\in[0,\\pi/2]$ (un cuarto de círculo). Usa $\\pi\\approx3.14$.",
      answer: 12.56,
      solution: "$A=\\tfrac12\\int_0^{\\pi/2}16\\,d\\theta=4\\pi\\approx12.56$. Respuesta: $12.56$.",
    },
    {
      prompt: "Área de la espiral $r=\\theta$ para $\\theta\\in[0,\\pi]$. Usa $\\pi\\approx3.14$.",
      answer: 5.16,
      solution: "$A=\\tfrac12\\int_0^{\\pi}\\theta^2d\\theta=\\tfrac{\\pi^3}6\\approx5.16$. Respuesta: $5.16$.",
    },
    {
      prompt: "Área de un círculo $r=1$ completo. Usa $\\pi\\approx3.14$.",
      answer: 3.14,
      solution: "$A=\\pi\\approx3.14$. Respuesta: $3.14$.",
    },
  ],
);

const lv47 = L(
  47,
  "Longitud de arco en forma paramétrica",
  "Generalizando la fórmula del nivel 39",
  `
### La fórmula

Para una curva $x=x(t)$, $y=y(t)$, cada segmento corto de la curva tiene longitud $\\sqrt{(\\Delta x)^2+(\\Delta y)^2}=\\sqrt{\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2}\\,\\Delta t$. Integrando:

$$L = \\int_{t_1}^{t_2}\\sqrt{\\left(\\frac{dx}{dt}\\right)^2+\\left(\\frac{dy}{dt}\\right)^2}\\,dt$$

(Esta es la generalización natural de la fórmula del nivel 39, que era el caso particular $x=t$.)

### Verificación con un círculo

$x=3\\cos t$, $y=3\\sin t$, $t\\in[0,2\\pi]$: $\\left(\\tfrac{dx}{dt}\\right)^2+\\left(\\tfrac{dy}{dt}\\right)^2=9\\sin^2t+9\\cos^2t=9$. $L=\\int_0^{2\\pi}3\\,dt=6\\pi\\approx18.84$ (usando $\\pi\\approx3.14$) — ¡coincide con la fórmula de la circunferencia $2\\pi r=6\\pi$!
`,
  [
    {
      prompt: "Circunferencia de $x=3\\cos t,\\,y=3\\sin t$, $t\\in[0,2\\pi]$. Usa $\\pi\\approx3.14$.",
      answer: 18.84,
      solution: "$L=6\\pi\\approx18.84$. Respuesta: $18.84$.",
    },
    {
      prompt: "Longitud de $x=2\\cos t,\\,y=2\\sin t$, $t\\in[0,\\pi]$ (medio círculo de radio $2$). Usa $\\pi\\approx3.14$.",
      answer: 6.28,
      solution: "$L=\\int_0^{\\pi}2\\,dt=2\\pi\\approx6.28$. Respuesta: $6.28$.",
    },
    {
      prompt: "$x=3t,\\,y=4t$, $t\\in[0,1]$ (una recta). Halla su longitud.",
      hint: "Compara con la distancia directa entre $(0,0)$ y $(3,4)$.",
      answer: 5,
      solution: "$\\sqrt{9+16}=5$, $L=\\int_0^1 5\\,dt=5$. Respuesta: $5.00$.",
    },
    {
      prompt: "$x=\\cos t,\\,y=\\sin t$, $t\\in[0,\\pi/2]$ (un cuarto de círculo unitario). Usa $\\pi\\approx3.14$.",
      answer: 1.57,
      solution: "$L=\\int_0^{\\pi/2}1\\,dt=\\pi/2\\approx1.57$. Respuesta: $1.57$.",
    },
    {
      prompt: "$x=5\\cos t,\\,y=5\\sin t$, $t\\in[0,2\\pi/3]$ (arco de $120°$ de un círculo de radio $5$). Usa $\\pi\\approx3.14$.",
      answer: 10.47,
      solution: "$L=\\int_0^{2\\pi/3}5\\,dt=\\tfrac{10\\pi}3\\approx10.47$. Respuesta: $10.47$.",
    },
  ],
);

const lv48 = L(
  48,
  "Centro de masa y momentos",
  "Un promedio ponderado por la altura de la función",
  `
### La fórmula

Para una lámina delgada bajo $y=f(x)$ en $[a,b]$ (densidad uniforme), la coordenada $x$ de su centro de masa (centroide) es:

$$\\bar x = \\frac{\\displaystyle\\int_a^b x\\,f(x)\\,dx}{\\displaystyle\\int_a^b f(x)\\,dx}$$

El numerador (llamado **momento** respecto al eje $y$) pondera cada franja delgada por su posición $x$; el denominador es el área total. Es exactamente la misma idea que el valor promedio (nivel 40), pero ahora ponderado por $f(x)$ en vez de uniformemente.

### Ejemplo

Región bajo $y=x$ en $[0,2]$: numerador $=\\int_0^2x^2dx=8/3$; denominador $=\\int_0^2x\\,dx=2$; $\\bar x=(8/3)/2=4/3\\approx1.33$.
`,
  [
    {
      prompt: "Región bajo $y=x$ en $[0,2]$. Halla $\\bar x$.",
      answer: 1.33,
      solution: "$\\bar x=(8/3)/2\\approx1.33$. Respuesta: $1.33$.",
    },
    {
      prompt: "Región bajo $y=1$ (constante) en $[0,4]$. Halla $\\bar x$.",
      answer: 2,
      solution: "$\\bar x=8/4=2$: el punto medio, como era de esperar en un rectángulo. Respuesta: $2.00$.",
    },
    {
      prompt: "Región bajo $y=x^2$ en $[0,1]$. Halla $\\bar x$.",
      answer: 0.75,
      solution: "$\\bar x=0.25/(1/3)=0.75$. Respuesta: $0.75$.",
    },
    {
      prompt: "Región bajo $y=2x$ en $[0,3]$. Halla $\\bar x$.",
      answer: 2,
      solution: "$\\bar x=18/9=2$. Respuesta: $2.00$.",
    },
    {
      prompt: "Región bajo $y=\\sqrt{x}$ en $[0,4]$. Halla $\\bar x$.",
      answer: 2.4,
      solution: "$\\bar x=12.8/5.333\\approx2.4$. Respuesta: $2.40$.",
    },
  ],
);

const lv49 = L(
  49,
  "Repaso mixto general",
  "Todas las ideas del mundo de las integrales, juntas",
  `
### Antes de resolver, identifica el tipo de problema

¿Es una integral indefinida simple? ¿Requiere sustitución o partes? ¿Es una integral definida que representa un área, un volumen, o un valor promedio? ¿Es impropia? Este nivel mezcla deliberadamente todos los bloques del mundo.
`,
  [
    {
      prompt: "$\\displaystyle\\int_0^2(3x^2-2x)\\,dx$.",
      answer: 4,
      solution: "$[x^3-x^2]_0^2=8-4=4$. Respuesta: $4.00$.",
    },
    {
      prompt: "$\\displaystyle\\int x\\sin(x^2)\\,dx$ (con $C=0$). Evalúa en $x=\\sqrt{\\pi}$.",
      hint: "$u=x^2$.",
      answer: 0.5,
      solution: "$F(x)=-\\tfrac12\\cos(x^2)$, $F(\\sqrt\\pi)=-\\tfrac12\\cos(\\pi)=0.5$. Respuesta: $0.50$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^1 x\\,e^x\\,dx$.",
      answer: 1,
      solution: "$[e^x(x-1)]_0^1=0-(-1)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int_1^{\\infty}\\dfrac1{x^2}\\,dx$.",
      answer: 1,
      solution: "Converge a $1$ (nivel 32). Respuesta: $1.00$.",
    },
    {
      prompt: "Volumen al rotar $y=x$ en $[0,1]$ alrededor del eje $x$. Usa $\\pi\\approx3.14$.",
      answer: 1.05,
      solution: "$V=\\pi\\int_0^1x^2dx=\\pi/3\\approx1.05$. Respuesta: $1.05$.",
    },
    {
      prompt: "Valor promedio de $f(x)=x^2$ en $[0,2]$.",
      answer: 1.33,
      solution: "$\\tfrac12\\int_0^2x^2dx=4/3\\approx1.33$. Respuesta: $1.33$.",
    },
  ],
);

const lv50 = L(
  50,
  "Examen final del mundo de las integrales",
  "Síntesis completa",
  `
### El cierre del mundo de las integrales

Empezaste preguntándote cómo \"deshacer\" una derivada, y terminaste calculando áreas, volúmenes, longitudes de arco, centros de masa, resolviendo ecuaciones diferenciales y dominando técnicas avanzadas como fracciones parciales y sustitución trigonométrica. Este nivel final mezcla, sin avisos en la mayoría de los casos, ejercicios representativos de **cada bloque** del mundo.

¡Suerte! Si dominas este nivel, tienes una base sólida de cálculo integral.
`,
  [
    {
      prompt: "$\\displaystyle\\int_0^{\\pi/2}\\cos x\\,dx$.",
      answer: 1,
      solution: "$[\\sin x]_0^{\\pi/2}=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "$\\displaystyle\\int x^2\\ln x\\,dx$ (con $C=0$). Evalúa en $x=e$.",
      hint: "Por partes: $u=\\ln x$, $dv=x^2dx$.",
      answer: 4.46,
      solution: "$F(x)=\\tfrac{x^3}3\\ln x-\\tfrac{x^3}9$, $F(e)=\\tfrac{2e^3}9\\approx4.46$. Respuesta: $4.46$.",
    },
    {
      prompt: "$\\displaystyle\\int\\dfrac{dx}{(x-2)(x+3)}$ (con $C=0$). Evalúa en $x=3$.",
      hint: "$\\dfrac{1}{(x-2)(x+3)}=\\dfrac{1/5}{x-2}-\\dfrac{1/5}{x+3}$.",
      answer: -0.36,
      solution: "$F(x)=\\tfrac15\\ln|x-2|-\\tfrac15\\ln|x+3|$, $F(3)\\approx-0.36$. Respuesta: $-0.36$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\infty}x\\,e^{-x}\\,dx$.",
      hint: "Por partes, y recuerda que $te^{-t}\\to0$ cuando $t\\to\\infty$ (la exponencial gana).",
      answer: 1,
      solution: "$\\lim_{t\\to\\infty}[-xe^{-x}-e^{-x}]_0^t=0-(-1)=1$. Respuesta: $1.00$.",
    },
    {
      prompt: "Longitud de arco de $y=x$ en $[0,4]$.",
      answer: 5.66,
      solution: "$L=4\\sqrt2\\approx5.66$. Respuesta: $5.66$.",
    },
    {
      prompt: "Volumen al rotar $y=\\sqrt{x}$ en $[0,1]$ alrededor del eje $x$. Usa $\\pi\\approx3.14$.",
      answer: 1.57,
      solution: "$V=\\pi\\int_0^1x\\,dx=\\pi/2\\approx1.57$. Respuesta: $1.57$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^1\\dfrac{dx}{1+x^2}$.",
      answer: 0.79,
      solution: "$[\\arctan x]_0^1=\\pi/4\\approx0.79$. Respuesta: $0.79$.",
    },
    {
      prompt: "Resuelve $\\dfrac{dy}{dx}=4y$, $y(0)=2$. Halla $y(0.5)$.",
      answer: 14.78,
      solution: "$y=2e^{4x}$, $y(0.5)=2e^2\\approx14.78$. Respuesta: $14.78$.",
    },
  ],
);

const newtonBoss: Boss = {
  id: "newton",
  name: "Isaac Newton",
  era: "1643 — 1727",
  accent: "#b8863b",
  portraitUrl: newtonPortrait.url,
  themeUrl: newtonTheme.url,
  intro: [
    "Yo soy el celebérrimo Newton, el indiscutible inventor del cálculo (no me menciones a ese tal Leibniz).",
    "Yo fui el que formuló las tres leyes más importantes de toda la física, y el que ahora te va a poner a prueba.",
    "Si crees que dominas las integrales, las que tengo preparadas deberían ser pan comido.",
    "Si tienes alguna duda, ponte debajo de un árbol, a lo mejor se te ocurre una idea revolucionaria...",
  ],
  taunts: [
    "Hmm. Ese problema no era tan difícil. Veo que tu grandeza no es comparable a la mía.",
  ],
  victory: "Típico de un fan de Leibniz...",
  defeat: "Veo que tu dominio de las integrales es impoluto. Estoy orgulloso de ti, pupilo.",
  exercises: [
    {
      prompt: "$\\displaystyle\\int_0^1 x^3\\ln(1+x^2)\\,dx$",
      answer: 0.125,
      solution:
        "Sustituye $u=1+x^2$, $du=2x\\,dx$, con $x^2=u-1$: $I=\\tfrac12\\int_1^2 (u-1)\\ln u\\,du$. Por partes, $\\int_1^2(u-1)\\ln u\\,du=\\left[\\left(\\tfrac{u^2}2-u\\right)\\ln u\\right]_1^2-\\int_1^2\\left(\\tfrac{u}2-1\\right)du=0-\\left(-\\tfrac14\\right)=\\tfrac14$. Luego $I=\\tfrac18=0.125$. Respuesta: $0.125$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^3 \\dfrac{x^2}{\\sqrt{9-x^2}}\\,dx$",
      answer: 7.0685834,
      solution:
        "Con $x=3\\sin\\theta$: $dx=3\\cos\\theta\\,d\\theta$ y $\\sqrt{9-x^2}=3\\cos\\theta$. La integral es $\\int_0^{\\pi/2}9\\sin^2\\theta\\,d\\theta=9\\cdot\\tfrac{\\pi}{4}\\approx 7.0686$. Respuesta: $7.07$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^2 \\dfrac{x^3+2x^2+3x+4}{(x-1)^2(x+2)}\\,dx$",
      answer: "Diverge",
      solution:
        "En $x=1$ el denominador tiene un cero doble y el numerador vale $10\\neq0$; cerca de $x=1$ el integrando se comporta como $\\dfrac{10/3}{(x-1)^2}$, cuya integral impropia diverge a $+\\infty$. Respuesta: `Diverge`.",
    },
    {
      prompt:
        "Sea la región limitada por $y=x^2$ e $y=2x$. Calcula el volumen generado al girarla alrededor del eje $x$.",
      answer: 13.4041287,
      solution:
        "Arandelas entre $x=0$ y $x=2$: $V=\\pi\\int_0^2\\left((2x)^2-(x^2)^2\\right)dx=\\pi\\left(\\tfrac{32}{3}-\\tfrac{32}{5}\\right)=\\tfrac{64\\pi}{15}\\approx 13.4041$. Respuesta: $13.40$.",
    },
    {
      prompt:
        "Calcula la longitud de la curva $y=\\tfrac{2}{3}(x+1)^{3/2}$ desde $x=0$ hasta $x=3$.",
      answer: 5.5679418,
      solution:
        "$y'=(x+1)^{1/2}$, así que $L=\\int_0^3\\sqrt{1+(x+1)}\\,dx=\\int_0^3\\sqrt{x+2}\\,dx=\\tfrac23\\left[(x+2)^{3/2}\\right]_0^3=\\tfrac23(\\sqrt{125}-\\sqrt{8})\\approx 5.5679$. Respuesta: $5.57$.",
    },
    {
      prompt:
        "Considera la lámina uniforme limitada por $y=x^2$ e $y=4$ entre sus puntos de intersección. Calcula la coordenada $\\bar{y}$ del centro de masa.",
      answer: 2.4,
      solution:
        "Área $=\\int_{-2}^{2}(4-x^2)dx=\\tfrac{32}{3}$. Momento: $M_x=\\tfrac12\\int_{-2}^2(16-x^4)dx=\\tfrac12\\left(64-\\tfrac{64}{5}\\right)=\\tfrac{128}{5}$. Entonces $\\bar{y}=\\dfrac{128/5}{32/3}=2.4$. Respuesta: $2.40$.",
    },
    {
      prompt: "$\\displaystyle\\int_1^{\\infty} \\dfrac{x^2+1}{x^4+x}\\,dx$",
      answer: "Diverge",
      solution:
        "Para $x$ grande el integrando se comporta como $\\dfrac{x^2}{x^4}=\\dfrac1{x^2}$... pero cuidado: la descomposición da un término $\\dfrac{1}{x}$ (el coeficiente de $1/x$ en la fracción parcial es $1$), cuya integral en $[1,\\infty)$ diverge. En efecto $\\dfrac{x^2+1}{x^4+x}=\\dfrac{x^2+1}{x(x^3+1)}$ y la parte $\\tfrac{1}{x}$ hace divergir la integral. Respuesta: `Diverge`.",
    },
    {
      prompt:
        "$\\dfrac{dy}{dt}=ky$ (con $t$ en horas). Inicialmente hay $500$ individuos y tras $4$ horas hay $800$. ¿Cuánto tiempo debe pasar para alcanzar $2000$ individuos?",
      answer: 11.7981588,
      solution:
        "$y=500e^{kt}$ con $e^{4k}=1.6\\Rightarrow k=\\tfrac{\\ln 1.6}{4}$. Queremos $e^{kt}=4$: $t=\\dfrac{\\ln 4}{k}=\\dfrac{4\\ln 4}{\\ln 1.6}\\approx 11.7982$ horas. Respuesta: $11.80$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\pi/4}\\sec^3 x\\,dx$",
      answer: 1.5884804,
      solution:
        "Fórmula clásica: $\\int\\sec^3=\\tfrac12(\\sec x\\tan x+\\ln|\\sec x+\\tan x|)$. En $\\pi/4$: $\\tfrac12(\\sqrt2+\\ln(\\sqrt2+1))\\approx 1.5885$. Respuesta: $1.59$.",
    },
    {
      prompt: "$\\displaystyle\\int_0^{\\infty} (xe^{-x})^3\\,dx$",
      answer: 0.0740741,
      solution:
        "$\\int_0^\\infty x^3e^{-3x}dx=\\dfrac{3!}{3^4}=\\dfrac{6}{81}=\\dfrac{2}{27}\\approx 0.07407$. Respuesta: $0.0741$.",
    },
  ],
};

export const world3Levels: Level[] = [
  lv1, lv2, lv3, lv4, lv5, lv6, lv7, lv8, lv9, lv10,
  lv11, lv12, lv13, lv14, lv15, lv16, lv17, lv18, lv19, lv20,
  lv21, lv22, lv23, lv24, lv25, lv26, lv27, lv28, lv29, lv30,
  lv31, lv32, lv33, lv34, lv35, lv36, lv37, lv38, lv39, lv40,
  lv41, lv42, lv43, lv44, lv45, lv46, lv47, lv48, lv49, lv50,
];
export const world3Boss = newtonBoss;
