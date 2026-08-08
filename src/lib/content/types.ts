// Tipos del contenido del juego
export type AnswerValue = number | "No" | "Inf" | "-Inf" | "Si" | "N/A" | "Diverge";

export type Exercise = {
  // Texto/Enunciado en markdown ligero.
  prompt: string;
  // Respuesta: número o sentinela textual.
  // - "No" cuando el límite no existe (laterales distintos, ambos finitos)
  // - "Inf" cuando el límite tiende a +infinito
  // - "-Inf" cuando el límite tiende a -infinito
  // - "Si" / "No" para preguntas sí/no
  // - "N/A" cuando no tiene sentido hablar de continuidad en ese punto
  answer: AnswerValue;
  hint?: string;
  // Explicación paso a paso.
  solution: string;
};

export type Lesson = { body: string };

export type Level = {
  id: string;
  title: string;
  concept: string;
  lesson: Lesson;
  exercises: Exercise[];
};

export type BossDialogLine = { text: string };

export type Boss = {
  id: string;
  name: string;
  era: string;
  intro: string[];
  taunts: string[];
  victory: string;
  defeat: string;
  exercises: Exercise[];
  accent: string;
  // URL opcional a un retrato real que sustituye al retrato SVG genérico
  portraitUrl?: string;
  // URL opcional a una pista musical que suena en bucle durante la pelea
  themeUrl?: string;
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
