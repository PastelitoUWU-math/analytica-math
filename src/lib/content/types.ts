// Tipos del contenido del juego
export type Exercise = {
  // Texto/Enunciado en markdown ligero. Use $...$ para math inline y $$...$$ para display.
  prompt: string;
  // Respuesta exacta (número real). El usuario debe escribir decimal con >=2 cifras decimales significativas.
  answer: number;
  // Pista corta opcional
  hint?: string;
  // Explicación de la solución (paso a paso) - se muestra al acertar, fallar 5 veces o usar saltar.
  solution: string;
};

export type Lesson = {
  // Markdown ligero con $...$ y $$...$$. Explicación previa, rigurosa y clara.
  body: string;
};

export type Level = {
  id: string;
  title: string;
  // Pequeño subtítulo del concepto que cubre
  concept: string;
  lesson: Lesson;
  exercises: Exercise[];
};

export type BossDialogLine = {
  // Frase del jefe que se muestra antes/durante la batalla
  text: string;
};

export type Boss = {
  id: string;
  name: string;
  era: string;
  // Frases en español que dice antes de la batalla y entre rondas
  intro: string[];
  taunts: string[]; // se rotan al fallar
  victory: string; // dice el jugador al ganar
  defeat: string; // dice el jefe al perder
  exercises: Exercise[]; // al menos 10
  // Color de acento para su escena
  accent: string;
};

export type World = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  available: boolean;
  levels: Level[];
  boss: Boss | null;
};
